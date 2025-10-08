<script>
import { h } from 'vue'
import MdUuid from '@/core/utils/MdUuid'
import MdMenuItem from '@/components/MdMenu/MdMenuItem.vue'
import MdCheckbox from '@/components/MdCheckbox/MdCheckbox.vue'

export default {
  name: 'MdOption',
  components: {
    MdMenuItem,
    MdCheckbox
  },
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean
  },
  inject: {
    MdSelect: {
      default: () => ({
        items: {},
        label: null,
        multiple: false,
        modelValue: null,
        setValue: () => {},
        setContent: () => {},
        setMultipleValue: () => {},
        setMultipleContent: () => {}
      })
    },
    MdOptgroup: {
      default: () => ({})
    }
  },
  data: () => ({
    uniqueId: 'md-option-' + MdUuid(),
    isSelected: false,
    isChecked: false
  }),
  computed: {
    selectValue () {
      return this.MdSelect.modelValue
    },
    isMultiple () {
      return this.MdSelect.multiple
    },
    isDisabled () {
      return this.MdOptgroup.disabled || this.disabled
    },
    key () {
      let isSet = (this.value || this.value === 0 || this.value === false || this.value === '')
      return isSet ? this.value : this.uniqueId
    },
    inputLabel () {
      return this.MdSelect.label
    },
    optionClasses () {
      return {
        'md-selected': this.isSelected || this.isChecked
      }
    }
  },
  watch: {
    selectValue () {
      this.setIsSelected()
    },
    isChecked (val) {
      if (val === this.isSelected) {
        return
      }
      // Update selection when checkbox value changes (from checkbox click)
      this.setSelection()
    },
    isSelected (val) {
      this.isChecked = val
    }
  },
  methods: {
    getTextContent () {
      if (this.$el) {
        return this.$el.textContent.trim()
      }

      const slot = this.$slots.default

      if (slot) {
        const vnodes = slot()
        if (vnodes && vnodes.length > 0) {
          const firstVNode = vnodes[0]
          if (typeof firstVNode.children === 'string') {
            return firstVNode.children.trim()
          }
        }
      }

      return ''
    },
    setIsSelected () {
      if (!this.isMultiple) {
        this.isSelected = this.selectValue === this.value
        return
      }
      if (this.selectValue === undefined) {
        this.isSelected = false
        return
      }
      this.isSelected = this.selectValue.includes(this.value)
    },
    setSingleSelection () {
      this.MdSelect.setValue(this.value)
    },
    setMultipleSelection () {
      this.MdSelect.setMultipleValue(this.value)
    },
    setSelection () {
      if (!this.isDisabled) {
        if (this.isMultiple) {
          this.setMultipleSelection()
        } else {
          this.setSingleSelection()
        }
      }
    },
    setItem () {
      this.MdSelect.items[this.key] = this.getTextContent()
    }
  },
  updated () {
    this.setItem()
  },
  created () {
    this._textRef = null
    this.setItem()
    this.setIsSelected()
  },
  render() {
    return h(MdMenuItem, {
      class: this.optionClasses,
      disabled: this.isDisabled,
      onClick: this.setSelection
    }, () => {
      const children = []

      if (this.MdSelect.multiple) {
        children.push(
          h(MdCheckbox, {
            class: 'md-primary',
            modelValue: this.isChecked,
            'onUpdate:modelValue': (val) => { this.isChecked = val },
            disabled: this.isDisabled,
            trueValue: true,
            falseValue: false
          })
        )
      }

      children.push(
        h('span', {
          class: 'md-list-item-text',
          ref: (el) => { this._textRef = el }
        }, this.$slots.default ? this.$slots.default() : [])
      )

      return children
    })
  }
}
</script>

<style lang="scss">

</style>
