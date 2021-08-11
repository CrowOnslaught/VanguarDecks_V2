import { mount } from '@vue/test-utils'
import Cards from '@/views/Cards.vue'

describe('Cards.vue', () => {
  it('renders tab 1 view', () => {
    const wrapper = mount(Cards)
    expect(wrapper.text()).toMatch('Cards page')
  })
})
