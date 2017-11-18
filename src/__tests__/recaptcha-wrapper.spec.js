import recaptcha, { createRecaptcha } from '../recaptcha-wrapper'

const WIDGET_ID = 'widgetId'
function createMock () {
  return {
    render: jest.fn(() => WIDGET_ID),
    reset: jest.fn(),
    execute: jest.fn()
  }
}

describe('recaptcha', () => {
  describe('#createRecaptcha', () => {
    let ins
    let recaptchaMock

    beforeEach(() => {
      recaptchaMock = createMock()
      ins = createRecaptcha()
      window.grecaptcha = recaptchaMock
    })

    afterEach(() => delete window.grecaptcha)

    describe('#assertLoaded', () => {
      describe('When ReCAPTCHA not loaded', () => {
        it('Throw error', () => {
          expect(() => {
            ins.assertLoaded()
          }).toThrow()
        })
      })

      describe('When ReCAPTCHA loaded', () => {
        it('Not throw error', () => {
          ins.notify()

          expect(() => {
            ins.assertLoaded()
          }).not.toThrow()
        })
      })
    })

    describe('#checkRecaptchaLoad', () => {
      describe('When Recaptcha not loaded', () => {
        beforeEach(() => {
          delete window.grecaptcha
        })

        it('Not load Recaptcha into it', () => {
          ins.checkRecaptchaLoad()
          expect(() => {
            ins.assertLoaded()
          }).toThrow()
        })
      })

      describe('When Recaptcha loaded', () => {
        it('Load Recaptcha', () => {
          ins.checkRecaptchaLoad()

          expect(() => {
            ins.assertLoaded()
          }).not.toThrow()
        })
      })
    })

    describe('#wait', () => {
      describe('When recaptcha not loaded', () => {
        it('Return defered object', () => {
          const spy = jest.fn()
          // Since it return thenable, not Promise. Here must wrap it as Promise
          const promise = Promise.resolve(ins.wait()).then(spy)
          expect(spy).not.toHaveBeenCalled()
          ins.notify()
          return promise.then(() => {
            expect(spy).toHaveBeenCalled()
          })
        })
      })
    })

    describe('#notify', () => {
      it('Resolve the deferred', () => {
        ins.notify()
        return Promise.resolve(ins.wait())
      })
    })

    describe('#render', () => {
      it('Render ReCAPTCHA', () => {
        const ele = document.createElement('div')
        const sitekey = 'foo'

        ins.notify()

        return ins.render(ele, { sitekey }, widgetId => {
          expect(recaptchaMock.render).toBeCalled()
          expect(widgetId).toBe(WIDGET_ID)
        })
      })
    })

    describe('#reset', () => {
      describe('When pass widget id', () => {
        it('Reset ReCAPTCHA', () => {
          ins.reset(WIDGET_ID)

          expect(recaptchaMock.reset).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.reset()

          expect(recaptchaMock.reset).not.toBeCalled()
        })
      })

      beforeEach(() => {
        jest.resetAllMocks()
        ins.notify()
      })
    })

    describe('#execute', () => {
      describe('When pass widget id', () => {
        it('Execute ReCAPTCHA', () => {
          ins.execute(WIDGET_ID)

          expect(recaptchaMock.execute).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.execute()

          expect(recaptchaMock.execute).not.toBeCalled()
        })
      })

      beforeEach(() => {
        ins.notify()
      })
    })
  })

  describe('window.vueRecaptchaApiLoaded', () => {
    it('Load grecaptcha', () => {
      window.vueRecaptchaApiLoaded()
      expect(() => recaptcha.assertLoaded()).not.toThrow()
    })
  })
})
