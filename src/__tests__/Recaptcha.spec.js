import recaptcha, { WIDGET_ID } from '../recaptcha-wrapper'
import { isVue2 } from 'vue-demi'

import Recaptcha from '../Recaptcha'

const mount = isVue2 ? require('@vue/test-utils2').mount : require('@vue/test-utils').mount

jest.mock('../recaptcha-wrapper')

const SITE_KEY = 'sitekey'
const createWrapper = (props) => {
  return mount(Recaptcha, isVue2 ? { propsData: props } : { props })
}

describe('Recaptcha', () => {
  const wrapper = createWrapper({ sitekey: SITE_KEY })

  it('Should render ReCAPTCHA', () => {
    expect(recaptcha.checkRecaptchaLoad).toBeCalled()
    expect(recaptcha.render.mock.calls[0][0]).toBe(wrapper.vm.root)
    expect(recaptcha.render.mock.calls[0][1]).toMatchObject({
      sitekey: 'sitekey',
      callback: expect.any(Function),
      'error-callback': expect.any(Function),
      'expired-callback': expect.any(Function),
    })
  })

  it('Expose widgetId', () => {
    expect(Object.prototype.hasOwnProperty.call(wrapper.vm, 'widgetId')).toBe(true)
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
