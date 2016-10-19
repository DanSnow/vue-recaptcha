import { createRecaptcha } from '../recaptcha';

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

    describe('#setRecaptcha', () => {
      it('Set recaptcha', () => {
        ins.setRecaptcha(recaptchaMock);
        return ins.getRecaptcha((recap) => {
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

        return ins.render(ele, key).then((widgetId) => {
          expect(recaptchaMock.render).toBeCalled();
          expect(widgetId).toBe(WIDGET_ID);
        });
      });
    });

    describe('#reset', () => {
      it('Reset ReCAPTCHA', () => {
        ins.setRecaptcha(recaptchaMock);

        ins.reset(WIDGET_ID);

        expect(recaptchaMock.reset).toBeCalled();
      });
    });
  });
});
