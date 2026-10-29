export type QualityIncident = {
  id: string
  title: string
  severity: 'crítica' | 'alta' | 'media'
  area: string
  status: 'abierta' | 'en análisis'
  steps: string[]
  expected: string
  actual: string
  detection: string
  documentation: string[]
  automationStatus: 'automatizado' | 'propuesto'
  testFile: string
  testCode: string
  reproducePath: string
}

export const qualityIncidents: QualityIncident[] = [
  {
    id: 'BUG-101', title: 'el filtro de incidencias se pierde al navegar', severity: 'alta', area: 'estado y navegación', status: 'abierta',
    steps: ['abre aplicación bajo prueba', 'entra en incidencias', 'selecciona estado «en curso»', 'navega a usuarios y vuelve a incidencias'],
    expected: 'el filtro seleccionado permanece visible y aplicado.', actual: 'la lista vuelve a mostrar todos los estados.',
    detection: 'compara el estado del control antes y después de una navegación interna. el valor seleccionado debe formar parte del estado de la vista o de la url.',
    documentation: ['anota el filtro utilizado: «en curso».', 'indica las rutas visitadas y el orden exacto.', 'adjunta una captura antes y otra después de volver.', 'separa el valor esperado del valor observado.'],
    automationStatus: 'automatizado', testFile: 'tests/e2e/lab.spec.ts', reproducePath: '/app/incidents',
    testCode: `test.fail('BUG-101 conserva el filtro al volver a la lista', async ({ page }) => {
  await page.goto('/app/incidents')
  await page.getByLabel('filtrar por estado').selectOption('in-progress')
  await page.getByRole('link', { name: 'usuarios' }).click()
  await page.getByRole('link', { name: 'incidencias' }).click()
  await expect(page.getByLabel('filtrar por estado')).toHaveValue('in-progress')
})`,
  },
  {
    id: 'BUG-102', title: 'el formulario muestra un error poco accionable', severity: 'media', area: 'validación y contenido', status: 'abierta',
    steps: ['abre nueva incidencia', 'envía el formulario vacío'], expected: 'cada campo inválido muestra un mensaje junto al campo y conserva el foco.', actual: 'aparece un único mensaje genérico al final del formulario.',
    detection: 'envía datos inválidos y revisa si el mensaje identifica el campo, la regla incumplida y la acción para corregirla.',
    documentation: ['indica qué campos se dejaron vacíos.', 'copia el mensaje exacto mostrado.', 'describe dónde aparece el foco después del error.', 'valora si una persona puede corregir el formulario sin adivinar.'],
    automationStatus: 'automatizado', testFile: 'tests/e2e/lab.spec.ts', reproducePath: '/app/incidents/new',
    testCode: `test.fail('BUG-102 muestra validación específica por campo', async ({ page }) => {
  await page.goto('/app/incidents/new')
  await page.getByRole('button', { name: 'crear incidencia' }).click()
  await expect(page.getByText('el título es obligatorio')).toBeVisible()
})`,
  },
  {
    id: 'BUG-103', title: 'un viewer puede iniciar una acción restringida', severity: 'crítica', area: 'permisos simulados', status: 'abierta',
    steps: ['cambia el rol a viewer', 'entra en incidencias', 'pulsa nueva incidencia'], expected: 'un viewer no puede iniciar una acción de escritura.', actual: 'el botón y el formulario siguen disponibles.',
    detection: 'repite el flujo con un rol de solo lectura y comprueba tanto la interfaz como la posibilidad real de ejecutar la mutación.',
    documentation: ['registra el rol utilizado.', 'indica qué control debería estar oculto o bloqueado.', 'comprueba que la restricción no depende solo del texto de la interfaz.', 'clasifica el riesgo para los datos.'],
    automationStatus: 'automatizado', testFile: 'tests/e2e/lab.spec.ts', reproducePath: '/app?role=viewer',
    testCode: `test.fail('BUG-103 bloquea alta para rol viewer', async ({ page }) => {
  await page.goto('/app')
  await page.getByLabel('rol de prueba').selectOption('viewer')
  await page.getByRole('link', { name: 'incidencias' }).click()
  await expect(page.getByRole('link', { name: 'nueva incidencia' })).toHaveCount(0)
})`,
  },
  {
    id: 'BUG-104', title: 'se aceptan títulos duplicados o demasiado largos', severity: 'alta', area: 'reglas de negocio', status: 'abierta',
    steps: ['abre nueva incidencia', 'introduce un título de más de 120 caracteres o repetido', 'envía el formulario'], expected: 'se rechaza el dato con una explicación concreta.', actual: 'el formulario acepta ambos casos.',
    detection: 'usa datos límite y repite un título ya existente. valida la respuesta en interfaz y en api, porque el cliente no es un límite de confianza.',
    documentation: ['conserva el dato exacto utilizado.', 'indica la longitud del título.', 'anota si el duplicado coincide por mayúsculas o espacios.', 'registra la respuesta de servidor si existe.'],
    automationStatus: 'propuesto', testFile: 'tests/e2e/incidents.spec.ts', reproducePath: '/app/incidents/new',
    testCode: `test('rechaza títulos demasiado largos', async ({ page }) => {
  await page.goto('/app/incidents/new')
  await page.getByLabel('título').fill('a'.repeat(121))
  await page.getByRole('button', { name: 'crear incidencia' }).click()
  await expect(page.getByRole('alert')).toContainText('120 caracteres')
})`,
  },
  {
    id: 'BUG-105', title: 'la vista de incidencias pierde legibilidad en móvil', severity: 'media', area: 'responsive', status: 'en análisis',
    steps: ['abre incidencias con viewport de 320 px', 'revisa la cabecera y las filas'], expected: 'navegación y contenido siguen siendo accesibles sin desplazamiento horizontal.', actual: 'algunos controles quedan apretados y requieren revisión manual.',
    detection: 'revisa el flujo con viewport pequeño y teclado. no basta con que el contenido quepa: los controles deben seguir teniendo nombre, foco y orden comprensible.',
    documentation: ['anota el viewport y el navegador.', 'adjunta una captura del primer punto de pérdida de legibilidad.', 'indica si existe desplazamiento horizontal.', 'describe qué control queda inaccesible.'],
    automationStatus: 'propuesto', testFile: 'tests/e2e/responsive.spec.ts', reproducePath: '/app/incidents',
    testCode: `test('mantiene la lectura usable en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.goto('/app/incidents')
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 320)
})`,
  },
]

export const expectedTestCases = [
  { id: 'TC-001', title: 'crear incidencia con datos válidos', area: 'incidencias', expected: 'la incidencia aparece en la lista y confirma el alta.' },
  { id: 'TC-002', title: 'rechazar formulario vacío con mensajes por campo', area: 'validación', expected: 'el formulario no se envía y cada campo indica cómo corregirlo.' },
  { id: 'TC-003', title: 'conservar filtro al volver a la lista', area: 'navegación', expected: 'el filtro y los resultados se mantienen.' },
  { id: 'TC-004', title: 'bloquear alta para rol viewer', area: 'permisos', expected: 'viewer no ve ni puede ejecutar acciones de escritura.' },
  { id: 'TC-005', title: 'mantener lectura usable en 320 px', area: 'responsive', expected: 'no hay overflow horizontal ni controles inaccesibles.' },
]
