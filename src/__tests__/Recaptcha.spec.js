import recaptcha, { WIDGET_ID } from '../recaptcha-wrapper'

import Recaptcha from '../Recaptcha'
import { mount } from '@vue/test-utils'

jest.mock('../recaptcha-wrapper')

const SITE_KEY = 'sitekey'
const createWrapper = (props) => {
  return mount(Recaptcha, { props })
}

describe('Recaptcha', () => {
  const wrapper = createWrapper({ sitekey: SITE_KEY })

  it('Should render ReCAPTCHA', () => {
    expect(recaptcha.checkRecaptchaLoad).toBeCalled()
    expect(recaptcha.render.mock.calls[0][0]).toBe(wrapper.vm.$el)
    expect(recaptcha.render.mock.calls[0][1]).toMatchSnapshot('ReCAPTCHA options')
  })

  // it('Emit events', () => {
  //   expect(wrapper.emitted()).not.toHaveProperty('verify')
  //   wrapper.vm.emitVerify()
  //   expect(wrapper.emitted().verify).toBeTruthy()

  //   expect(wrapper.emitted()).not.toHaveProperty('expired')
  //   wrapper.vm.emitExpired()
  //   expect(wrapper.emitted().expired).toBeTruthy()
  // })

  it('Can reset/execute', () => {
    expect(recaptcha.reset).not.toBeCalled()
    wrapper.vm.reset()
    expect(recaptcha.reset).toBeCalledWith(WIDGET_ID)

    expect(recaptcha.execute).not.toBeCalled()
    wrapper.vm.execute()
    expect(recaptcha.execute).toBeCalledWith(WIDGET_ID)
  })

  it('will load recaptcha script when `loadRecaptchaScript` set to `true`', () => {
    const id = 'RECAPTCHA_SCRIPT_ID'
    createWrapper({
      sitekey: SITE_KEY,
      loadRecaptchaScript: true,
      recaptchaScriptId: id,
    })
    expect(document.getElementById(id)).not.toBe(null)
  })
})
