<template>
  <div class="currency-converter">
    <h1>Currency Converter</h1>

    <div>
      <label for="amount">Amount:</label>
      <input type="number" v-model="amount" @input="convertCurrency" placeholder="Enter amount" />
    </div>

    <div>
      <label for="fromCurrency">From:</label>
      <select v-model="fromCurrency" @change="fetchRates">
        <option v-for="currency in currencyList" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <div>
      <label for="toCurrency">To:</label>
      <select v-model="toCurrency" @change="convertCurrency">
        <option v-for="currency in currencyList" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <div>
      <p>Result: {{ convertedAmount ? convertedAmount.toFixed(2) : '---' }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      convertedAmount: null,
      currencyList: ['USD', 'EUR', 'GBP', 'JPY', 'RUB', 'AED'],
      rates: {}
    }
  },
  created() {
    this.fetchRates()
    this.setDefaultCurrency()
  },
  methods: {
    async fetchRates() {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`
        )
        this.rates = response.data.rates
        this.convertCurrency()
      } catch (error) {
        console.error('Error fetching rates:', error)
      }
    },

    convertCurrency() {
      if (this.amount && this.rates[this.toCurrency]) {
        this.convertedAmount = this.amount * this.rates[this.toCurrency]
      }
    },

    setDefaultCurrency() {
      const locale = navigator.language || 'en-US'
      const defaultCurrency = locale.includes('en') ? 'USD' : locale.includes('ru') ? 'RUB' : 'EUR'
      this.fromCurrency = defaultCurrency
      this.fetchRates()
    }
  }
}
</script>

<style scoped>
.currency-converter {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

p {
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  color: #333;
}

@media (max-width: 500px) {
  .currency-converter {
    max-width: 90%;
    padding: 15px;
  }

  h1 {
    font-size: 20px;
  }

  input,
  select {
    font-size: 14px;
    padding: 8px;
  }

  button {
    font-size: 14px;
  }

  p {
    font-size: 16px;
  }
}
</style>
