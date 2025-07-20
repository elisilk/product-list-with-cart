<script setup>
import ProductImage from './ProductImage.vue'
import AddToCartButton from './AddToCartButton.vue'

import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: Number,
})

const cart = useCartStore()

const itemIsInCart = computed(() => {
  return cart.isItemInCart(props.item.name)
})
</script>

<template>
  <div
    :class="['product-item', { 'in-cart': itemIsInCart }]"
    :id="['product-item-' + index]"
    :data-index="index"
  >
    <div class="product-item__header">
      <ProductImage :images="item.image" :alt="item.name" />
      <AddToCartButton :name="item.name" :price="item.price" />
    </div>
    <div class="product-item__main">
      <span class="product-item__category text-preset4">{{ item.category }}</span>
      <span class="product-item__name text-preset3">{{ item.name }}</span>
      <span class="product-item__price text-preset3">{{
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.price)
      }}</span>
    </div>
  </div>
</template>

<style scoped>
.product-item {
  list-style: none;
  display: grid;
  gap: calc(var(--space-200) + var(--block-size-add-to-cart-button) / 2);
}

.product-item__header {
  display: grid;
  grid-template-areas: 'stack';
  align-items: end;
  justify-items: center;
}

.product-item__header > * {
  grid-area: stack;
}

.product-item__main {
  display: grid;
}

.product-item__header > :last-child {
  transform: translateY(50%);
}

.product-item__name {
  color: hsl(var(--color-heading));
}

.product-item__price {
  color: hsl(var(--color-accent));
}
</style>
