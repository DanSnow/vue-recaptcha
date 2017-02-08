import Vue from 'vue'
import Recaptcha from '../Recaptcha'
import recaptcha from '../recaptcha-wrapper'

jest.mock('../recaptcha-wrapper')

const SITE_KEY = 'sitekey'
const createVm = (propsData) => {
  return new Vue({
    propsData,
    ...Recaptcha
  }).$mount()
}

describe('Recaptcha', () => {
  it('Should render ReCAPTCHA', () => {
    const vm = createVm({ sitekey: SITE_KEY })
    expect(recaptcha.checkRecaptchaLoad).toBeCalled()
    expect(recaptcha.render.mock.calls[0][0]).toBe(vm.$refs.container)
    expect(recaptcha.render.mock.calls[0][1]).toBe(SITE_KEY)
  })
})
