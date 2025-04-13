<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-500">{{ symbol }}</span>
      </div>
      <input
        :id="id"
        type="number"
        v-model="inputValue"
        class="pl-8 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-currency-purple focus:border-transparent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { CURRENCY_SYMBOLS } from '../../services/currencyService';

const props = defineProps<{
  modelValue: number;
  currency: string;
  label: string;
  id: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const inputValue = computed({
  get() {
    return props.modelValue === 0 ? '' : props.modelValue.toString();
  },
  set(val: string) {
    const num = parseFloat(val);
    emit('update:modelValue', isNaN(num) ? 0 : num);
  }
});

const symbol = computed(() => CURRENCY_SYMBOLS[props.currency] || '');
</script>