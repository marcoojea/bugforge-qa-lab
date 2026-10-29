import { expect, test } from '@playwright/test'

test.describe('laboratorio público', () => {
  test('permite explorar aplicación, catálogo y casos', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /encuentra el fallo/i })).toBeVisible()
    await page.getByRole('link', { name: 'aplicación bajo prueba' }).first().click()
    await expect(page).toHaveURL(/\/login\?next=/)
    await page.getByLabel('correo electrónico').fill('analyst@example.test')
    await page.getByLabel('contraseña').fill('playwright123')
    await page.getByRole('button', { name: 'iniciar sesión' }).click()
    await expect(page).toHaveURL(/\/app\?session=demo$/)
    await expect(page.getByRole('heading', { name: 'resumen del laboratorio' })).toBeVisible()
    await page.goto('/incidents')
    await expect(page.getByRole('heading', { name: 'incidencias conocidas' })).toBeVisible()
    await expect(page.getByText('BUG-101')).toBeVisible()
    await page.goto('/test-cases')
    await expect(page.getByText('TC-001 · incidencias')).toBeVisible()
    await page.getByRole('link', { name: 'abrir flujo de TC-001' }).click()
    await expect(page).toHaveURL(/\/app\/incidents\/new$/)
    await expect(page.getByRole('heading', { name: 'nueva incidencia' })).toBeVisible()
  })

  test('crea una incidencia válida', async ({ page }) => {
    await page.goto('/app/incidents/new?session=demo')
    await page.getByLabel('título').fill('el botón de guardar no confirma el estado')
    await page.getByLabel('gravedad').selectOption('high')
    await page.getByLabel('evidencias y pasos de reproducción').fill('1. abre el flujo\n2. pulsa guardar\nactual: no aparece confirmación')
    await page.getByLabel('código Playwright').fill("test('confirma el guardado', async ({ page }) => { await page.getByRole('button', { name: 'guardar' }).click() })")
    await page.getByRole('button', { name: 'crear incidencia' }).click()
    await expect(page.getByRole('status')).toHaveText('incidencia creada correctamente.')
    await expect(page).toHaveURL(/\/app\/incidents/, { timeout: 2000 })
    await page.getByRole('link', { name: /el botón de guardar/ }).click()
    await expect(page.getByRole('heading', { name: /el botón de guardar/ })).toBeVisible()
    await expect(page.getByText('actual: no aparece confirmación')).toBeVisible()
    await expect(page.locator('pre')).toContainText('confirma el guardado')
  })

  test('consulta la ficha educativa de una incidencia', async ({ page }) => {
    await page.goto('/incidents')
    await page.getByRole('link', { name: 'abrir ficha del bug' }).first().click()
    await expect(page).toHaveURL(/\/incidents\/BUG-101$/)
    await expect(page.getByRole('heading', { name: 'cómo encontrarlo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'regresión con Playwright' })).toBeVisible()
    await expect(page.locator('pre')).toContainText('BUG-101 conserva el filtro')
  })

  test('filtra el catálogo y abre el modo misión', async ({ page }) => {
    await page.goto('/incidents')
    await page.getByLabel('filtrar por automatización').selectOption('propuesto')
    await expect(page.getByText('3 de 9 incidencias visibles')).toBeVisible()
    await page.getByRole('link', { name: 'abrir misión' }).first().click()
    await page.getByRole('button', { name: 'mostrar solución' }).click()
    await expect(page.getByRole('status')).toContainText('resultado esperado')
    await page.getByRole('button', { name: 'mostrar código' }).click()
    await expect(page.locator('.mission-code')).toBeVisible()
  })

  test('muestra el estado del panel de resultados', async ({ page }) => {
    await page.goto('/results')
    await expect(page.getByRole('heading', { name: 'resultados' })).toBeVisible()
    await expect(page.getByText('pipeline preparado')).toBeVisible()
    await expect(page.getByRole('link', { name: 'ver github actions' })).toHaveAttribute('href', /github.com/)
  })
})

test.describe('fallos conocidos', () => {
  test.fail('BUG-101 conserva el filtro al volver a la lista', async ({ page }) => {
    await page.goto('/app/incidents?session=demo')
    await page.getByLabel('filtrar por estado').selectOption('in-progress')
    await page.getByRole('link', { name: 'usuarios' }).click()
    await page.getByRole('link', { name: 'incidencias' }).click()
    await expect(page.getByLabel('filtrar por estado')).toHaveValue('in-progress')
  })

  test.fail('BUG-102 muestra validación específica por campo', async ({ page }) => {
    await page.goto('/app/incidents/new?session=demo')
    await page.getByRole('button', { name: 'crear incidencia' }).click()
    await expect(page.getByText('el título es obligatorio')).toBeVisible()
  })

  test.fail('BUG-103 bloquea alta para rol viewer', async ({ page }) => {
    await page.goto('/app?session=demo')
    await page.getByLabel('rol de prueba').selectOption('viewer')
    await page.getByRole('link', { name: 'incidencias' }).click()
    await expect(page.getByRole('link', { name: 'nueva incidencia' })).toHaveCount(0)
  })
})
