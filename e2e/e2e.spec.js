import path from 'path'
import Nightmare from 'nightmare'
import HttpServer from 'http-server'
import nightmareIFrame from 'nightmare-iframe-manager'

nightmareIFrame(Nightmare)

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000 // Set timeout

describe('e2e', () => {
  let nightmare
  let server

  it('work', async () => {
    const spyResult = await nightmare
      .goto('http://localhost:8080/e2e/index.html')
      .wait(1000) // Wait for recaptcha loaded
      .enterIFrame('iframe[name=undefined]')
      .click('.recaptcha-checkbox')
      .exitIFrame()
      .wait(3000) // Wait for verified
      .evaluate(() => {
        return window.verifyCallback.calledOnce
      })

    expect(spyResult).toBe(true)
  })

  beforeAll(() => {
    // Setup http-server
    return new Promise((resolve) => {
      server = HttpServer.createServer({
        root: path.resolve(__dirname, '..')
      })

      server.listen(8080, () => {
        resolve()
      })
    })
  })

  beforeEach(() => {
    nightmare = new Nightmare({
      webPreferences: {
        webSecurity: false // Need for access iframe
      }
    })
  })

  afterEach(() => {
    return nightmare.end()
  })

  afterAll(() => {
    server.close()
  })
})
