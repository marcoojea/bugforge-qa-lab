export type Role = 'admin' | 'analyst' | 'viewer'
export type IncidentStatus = 'open' | 'in-progress' | 'closed'

export type User = { id: string; name: string; email: string; role: Role; active: boolean }
export type Incident = { id: string; title: string; severity: 'critical' | 'high' | 'medium' | 'low'; status: IncidentStatus; owner: string; summary: string }

export const users: User[] = [
  { id: 'u-001', name: 'ana tester', email: 'ana@example.test', role: 'admin', active: true },
  { id: 'u-002', name: 'bruno qa', email: 'bruno@example.test', role: 'analyst', active: true },
  { id: 'u-003', name: 'carla demo', email: 'carla@example.test', role: 'viewer', active: false },
]

export const incidents: Incident[] = [
  { id: 'BUG-101', title: 'el filtro desaparece al volver a la lista', severity: 'high', status: 'open', owner: 'bruno qa', summary: 'el estado del filtro no se conserva al navegar.' },
  { id: 'BUG-102', title: 'mensaje de error sin contexto', severity: 'medium', status: 'in-progress', owner: 'ana tester', summary: 'el formulario informa de un error sin indicar cómo resolverlo.' },
  { id: 'BUG-103', title: 'acción disponible para usuario viewer', severity: 'critical', status: 'open', owner: 'ana tester', summary: 'un usuario sin permiso puede iniciar una mutación.' },
]

export const resetIncidents = () => incidents.map((incident) => ({ ...incident }))
