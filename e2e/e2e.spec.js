import { createServer } from 'http'
import { format } from 'util'
import handler from 'serve-handler'
import path from 'path'
import puppeteer from 'puppeteer'

jest.setTimeout(20000) // Set timeout

const URL = 'http://localhost:8080/e2e/index.html'

let page

function runE2ETest(script, loadScript) {
  describe(`with ${format({ script, loadScript })}`, () => {
    describe('Normal reCAPTCHA', () => {
      it('work', async () => {
        const frames = await page.frames()
        const recaptchaFrame = frames.find((frame) => frame.url().includes('anchor'))

        const $recaptcha = await recaptchaFrame.$('.recaptcha-checkbox')
        expect($recaptcha).toBeTruthy()
        await $recaptcha.click()
        return page.waitForSelector('#normal-verified')
      })
    })

    describe('Binded reCAPTCHA', () => {
      it('work', async () => {
        const $btn = await page.$('#binded')
        await $btn.click()
        return page.waitForSelector('#binded-verified')
      })
    })

    describe('Invisible reCAPTCHA', () => {
      it('work', async () => {
        const $btn = await page.$('#submit')
        await $btn.click()
        return page.waitForSelector('#invisible-verified')
      })
    })

    beforeEach(async () => {
      await page.goto(URL)
      await page.waitForSelector('#normal-verified', { polling: 'mutation' })
      await page.$eval(
        'body',
        ($el, script, loadScript) =>
          new Promise((resolve) => {
            const $script = document.createElement('script')
            $script.defer = true
            $script.src = `../dist/${script}`
            $script.addEventListener('load', () => {
              // eslint-disable-next-line no-undef
              bootstrap(loadScript)
              resolve()
            })
            $el.appendChild($script)
          }),
        script,
        loadScript
      )
      await page.waitForTimeout(3000)
    })
  })
}

describe('e2e', () => {
  let browser
  let server
  runE2ETest('vue-recaptcha.js', false)
  runE2ETest('vue-recaptcha.min.js', false)
  runE2ETest('vue-recaptcha.js', true)
  runE2ETest('vue-recaptcha.min.js', true)

  beforeAll(() => {
    // Setup http server & puppeteer
    return Promise.all([
      puppeteer
        .launch({
          args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
        })
        .then((instance) => {
          browser = instance
          return browser.newPage()
        })
        .then((x) => (page = x)),
      new Promise((resolve) => {
        server = createServer((request, response) => {
          return handler(request, response, { public: path.resolve(__dirname, '..') })
        })

        server.listen(8080, () => {
          resolve()
        })
      }),
    ])
  })

  afterAll(() => {
    server.close()
    return browser.close()
  })
})
