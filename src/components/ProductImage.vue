<script setup>
defineProps({
  images: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
})

function getImageUrl(url) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
</script>

<template>
  <picture>
    <source :srcset="getImageUrl(images.desktop)" media="(width >= 900px)" />
    <source :srcset="getImageUrl(images.tablet)" media="(width >= 600px)" />
    <img
      class="product-item__image"
      :src="getImageUrl(images.mobile)"
      width=""
      height=""
      :alt="alt"
    />
  </picture>
</template>

<style scoped>
.product-item__image {
  border-radius: var(--br-200);
}

.product-item.in-cart .product-item__image {
  outline: 2px solid hsl(var(--color-accent));
  outline-offset: -2px;
}
</style>
