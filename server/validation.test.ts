import { describe, expect, it } from 'vitest'
import { canCreateIncident, incidentInputSchema } from './validation'
import { MemoryIncidentStore } from './store'

describe('contrato de incidencias', () => {
  it('rechaza títulos vacíos y demasiado largos', () => {
    expect(incidentInputSchema.safeParse({ title: '', severity: 'high' }).success).toBe(false)
    expect(incidentInputSchema.safeParse({ title: 'a'.repeat(121), severity: 'high' }).success).toBe(false)
  })

  it('limita escritura a admin y analyst', () => {
    expect(canCreateIncident('viewer')).toBe(false)
    expect(canCreateIncident('analyst')).toBe(true)
  })

  it('rechaza títulos duplicados en almacenamiento de memoria', async () => {
    const store = new MemoryIncidentStore()
    await expect(store.create({ title: 'incidencia nueva', severity: 'low' })).resolves.toMatchObject({ title: 'incidencia nueva' })
    await expect(store.create({ title: 'INCIDENCIA NUEVA', severity: 'low' })).rejects.toThrow('DUPLICATE_TITLE')
  })
})
