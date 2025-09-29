<template>
  <div class="md-checkbox" :class="[$mdActiveTheme, checkClasses]">
    <div class="md-checkbox-container" @click.stop="toggleCheck"></div>
    <input type="checkbox" class="md-input" :id="id" :disabled="disabled" :checked="model" @change="onNativeChange" />
    <label :for="id" class="md-checkbox-label" v-if="$slots.default" @click.prevent="toggleCheck">
      <slot />
    </label>
  </div>
</template>

<script>
import MdComponent from "@/core/MdComponent"

export default MdComponent({
  name: "MdCheckbox",
  props: { modelValue: Boolean, disabled: Boolean, id: String },
  emits: ["update:modelValue", "change"],
  data: () => ({ internal: false }),
  computed: {
    model() { return this.modelValue ?? this.internal },
    checkClasses() {
      return { "md-checked": !!this.model, "md-disabled": !!this.disabled }
    },
  },
  methods: {
    toggleCheck() {
      if (this.disabled) return
      const next = !this.model
      if (this.modelValue === undefined) this.internal = next
      this.$emit("update:modelValue", next)
      this.$emit("change", next)
    },
    onNativeChange(e) { this.toggleCheck() },
  },
})
</script>

<style lang="scss">
/* styling from prebuilt CSS */
</style>

