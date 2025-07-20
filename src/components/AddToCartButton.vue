<script setup>
import IconAddToCartButton from './icons/IconAddToCart.vue'
import IconDecrementQuantity from './icons/IconDecrementQuantity.vue'
import IconIncrementQuantity from './icons/IconIncrementQuantity.vue'

import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
})

const itemIsInCart = computed(() => {
  return cart.isItemInCart(props.name)
})

const itemCountInCart = computed(() => {
  return cart.getItemCount(props.name)
})
</script>

<template>
  <div v-if="!itemIsInCart" class="add-to-cart-button__container">
    <button @click="cart.addItem(name, price, thumbnail)" class="add-to-cart-button" type="button">
      <IconAddToCartButton />
      <span class="text-preset4-bold">Add to Cart</span>
    </button>
  </div>
  <div v-else class="change-cart-quantity__container">
    <button
      @click="cart.decrementItemQuantity(name)"
      class="change-cart-quantity__button"
      type="button"
    >
      <span class="sr-only">Decrement item quantity</span>
      <div class="change-cart-quantity__button-icon">
        <IconDecrementQuantity />
      </div>
    </button>
    <span class="text-preset4-bold">{{ itemCountInCart }}</span>
    <button
      @click="cart.incrementItemQuantity(name)"
      class="change-cart-quantity__button"
      type="button"
    >
      <span class="sr-only">Increment item quantity</span>
      <div class="change-cart-quantity__button-icon">
        <IconIncrementQuantity />
      </div>
    </button>
  </div>
</template>

<style scoped>
.add-to-cart-button__container,
.change-cart-quantity__container {
  inline-size: var(--inline-size-add-to-cart-button-max);
  block-size: var(--block-size-add-to-cart-button);
}

.add-to-cart-button {
  inline-size: 100%;
  appearance: none;
  outline: none;
  border: 1px solid hsl(var(--color-rose-400));
  background: hsl(var(--color-white));
  color: hsl(var(--color-heading));
  cursor: pointer;
  border-radius: var(--br-900);
  padding: var(--space-150);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);
}

.change-cart-quantity__container {
  border-radius: var(--br-900);
  padding: var(--space-150);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: hsl(var(--color-accent));
  color: hsl(var(--color-background-accent));
}

.change-cart-quantity__button {
  background: transparent;
  color: inherit;
  cursor: pointer;
  outline: 0;
  border: 0;
  padding: var(--space-100);
}

.change-cart-quantity__button-icon {
  border: 1px solid hsl(var(--color-background-accent));
  border-radius: var(--br-900);
  aspect-ratio: 1 / 1;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.change-cart-quantity__button:hover,
.change-cart-quantity__button:focus-visible {
  color: hsl(var(--color-accent));
}

.change-cart-quantity__button:hover .change-cart-quantity__button-icon,
.change-cart-quantity__button:focus-visible .change-cart-quantity__button-icon {
  border: 1px solid hsl(var(--color-background-accent));
  background: hsl(var(--color-background-accent));
  color: hsl(var(--color-accent));
}

.change-cart-quantity__button:focus-visible .change-cart-quantity__button-icon {
  outline: 1px dashed hsl(var(--color-background-accent));
  outline-offset: 2px;
}

.add-to-cart-button svg {
  color: hsl(var(--color-accent));
}

.add-to-cart-button:hover,
.add-to-cart-button:focus-visible {
  border: 1px solid hsl(var(--color-accent));
  color: hsl(var(--color-accent));
}

.add-to-cart-button:focus-visible {
  outline: 2px dashed hsl(var(--color-accent));
  outline-offset: 2px;
}
</style>
