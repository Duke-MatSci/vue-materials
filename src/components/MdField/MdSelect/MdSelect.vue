<script>
import { h, KeepAlive, mergeProps, cloneVNode } from "vue"
import MdMenu from "@/components/MdMenu/MdMenu.vue"
import MdMenuContent from "@/components/MdMenu/MdMenuContent.vue"
import MdDropDownIcon from "@/core/icons/MdDropDownIcon.vue"
import MdInput from "../MdInput/MdInput.vue"
import MdFieldMixin from "../MdFieldMixin"

const defaultOffset = {
  x: -15,
  y: -48,
}

const getListeners = (attrs = {}) => {
  const listeners = {}
  Object.keys(attrs).forEach((key) => {
    const value = attrs[key]
    if (key.startsWith("on") && typeof value === "function") {
      listeners[key] = value
    }
  })
  return listeners
}

export default {
  name: "MdSelect",
  inheritAttrs: false,
  components: {
    MdMenu,
    MdMenuContent,
    MdDropDownIcon,
    MdInput,
  },
  mixins: [MdFieldMixin],
  inject: ["MdField"],
  props: {
    mdDense: Boolean,
    mdClass: String,
    multiple: Boolean,
    id: String,
    name: String,
  },
  data() {
    return {
      menuStyles: {},
      offset: {
        x: defaultOffset.x,
        y: 0,
      },
      showSelect: true,
      didMount: false,
      MdSelect: {
        items: {},
        label: null,
        multiple: false,
        modelValue: this.localValue,
        setValue: this.setValue,
        setContent: this.setContent,
        setMultipleValue: this.setMultipleValue,
        setMultipleContent: this.setMultipleContent,
      },
    }
  },
  provide() {
    return { MdSelect: this.MdSelect }
  },
  computed: {
    attrs() {
      const attrs = {}
      Object.keys(this.$attrs || {}).forEach((key) => {
        if (!key.startsWith("on")) {
          attrs[key] = this.$attrs[key]
        }
      })
      attrs.name = this.name
      attrs.id = undefined
      return attrs
    },
    inputListeners() {
      const listeners = getListeners(this.$attrs)
      delete listeners.onInput
      return {
        ...listeners,
        onKeydown: this.onInputKeydown,
      }
    },
  },
  watch: {
    localValue: {
      immediate: true,
      handler(val) {
        this.setFieldContent()
        this.MdSelect.modelValue = this.localValue
        if (this.didMount) {
          this.emitSelected(val)
        }
      },
    },
    multiple: {
      immediate: true,
      handler(isMultiple) {
        this.MdSelect.multiple = isMultiple
        this.$nextTick(this.initialLocalValueByDefault)
      },
    },
  },
  methods: {
    elHasScroll(el) {
      return el && el.scrollHeight > el.offsetHeight
    },
    scrollToSelectedOption(el, menu) {
      if (!el || !menu) return
      const top = el.offsetTop
      const elHeight = el.offsetHeight
      const menuHeight = menu.offsetHeight
      menu.scrollTop = top - (menuHeight - elHeight) / 2
    },
    setOffsets(target) {
      if (typeof window === "undefined") return
      const menu = this.$refs.menu && this.$refs.menu.$refs
        ? this.$refs.menu.$refs.container
        : null

      if (!menu) return

      const selected = target || menu.querySelector(".md-selected")

      if (selected) {
        this.scrollToSelectedOption(selected, menu)
        this.offset.y = defaultOffset.y - selected.offsetTop + menu.scrollTop + 8
        this.menuStyles = {
          "transform-origin": `0 ${Math.abs(this.offset.y)}px`,
        }
      } else {
        this.offset.y = defaultOffset.y + 1
        this.menuStyles = {}
      }
    },
    onMenuEnter() {
      if (!this.didMount) return
      this.setOffsets()
      if (this.MdField) {
        this.MdField.focused = true
      }
      this.$emit("md-opened")
    },
    applyHighlight() {
      if (this.MdField) {
        this.MdField.focused = false
        this.MdField.highlighted = true
      }
      const input = this.$refs.input
      if (input && input.$el) {
        input.$el.focus()
      }
    },
    onClose() {
      this.$emit("md-closed")
      if (this.didMount) {
        this.applyHighlight()
      }
    },
    onFocus(event) {
      if (event && typeof event.preventDefault === "function") {
        event.preventDefault()
      }
      if (this.didMount) {
        this.applyHighlight()
      }
    },
    removeHighlight(event) {
      if (event && typeof event.preventDefault === "function") {
        event.preventDefault()
      }
      if (this.MdField) {
        this.MdField.highlighted = false
      }
    },
    openSelect() {
      if (!this.disabled) {
        this.showSelect = true
      }
    },
    arrayAccessorRemove(arr, index) {
      const before = arr.slice(0, index)
      const after = arr.slice(index + 1)
      return before.concat(after)
    },
    toggleArrayValue(value) {
      if (!Array.isArray(this.localValue)) {
        this.localValue = []
      }
      const index = this.localValue.indexOf(value)
      const includes = index > -1
      if (!includes) {
        this.localValue = this.localValue.concat([value])
      } else {
        this.localValue = this.arrayAccessorRemove(this.localValue, index)
      }
    },
    setValue(newValue) {
      this.model = newValue
      this.setFieldValue()
      this.showSelect = false
    },
    setContent(newLabel) {
      this.MdSelect.label = newLabel
    },
    setContentByValue() {
      const textContent = this.MdSelect.items[this.localValue]
      if (textContent) {
        this.setContent(textContent)
      } else {
        this.setContent("")
      }
    },
    setMultipleValue(value) {
      this.toggleArrayValue(value)
      this.setFieldValue()
    },
    setMultipleContentByValue() {
      if (!this.localValue) {
        this.initialLocalValueByDefault()
      }
      const content = []
      ;(this.localValue || []).forEach((item) => {
        const textContent = this.MdSelect.items[item]
        if (textContent) {
          content.push(textContent)
        }
      })
      this.setContent(content.join(", "))
    },
    setFieldContent() {
      if (this.multiple) {
        this.setMultipleContentByValue()
      } else {
        this.setContentByValue()
      }
    },
    isLocalValueSet() {
      return this.localValue !== undefined && this.localValue !== null
    },
    setLocalValueIfMultiple() {
      if (this.isLocalValueSet()) {
        this.localValue = [this.localValue]
      } else {
        this.localValue = []
      }
    },
    setLocalValueIfNotMultiple() {
      if (Array.isArray(this.localValue) && this.localValue.length > 0) {
        this.localValue = this.localValue[0]
      } else {
        this.localValue = null
      }
    },
    initialLocalValueByDefault() {
      const isArray = Array.isArray(this.localValue)
      if (this.multiple && !isArray) {
        this.setLocalValueIfMultiple()
      } else if (!this.multiple && isArray) {
        this.setLocalValueIfNotMultiple()
      }
    },
    emitSelected(value) {
      this.$emit("md-selected", value)
    },
    isInvalidValue() {
      const select = this.$refs.selectEl
      return select && select.validity ? select.validity.badInput : false
    },
    onInputKeydown(event) {
      const key = event && event.key
      if (key === "ArrowDown" || key === "Enter" || key === " ") {
        if (event && typeof event.preventDefault === "function") {
          event.preventDefault()
        }
        this.openSelect()
      }
    },
  },
  mounted() {
    if (this.MdField) {
      this.MdField.select = true
    }
    this.showSelect = false
    this.setFieldContent()

    this.$nextTick(() => {
      this.didMount = true
    })
  },
  updated() {
    this.setFieldContent()
  },
  beforeUnmount() {
    if (this.MdField) {
      this.MdField.select = false
    }
  },
  render() {
    const attrs = this.$attrs || {}
    const nonEventAttrs = {}
    Object.keys(attrs).forEach((key) => {
      if (!key.startsWith("on")) {
        nonEventAttrs[key] = attrs[key]
      }
    })

    const menuProps = {
      class: ["md-select", { "md-disabled": this.disabled }],
      mdCloseOnSelect: false,
      mdActive: this.showSelect,
      mdOffsetX: this.offset.x,
      mdOffsetY: this.offset.y,
      mdDense: this.mdDense,
      "onUpdate:mdActive": (value) => {
        this.showSelect = value
      },
      onMdClosed: this.onClose,
    }

    const input = h(
      MdInput,
      mergeProps(
        {
          class: "md-input md-select-value",
          ref: "input",
          modelValue: this.MdSelect.label,
          readonly: true,
          disabled: this.disabled,
          required: this.required,
          placeholder: this.placeholder,
        },
        this.attrs,
        this.inputListeners,
        {
          "onUpdate:modelValue": (value) => {
            this.MdSelect.label = value
          },
          onFocus: this.onFocus,
          onBlur: this.removeHighlight,
          onClick: this.openSelect,
        }
      )
    )

    const icon = h(MdDropDownIcon, { onClick: this.openSelect })

    const getClonedSlotChildren = () => {
      if (!this.$slots.default) {
        return []
      }
      return this.$slots.default().map((vnode) => cloneVNode(vnode, {}, true))
    }

    const renderMenuContent = () =>
      h(
        MdMenuContent,
        {
          ref: "menu",
          class: "md-select-menu",
          mdContentClass: this.mdClass,
          style: this.menuStyles,
          onEnter: this.onMenuEnter,
        },
        {
          default: () => getClonedSlotChildren(),
        }
      )

    const keepAlive = h(KeepAlive, null, {
      default: () => (this.showSelect ? [renderMenuContent()] : []),
    })

    const hiddenSlot = !this.showSelect && this.$slots.default
      ? h(
          "div",
          {
            style: { display: "none" },
          },
          getClonedSlotChildren()
        )
      : null

    const fakeValue = Array.isArray(this.model) ? this.model.join(", ") : this.model

    const fakeInput = h("input", {
      class: "md-input-fake",
      value: fakeValue,
      disabled: this.disabled,
      readonly: true,
      tabindex: -1,
    })

    const hiddenSelect = h(
      "select",
      mergeProps(
        {
          value: this.model,
          tabindex: -1,
          ref: "selectEl",
          multiple: this.multiple,
        },
        this.attributes
      )
    )

    const children = [input, icon, keepAlive]
    if (hiddenSlot) {
      children.push(hiddenSlot)
    }
    children.push(fakeInput, hiddenSelect)

    return h(MdMenu, mergeProps(menuProps, nonEventAttrs), { default: () => children })
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-menu.md-select {
  display: flex;
  flex: 1;
  overflow: auto;

  &:not(.md-disabled) {
    .md-input,
    .md-icon {
      cursor: pointer;
      outline: none;
    }
  }

  .md-input {
    flex: 1;
    min-width: 0;
  }

  select,
  .md-input-fake {
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
    clip: rect(0 0 0 0);
    border: 0;
  }
}

.md-menu-content.md-select-menu {
  z-index: 111;
  width: 100%;

  &.md-menu-content-enter {
    transform: translate3d(0, -8px, 0) scaleY(.3);
  }

  .md-list {
    transition: opacity .3s $md-transition-drop-timing;
  }
}
</style>
