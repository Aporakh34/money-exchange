<template>
  <div class="relative">
    <select
      :value="value"
      @change="onChange($event)"
      class="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-currency-purple focus:border-transparent"
    >
      <option
        v-for="currency in SUPPORTED_CURRENCIES"
        :key="currency"
        :value="currency"
      >
        {{ CURRENCY_SYMBOLS[currency] }} {{ currency }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {
  SUPPORTED_CURRENCIES,
  CURRENCY_SYMBOLS,
  CURRENCY_NAMES,
} from "../../services/currencyService";

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("change", target.value);
};
</script>
