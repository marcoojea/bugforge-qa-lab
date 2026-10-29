import { expect, test } from '@playwright/test'

test.describe('acceso demo', () => {
  test('inicia sesión con credenciales válidas', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('correo electrónico').fill('analyst@example.test')
    await page.getByLabel('contraseña').fill('playwright123')
    await page.getByRole('button', { name: 'iniciar sesión' }).click()
    await expect(page).toHaveURL(/\/app\?session=demo$/)
    await expect(page.getByRole('heading', { name: 'resumen del laboratorio' })).toBeVisible()
  })

  test('muestra un error para credenciales inválidas', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('correo electrónico').fill('analyst@example.test')
    await page.getByLabel('contraseña').fill('incorrecta')
    await page.getByRole('button', { name: 'iniciar sesión' }).click()
    await expect(page.getByRole('alert')).toHaveText('el correo o la contraseña no son correctos.')
  })

  test.fail('rechaza un correo inválido al recuperar acceso', async ({ page }) => {
    await page.goto('/forgot-password')
    await page.getByLabel('correo electrónico').fill('sin-formato')
    await page.getByRole('button', { name: 'enviar instrucciones' }).click()
    await expect(page.getByRole('alert')).toContainText('correo válido')
  })

  test.fail('invalida la sesión después de cerrar sesión', async ({ page }) => {
    await page.goto('/app?session=demo')
    await page.getByRole('link', { name: 'cerrar sesión' }).click()
    await page.goto('/app')
    await expect(page).toHaveURL(/\/login/)
  })
})
