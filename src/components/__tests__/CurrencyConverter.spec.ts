import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CurrencyConverter from '../CurrencyConverter.vue'
import axios from 'axios'

vi.mock('axios')

describe('CurrencyConverter.vue', () => {
  it('displays the correct conversion result', async () => {
    axios.get.mockResolvedValue({
      data: {
        rates: { EUR: 0.85, USD: 1, GBP: 0.75 }
      }
    })

    const wrapper = mount(CurrencyConverter)

    await wrapper.setData({ amount: 100 })
    await wrapper.setData({ fromCurrency: 'USD', toCurrency: 'EUR' })

    await wrapper.vm.convertCurrency()

    expect(wrapper.find('p').text()).toBe('Result: 85.00')
  })
})
