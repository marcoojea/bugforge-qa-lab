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
  {
    id: 'BUG-106', title: 'el login no conserva el correo tras credenciales inválidas', severity: 'media', area: 'login y validación', status: 'abierta',
    steps: ['abre acceso demo', 'introduce un correo válido y una contraseña incorrecta', 'envía el formulario'], expected: 'se muestra un error accionable y el correo permanece para poder corregir solo la contraseña.', actual: 'el mensaje es genérico y el flujo no explica qué dato debe revisarse.',
    detection: 'prueba credenciales incorrectas variando un solo dato cada vez. observa mensaje, foco, valores conservados y posibilidad de reintentar.',
    documentation: ['indica qué combinación de credenciales se utilizó.', 'copia el mensaje y registra dónde aparece.', 'anota si el foco vuelve al campo que requiere corrección.', 'no incluyas contraseñas reales en la evidencia.'],
    automationStatus: 'propuesto', testFile: 'tests/e2e/auth.spec.ts', reproducePath: '/login',
    testCode: `test('mantiene el correo tras un login inválido', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('correo electrónico').fill('analyst@example.test')
  await page.getByLabel('contraseña').fill('incorrecta')
  await page.getByRole('button', { name: 'iniciar sesión' }).click()
  await expect(page.getByLabel('correo electrónico')).toHaveValue('analyst@example.test')
  await expect(page.getByRole('alert')).toBeVisible()
})`,
  },
  {
    id: 'BUG-107', title: 'recuperación de contraseña acepta un correo inválido', severity: 'alta', area: 'recuperación de acceso', status: 'abierta',
    steps: ['abre acceso demo', 'entra en «he olvidado la contraseña»', 'envía el formulario vacío o con texto sin formato de correo'], expected: 'el campo muestra una validación clara y no se inicia el flujo con datos inválidos.', actual: 'se muestra un mensaje de éxito aunque el dato esté vacío o no sea un correo.',
    detection: 'prueba vacío, formato incompleto, espacios y un correo no registrado. comprueba validación, mensaje y que no se revele si una cuenta existe.',
    documentation: ['conserva el dato de entrada sin incluir información sensible.', 'distingue validación de formato y respuesta de negocio.', 'anota si el mensaje permite enumerar cuentas.', 'adjunta evidencia del estado final.'],
    automationStatus: 'propuesto', testFile: 'tests/e2e/auth.spec.ts', reproducePath: '/forgot-password',
    testCode: `test('rechaza un correo inválido al recuperar acceso', async ({ page }) => {
  await page.goto('/forgot-password')
  await page.getByLabel('correo electrónico').fill('sin-formato')
  await page.getByRole('button', { name: 'enviar instrucciones' }).click()
  await expect(page.getByRole('alert')).toContainText('correo válido')
})`,
  },
  {
    id: 'BUG-108', title: 'la sesión simulada sigue accesible después de cerrar sesión', severity: 'crítica', area: 'sesión y navegación', status: 'abierta',
    steps: ['abre la aplicación bajo prueba', 'pulsa «cerrar sesión»', 'vuelve atrás en el navegador o entra directamente en `/app`'], expected: 'la sesión queda invalidada y las rutas de la aplicación requieren volver a identificarse.', actual: 'la aplicación sigue mostrando contenido aunque se haya cerrado la sesión.',
    detection: 'comprueba siempre el cierre de sesión con navegación atrás, recarga y acceso directo a una ruta interna. en producción también se validaría la invalidación del token en servidor.',
    documentation: ['registra la ruta protegida visitada.', 'indica la secuencia de logout, back y reload.', 'separa el comportamiento visual del control real de sesión.', 'no uses credenciales reales en las pruebas.'],
    automationStatus: 'propuesto', testFile: 'tests/e2e/auth.spec.ts', reproducePath: '/app',
    testCode: `test('impide volver a la aplicación tras cerrar sesión', async ({ page }) => {
  await page.goto('/app?session=demo')
  await page.getByRole('link', { name: 'cerrar sesión' }).click()
  await page.goto('/app')
  await expect(page).toHaveURL(/login/)
})`,
  },
  {
    id: 'BUG-109', title: 'el login no ofrece estado de carga ni evita dobles envíos', severity: 'media', area: 'estados y usabilidad', status: 'en análisis',
    steps: ['abre acceso demo', 'envía el formulario con datos válidos', 'pulsa varias veces mientras se procesa'], expected: 'el botón comunica el estado, evita envíos duplicados y confirma el resultado.', actual: 'no hay estado de carga visible ni protección contra dobles envíos.',
    detection: 'simula una red lenta y repite la acción. revisa el estado del botón, mensajes, foco y número de solicitudes.',
    documentation: ['anota las condiciones de red.', 'registra cuántas veces se envió la acción.', 'describe el feedback visible para la persona.', 'adjunta trace o vídeo si el estado desaparece.'],
    automationStatus: 'propuesto', testFile: 'tests/e2e/auth.spec.ts', reproducePath: '/login',
    testCode: `test('muestra estado de carga al iniciar sesión', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('correo electrónico').fill('analyst@example.test')
  await page.getByLabel('contraseña').fill('playwright123')
  await page.getByRole('button', { name: 'iniciar sesión' }).click()
  await expect(page.getByRole('button', { name: 'iniciando sesión' })).toBeDisabled()
})`,
  },
]

export const expectedTestCases = [
  { id: 'TC-001', title: 'crear incidencia con datos válidos', area: 'incidencias', expected: 'la incidencia aparece en la lista y confirma el alta.' },
  { id: 'TC-002', title: 'rechazar formulario vacío con mensajes por campo', area: 'validación', expected: 'el formulario no se envía y cada campo indica cómo corregirlo.' },
  { id: 'TC-003', title: 'conservar filtro al volver a la lista', area: 'navegación', expected: 'el filtro y los resultados se mantienen.' },
  { id: 'TC-004', title: 'bloquear alta para rol viewer', area: 'permisos', expected: 'viewer no ve ni puede ejecutar acciones de escritura.' },
  { id: 'TC-005', title: 'mantener lectura usable en 320 px', area: 'responsive', expected: 'no hay overflow horizontal ni controles inaccesibles.' },
  { id: 'TC-006', title: 'iniciar sesión con credenciales válidas', area: 'login', expected: 'la persona entra en la aplicación y ve el resumen de su sesión demo.' },
  { id: 'TC-007', title: 'rechazar credenciales inválidas', area: 'login', expected: 'se informa del error sin perder el contexto ni exponer datos sensibles.' },
  { id: 'TC-008', title: 'validar recuperación de contraseña', area: 'recuperación', expected: 'el formulario rechaza datos inválidos y mantiene un mensaje seguro.' },
  { id: 'TC-009', title: 'cerrar sesión e invalidar el acceso', area: 'sesión', expected: 'las rutas internas requieren volver a identificarse.' },
  { id: 'TC-010', title: 'evitar dobles envíos en login', area: 'estados', expected: 'el botón muestra carga y no permite repetir la acción mientras se procesa.' },
]
