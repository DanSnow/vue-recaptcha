import path from 'path'
import Nightmare from 'nightmare'
import HttpServer from 'http-server'
import nightmareIFrame from 'nightmare-iframe-manager'

nightmareIFrame(Nightmare)

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000 // Set timeout

describe('e2e', () => {
  let nightmare
  let server
  const extractSpyResult = () => {
    return [
      window.normalVerifyCallback.calledOnce,
      window.bindedVerifyCallback.calledOnce,
      window.invisibleVerifyCallback.calledOnce
    ]
  }

  describe('Normal reCAPTCHA', () => {
    it('work', async () => {
      let spyResult = await nightmare
        .enterIFrame('iframe[name=undefined]')
        .click('.recaptcha-checkbox')
        .exitIFrame()
        .wait(2000) // Wait for verified
        .evaluate(extractSpyResult)

      expect(spyResult).toEqual([true, false, false])
    })
  })

  describe('Binded reCAPTCHA', () => {
    it('work', async () => {
      let spyResult = await nightmare
        .click('#binded')
        .wait(2000) // Wait for verified
        .evaluate(extractSpyResult)

      expect(spyResult).toEqual([false, true, false])
    })
  })

  describe('Invisible reCAPTCHA', () => {
    it('work', async () => {
      let spyResult = await nightmare
        .click('#submit')
        .wait(2000) // Wait for verified
        .evaluate(extractSpyResult)

      expect(spyResult).toEqual([false, false, true])
    })
  })

  beforeAll(() => {
    // Setup http-server
    nightmare = new Nightmare({
      webPreferences: {
        webSecurity: false // Need for access iframe
      }
    })

    const nightmareInitial = nightmare
      .goto('http://localhost:8080/e2e/index.html')
      .wait(1000) // Wait for recaptcha loaded

    return new Promise(resolve => {
      server = HttpServer.createServer({
        root: path.resolve(__dirname, '..')
      })

      server.listen(8080, async () => {
        await nightmareInitial
        resolve()
      })
    })
  })

  beforeEach(() => {
    return nightmare.evaluate(() => window.resetSpies())
  })

  afterAll(() => {
    server.close()
    return nightmare.end()
  })
})
