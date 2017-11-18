import HttpServer from 'http-server'
import path from 'path'
import puppeteer from 'puppeteer'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000 // Set timeout

const URL = 'http://localhost:8080/e2e/index.html'

describe('e2e', () => {
  let browser
  let page
  let server

  describe('Normal reCAPTCHA', () => {
    it('work', async () => {
      const frames = await page.frames()
      const recaptchaFrame = frames[1]

      const $recaptcha = await recaptchaFrame.$('.recaptcha-checkbox')
      await $recaptcha.click()
      return page.waitFor('#normal-verified')
    })
  })

  describe('Binded reCAPTCHA', () => {
    it('work', async () => {
      const $btn = await page.$('#binded')
      await $btn.click()
      return page.waitFor('#binded-verified')
    })
  })

  describe('Invisible reCAPTCHA', () => {
    it('work', async () => {
      const $btn = await page.$('#submit')
      await $btn.click()
      return page.waitFor('#invisible-verified')
    })
  })

  beforeAll(() => {
    // Setup http-server
    return Promise.all([
      puppeteer
        .launch({ headless: false })
        .then(instance => {
          browser = instance
          return browser.newPage()
        })
        .then(x => (page = x)),
      new Promise(resolve => {
        server = HttpServer.createServer({
          root: path.resolve(__dirname, '..')
        })

        server.listen(8080, () => {
          resolve()
        })
      })
    ])
  })

  beforeEach(async () => {
    await page.goto(URL)
    await page.waitFor(3000)
  })

  afterAll(() => {
    server.close()
    return browser.close()
  })
})
