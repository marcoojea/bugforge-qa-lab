import { z } from 'zod'

export const incidentInputSchema = z.object({
  title: z.string().trim().min(3, 'el título debe tener al menos 3 caracteres').max(120, 'el título no puede superar 120 caracteres'),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
})

export type IncidentInput = z.infer<typeof incidentInputSchema>

export function canCreateIncident(role: string | undefined) {
  return role === 'admin' || role === 'analyst'
}
