import MdRipple from '@/components/MdRipple/MdRipple.vue'

export default {
  components: {
    MdRipple
  },
  props: {
    modelValue: [String, Boolean, Object, Number, Array],
    value: {
      type: [String, Boolean, Object, Number],
      default: undefined
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    }
  },
  data: () => ({
    rippleActive: false
  }),
  computed: {
    attrs () {
      const attrs = {
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        'true-value': this.trueValue,
        'false-value': this.falseValue
      }

      if (this.hasValue) {
        if (this.value === null || typeof this.value !== 'object') {
          attrs.value = (this.value === null || this.value === undefined) ? '' : String(this.value)
        }
      }

      return attrs
    },
    isSelected () {
      if (this.isModelArray) {
        return this.modelValue.includes(this.value)
      }

      if (this.hasValue) {
        return this.modelValue === this.value
      }

      return this.modelValue === this.trueValue
    },
    isModelArray () {
      return Array.isArray(this.modelValue)
    },
    checkClasses () {
      return {
        'md-checked': this.isSelected,
        'md-disabled': this.disabled,
        'md-required': this.required,
        'md-indeterminate': this.indeterminate
      }
    },
    hasValue () {
      return this.$props.value !== undefined
    }
  },
  methods: {
    removeItemFromModel (newModel) {
      const index = newModel.indexOf(this.value)

      if (index !== -1) {
        newModel.splice(index, 1)
      }
    },
    handleArrayCheckbox () {
      const newModel = this.modelValue

      if (!this.isSelected) {
        newModel.push(this.value)
      } else {
        this.removeItemFromModel(newModel)
      }

      this.$emit('update:modelValue', newModel)
    },
    handleSingleSelectCheckbox () {
      this.$emit('update:modelValue', this.isSelected ? null : this.value)
    },
    handleSimpleCheckbox () {
      this.$emit('update:modelValue', this.isSelected ? this.falseValue : this.trueValue)
    },
    toggleCheck () {
      if (!this.disabled) {
        this.rippleActive = true

        if (this.isModelArray) {
          this.handleArrayCheckbox()
        } else if (this.hasValue) {
          this.handleSingleSelectCheckbox()
        } else {
          this.handleSimpleCheckbox()
        }
      }
    }
  }
}
