<script>
import { h, mergeProps } from "vue"
import MdComponent from "@/core/MdComponent"
import MdUuid from "@/core/utils/MdUuid"
import MdFieldMixin from "../MdFieldMixin"

const extractListeners = (attrs = {}) => {
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
  name: "MdInput",
  inheritAttrs: false,
  mixins: [MdFieldMixin],
  inject: ["MdField"],
  props: {
    id: {
      type: String,
      default: () => "md-input-" + MdUuid(),
    },
    type: {
      type: String,
      default: "text",
    },
  },
  computed: {
    toggleType() {
      return this.MdField.togglePassword
    },
    isPassword() {
      return this.type === "password"
    },
    inputListeners() {
      const listeners = extractListeners(this.$attrs)
      delete listeners.onInput
      delete listeners.onUpdateModelValue
      return listeners
    },
  },
  watch: {
    type() {
      this.setPassword(this.isPassword)
    },
    toggleType(toggle) {
      if (toggle) {
        this.setTypeText()
      } else {
        this.setTypePassword()
      }
    },
  },
  methods: {
    setPassword(state) {
      this.MdField.password = state
      this.MdField.togglePassword = false
    },
    setTypePassword() {
      if (this.$el) {
        this.$el.type = "password"
      }
    },
    setTypeText() {
      if (this.$el) {
        this.$el.type = "text"
      }
    },
  },
  created() {
    this.setPassword(this.isPassword)
  },
  beforeUnmount() {
    this.setPassword(false)
  },
  render() {
    return h(
      "input",
      mergeProps(
        { class: "md-input" },
        this.attributes,
        this.inputListeners,
        {
          value: this.model,
          onInput: (event) => {
            this.model = event && event.target ? event.target.value : event
          },
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

