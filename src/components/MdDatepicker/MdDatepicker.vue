<script>
import { h, KeepAlive } from 'vue'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import MdPropValidator from '@/core/utils/MdPropValidator'
import MdOverlay from '@/components/MdOverlay/MdOverlay.vue'
import MdDatepickerDialog from './MdDatepickerDialog.vue'
import MdDateIcon from '@/core/icons/MdDateIcon.vue'
import MdDebounce from '@/core/utils/MdDebounce'
import MdField from '@/components/MdField/MdField.vue'
import MdInput from '@/components/MdField/MdInput/MdInput.vue'

// Simple Firefox detection
const isFirefox = typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent)

export default {
  name: 'MdDatepicker',
  components: {
    MdOverlay,
    MdDateIcon,
    MdField,
    MdInput,
    MdDatepickerDialog
  },
  props: {
    modelValue: [String, Number, Date],
    mdDisabledDates: [Array, Function],
    mdOpenOnFocus: {
      type: Boolean,
      default: true
    },
    mdCloseOnBlur: {
      type: Boolean,
      default: true
    },
    mdOverrideNative: {
      type: Boolean,
      default: true
    },
    mdImmediately: {
      type: Boolean,
      default: false
    },
    mdModelType: {
      type: Function,
      default: Date,
      ...MdPropValidator('md-model-type', [Date, String, Number])
    },
    MdDebounce: {
      type: Number,
      default: 1000
    },
    mdClearable: {
      type: Boolean,
      default: true
    },
    mdPlacement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data: () => ({
    showDialog: false,
    // String for input
    inputDate: '',
    // Date for real value
    localDate: null
  }),
  computed: {
    locale() {
      return this.$material.locale
    },
    type() {
      return this.mdOverrideNative
        ? 'text'
        : 'date'
    },
    dateFormat() {
      return this.locale.dateFormat || 'yyyy-MM-dd'
    },
    modelType() {
      if (this.isModelTypeString) {
        return String
      } else if (this.isModelTypeNumber) {
        return Number
      } else if (this.isModelTypeDate) {
        return Date
      } else {
        return this.mdModelType
      }
    },
    isModelNull() {
      return this.modelValue === null || this.modelValue === undefined
    },
    isModelTypeString() {
      return typeof this.modelValue === 'string'
    },
    isModelTypeNumber() {
      return Number.isInteger(this.modelValue) && this.modelValue >= 0
    },
    isModelTypeDate() {
      return typeof this.modelValue === 'object' && this.modelValue instanceof Date && isValid(this.modelValue)
    },
    localString() {
      return this.localDate && format(this.localDate, this.dateFormat)
    },
    localNumber() {
      return this.localDate && Number(this.localDate)
    },
    parsedInputDate() {
      const parsedDate = parse(this.inputDate, this.dateFormat, new Date())
      return parsedDate && isValid(parsedDate) ? parsedDate : null
    },
    pattern() {
      return this.dateFormat.replace(/yyyy|MM|dd/g, match => {
        switch (match) {
        case 'yyyy':
          return '[0-9]{4}'
        case 'MM':
        case 'dd':
          return '[0-9]{2}'
        }
      })
    }
  },
  watch: {
    inputDate() {
      this.inputDateToLocalDate()
    },
    localDate() {
      this.inputDate = this.localString
      if (this.modelType === Date) {
        this.$emit('update:modelValue', this.localDate)
      }
    },
    localString() {
      if (this.modelType === String) {
        this.$emit('update:modelValue', this.localString)
      }
    },
    localNumber() {
      if (this.modelType === Number) {
        this.$emit('update:modelValue', this.localNumber)
      }
    },
    modelValue: {
      immediate: true,
      handler() {
        this.valueDateToLocalDate()
      }
    },
    mdModelType(type) {
      switch (type) {
      case Date:
        this.$emit('update:modelValue', this.localDate)
        break
      case String:
        this.$emit('update:modelValue', this.localString)
        break
      case Number:
        this.$emit('update:modelValue', this.localNumber)
        break
      }
    },
    dateFormat() {
      if (this.localDate) {
        this.inputDate = format(this.localDate, this.dateFormat)
      }
    }
  },
  methods: {
    toggleDialog(newState = null) {
      if (!isFirefox || this.mdOverrideNative) {
        // If new state (boolean) is provide, assign that to showDialog, else just toggle
        this.showDialog = newState === null ? !this.showDialog : newState
        if (this.showDialog) {
          this.$emit('md-opened')
        } else {
          this.$emit('md-closed')
        }
      } else {
        this.$refs.input.$el.click()
      }
    },
    onFocus() {
      if (this.mdOpenOnFocus) {
        this.toggleDialog(true)
      }
    },
    onFocusOut(e) {
      if (this.mdCloseOnBlur && this.$refs.mdRef.$el !== e.relatedTarget) {
        this.toggleDialog(false)
      }
    },
    inputDateToLocalDate() {
      if (this.inputDate) {
        if (this.parsedInputDate) {
          this.localDate = this.parsedInputDate
        }
      } else {
        this.localDate = null
      }
    },
    valueDateToLocalDate() {
      if (this.isModelNull) {
        this.localDate = null
      } else if (this.isModelTypeNumber) {
        this.localDate = new Date(this.modelValue)
      } else if (this.isModelTypeDate) {
        this.localDate = this.modelValue
      } else if (this.isModelTypeString) {
        let parsedDate = parse(this.modelValue, this.dateFormat, new Date())

        if (isValid(parsedDate)) {
          this.localDate = parse(this.modelValue, this.dateFormat, new Date())
        } else {
          console.warn(`The datepicker value is not a valid date. Given value: ${this.modelValue}, format: ${this.dateFormat}`)
        }
      } else {
        console.warn(`The datepicker value is not a valid date. Given value: ${this.modelValue}`)
      }
    },
    onClear() {
      this.$emit('md-clear')
    }
  },
  created() {
    this.inputDateToLocalDate = MdDebounce(this.inputDateToLocalDate, this.MdDebounce)
  },
  render() {
    const children = []

    // Create date icon with click handler
    children.push(h(MdDateIcon, {
      class: 'md-date-icon',
      onClick: () => this.toggleDialog(true)
    }))

    // Create input
    children.push(h(MdInput, {
      type: this.type,
      ref: 'input',
      modelValue: this.inputDate,
      'onUpdate:modelValue': (value) => {
        this.inputDate = value
      },
      onFocus: this.onFocus,
      onFocusout: this.onFocusOut,
      pattern: this.pattern
    }))

    // Add default slot
    if (this.$slots.default) {
      children.push(...this.$slots.default())
    }

    // Add datepicker dialog with keep-alive
    if (this.showDialog) {
      children.push(h(KeepAlive, {}, {
        default: () => h(MdDatepickerDialog, {
          ref: 'mdRef',
          mdDate: this.localDate,
          'onUpdate:mdDate': (value) => {
            this.localDate = value
          },
          mdDisabledDates: this.mdDisabledDates,
          mdImmediately: this.mdImmediately,
          'onMd-closed': () => this.toggleDialog(false),
          mdPlacement: this.mdPlacement
        })
      }))
    }

    // Add overlay
    children.push(h(MdOverlay, {
      class: 'md-datepicker-overlay',
      mdFixed: true,
      mdActive: this.showDialog,
      onClick: () => this.toggleDialog(false)
    }))

    // Extract class from $attrs if present
    const attrsClass = this.$attrs.class || ''
    const attrsWithoutClass = { ...this.$attrs }
    delete attrsWithoutClass.class

    return h(MdField, {
      ...attrsWithoutClass,
      class: [
        'md-datepicker',
        { 'md-native': !this.mdOverrideNative },
        attrsClass
      ],
      mdClearable: this.mdClearable,
      'onMd-clear': this.onClear
    }, {
      default: () => children
    })
  }
}
</script>

<style lang="scss">
  @import "@/components/MdAnimation/variables.scss";
  @import "@/components/MdLayout/mixins.scss";

  .md-datepicker-overlay {
    opacity: 0;

    @include md-layout-xsmall {
      opacity: 1;
    }
  }

  .md-datepicker {
    &.md-native {
      label {
        top: 0 !important;
      }
    }

    .md-date-icon {
      cursor: pointer;
    }

    input[type=date]::-webkit-clear-button,
    input[type=date]::-webkit-inner-spin-button,
    input[type=date]::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
</style>
