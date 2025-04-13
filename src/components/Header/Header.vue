<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm"
  >
    <div
      class="flex h-16 items-center justify-between px-4 sm:px-8 flex items-center justify-space-between w-full"
    >
      <div class="flex items-center gap-6">
        <router-link to="/" class="font-semibold text-xl text-currency-purple">
          Easy Currency
        </router-link>
        <nav class="hidden md:flex items-center gap-6">
          <router-link
            to="/"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="{
              'text-foreground': $route.path === '/',
              'text-muted-foreground': $route.path !== '/',
            }"
          >
            Home
          </router-link>
          <router-link
            to="/convert"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="{
              'text-foreground': $route.path === '/convert',
              'text-muted-foreground': $route.path !== '/convert',
            }"
          >
            Convert
          </router-link>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-32">
          <CurrencyDropdown
            :value="currency.baseCurrency.value"
            @change="currency.setBaseCurrency"
          />
        </div>
        <button
          class="rounded-md p-2 hover:bg-currency-light disabled:opacity-50"
          @click="currency.refreshRates"
          :disabled="currency.isLoading.value"
        >
          <RefreshCw
            class="h-4 w-4"
            :class="{
              'animate-spin text-currency-purple': currency.isLoading.value,
            }"
          />
          <span class="sr-only">Refresh rates</span>
        </button>
      </div>
    </div>

    <!-- Mobile navigation -->
    <div class="md:hidden border-t border-gray-100">
      <div class="container flex justify-between px-4 py-2">
        <router-link
          to="/"
          class="text-sm font-medium transition-colors hover:text-primary flex-1 text-center py-2"
          :class="{
            'text-foreground border-b-2 border-currency-purple':
              $route.path === '/',
            'text-muted-foreground': $route.path !== '/',
          }"
        >
          Home
        </router-link>
        <router-link
          to="/convert"
          class="text-sm font-medium transition-colors hover:text-primary flex-1 text-center py-2"
          :class="{
            'text-foreground border-b-2 border-currency-purple':
              $route.path === '/convert',
            'text-muted-foreground': $route.path !== '/convert',
          }"
        >
          Convert
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCurrency } from "../../composables/useCurrency";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown.vue";
import { RefreshCw } from "lucide-vue-next";

const currency = useCurrency();
</script>
