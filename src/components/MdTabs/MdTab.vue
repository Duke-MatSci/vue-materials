<script>
import { h, nextTick } from "vue"
import MdRouterLinkProps from "@/core/utils/MdRouterLinkProps"
import MdObserveElement from "@/core/utils/MdObserveElement"
import MdUuid from "@/core/utils/MdUuid"

export default {
  name: "MdTab",
  inject: ["MdTabs"],
  props: {
    id: { type: [String, Number], default: () => `md-tab-${MdUuid()}` },
    href: [String, Number],
    mdDisabled: Boolean,
    mdLabel: [String, Number],
    mdIcon: String,
    mdTemplateData: { type: Object, default: () => ({}) },
    to: [String, Object],
  },
  data: () => ({ observer: null }),
  watch: {
    $props: {
      deep: true,
      handler() { this.setTabData() },
    },
    $attrs: {
      deep: true,
      handler() { this.setTabData() },
    },
  },
  methods: {
    setTabContent() {
      const entry = this.MdTabs.items.get(this.id)
      if (entry) entry.hasContent = !!this.$slots.default
    },
    setupObserver() {
      this.observer = MdObserveElement(this.$el, { childList: true }, this.setTabContent)
    },
    setTabData() {
      this.$el && (this.$el.mdTabIdAsObject = this.id)
      this.MdTabs.items = new Map(
        this.MdTabs.items.set(this.id, {
          id: this.id,
          hasContent: !!(this.$slots.default),
          label: this.mdLabel,
          icon: this.mdIcon,
          disabled: this.mdDisabled,
          data: this.mdTemplateData,
          props: this.getPropValues(),
          events: this.$attrs,
        })
      )
    },
    getPropValues() {
      const propNames = Object.keys(this.$options.props)
      const ignored = ["id", "mdLabel", "mdDisabled", "mdTemplateData"]
      const values = {}
      propNames.forEach((prop) => {
        if (!ignored.includes(prop)) {
          if (this[prop]) {
            values[prop] = this[prop]
          } else if (Object.prototype.hasOwnProperty.call(this.$attrs, prop)) {
            values[prop] = this.$attrs[prop] || true
          }
        }
      })
      return values
    },
  },
  mounted() {
    this.setupObserver()
    this.setTabData()
  },
  beforeUnmount() {
    this.observer && this.observer.disconnect()
    this.MdTabs.items.delete(this.id)
    this.MdTabs.items = new Map(this.MdTabs.items)
  },
  render() {
    let attrs = { class: "md-tab", ...this.$attrs, id: this.id }
    // Avoid accessing this.$router when not installed (Vue 3 dev warning)
    const gp = (this.$ && this.$.appContext && this.$.appContext.config && this.$.appContext.config.globalProperties) || {}
    const hasRouter = !!gp.$router
    if (hasRouter && this.to) {
      this.$options.props = MdRouterLinkProps(this, this.$options.props)
      attrs.props = this.$props
    }
    return h("div", attrs, this.$slots.default ? this.$slots.default() : [])
  },
}
</script>
