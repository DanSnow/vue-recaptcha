import VueRecaptcha from '../../src'
import { mount } from '@vue/test-utils'

const WIDGET_ID = 'widgetId'

function createMock () {
  return {
    render: jest.fn(function (ele, options) {
      // Save the callback
      this._verify = options.callback
      this._expire = options['expired-callback']
      return WIDGET_ID
    }),
    execute: jest.fn(function () {
      this._verify()
    }),
    reset: jest.fn()
  }
}

describe('Example spec', () => {
  let wrapper
  let verify
  let expired
  beforeEach(() => {
    window.grecaptcha = createMock()
    verify = jest.fn()
    expired = jest.fn()
    wrapper = mount(VueRecaptcha, {
      propsData: { sitekey: 'sitekey' }
    })
    wrapper.vm.$on('verify', verify)
    wrapper.vm.$on('expired', expired)
  })

  it('Should render recaptcha', () => {
    expect(window.grecaptcha.render).toBeCalled()
    expect(wrapper.vm.$widgetId).toBe(WIDGET_ID)
  })

  it('Should call execute', () => {
    wrapper.vm.execute()
    expect(window.grecaptcha.execute).toBeCalledWith(WIDGET_ID)
  })

  it('Should call reset', () => {
    wrapper.vm.reset()
    expect(window.grecaptcha.reset).toBeCalledWith(WIDGET_ID)
  })

  it('Should emit verify', () => {
    window.grecaptcha._verify()
    expect(verify).toBeCalled()
  })

  it('Should emit expired', () => {
    window.grecaptcha._expire()
    expect(expired).toBeCalled()
  })
})
