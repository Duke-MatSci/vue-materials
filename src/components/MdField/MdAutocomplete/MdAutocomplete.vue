<script>
import { h } from 'vue'
import fuzzy from 'fuzzysearch'
import isPromise from 'is-promise'
import MdPropValidator from '@/core/utils/MdPropValidator'
import MdField from '../MdField.vue'
import MdMenu from '@/components/MdMenu/MdMenu.vue'
import MdMenuContent from '@/components/MdMenu/MdMenuContent.vue'
import MdMenuItem from '@/components/MdMenu/MdMenuItem.vue'
import MdInput from '../MdInput/MdInput.vue'
import MdProgressSpinner from '@/components/MdProgress/MdProgressSpinner/MdProgressSpinner.vue'

export default {
  name: 'MdAutocomplete',
  components: {
    MdField,
    MdMenu,
    MdMenuContent,
    MdMenuItem,
    MdInput,
    MdProgressSpinner
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: null,
      required: true
    },
    mdDense: Boolean,
    mdLayout: {
      type: String,
      default: 'floating',
      ...MdPropValidator('md-layout', ['floating', 'box'])
    },
    mdOpenOnFocus: {
      type: Boolean,
      default: true
    },
    mdFuzzySearch: {
      type: Boolean,
      default: true
    },
    mdOptions: {
      type: [Array, Promise],
      required: true
    },
    mdInputName: String,
    mdInputId: String,
    mdInputMaxlength: [String, Number],
    mdInputPlaceholder: [String, Number]
  },
  data() {
    return {
      searchTerm: this.modelValue,
      showMenu: false,
      triggerPopover: false,
      isPromisePending: false,
      filteredAsyncOptions: [],
      inputElement: null
    }
  },
  computed: {
    isBoxLayout() {
      return this.mdLayout === 'box'
    },
    fieldClasses() {
      if (this.isBoxLayout) {
        return 'md-autocomplete-box'
      }
      return ''
    },
    contentClasses() {
      if (this.isBoxLayout) {
        return 'md-autocomplete-box-content'
      }
      return ''
    },
    shouldFilter() {
      return this.mdOptions[0] && this.searchTerm
    },
    filteredStaticOptions() {
      if (this.isPromise(this.mdOptions)) {
        return []
      }

      const firstItem = this.mdOptions[0]

      if (this.shouldFilter) {
        if (typeof firstItem === 'string') {
          return this.filterByString()
        } else if (typeof firstItem === 'object') {
          return this.filterByObject()
        }
      }

      return this.mdOptions
    },
    hasFilteredItems() {
      return this.filteredStaticOptions.length > 0 || this.filteredAsyncOptions.length > 0
    },
    hasScopedEmptySlot() {
      return !!this.$slots['md-autocomplete-empty']
    }
  },
  watch: {
    mdOptions: {
      deep: true,
      immediate: true,
      handler() {
        if (this.isPromise(this.mdOptions)) {
          this.isPromisePending = true
          this.mdOptions.then(options => {
            this.filteredAsyncOptions = options
            this.isPromisePending = false
          })
        }
      }
    },
    modelValue(val) {
      this.searchTerm = val
    }
  },
  methods: {
    getOptions() {
      if (this.isPromise(this.mdOptions)) {
        return this.filteredAsyncOptions
      }

      return this.filteredStaticOptions
    },
    isPromise(obj) {
      return isPromise(obj)
    },
    matchText(item) {
      const target = item.toLowerCase()
      const search = this.searchTerm.toLowerCase()

      if (this.mdFuzzySearch) {
        return fuzzy(search, target)
      }

      return target.includes(search)
    },
    filterByString() {
      return this.mdOptions.filter(item => this.matchText(item))
    },
    filterByObject() {
      return this.mdOptions.filter(item => {
        const values = Object.values(item)
        const valuesCount = values.length

        for (let i = 0; i <= valuesCount; i++) {
          if (typeof values[i] === 'string' && this.matchText(values[i])) {
            return true
          }
        }
      })
    },
    openOnFocus() {
      if (this.mdOpenOnFocus) {
        this.showOptions()
      }
    },
    onInput(value) {
      this.$emit('update:modelValue', value)

      if (!this.mdOpenOnFocus) {
        this.showOptions()
      }

      if (this.searchTerm.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== 'inputevent') {
        this.$emit('md-changed', this.searchTerm)
      }
    },
    showOptions() {
      if (this.showMenu) {
        return false
      }

      this.showMenu = true
      this.$nextTick(() => {
        this.triggerPopover = true
        this.$emit('md-opened')
      })
    },
    hideOptions() {
      this.$nextTick(() => {
        this.triggerPopover = false
        this.$emit('md-closed')
      })
    },
    selectItem(item, $event) {
      const content = $event.target.textContent.trim()

      this.searchTerm = content
      this.$emit('update:modelValue', item)
      this.$emit('md-selected', item)
      this.hideOptions()
    },
    handleNativeFocus() {
      // Don't stop propagation - let MdInput's handlers run first
      this.openOnFocus()
    },
    handleNativeBlur() {
      this.hideOptions()
    }
  },
  mounted() {
    // Find the native input element and attach event listeners
    // Don't use capture phase - let MdInput's handlers run first
    this.$nextTick(() => {
      const inputEl = this.$el.querySelector('input.md-input')
      if (inputEl) {
        this.inputElement = inputEl
        inputEl.addEventListener('focus', this.handleNativeFocus, false)
        inputEl.addEventListener('blur', this.handleNativeBlur, false)
      }
    })
  },
  beforeUnmount() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('focus', this.handleNativeFocus, false)
      this.inputElement.removeEventListener('blur', this.handleNativeBlur, false)
    }
  },
  render() {
    const fieldProps = {
      class: ['md-autocomplete', this.fieldClasses],
      mdClearable: true,
      mdInline: this.isBoxLayout
    }

    // MdMenu with proper Vue 3 v-model
    const menuChildren = []

    // MdInput
    menuChildren.push(
      h(this.$options.components.MdInput, {
        modelValue: this.searchTerm,
        'onUpdate:modelValue': (val) => {
          this.searchTerm = val
          this.onInput(val)
        },
        ...this.$attrs,
        id: this.mdInputId,
        name: this.mdInputName,
        maxlength: this.mdInputMaxlength,
        placeholder: this.mdInputPlaceholder
      })
    )

    // MdMenuContent with options - Always render (like v-show), hide with style
    const menuContentChildren = []

    // Loading spinner
    if (this.isPromisePending) {
      menuContentChildren.push(
        h('div', { class: 'md-autocomplete-loading' }, [
          h(this.$options.components.MdProgressSpinner, {
            mdDiameter: 40,
            mdStroke: 4,
            mdMode: 'indeterminate'
          })
        ])
      )
    }

    // Options list
    if (this.hasFilteredItems) {
      const optionItems = this.getOptions().map((item, index) => {
        // Generate stable key based on item content to avoid Vue patch issues
        const itemKey = typeof item === 'string'
          ? item
          : JSON.stringify(item)

        return h(
          this.$options.components.MdMenuItem,
          {
            key: itemKey,
            onClick: ($event) => this.selectItem(item, $event)
          },
          {
            default: () => {
              // Check for custom slot
              if (this.$slots['md-autocomplete-item']) {
                return this.$slots['md-autocomplete-item']({
                  item: item,
                  term: this.searchTerm
                })
              }
              // Default: render item as text
              return [typeof item === 'string' ? item : JSON.stringify(item)]
            }
          }
        )
      })

      menuContentChildren.push(
        h('div', {
          key: 'autocomplete-items',
          class: 'md-autocomplete-items'
        }, optionItems)
      )
    } else if (this.hasScopedEmptySlot) {
      // Empty state
      menuContentChildren.push(
        h(this.$options.components.MdMenuItem, {
          key: 'autocomplete-empty'
        }, {
          default: () => [
            h('div', { class: 'md-autocomplete-empty' },
              this.$slots['md-autocomplete-empty']
                ? this.$slots['md-autocomplete-empty']({ term: this.searchTerm })
                : []
            )
          ]
        })
      )
    }

    // Always add MdMenuContent (like v-show), use display style to show/hide
    menuChildren.push(
      h(
        this.$options.components.MdMenuContent,
        {
          class: this.contentClasses,
          style: {
            display: (this.hasScopedEmptySlot || this.hasFilteredItems) ? '' : 'none'
          }
        },
        { default: () => menuContentChildren }
      )
    )

    // MdMenu wrapper
    const menu = h(
      this.$options.components.MdMenu,
      {
        mdDirection: 'bottom-start',
        mdDense: this.mdDense,
        mdAlignTrigger: true,
        mdFullWidth: true,
        mdActive: this.showMenu,
        'onUpdate:mdActive': (val) => {
          this.showMenu = val
        }
      },
      { default: () => menuChildren }
    )

    // MdField wrapper with default slot
    return h(
      this.$options.components.MdField,
      fieldProps,
      {
        default: () => [
          menu,
          this.$slots.default ? this.$slots.default() : []
        ]
      }
    )
  }
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdElevation/mixins";
@import "@/components/MdLayout/mixins";

.md-autocomplete {
  .md-menu {
    width: 100%;
    display: flex;
  }
}

.md-autocomplete-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.md-field.md-inline.md-autocomplete-box {
  @include md-elevation(2);
  padding-top: 2px;
  border-radius: 2px;

  &.md-focused {
    z-index: 120;
  }

  &:before,
  &:after {
    display: none;
  }

  .md-toolbar & {
    min-height: 40px;
    height: 40px;
    margin: 0;
    box-shadow: none;
  }

  .md-menu {
    align-items: center;
  }

  .md-input {
    padding-left: 16px;
  }

  &.md-focused label,
  label,
  .md-input-action {
    top: 50%;
    transform: translateY(-50%);
  }

  .md-input-action {
    right: 8px;
  }

  &.md-focused label,
  label {
    margin-top: 2px;
    left: 16px;
  }
}

.md-autocomplete-box-content:after {
  height: 6px;
  position: absolute;
  top: -6px;
  right: 0;
  left: 0;
  z-index: 120;
  border-bottom: 1px solid;
  content: "";
}
</style>
