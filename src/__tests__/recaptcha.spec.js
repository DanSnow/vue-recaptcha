import recaptcha, { createRecaptcha } from '../recaptcha';

const WIDGET_ID = 'widgetId';
const recaptchaMock = {
  render: jest.fn(() => WIDGET_ID),
  reset: jest.fn()
};

describe('recaptcha', () => {
  describe('#createRecaptcha', () => {
    let ins;

    beforeEach(() => {
      ins = createRecaptcha();
    });

    describe('#assertRecaptchaLoad', () => {
      describe('When Recaptcha not loaded', () => {
        it('Throw', () => {
          expect(() => {
            ins.assertRecaptchaLoad();
          }).toThrow();
        });
      });

      describe('When Recaptcha loaded', () => {
        it('Not throw', () => {
          ins.setRecaptcha(recaptchaMock);
          expect(() => {
            ins.assertRecaptchaLoad();
          }).not.toThrow();
        });
      });
    });

    describe('#checkRecaptchaLoad', () => {
      describe('When Recaptcha not loaded', () => {
        it('Not load Recaptcha into it', () => {
          ins.checkRecaptchaLoad();
          expect(() => {
            ins.assertRecaptchaLoad();
          }).toThrow();
        });
      });

      describe('When Recaptcha loaded', () => {
        beforeEach(() => {
          window.grecaptcha = recaptchaMock;
        });
        afterEach(() => delete window.grecaptcha);

        it('Load Recaptcha', () => {
          ins.checkRecaptchaLoad();

          expect(() => {
            ins.assertRecaptchaLoad();
          }).not.toThrow();
        });
      });
    });

    describe('#getRecaptcha', () => {
      describe('Recaptcha not loaded', () => {
        it('Return defered object', () => {
          const spy = jest.fn();
          // Since it return thenable, not Promise. Here must wrap it as Promise
          const promise = Promise.resolve(ins.getRecaptcha()).then(spy);
          expect(spy).not.toHaveBeenCalled();
          ins.setRecaptcha(recaptchaMock);
          return promise.then(() => {
            expect(spy).toHaveBeenCalled();
          });
        });
      });
    });

    describe('#setRecaptcha', () => {
      it('Set recaptcha', () => {
        ins.setRecaptcha(recaptchaMock);
        return Promise.resolve(ins.getRecaptcha()).then((recap) => {
          expect(recap).toBe(recaptchaMock);
        });
      });
    });

    describe('#assertRecaptchaLoad', () => {
      describe('When ReCAPTCHA not loaded', () => {
        it('Throw error', () => {
          expect(() => {
            ins.assertRecaptchaLoad();
          }).toThrow();
        });
      });

      describe('When ReCAPTCHA loaded', () => {
        it('Not throw error', () => {
          ins.setRecaptcha(recaptchaMock);

          expect(() => {
            ins.assertRecaptchaLoad();
          }).not.toThrow();
        });
      });
    });

    describe('#render', () => {
      it('Render ReCAPTCHA', () => {
        const ele = document.createElement('div');
        const key = 'foo';

        ins.setRecaptcha(recaptchaMock);

        return ins.render(ele, key, {}, (widgetId) => {
          expect(recaptchaMock.render).toBeCalled();
          expect(widgetId).toBe(WIDGET_ID);
        });
      });
    });

    describe('#reset', () => {
      describe('When pass widget id', () => {
        it('Reset ReCAPTCHA', () => {
          jest.resetAllMocks();
          ins.setRecaptcha(recaptchaMock);

          ins.reset(WIDGET_ID);

          expect(recaptchaMock.reset).toBeCalled();
        });
      });

      describe('When pass widget id', () => {
        it('Reset ReCAPTCHA', () => {
          jest.resetAllMocks();
          ins.setRecaptcha(recaptchaMock);

          ins.reset();

          expect(recaptchaMock.reset).not.toBeCalled();
        });
      });
    });
  });

  describe('window.vueRecaptchaApiLoaded', () => {
    beforeEach(() => {
      window.grecaptcha = recaptchaMock;
    });
    afterEach(() => delete window.grecaptcha);

    it('Load grecaptcha', () => {
      window.vueRecaptchaApiLoaded();
      expect(() => recaptcha.assertRecaptchaLoad()).not.toThrow();
    });
  });
});
