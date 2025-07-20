<script setup>
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import IconRemoveItem from './icons/IconRemoveItem.vue'

const cart = useCartStore()
const { isEmpty, getTotalItemCount, getTotalPrice } = storeToRefs(cart)

function getImageUrl(url) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

function confirmOrder() {
  cart.status = 'confirmed'
  console.log('confirming order:', cart.status)
}
</script>

<template>
  <div class="cart">
    <h2 class="cart__heading text-preset2">Your Cart ({{ getTotalItemCount }})</h2>
    <div class="cart__content">
      <div v-if="isEmpty" class="cart__empty">
        <img src="../assets/images/illustration-empty-cart.svg" alt="Empty cart illustration" />
        <p class="text-preset4-bold">Your added items will appear here</p>
      </div>
      <div v-else class="cart__with-items">
        <div class="cart__items">
          <ul>
            <li class="cart__item" v-for="item in cart.items" :key="item.name">
              <div>
                <div class="item__name text-preset4-bold">{{ item.name }}</div>
                <div class="item__values">
                  <span class="item__quantity text-preset4-bold">{{ item.quantity }}x</span>
                  <span class="item__unit-price text-preset4"
                    >@
                    {{
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(item.price)
                    }}</span
                  >
                  <span class="item__total-price text-preset4-bold">{{
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.quantity * item.price)
                  }}</span>
                </div>
              </div>
              <button @click="cart.removeItem(item.name)" class="item__remove-button" type="button">
                <span class="sr-only">Remove item</span>
                <div class="item__remove-button-icon">
                  <IconRemoveItem />
                </div>
              </button>
            </li>
          </ul>
        </div>
        <div class="cart__order-total">
          <span class="cart__order-total-label text-preset4">Order Total</span>
          <span class="cart__order-total-amount text-preset2">
            {{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(getTotalPrice)
            }}</span
          >
        </div>
        <div class="cart__carbon-neutral">
          <img
            class="cart__carbon-neutral-icon"
            :src="getImageUrl('icon-carbon-neutral.svg')"
            width="20"
            height="20"
            alt=""
          />
          <p class="text-preset4">This is a <strong>carbon-neutral</strong> delivery</p>
        </div>
        <div class="cart__confirm-order">
          <button
            @click="confirmOrder"
            class="cart__confirm-order-button text-preset3"
            type="button"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  background: hsl(var(--color-background-accent));
  align-self: start;
  border-radius: var(--br-300);
  padding: var(--space-300);
}

.cart__heading {
  color: hsl(var(--color-accent));
  margin-block-end: var(--space-300);
}

.cart__empty {
  display: grid;
  justify-items: center;
  gap: var(--space-200);
  padding-block: var(--space-200);
}

.cart__items > ul {
  padding: 0;
  padding-block-end: var(--space-300);
}

.cart__item {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block-end: var(--space-200);
  border-block-end: 1px solid hsl(var(--color-divider));
  margin-block-end: var(--space-200);
}

.cart__item:last-child {
  padding-block-end: 0;
  border-block-end: none;
  margin-block-end: 0;
}

.item__values {
  display: flex;
  gap: var(--space-100);
}

.item__name {
  color: hsl(var(--color-heading));
  margin-block-end: var(--space-100);
}

.item__quantity {
  color: hsl(var(--color-accent));
}

.item__remove-button {
  background: transparent;
  color: hsl(var(--color-rose-400));
  cursor: pointer;
  outline: 0;
  border: 0;
  padding: var(--space-100);
  margin-inline-end: calc(-1 * var(--space-100));
}

.item__remove-button-icon {
  border: 1px solid hsl(var(--color-rose-400));
  border-radius: var(--br-900);
  aspect-ratio: 1 / 1;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item__remove-button:hover,
.item__remove-button:focus-visible {
  color: hsl(var(--color-rose-900));
}

.item__remove-button:hover .item__remove-button-icon,
.item__remove-button:focus-visible .item__remove-button-icon {
  border: 1px solid hsl(var(--color-rose-900));
}

.item__remove-button:focus-visible .item__remove-button-icon {
  outline: 1px dashed hsl(var(--color-rose-900));
  outline-offset: 2px;
}

.cart__order-total {
  display: flex;
  justify-content: space-between;
  padding-block: var(--space-300);
  border-block-start: 1px solid hsl(var(--color-divider));
  color: hsl(var(--color-heading));
}

.cart__carbon-neutral {
  color: hsl(var(--color-heading));
  background-color: hsl(var(--color-background-primary));
  padding: var(--space-200);
  margin-block-end: var(--space-300);
  border-radius: var(--br-200);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);
}

.cart__confirm-order-button {
  inline-size: 100%;
  block-size: 53px;
  border-radius: var(--br-900);
  background-color: hsl(var(--color-accent));
  color: hsl(var(--color-background-accent));
  border: none;
}

.cart__confirm-order-button:hover,
.cart__confirm-order-button:focus-visible {
  background-color: hsl(var(--color-red-900));
}

.cart__confirm-order-button:focus-visible {
  outline: 2px dashed hsl(var(--color-red-900));
  outline-offset: 2px;
}
</style>
