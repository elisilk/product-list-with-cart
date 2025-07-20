<script setup>
import ProductItem from './ProductItem.vue'

defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="product-list__container">
    <h2 class="product-list__heading text-preset1">Desserts</h2>
    <div class="product-list">
      <ProductItem v-for="(item, index) in data" :item="item" :index="index" :key="item.name" />
    </div>
  </div>
</template>

<style scoped>
.product-list {
  --inline-size-item-max: 210px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--inline-size-item-max), 1fr));

  column-gap: var(--gap-product-list-column);
  row-gap: var(--gap-product-list-row);
}

.product-list__heading {
  color: hsl(var(--color-heading));
  margin-block-end: var(--space-400);
}
</style>
