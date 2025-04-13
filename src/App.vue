<template>
  <CurrencyContext>
    <div class="flex flex-col min-h-screen">
      <Header />
      <main class="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <router-view></router-view>
      </main>
    </div>
  </CurrencyContext>
</template>

<script setup lang="ts">
import CurrencyContext from "./components/CurrencyContext/CurrencyContext.vue";
import Header from "./components/Header/Header.vue";
</script>
