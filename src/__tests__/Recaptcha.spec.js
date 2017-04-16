import {mount} from 'avoriaz'
import Recaptcha from '../Recaptcha'
import recaptcha, {WIDGET_ID} from '../recaptcha-wrapper'

jest.mock('../recaptcha-wrapper')

const SITE_KEY = 'sitekey'
const createWrapper = propsData => {
  return mount(Recaptcha, {propsData})
}

describe('Recaptcha', () => {
  const wrapper = createWrapper({sitekey: SITE_KEY})

  it('Should render ReCAPTCHA', () => {
    expect(recaptcha.checkRecaptchaLoad).toBeCalled()
    expect(recaptcha.render.mock.calls[0][0]).toBe(
      wrapper.instance().$refs.container
    )
    expect(recaptcha.render.mock.calls[0][1]).toMatchSnapshot(
      'ReCAPTCHA options'
    )
  })

  it('Emit events', () => {
    const verify = jest.fn()
    const expired = jest.fn()
    wrapper.instance().$on('verify', verify)
    wrapper.instance().$on('expired', expired)

    expect(verify).not.toBeCalled()
    wrapper.instance().emitVerify()
    expect(verify).toBeCalled()

    expect(expired).not.toBeCalled()
    wrapper.instance().emitExpired()
    expect(expired).toBeCalled()

    wrapper.instance().$off()
  })

  it('Can reset/execute', () => {
    expect(recaptcha.reset).not.toBeCalled()
    wrapper.instance().reset()
    expect(recaptcha.reset).toBeCalledWith(WIDGET_ID)

    expect(recaptcha.execute).not.toBeCalled()
    wrapper.instance().execute()
    expect(recaptcha.execute).toBeCalledWith(WIDGET_ID)
  })
})
