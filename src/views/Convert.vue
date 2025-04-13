<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCurrency } from '../composables/useCurrency';
import { convertCurrency, CURRENCY_SYMBOLS } from '../services/currencyService';
import CurrencyDropdown from '../components/CurrencyDropdown/CurrencyDropdown.vue';
import CurrencyInput from '../components/CurrencyInput/CurrencyInput.vue';
import { ArrowLeftRight } from 'lucide-vue-next';

const { rates, isLoading, baseCurrency } = useCurrency();

const fromCurrency = ref(baseCurrency.value);
const toCurrency = ref('EUR');

const amount = ref(1);

const convertedAmount = computed(() => {
  const result = convertCurrency(
    amount.value,
    fromCurrency.value,
    toCurrency.value,
    rates.value
  );
  return result.toFixed(2);
});

const getExchangeRate = () => {
  const rate = convertCurrency(1, fromCurrency.value, toCurrency.value, rates.value);
  return rate.toFixed(4);
};

watch(
  () => baseCurrency.value,
  (newVal, oldVal) => {
    if (fromCurrency.value === oldVal) {
      fromCurrency.value = newVal;
    }
  }
);

const setFromCurrency = (currency: string) => {
  fromCurrency.value = currency;
};

const setToCurrency = (currency: string) => {
  toCurrency.value = currency;
};

const swapCurrencies = () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
};
</script>

<template>
  <div class="container py-8 px-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Currency Converter</h1>
    
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div v-if="isLoading" class="flex justify-center my-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-currency-purple"></div>
      </div>
      
      <div v-else class="space-y-6">
        <CurrencyInput
          id="amount-from"
          label="Amount"
          :currency="fromCurrency"
          v-model="amount"
        />
        
        <div class="flex items-center justify-between">
          <div class="w-[45%]">
            <label class="text-sm font-medium text-gray-700 mb-1 block">From</label>
            <CurrencyDropdown 
              :value="fromCurrency" 
              @change="setFromCurrency" 
            />
          </div>
          
          <button
            @click="swapCurrencies"
            class="bg-currency-light p-2 rounded-full hover:bg-currency-purple hover:text-white transition-colors"
            aria-label="Swap currencies"
          >
            <ArrowLeftRight class="h-5 w-5" />
          </button>
          
          <div class="w-[45%]">
            <label class="text-sm font-medium text-gray-700 mb-1 block">To</label>
            <CurrencyDropdown 
              :value="toCurrency" 
              @change="setToCurrency" 
            />
          </div>
        </div>
        
        <div class="bg-currency-light p-4 rounded-lg">
          <div class="text-sm text-gray-600 mb-1">Converted Amount</div>
          <div class="text-2xl font-bold">
            {{ CURRENCY_SYMBOLS[toCurrency] }}{{ convertedAmount }}
          </div>
          <div class="text-sm text-gray-500 mt-2">
            1 {{ fromCurrency }} = {{ CURRENCY_SYMBOLS[toCurrency] }}{{ getExchangeRate() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>