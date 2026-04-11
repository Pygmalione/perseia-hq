import { expect, test } from '@playwright/test'

test('brain page exposes asset operations and upload entrypoint', async ({ page }) => {
  await page.goto('/brain')

  await expect(page.getByRole('heading', { name: 'Asset Brain' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Wrzuć nowe pliki do HQ' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Wybierz plik/i })).toBeVisible()

  await expect(page.getByRole('button', { name: /Zapisz metadata Blob E2E Test/i })).toBeVisible()
  await expect(page.getByRole('textbox', { name: /Edytuj tytuł Blob E2E Test/i })).toBeVisible()
  await expect(page.getByRole('textbox', { name: /Edytuj projekt Blob E2E Test/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Zatwierdź Blob E2E Test/i })).toBeVisible()
})

test('navigation reaches gallery and returns to brain', async ({ page }) => {
  await page.goto('/brain')

  await page.getByRole('link', { name: 'Galeria' }).click()
  await expect(page).toHaveURL(/\/gallery/)

  await page.getByRole('link', { name: 'Asset brain' }).click()
  await expect(page).toHaveURL(/\/brain/)
  await expect(page.getByRole('heading', { name: 'Asset Brain' })).toBeVisible()
})
