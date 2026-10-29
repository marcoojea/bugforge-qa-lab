import { expect, test } from '@playwright/test'

test.describe('laboratorio público', () => {
  test('permite explorar aplicación, catálogo y casos', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /encuentra el fallo/i })).toBeVisible()
    await page.getByRole('link', { name: 'aplicación bajo prueba' }).first().click()
    await expect(page).toHaveURL(/\/app$/)
    await expect(page.getByRole('heading', { name: 'resumen del laboratorio' })).toBeVisible()
    await page.goto('/incidents')
    await expect(page.getByRole('heading', { name: 'incidencias conocidas' })).toBeVisible()
    await expect(page.getByText('BUG-101')).toBeVisible()
    await page.goto('/test-cases')
    await expect(page.getByText('TC-001')).toBeVisible()
  })

  test('crea una incidencia válida', async ({ page }) => {
    await page.goto('/app/incidents/new')
    await page.getByLabel('título').fill('el botón de guardar no confirma el estado')
    await page.getByLabel('gravedad').selectOption('high')
    await page.getByRole('button', { name: 'crear incidencia' }).click()
    await expect(page.getByRole('status')).toHaveText('incidencia creada correctamente.')
    await expect(page).toHaveURL(/\/app\/incidents/, { timeout: 2000 })
  })
})

test.describe('fallos conocidos', () => {
  test.fail('BUG-101 conserva el filtro al volver a la lista', async ({ page }) => {
    await page.goto('/app/incidents')
    await page.getByLabel('filtrar por estado').selectOption('in-progress')
    await page.getByRole('link', { name: 'usuarios' }).click()
    await page.getByRole('link', { name: 'incidencias' }).click()
    await expect(page.getByLabel('filtrar por estado')).toHaveValue('in-progress')
  })

  test.fail('BUG-102 muestra validación específica por campo', async ({ page }) => {
    await page.goto('/app/incidents/new')
    await page.getByRole('button', { name: 'crear incidencia' }).click()
    await expect(page.getByText('el título es obligatorio')).toBeVisible()
  })

  test.fail('BUG-103 bloquea alta para rol viewer', async ({ page }) => {
    await page.goto('/app')
    await page.getByLabel('rol de prueba').selectOption('viewer')
    await page.getByRole('link', { name: 'incidencias' }).click()
    await expect(page.getByRole('link', { name: 'nueva incidencia' })).toHaveCount(0)
  })
})
