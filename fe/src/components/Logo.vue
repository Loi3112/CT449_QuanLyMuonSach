<script setup>
const { size } = defineProps({
  size: {
    required: false,
    type: Number,
    default: 30
  }
})
</script>

<template>
  <span class="logo" :style="{ fontSize: `${size}px` }">
    <router-link to="/" class="logo-content">BookTL</router-link>
  </span>
</template>

<style lang="scss" scoped>

.logo {
  font-weight: 650;

  &-content,
  &-content:hover {
    text-decoration: none;
    color: #000;
    text-wrap: nowrap;
    white-space: nowrap;
    -webkit-text-stroke: 1px #fff;
  }
}
</style>
