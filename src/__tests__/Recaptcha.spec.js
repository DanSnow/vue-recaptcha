import {mount} from 'avoriaz'
import Recaptcha from '../Recaptcha'
import recaptcha from '../recaptcha-wrapper'

jest.mock('../recaptcha-wrapper')

const SITE_KEY = 'sitekey'
const createWrapper = (propsData) => {
  return mount(Recaptcha, {propsData})
}

describe('Recaptcha', () => {
  it('Should render ReCAPTCHA', () => {
    const wrapper = createWrapper({ sitekey: SITE_KEY })
    expect(recaptcha.checkRecaptchaLoad).toBeCalled()
    expect(recaptcha.render.mock.calls[0][0]).toBe(wrapper.instance().$refs.container)
    expect(recaptcha.render.mock.calls[0][1]).toMatchSnapshot('ReCAPTCHA options')
  })
})
