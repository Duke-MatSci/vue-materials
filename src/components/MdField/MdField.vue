<template>
  <div class="md-field" v-bind="$attrs">
    <slot />
  </div>
  
</template>

<script>
export default {
  name: "MdField",
}
</script>

<style lang="scss">
/* Minimal styling hook; Vue 2 CSS targets .md-field and inner elements */
</style>

