<script>
import { h, mergeProps } from "vue"
import MdComponent from "@/core/MdComponent"
import MdUuid from "@/core/utils/MdUuid"
import MdFieldMixin from "../MdFieldMixin"

function calculateContentHeight(el, lineHeight) {
  const originalHeight = el.style.height
  const height = el.offsetHeight
  const scrollHeight = el.scrollHeight

  el.style.overflow = "hidden"

  if (height >= scrollHeight) {
    el.style.height = height + lineHeight + "px"

    if (scrollHeight < el.scrollHeight) {
      el.style.height = originalHeight
      return height
    }
  }

  return scrollHeight
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

export default MdComponent({
  name: "MdTextarea",
  inheritAttrs: false,
  mixins: [MdFieldMixin],
  inject: ["MdField"],
  props: {
    id: {
      type: String,
      default: () => "md-textarea-" + MdUuid(),
    },
    mdAutogrow: Boolean,
  },
  computed: {
    textareaListeners() {
      return {
        ...getListeners(this.$attrs),
        onInput: this.onInput,
      }
    },
    textareaStyles() {
      return {
        height: this.textareaHeight,
      }
    },
  },
  methods: {
    getTextAreaLineSize() {
      if (typeof window === "undefined" || !this.$el) {
        return 0
      }
      const style = window.getComputedStyle(this.$el)
      return parseInt(style.lineHeight, 10)
    },
    setTextAreaSize(height) {
      let newHeight = height

      if (!newHeight) {
        const size = this.getTextAreaLineSize()
        if (!size) {
          this.textareaHeight = null
          return
        }
        newHeight = calculateContentHeight(this.$el, size)
      }

      this.textareaHeight = `${newHeight}px`
    },
    applyStyles() {
      if (!this.mdAutogrow || typeof window === "undefined") return

      this.setTextAreaSize(32)
      this.$nextTick(() => {
        this.setTextAreaSize()
        window.setTimeout(() => {
          if (this.$el) {
            this.$el.style.overflow = "auto"
          }
        }, 10)
      })
    },
    setTextarea() {
      this.MdField.textarea = true
    },
    setAutogrow() {
      this.MdField.autogrow = this.mdAutogrow
    },
    onInput(event) {
      const value = event && event.target ? event.target.value : event
      this.model = value
      this.setFieldValue()
    },
  },
  watch: {
    localValue() {
      this.applyStyles()
    },
    mdAutogrow() {
      this.setAutogrow()
      this.applyStyles()
    },
  },
  created() {
    this.setTextarea()
    this.setAutogrow()
  },
  mounted() {
    this.$nextTick(() => {
      this.applyStyles()
    })
  },
  beforeUnmount() {
    this.setTextarea(false)
  },
  render() {
    return h(
      "textarea",
      mergeProps(
        { class: "md-textarea", style: this.textareaStyles },
        this.attributes,
        this.textareaListeners,
        {
          value: this.model,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
        }
      )
    )
  },
})
</script>

<style lang="scss">

</style>

