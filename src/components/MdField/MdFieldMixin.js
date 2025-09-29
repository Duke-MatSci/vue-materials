import { nextTick } from "vue"

const isInputEvent = (value) => {
  if (!value || typeof value !== "object") return false
  const ctor = value.constructor && value.constructor.toString()
  if (!ctor) return false
  const match = ctor.match(/function (\w*)/)
  if (!match || !match[1]) return false
  return match[1].toLowerCase() === "inputevent"
}

const filterAttrs = (attrs = {}) => {
  const filtered = {}
  Object.keys(attrs).forEach((key) => {
    if (key.startsWith("on")) return
    filtered[key] = attrs[key]
  })
  return filtered
}

export default {
  inheritAttrs: false,
  props: {
    value: {},
    modelValue: {},
    placeholder: String,
    name: String,
    maxlength: [String, Number],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    mdCounter: [String, Number],
  },
  data() {
    return {
      localValue:
        this.value !== undefined
          ? this.value
          : this.modelValue !== undefined
            ? this.modelValue
            : null,
      textareaHeight: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.localValue
      },
      set(value) {
        if (isInputEvent(value)) {
          return
        }

        nextTick(() => {
          this.localValue = value
          this.MdField.hasInvalidValue = this.isInvalidValue()
        })
      },
    },
    clear() {
      return this.MdField.clear
    },
    attributes() {
      const attrs = filterAttrs(this.$attrs)
      const result = {
        ...attrs,
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        readonly: this.readonly,
        maxlength: this.maxlength,
      }

      if (Object.prototype.hasOwnProperty.call(this.$props, "type")) {
        result.type = this.type
      }

      return result
    },
  },
  watch: {
    model() {
      this.setFieldValue()
    },
    clear(clear) {
      if (clear) {
        this.clearField()
      }
    },
    placeholder() {
      this.setPlaceholder()
    },
    disabled() {
      this.setDisabled()
    },
    required() {
      this.setRequired()
    },
    maxlength() {
      this.setMaxlength()
    },
    mdCounter() {
      this.setMaxlength()
    },
    localValue(val) {
      this.$emit("input", val)
      this.$emit("update:modelValue", val)
    },
    value(val) {
      if (val !== undefined) {
        this.localValue = val
      }
    },
    modelValue(val) {
      if (val !== undefined) {
        this.localValue = val
      }
    },
  },
  methods: {
    clearField() {
      if (this.$el && this.$el.tagName === "INPUT") {
        this.$el.value = ""
      }
      this.model = ""
      this.setFieldValue()
    },
    setLabelFor() {
      if (!this.$el || !this.$el.parentNode) return
      const label = this.$el.parentNode.querySelector("label")
      if (!label) return
      const forAttribute = label.getAttribute("for")
      if (!forAttribute || forAttribute.indexOf("md-") >= 0) {
        label.setAttribute("for", this.id)
      }
    },
    setFormResetListener() {
      if (!this.$el || !this.$el.form) return
      this.$el.form.addEventListener("reset", this.onParentFormReset)
    },
    removeFormResetListener() {
      if (!this.$el || !this.$el.form) return
      this.$el.form.removeEventListener("reset", this.onParentFormReset)
    },
    onParentFormReset() {
      this.clearField()
    },
    isInvalidValue() {
      try {
        if (this.$el && this.$el.validity) {
          return this.$el.validity.badInput
        }
        if (this.$el && this.$el.querySelector) {
          const input = this.$el.querySelector("input")
          if (input && input.validity) {
            return input.validity.badInput
          }
        }
      } catch (e) {
        return false
      }

      return false
    },
    setFieldValue() {
      this.MdField.value = this.model
    },
    setPlaceholder() {
      this.MdField.placeholder = Boolean(this.placeholder)
    },
    setDisabled() {
      this.MdField.disabled = Boolean(this.disabled)
    },
    setRequired() {
      this.MdField.required = Boolean(this.required)
    },
    setMaxlength() {
      if (this.mdCounter) {
        this.MdField.counter = parseInt(this.mdCounter, 10)
      } else if (this.maxlength) {
        this.MdField.maxlength = parseInt(this.maxlength, 10)
      } else {
        this.MdField.counter = null
        this.MdField.maxlength = null
      }
    },
    onFocus() {
      this.MdField.focused = true
    },
    onBlur() {
      this.MdField.focused = false
    },
  },
  created() {
    this.setFieldValue()
    this.setPlaceholder()
    this.setDisabled()
    this.setRequired()
    this.setMaxlength()
  },
  mounted() {
    this.setLabelFor()
    this.setFormResetListener()
  },
  beforeUnmount() {
    this.removeFormResetListener()
  },
}
