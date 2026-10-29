import { randomUUID } from 'node:crypto'
import { Pool } from 'pg'
import type { IncidentInput } from './validation'

export type StoredIncident = IncidentInput & { id: string; status: 'open'; owner: string; summary: string }

const seed: StoredIncident[] = [
  { id: 'BUG-101', title: 'el filtro de incidencias se pierde al navegar', severity: 'high', status: 'open', owner: 'bruno qa', summary: 'el estado del filtro no se conserva al navegar.' },
  { id: 'BUG-102', title: 'mensaje de error sin contexto', severity: 'medium', status: 'open', owner: 'ana tester', summary: 'el formulario informa de un error sin indicar cómo resolverlo.' },
]

export interface IncidentStore {
  list(status?: string): Promise<StoredIncident[]>
  create(input: IncidentInput): Promise<StoredIncident>
}

export class MemoryIncidentStore implements IncidentStore {
  private incidents = seed.map((incident) => ({ ...incident }))

  async list(status?: string) {
    return status && status !== 'all' ? this.incidents.filter((incident) => incident.status === status) : [...this.incidents]
  }

  async create(input: IncidentInput) {
    const duplicate = this.incidents.some((incident) => incident.title.toLowerCase() === input.title.toLowerCase())
    if (duplicate) throw new Error('DUPLICATE_TITLE')
    const incident = { ...input, id: `BUG-${100 + this.incidents.length + 1}`, status: 'open' as const, owner: 'api user', summary: 'incidencia creada por api.' }
    this.incidents.push(incident)
    return incident
  }
}

export class PostgresIncidentStore implements IncidentStore {
  constructor(private readonly pool: Pool) {}

  async list(status?: string) {
    const result = status && status !== 'all'
      ? await this.pool.query('select id, title, severity, status, owner, summary from incidents where status = $1 order by id', [status])
      : await this.pool.query('select id, title, severity, status, owner, summary from incidents order by id')
    return result.rows as StoredIncident[]
  }

  async create(input: IncidentInput) {
    const result = await this.pool.query<StoredIncident>(
      'insert into incidents (id, title, severity, status, owner, summary) values ($1, $2, $3, $4, $5, $6) returning id, title, severity, status, owner, summary',
      [`BUG-${randomUUID().slice(0, 8)}`, input.title, input.severity, 'open', 'api user', 'incidencia creada por api.'],
    )
    return result.rows[0]
  }
}
