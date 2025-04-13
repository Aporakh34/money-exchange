<template>
  <div class="container py-8 px-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Easy Currency Converter</h1>
    
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Current Base Currency: {{ baseCurrency }}</h2>
        <p class="text-gray-600">
          All rates are shown relative to {{ baseCurrency }}
        </p>
      </div>
      
      <div v-if="isLoading" class="flex justify-center my-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-currency-purple"></div>
      </div>
      
      <div v-else class="grid gap-4">
        <div 
          v-for="currency in currencies" 
          :key="currency"
          class="flex justify-between items-center p-4 border rounded-md hover:bg-currency-light transition-colors"
        >
          <div class="flex items-center gap-2">
            <span class="text-2xl">{{ CURRENCY_SYMBOLS[currency] }}</span>
            <div>
              <div class="font-medium">{{ currency }}</div>
              <div class="text-sm text-gray-500">{{ CURRENCY_NAMES[currency] }}</div>
            </div>
          </div>
          <div class="text-lg font-bold">
            {{ formatRate(rates[currency]) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCurrency } from '../composables/useCurrency';
import { CURRENCY_SYMBOLS, CURRENCY_NAMES, SUPPORTED_CURRENCIES } from '../services/currencyService';

const { baseCurrency, rates, isLoading } = useCurrency();

const currencies = computed(() => 
  SUPPORTED_CURRENCIES.filter(curr => curr !== baseCurrency.value)
);

const formatRate = (rate: number) => {
  if (!rate) return 'N/A';
  return rate.toFixed(4);
};
</script>