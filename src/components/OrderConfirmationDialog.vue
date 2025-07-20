<script setup>
import { useTemplateRef } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { isEmpty, getTotalItemCount, getTotalPrice } = storeToRefs(cart)

const dialogRef = useTemplateRef('order-confirmation-dialog')

const showDialog = () => dialogRef.value?.showModal()
const closeDialog = () => {
  dialogRef.value?.close()
  cart.$reset()
  console.log('starting new order:', cart.status)
}

defineExpose({
  show: showDialog,
  close: closeDialog,
})

function getImageUrl(url) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

cart.$subscribe((mutation, state) => {
  if (cart.status === 'confirmed') showDialog()
})
</script>

<template>
  <dialog ref="order-confirmation-dialog" class="order-confirmation-dialog" closedby="none">
    <div class="order-confirmation-dialog__inner">
      <div class="order-confirmation__header">
        <img
          class="order-confirmed-icon"
          :src="getImageUrl('icon-order-confirmed.svg')"
          width="48"
          height="48"
          alt=""
        />
        <h2 class="order-confirmation-dialog__heading text-preset1">Order Confirmed</h2>
        <p class="order-confirmation-dialog__text text-preset3">We hope you enjoy your food!</p>
      </div>
      <div class="order-confirmation__main">
        <div class="order-confirmation__items">
          <ul>
            <li class="order-confirmation__item" v-for="item in cart.items" :key="item.name">
              <div class="item__thumbnail">img</div>
              <div class="item__name text-preset4-bold">{{ item.name }}</div>
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
            </li>
          </ul>
        </div>
        <div class="order-confirmation__total">
          <span class="order-confirmation__total-label text-preset4">Order Total</span>
          <span class="order-confirmation__total-amount text-preset2">
            {{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(getTotalPrice)
            }}</span
          >
        </div>
      </div>
      <div class="order-confirmation__footer">
        <button
          class="order-confirmation-dialog__start-new-button"
          @click="closeDialog"
          type="button"
        >
          Start New Order
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.order-confirmation-dialog {
  background-color: hsl(var(--color-background-accent));
  padding: var(--space-300);
  border-radius: var(--br-300);
  border: 0;

  --dialog-inline-size-max: 592px;
  --dialog-gutter: 0px;
  inline-size: min(var(--dialog-inline-size-max), 100% - 2 * var(--dialog-gutter));
  margin-inline: auto;
}

@media (min-width: 24rem) {
  .order-confirmation-dialog {
    --dialog-gutter: var(--space-200);
  }
}

.order-confirmation-dialog__inner {
  display: grid;
  gap: var(--space-400);
}

.order-confirmation-dialog::backdrop {
  background-color: hsl(var(--color-black) / 50%);
}

.order-confirmation-dialog__heading {
  color: hsl(var(--color-heading));
}

.order-confirmation-dialog__text {
  color: hsl(var(--color-primary));
  font-weight: var(--fw-regular);
}

.order-confirmation-dialog__start-new-button {
  inline-size: 100%;
  block-size: 53px;
  border-radius: var(--br-900);
  background-color: hsl(var(--color-accent));
  color: hsl(var(--color-background-accent));
  border: none;
}

.order-confirmation-dialog__start-new-button:hover,
.order-confirmation-dialog__start-new-button:focus-visible {
  background-color: hsl(var(--color-red-900));
}

.order-confirmation-dialog__start-new-button:focus-visible {
  outline: 2px dashed hsl(var(--color-red-900));
  outline-offset: 2px;
}

.order-confirmation__main {
  padding: var(--space-300);
  border-radius: var(--br-200);
  background-color: hsl(var(--color-background-primary));
}

.order-confirmation__items > ul {
  padding: 0;
}

.order-confirmation__item {
  list-style: none;
  padding-block-end: var(--space-200);
  border-block-end: 1px solid hsl(var(--color-divider));
  margin-block-end: var(--space-200);

  display: grid;
  grid-template-areas:
    'thumb name name total'
    'thumb quantity unit total';
  gap: var(--space-100);
  grid-template-columns: 56px 21px auto auto;
}

.order-confirmation__item:last-child {
  padding-block-end: 0;
  border-block-end: none;
  margin-block-end: 0;
}

.item__thumbnail {
  grid-area: thumb;
  inline-size: 48px;
  block-size: 48px;
  border-radius: var(--br-100);
  background-color: hsl(var(--color-accent));
  color: hsl(var(--color-background-accent));
  display: flex;
  align-items: center;
  justify-content: center;
}

.item__name {
  grid-area: name;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: hsl(var(--color-heading));
}

.item__quantity {
  grid-area: quantity;
  color: hsl(var(--color-accent));
}

.item__unit-price {
  grid-area: unit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: hsl(var(--color-primary));
}

.item__total-price {
  grid-area: total;
  align-self: center;
  justify-self: end;
  color: hsl(var(--color-heading));
}

.order-confirmation__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-block-start: 1px solid hsl(var(--color-divider));
  padding-block-start: var(--space-300);
  margin-block-start: var(--space-300);
  color: hsl(var(--color-heading));
}
</style>
