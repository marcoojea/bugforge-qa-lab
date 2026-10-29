import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { Pool } from 'pg'
import { canCreateIncident, incidentInputSchema } from './validation'
import { MemoryIncidentStore, PostgresIncidentStore, type IncidentStore } from './store'

const port = Number(process.env.API_PORT ?? 3001)
const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : null
const store: IncidentStore = pool ? new PostgresIncidentStore(pool) : new MemoryIncidentStore()

function send(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'x-frame-options': 'DENY' })
  response.end(JSON.stringify(body))
}

async function readBody(request: IncomingMessage) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > 100_000) throw new Error('BODY_TOO_LARGE')
  }
  return JSON.parse(body || '{}') as unknown
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)
    if (request.method === 'GET' && url.pathname === '/api/health') return send(response, 200, { status: 'ok', storage: pool ? 'postgres' : 'memory' })
    if (request.method === 'GET' && url.pathname === '/api/incidents') return send(response, 200, { data: await store.list(url.searchParams.get('status') ?? undefined) })
    if (request.method === 'POST' && url.pathname === '/api/incidents') {
      const roleHeader = request.headers['x-test-role']
      if (!canCreateIncident(Array.isArray(roleHeader) ? roleHeader[0] : roleHeader)) return send(response, 403, { error: { code: 'FORBIDDEN', message: 'el rol no puede crear incidencias' } })
      const parsed = incidentInputSchema.safeParse(await readBody(request))
      if (!parsed.success) return send(response, 422, { error: { code: 'VALIDATION_ERROR', message: 'los datos de la incidencia no son válidos', details: parsed.error.flatten().fieldErrors } })
      try { return send(response, 201, { data: await store.create(parsed.data) }) } catch (error) { if (error instanceof Error && error.message === 'DUPLICATE_TITLE') return send(response, 409, { error: { code: 'DUPLICATE_TITLE', message: 'ya existe una incidencia con ese título' } }); throw error }
    }
    return send(response, 404, { error: { code: 'NOT_FOUND', message: 'recurso no encontrado' } })
  } catch (error) {
    if (error instanceof SyntaxError) return send(response, 400, { error: { code: 'INVALID_JSON', message: 'el cuerpo debe ser json válido' } })
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') return send(response, 413, { error: { code: 'BODY_TOO_LARGE', message: 'el cuerpo supera el límite permitido' } })
    console.error(error)
    return send(response, 500, { error: { code: 'INTERNAL_ERROR', message: 'error interno del servidor' } })
  }
})

server.listen(port, () => console.log(`api escuchando en http://127.0.0.1:${port}`))

process.on('SIGTERM', async () => { server.close(); await pool?.end() })
