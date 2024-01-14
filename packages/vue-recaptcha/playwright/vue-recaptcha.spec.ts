import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Checkbox reCAPTCHA', async ({ page }) => {
  const recaptchaFrame = page.frameLocator('#checkbox [title*=reCAPTCHA]')

  const $recaptcha = recaptchaFrame.locator('.recaptcha-checkbox')
  await $recaptcha.click()
  await expect(page.getByTestId('checkbox-verify')).toHaveText('verified')
})

test('Invisible reCAPTCHA', async ({ page }) => {
  // wait invisible reCAPTCHA loaded
  await page.waitForTimeout(1000)

  const button = page.locator('#invisible').getByRole('button')
  await button.click()
  await expect(page.getByTestId('v2-verify')).toHaveText('verified')
})

test('v3 reCAPTCHA', async ({ page }) => {
  const button = page.locator('#v3').getByRole('button')
  await button.click()
  await expect(page.getByTestId('v3-verify')).toHaveText('verified')
})
