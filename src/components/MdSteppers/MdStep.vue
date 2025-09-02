<script>
import { h } from "vue"
import MdUuid from "@/core/utils/MdUuid"
import MdRouterLink from "@/core/mixins/MdRouterLink/MdRouterLink"
import MdStepHeader from "./MdStepHeader.vue"

export default {
  name: "MdStep",
  components: { MdStepHeader },
  mixins: [MdRouterLink],
  props: {
    id: {
      type: String,
      default: () => "md-stepper-" + MdUuid(),
    },
    href: [String, Number],
    mdLabel: String,
    mdDescription: String,
    mdError: String,
    mdDone: Boolean,
    mdEditable: { type: Boolean, default: true },
  },
  inject: ["MdSteppers"],
  computed: {
    isActive() {
      return this.id === this.MdSteppers.activeStep
    },
    tabIndex() {
      return !this.isActive ? -1 : false
    },
  },
  watch: {
    $props: {
      deep: true,
      handler() {
        this.setStepperData()
      },
    },
  },
  methods: {
    getPropValues() {
      const propNames = Object.keys(this.$options.props)
      const ignoredProps = [
        "id",
        "mdLabel",
        "mdDescription",
        "mdError",
        "mdEditable",
        "mdDone",
      ]
      const values = {}
      propNames.forEach((prop) => {
        if (!ignoredProps.includes(prop)) {
          if (this[prop] !== undefined && this[prop] !== null && this[prop] !== false) {
            values[prop] = this[prop]
          } else if (this.$attrs && Object.prototype.hasOwnProperty.call(this.$attrs, prop)) {
            const v = this.$attrs[prop]
            values[prop] = v === "" ? true : v
          }
        }
      })
      return values
    },
    collectEvents() {
      const events = {}
      if (this.$attrs) {
        Object.keys(this.$attrs).forEach((key) => {
          if (/^on[A-Z]/.test(key)) {
            events[key] = this.$attrs[key]
          }
        })
      }
      return events
    },
    setStepperData() {
      const items = this.MdSteppers.items
      items[this.id] = {
        ...(items[this.id] || {}),
        label: this.mdLabel,
        description: this.mdDescription,
        error: this.mdError,
        done: this.mdDone,
        editable: this.mdEditable,
        props: this.getPropValues(),
        events: this.collectEvents(),
      }
    },
    setupWatchers() {
      const getProp = (prop) => {
        if (this.MdSteppers.items[this.id]) {
          return this.MdSteppers.items[this.id][prop]
        }
      }
      this.$watch(
        () => getProp("error"),
        () => this.$emit("update:mdError", getProp("error"))
      )
      this.$watch(
        () => getProp("done"),
        () => this.$emit("update:mdDone", getProp("done"))
      )
    },
  },
  created() {
    this.setStepperData()
    this.setupWatchers()
  },
  beforeUnmount() {
    delete this.MdSteppers.items[this.id]
  },
  render() {
    const children = []
    if (this.MdSteppers.isVertical) {
      children.push(h(MdStepHeader, { index: this.id, key: `${this.id}-header` }))
    }
    children.push(
      h(
        "div",
        { class: ["md-stepper-content", { "md-active": this.isActive }], tabindex: this.tabIndex, style: this.isActive ? {} : { display: "none" } },
        this.$slots.default ? this.$slots.default() : []
      )
    )
    return h(
      "div",
      {
        class: "md-stepper",
        id: this.id,
      },
      children
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-steppers.md-vertical .md-stepper-content {
  padding: 0 24px 0 60px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translate3D(0, -20px, 0);
  transition: 0.35s $md-transition-stand-timing;
  transition-property: opacity, transform, height, padding-bottom;
  will-change: opacity, transform, height, padding-bottom;

  &.md-active {
    height: auto;
    padding-bottom: 40px;
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }
}
</style>

