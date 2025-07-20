<script setup>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import OrderConfirmationDialog from './components/OrderConfirmationDialog.vue'
import data from './assets/data.json'

import { onMounted, ref } from 'vue'

const dialogTarget = ref(null)

/* For testing purposes only
onMounted(() => console.log(dialogTarget.value)) */
</script>

<template>
  <div class="app__container">
    <header class="app__header">
      <h1 class="sr-only">Product List with Cart</h1>
    </header>
    <main class="app__main with-sidebar">
      <ProductList :data="data" />
      <Cart />
    </main>
  </div>
  <OrderConfirmationDialog ref="dialogTarget" />
</template>

<style scoped>
.app__container {
  margin-block: var(--block-size-app-padding);
  margin-inline: auto;
  inline-size: min(100% - 2 * var(--inline-size-app-gutter), var(--inline-size-app-max));
}

.app__main {
  --sidebar-gap: var(--gap-product-list-to-cart);
  --sidebar-main-inline-size-min: var(--inline-size-product-list-min);
  --sidebar-side-inline-size: var(--inline-size-cart);
}
</style>
