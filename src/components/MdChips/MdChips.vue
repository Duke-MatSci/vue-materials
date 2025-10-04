<script>
import { h } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdField from '@/components/MdField/MdField.vue'
import MdInput from '@/components/MdField/MdInput/MdInput.vue'
import MdChip from './MdChip.vue'
import MdUuid from '@/core/utils/MdUuid'
import MdPropValidator from '@/core/utils/MdPropValidator'

export default MdComponent({
  name: 'MdChips',
  components: {
    MdField,
    MdInput,
    MdChip
  },
  props: {
    modelValue: Array,  // Changed from 'value' in Vue 2
    id: {
      type: [String, Number],
      default: () => 'md-chips-' + MdUuid()
    },
    mdInputType: {
      type: [String, Number],
      ...MdPropValidator('md-input-type', ['email', 'number', 'password', 'search', 'tel', 'text', 'url'])
    },
    mdPlaceholder: [String, Number],
    mdStatic: Boolean,
    mdAutoInsert: {
      type: Boolean,
      default: false
    },
    mdLimit: Number,
    mdCheckDuplicated: {
      type: Boolean,
      default: false
    },
    mdFormat: {
      type: Function
    }
  },
  data: () => ({
    inputValue: '',
    duplicatedChip: null
  }),
  created() {
    // Store ref outside of reactive data to avoid hoisting issues
    this._inputRef = null
  },
  computed: {
    chipsClasses () {
      return {
        'md-has-value': this.modelValue && this.modelValue.length
      }
    },

    modelRespectLimit () {
      return !this.mdLimit || this.modelValue.length < this.mdLimit
    },

    formattedInputValue () {
      if (!this.mdFormat) {
        return this.inputValue
      }
      return this.mdFormat(this.inputValue)
    }
  },
  methods: {
    insertChip ({ target }) {
      let inputValue = this.formattedInputValue

      if (!inputValue || !this.modelRespectLimit) {
        return
      }

      if (this.modelValue.includes(inputValue)) {
        this.duplicatedChip = null
        // to trigger animate
        this.$nextTick(() => {
          this.duplicatedChip = inputValue
        })
        return
      }

      // Vue 3: Use immutable array update instead of direct mutation
      const newValue = [...this.modelValue, inputValue]
      this.$emit('update:modelValue', newValue)  // Changed from 'input'
      this.$emit('md-insert', inputValue)
      this.inputValue = ''
    },
    removeChip (chip) {
      const index = this.modelValue.indexOf(chip)

      // Vue 3: Use immutable array update instead of direct mutation
      const newValue = this.modelValue.filter((_, i) => i !== index)
      this.$emit('update:modelValue', newValue)  // Changed from 'input'
      this.$emit('md-delete', chip, index)
      this.$nextTick(() => {
        // Check if input ref exists before focusing
        if (this._inputRef && this._inputRef.$el) {
          this._inputRef.$el.focus()
        }
      })
    },
    handleBackRemove () {
      if (!this.inputValue) {
        this.removeChip(this.modelValue[this.modelValue.length - 1])
      }
    },
    handleInput () {
      if (this.mdCheckDuplicated) {
        this.checkDuplicated()
      } else {
        this.duplicatedChip = null
      }
    },
    handleFocusOut ({ target }) {
      if (this.mdAutoInsert) {
        this.insertChip(target)
      }
    },
    checkDuplicated () {
      if (!this.modelValue.includes(this.formattedInputValue)) {
        this.duplicatedChip = null
        return false
      }

      if (!this.mdCheckDuplicated) {
        return false
      }

      this.duplicatedChip = this.formattedInputValue
    }
  },
  watch: {
    modelValue () {  // Changed from 'value'
      this.checkDuplicated()
    }
  },
  render() {
    const children = []

    // Default slot (for label)
    if (this.$slots.default) {
      children.push(...this.$slots.default())
    }

    // Chips loop
    if (this.modelValue && this.modelValue.length) {
      this.modelValue.forEach((chip, key) => {
        // Chip content: scoped slot or default text
        const chipSlot = () => {
          // Check if md-chip scoped slot exists
          if (this.$slots['md-chip']) {  // Changed from $scopedSlots
            return this.$slots['md-chip']({ chip })
          }
          return [chip]
        }

        children.push(
          h(this.$options.components.MdChip, {
            key: chip,
            mdDeletable: !this.mdStatic,
            mdClickable: !this.mdStatic,
            mdDuplicated: this.duplicatedChip === chip,
            onKeydown: (event) => {
              if (event.key === 'Enter') {
                this.$emit('md-click', chip, key)
              }
            },
            onClick: () => {  // Removed .native modifier for Vue 3
              this.$emit('md-click', chip, key)
            },
            onMdDelete: (event) => {
              event.stopPropagation()
              this.removeChip(chip)
            }
          }, {
            default: chipSlot
          })
        )
      })
    }

    // Input field
    if (!this.mdStatic && this.modelRespectLimit) {
      children.push(
        h(this.$options.components.MdInput, {
          ref: (el) => { this._inputRef = el },  // Store ref as non-reactive property
          modelValue: this.inputValue,
          'onUpdate:modelValue': (value) => {
            this.inputValue = typeof value === 'string' ? value.trim() : value
          },
          type: this.mdInputType,
          id: this.id,
          placeholder: this.mdPlaceholder,
          onInput: this.handleInput,
          onKeydown: (event) => {
            if (event.key === 'Enter') {
              this.insertChip({ target: event.target })
            } else if (event.key === 'Backspace') {  // Changed from @keydown.8
              this.handleBackRemove()
            }
          },
          onFocusout: this.handleFocusOut
        })
      )
    }

    // Wrap everything in MdField
    return h(this.$options.components.MdField, {
      class: ['md-chips', this.$mdActiveTheme, this.chipsClasses]
    }, {
      default: () => children
    })
  }
})
</script>

<style lang="scss">
  @import "@/components/MdAnimation/variables";

  .md-chips.md-field {
    padding-top: 12px;
    flex-wrap: wrap;

    &.md-has-value {
      label {
        top: -6px;
      }
    }

    .md-chip {
      margin-bottom: 4px;

      &:last-of-type {
        margin-right: 8px;
      }
    }

    .md-input {
      min-width: 128px;
    }
  }
</style>
