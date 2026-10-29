export type QualityIncident = {
  id: string
  title: string
  severity: 'crítica' | 'alta' | 'media'
  area: string
  status: 'abierta' | 'en análisis'
  steps: string[]
  expected: string
  actual: string
}

export const qualityIncidents: QualityIncident[] = [
  { id: 'BUG-101', title: 'el filtro de incidencias se pierde al navegar', severity: 'alta', area: 'estado y navegación', status: 'abierta', steps: ['abre aplicación bajo prueba', 'entra en incidencias', 'selecciona estado «en curso»', 'navega a usuarios y vuelve a incidencias'], expected: 'el filtro seleccionado permanece visible y aplicado.', actual: 'la lista vuelve a mostrar todos los estados.', },
  { id: 'BUG-102', title: 'el formulario muestra un error poco accionable', severity: 'media', area: 'validación y contenido', status: 'abierta', steps: ['abre nueva incidencia', 'envía el formulario vacío'], expected: 'cada campo inválido muestra un mensaje junto al campo y conserva el foco.', actual: 'aparece un único mensaje genérico al final del formulario.', },
  { id: 'BUG-103', title: 'un viewer puede iniciar una acción restringida', severity: 'crítica', area: 'permisos simulados', status: 'abierta', steps: ['cambia el rol a viewer', 'entra en incidencias', 'pulsa nueva incidencia'], expected: 'un viewer no puede iniciar una acción de escritura.', actual: 'el botón y el formulario siguen disponibles.', },
  { id: 'BUG-104', title: 'se aceptan títulos duplicados o demasiado largos', severity: 'alta', area: 'reglas de negocio', status: 'abierta', steps: ['abre nueva incidencia', 'introduce un título de más de 120 caracteres o repetido', 'envía el formulario'], expected: 'se rechaza el dato con una explicación concreta.', actual: 'el formulario acepta ambos casos.', },
  { id: 'BUG-105', title: 'la vista de incidencias pierde legibilidad en móvil', severity: 'media', area: 'responsive', status: 'en análisis', steps: ['abre incidencias con viewport de 320 px', 'revisa la cabecera y las filas'], expected: 'navegación y contenido siguen siendo accesibles sin desplazamiento horizontal.', actual: 'algunos controles quedan apretados y requieren revisión manual.', },
]

export const expectedTestCases = [
  { id: 'TC-001', title: 'crear incidencia con datos válidos', area: 'incidencias', expected: 'la incidencia aparece en la lista y confirma el alta.' },
  { id: 'TC-002', title: 'rechazar formulario vacío con mensajes por campo', area: 'validación', expected: 'el formulario no se envía y cada campo indica cómo corregirlo.' },
  { id: 'TC-003', title: 'conservar filtro al volver a la lista', area: 'navegación', expected: 'el filtro y los resultados se mantienen.' },
  { id: 'TC-004', title: 'bloquear alta para rol viewer', area: 'permisos', expected: 'viewer no ve ni puede ejecutar acciones de escritura.' },
  { id: 'TC-005', title: 'mantener lectura usable en 320 px', area: 'responsive', expected: 'no hay overflow horizontal ni controles inaccesibles.' },
]
