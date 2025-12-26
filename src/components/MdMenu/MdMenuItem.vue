<script>
import { h, mergeProps } from "vue"
import MdComponent from "@/core/MdComponent"
import MdInteractionEvents from "@/core/utils/MdInteractionEvents"
import MdListItem from "@/components/MdList/MdListItem/MdListItem.vue"

export default MdComponent({
  name: "MdMenuItem",
  components: { MdListItem },
  props: {
    disabled: Boolean,
  },
  inject: ["MdMenu"],
  data: () => ({
    highlighted: false,
    containerEl: null,
    anchorListener: null,
  }),
  computed: {
    itemClasses() {
      return {
        "md-highlight": this.highlighted,
      }
    },
  },
  methods: {
    splitAttrs() {
      const attrs = this.$attrs || {}
      const events = {}
      const nonEvents = {}
      Object.keys(attrs).forEach((key) => {
        const value = attrs[key]
        if (key.startsWith("on") && typeof value === "function") {
          events[key] = value
        } else {
          nonEvents[key] = value
        }
      })
      return { events, attrs: nonEvents }
    },
    getEventName(key) {
      if (key.startsWith("on") && key.length > 2) {
        const lower = key.slice(2)
        return lower.charAt(0).toLowerCase() + lower.slice(1)
      }
      return key
    },
    closeMenu() {
      if (!this.MdMenu) return
      this.MdMenu.active = false
      if (this.MdMenu.bodyClickObserver && this.MdMenu.bodyClickObserver.destroy) {
        this.MdMenu.bodyClickObserver.destroy()
        this.MdMenu.bodyClickObserver = null
      }
    },
    triggerCloseMenu() {
      if (!this.disabled) {
        this.closeMenu()
      }
    },
    setHighlighted(state) {
      this.highlighted = !!state
    },
    getContainer() {
      return this.containerEl
    },
    isHighlightable() {
      const container = this.containerEl
      if (!container) return false
      if (container.classList.contains("md-list-item-default")) return false
      if (container.hasAttribute("disabled")) return false
      return true
    },
    triggerClick() {
      if (this.containerEl) {
        this.containerEl.click()
      }
    },
    registerItem() {
      if (this.MdMenu && typeof this.MdMenu.registerItem === "function") {
        this.MdMenu.registerItem(this)
      }
    },
    unregisterItem() {
      if (this.MdMenu && typeof this.MdMenu.unregisterItem === "function") {
        this.MdMenu.unregisterItem(this)
      }
    },
    setupAnchorListener() {
      const root = this.$el
      if (!root || !root.children || !root.children[0]) return
      const element = root.children[0]
      if (element.tagName && element.tagName.toUpperCase() === "A") {
        const handler = () => this.triggerCloseMenu()
        element.addEventListener("click", handler)
        this.anchorListener = { element, handler }
      }
    },
    teardownAnchorListener() {
      if (this.anchorListener && this.anchorListener.element) {
        this.anchorListener.element.removeEventListener("click", this.anchorListener.handler)
      }
      this.anchorListener = null
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$el && this.$el.querySelector) {
        this.containerEl = this.$el.querySelector(".md-list-item-container")
      }
      this.registerItem()
      this.setupAnchorListener()
    })
  },
  beforeUnmount() {
    this.teardownAnchorListener()
    this.unregisterItem()
  },
  render() {
    const { events, attrs } = this.splitAttrs()
    const listeners = {}

    Object.keys(events).forEach((key) => {
      const handler = events[key]
      if (this.disabled) {
        listeners[key] = handler
        return
      }
      const eventName = this.getEventName(key)
      const lower = eventName.toLowerCase()
      const shouldClose =
        MdInteractionEvents.includes(key) ||
        MdInteractionEvents.includes(eventName) ||
        MdInteractionEvents.includes(lower)
      if (this.MdMenu && this.MdMenu.closeOnSelect && shouldClose) {
        listeners[key] = (...args) => {
          handler(...args)
          this.closeMenu()
        }
      } else {
        listeners[key] = handler
      }
    })

    const tabIndex = this.highlighted ? -1 : attrs.tabindex
    if (tabIndex !== undefined) {
      delete attrs.tabindex
    }

    return h(
      MdListItem,
      mergeProps(
        {
          class: ["md-menu-item", this.itemClasses, this.$mdActiveTheme],
          disabled: this.disabled,
          tabindex: tabIndex,
        },
        attrs,
        listeners
      ),
      {
        default: () => (this.$slots.default ? this.$slots.default() : []),
      }
    )
  },
})
</script>

<style lang="scss">
/* styling covered by theme */
</style>
