<template>
  <div class="md-option" @click="select">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MdOption",
  props: {
    value: null,
  },
  inject: {
    mdSelectOnSelect: { from: "mdSelectOnSelect", default: null },
  },
  methods: {
    select() {
      if (typeof this.mdSelectOnSelect === "function") {
        this.mdSelectOnSelect(this.value, this)
      }
      this.$emit("selected", this.value)
    },
  },
}
</script>

<style lang="scss">
/* Minimal styling hook */
</style>

