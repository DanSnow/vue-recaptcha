const WIDGET_ID = 'widgetId';
const grecaptchaMock = {
  render: jest.fn(() => WIDGET_ID),
  reset: jest.fn()
};

export default {
  getRecaptcha: jest.fn(() => Promise.resolve(grecaptchaMock)),
  render: jest.fn(() => Promise.resolve(WIDGET_ID)),
  reset: jest.fn(),
  checkRecaptchaLoad: jest.fn(),
  assertRecaptchaLoad: jest.fn()
};
