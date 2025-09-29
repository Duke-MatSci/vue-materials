<script>
import { h, mergeProps } from "vue"
import MdMenuItem from "@/components/MdMenu/MdMenuItem.vue"
import MdUuid from "@/core/utils/MdUuid"

export default {
  name: "MdOption",
  inheritAttrs: false,
  inject: {
    MdSelect: {},
    MdOptgroup: {
      default: () => ({}),
    },
  },
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
  },
  data: () => ({
    uniqueId: `md-option-${MdUuid()}`,
    isSelected: false,
    isChecked: false,
    containerEl: null,
  }),
  computed: {
    selectValue() {
      return this.MdSelect ? this.MdSelect.modelValue : undefined
    },
    isMultiple() {
      return this.MdSelect ? this.MdSelect.multiple : false
    },
    isDisabled() {
      return Boolean((this.MdOptgroup && this.MdOptgroup.disabled) || this.disabled)
    },
    keyValue() {
      const isSet = this.value || this.value === 0 || this.value === false || this.value === ""
      return isSet ? this.value : this.uniqueId
    },
    optionClasses() {
      return {
        "md-selected": this.isSelected || this.isChecked,
      }
    },
  },
  watch: {
    selectValue() {
      this.setIsSelected()
    },
    isChecked(val) {
      if (val === this.isSelected) return
      this.setSelection()
    },
    isSelected(val) {
      this.isChecked = val
    },
  },
  methods: {
    getTextContent() {
      if (this.$refs.text && this.$refs.text.textContent != null) {
        return this.$refs.text.textContent.trim()
      }
      if (this.$el) {
        return this.$el.textContent.trim()
      }
      const slot = this.$slots.default
      return slot && slot[0] && slot[0].children ? String(slot[0].children).trim() : ""
    },
    setIsSelected() {
      if (!this.isMultiple) {
        this.isSelected = this.selectValue === this.value
        return
      }
      if (!Array.isArray(this.selectValue)) {
        this.isSelected = false
        return
      }
      this.isSelected = this.selectValue.includes(this.value)
    },
    setSingleSelection() {
      if (this.MdSelect && typeof this.MdSelect.setValue === "function") {
        this.MdSelect.setValue(this.value)
      }
    },
    setMultipleSelection() {
      if (this.MdSelect && typeof this.MdSelect.setMultipleValue === "function") {
        this.MdSelect.setMultipleValue(this.value)
      }
    },
    setSelection() {
      if (this.isDisabled) return
      if (this.isMultiple) {
        this.setMultipleSelection()
      } else {
        this.setSingleSelection()
      }
    },
    setItem() {
      if (!this.MdSelect || !this.MdSelect.items) return
      this.MdSelect.items[this.keyValue] = this.getTextContent()
    },
  },
  mounted() {
    this.$nextTick(() => {
      const root = this.$el
      this.containerEl = root && root.querySelector ? root.querySelector(".md-list-item-container") : null
      this.setItem()
      this.setIsSelected()
    })
  },
  created() {
    this.setItem()
    this.setIsSelected()
  },
  updated() {
    this.setItem()
  },
  render() {
    const checkbox = this.MdSelect && this.MdSelect.multiple
      ? h("md-checkbox", {
          class: "md-primary",
          modelValue: this.isChecked,
          "onUpdate:modelValue": (val) => {
            this.isChecked = val
          },
          disabled: this.isDisabled,
        })
      : null

    const text = h(
      "span",
      {
        class: "md-list-item-text",
        ref: "text",
      },
      this.$slots.default ? this.$slots.default() : []
    )

    return h(
      MdMenuItem,
      mergeProps(
        {
          class: this.optionClasses,
          disabled: this.isDisabled,
          onClick: this.setSelection,
        },
        this.$attrs
      ),
      {
        default: () => (checkbox ? [checkbox, text] : [text]),
      }
    )
  },
}
</script>

<style lang="scss">

</style>
