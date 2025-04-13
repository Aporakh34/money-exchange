<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide } from 'vue';
import { fetchCurrencyRates, SUPPORTED_CURRENCIES, type CurrencyRates } from '../../services/currencyService';

const baseCurrency = ref(localStorage.getItem("baseCurrency") || 'USD');
const rates = ref<CurrencyRates>({});
const isLoading = ref(true);
const error = ref<string | null>(null);

const refreshRates = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    rates.value = await fetchCurrencyRates(baseCurrency.value);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch rates";
    error.value = errorMessage;
    console.error('Error loading rates:', errorMessage);
  } finally {
    isLoading.value = false;
  }
};

const setBaseCurrency = (currency: string) => {
  if (SUPPORTED_CURRENCIES.includes(currency)) {
    baseCurrency.value = currency;
    localStorage.setItem("baseCurrency", currency);
    refreshRates();
  }
};

onMounted(refreshRates);

provide('currency', {
  baseCurrency,
  rates,
  isLoading,
  error,
  setBaseCurrency,
  refreshRates
});
</script>