<script>
import { h, mergeProps, Transition } from "vue"
import MdComponent from "@/core/MdComponent"
import MdObserveEvent from "@/core/utils/MdObserveEvent"
import MdResizeObserver from "@/core/utils/MdResizeObserver"
import MdContains from "@/core/utils/MdContains"
import MdPopover from "@/components/MdPopover/MdPopover.vue"
import MdList from "@/components/MdList/MdList.vue"

export default MdComponent({
  name: "MdMenuContent",
  components: {
    MdPopover,
    MdList,
  },
  props: {
    mdListClass: [String, Boolean, Array, Object],
    mdContentClass: [String, Boolean, Array, Object],
  },
  inject: ["MdMenu"],
  data: () => ({
    highlightIndex: -1,
    didMount: false,
    highlightItems: [],
    popperSettings: null,
    menuStyles: "",
    _keydownHandler: null,
  }),
  computed: {
    filteredAttrs() {
      const attrs = { ...(this.$attrs || {}) }
      delete attrs.id
      Object.keys(attrs).forEach((key) => {
        if (key.startsWith("on") && typeof attrs[key] === "function") {
          delete attrs[key]
        }
      })
      return attrs
    },
    transitionListeners() {
      const listeners = {}
      Object.keys(this.$attrs || {}).forEach((key) => {
        const handler = this.$attrs[key]
        if (key.startsWith("on") && typeof handler === "function") {
          listeners[key] = handler
        }
      })
      return listeners
    },
    highlightedItem() {
      if (this.highlightIndex < 0) return null
      return this.highlightItems[this.highlightIndex] || null
    },
    shouldRender() {
      return !!(this.MdMenu && this.MdMenu.active)
    },
    menuClasses() {
      const prefix = "md-menu-content-"
      const obj = {
        [prefix + this.MdMenu.direction]: true,
        [prefix + this.MdMenu.size]: true,
        "md-menu-content": this.didMount,
        "md-shallow": !this.didMount,
      }
      return obj
    },
    listClasses() {
      const dense = { "md-dense": !!(this.MdMenu && this.MdMenu.dense) }
      const extra = this.mdListClass
      if (!extra) {
        return dense
      }
      if (Array.isArray(extra)) {
        return [dense, ...extra]
      }
      if (typeof extra === "string") {
        return [dense, extra]
      }
      if (typeof extra === "object") {
        return { ...dense, ...extra }
      }
      return dense
    },
  },
  watch: {
    shouldRender(shouldRender) {
      if (shouldRender) {
        this.setPopperSettings()
        setTimeout(() => {
          this.setInitialHighlightIndex()
          this.createClickEventObserver()
          this.createResizeObserver()
          this.createKeydownListener()
        }, 0)
      } else {
        this.highlightIndex = -1
        this.clearAllHighlights()
        this.destroyClickEventObserver()
        this.destroyResizeObserver()
        this.destroyKeyDownListener()
      }
    },
  },
  methods: {
    splitAttrs(target) {
      const attrs = target || {}
      const listeners = {}
      const nonEvents = {}
      Object.keys(attrs).forEach((key) => {
        if (key.startsWith("on") && typeof attrs[key] === "function") {
          listeners[key] = attrs[key]
        } else {
          nonEvents[key] = attrs[key]
        }
      })
      return { listeners, attrs: nonEvents }
    },
    getHighlightItems() {
      if (!this.MdMenu || !Array.isArray(this.MdMenu.items)) {
        return []
      }
      return this.MdMenu.items.filter((item) => item && item.isHighlightable && item.isHighlightable())
    },
    setPopperSettings() {
      if (!this.MdMenu) return
      const { direction } = this.MdMenu
      let { offsetX, offsetY } = this.getOffsets()

      if (!this.hasCustomOffsets()) {
        if (this.MdMenu.instance && this.MdMenu.instance.$el && this.MdMenu.instance.$el.offsetHeight) {
          offsetY = -this.MdMenu.instance.$el.offsetHeight - 11
        }
        if (direction.includes("start")) {
          offsetX = -8
        } else if (direction.includes("end")) {
          offsetX = 8
        }
      }

      this.popperSettings = {
        placement: direction,
        modifiers: {
          keepTogether: { enabled: true },
          flip: { enabled: false },
          offset: { offset: `${offsetX}, ${offsetY}` },
        },
      }
    },
    setInitialHighlightIndex() {
      this.setHighlightItems()
      this.highlightItems.forEach((item, index) => {
        const container = item.getContainer && item.getContainer()
        if (container && container.classList.contains("md-selected")) {
          this.highlightIndex = index - 1
        }
      })
    },
    setHighlightItems() {
      this.highlightItems = this.getHighlightItems()
      if (this.highlightIndex >= this.highlightItems.length) {
        this.highlightIndex = this.highlightItems.length - 1
      }
    },
    setHighlight(direction) {
      this.setHighlightItems()
      const max = this.highlightItems.length - 1
      if (max < 0) return
      if (direction === "down") {
        if (this.highlightIndex >= max) {
          this.highlightIndex = 0
        } else {
          this.highlightIndex += 1
        }
      } else if (direction === "up") {
        if (this.highlightIndex <= 0) {
          this.highlightIndex = max
        } else {
          this.highlightIndex -= 1
        }
      }
      this.clearAllHighlights()
      this.setItemHighlight()
    },
    clearAllHighlights() {
      this.highlightItems.forEach((item) => {
        if (item && item.setHighlighted) {
          item.setHighlighted(false)
        }
      })
    },
    setItemHighlight() {
      const item = this.highlightedItem
      if (!item || !item.setHighlighted) return
      item.setHighlighted(true)
      const container = item.getContainer ? item.getContainer() : null
      if (container && this.$parent && this.$parent.$parent && typeof this.$parent.$parent.setOffsets === "function") {
        this.$parent.$parent.setOffsets(container.parentNode || container)
      }
    },
    setScroll() {
      const container = this.highlightedItem && this.highlightedItem.getContainer && this.highlightedItem.getContainer()
      if (!container || !this.$refs.container) return
      const menu = this.$refs.container
      const height = menu.offsetHeight
      const top = container.offsetTop
      const bottom = top + container.offsetHeight
      if (top < menu.scrollTop) {
        menu.scrollTop = top
      } else if (bottom > menu.scrollTop + height) {
        menu.scrollTop = bottom - height
      }
    },
    createClickEventObserver() {
      if (typeof document === "undefined") return
      this.destroyClickEventObserver()
      this.MdMenu.bodyClickObserver = MdObserveEvent(document.body, "click", (event) => {
        event.stopPropagation()
        const menuRef = this.$refs.menu
        if (!menuRef) return
        const isMenu = this.MdMenu.$el ? MdContains(this.MdMenu.$el, event.target) : false
        const isContent = MdContains(menuRef, event.target)
        if (!isMenu && (this.MdMenu.closeOnClick || !isContent)) {
          this.MdMenu.active = false
          this.destroyClickEventObserver()
          this.destroyResizeObserver()
          this.destroyKeyDownListener()
        }
      })
    },
    destroyClickEventObserver() {
      if (this.MdMenu && this.MdMenu.bodyClickObserver && this.MdMenu.bodyClickObserver.destroy) {
        this.MdMenu.bodyClickObserver.destroy()
      }
      if (this.MdMenu) {
        this.MdMenu.bodyClickObserver = null
      }
    },
    createKeydownListener() {
      if (typeof window === "undefined") return
      this.destroyKeyDownListener()
      if (!this._keydownHandler) {
        this._keydownHandler = (event) => this.keyNavigation(event)
      }
      window.addEventListener("keydown", this._keydownHandler)
    },
    destroyKeyDownListener() {
      if (typeof window === "undefined" || !this._keydownHandler) return
      window.removeEventListener("keydown", this._keydownHandler)
    },
    keyNavigation(event) {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault()
          this.setHighlight("up")
          this.setScroll()
          break
        case "ArrowDown":
          event.preventDefault()
          this.setHighlight("down")
          this.setScroll()
          break
        case "Enter":
        case " ":
          if (this.highlightedItem && this.highlightedItem.triggerClick) {
            event.preventDefault()
            this.highlightedItem.triggerClick()
          }
          break
        case "Escape":
          this.onEsc()
          break
        default:
          break
      }
    },
    createResizeObserver() {
      this.destroyResizeObserver()
      this.MdMenu.windowResizeObserver = MdResizeObserver(window, () => {
        this.setStyles()
      })
    },
    destroyResizeObserver() {
      if (this.MdMenu && this.MdMenu.windowResizeObserver && this.MdMenu.windowResizeObserver.destroy) {
        this.MdMenu.windowResizeObserver.destroy()
      }
      if (this.MdMenu) {
        this.MdMenu.windowResizeObserver = null
      }
    },
    onEsc() {
      if (this.MdMenu) {
        this.MdMenu.active = false
      }
      this.destroyKeyDownListener()
    },
    getOffsets() {
      if (!this.MdMenu) {
        return { offsetX: 0, offsetY: 0 }
      }
      const relative = this.getBodyPosition()
      const offsetX = (this.MdMenu.offsetX || 0) - relative.x
      const offsetY = (this.MdMenu.offsetY || 0) - relative.y
      return { offsetX, offsetY }
    },
    hasCustomOffsets() {
      if (!this.MdMenu) return false
      const { offsetX, offsetY, alignTrigger } = this.MdMenu
      return Boolean(alignTrigger || offsetX || offsetY)
    },
    getBodyPosition() {
      if (typeof document === "undefined") {
        return { x: 0, y: 0 }
      }
      const body = document.body
      const { top, left } = body.getBoundingClientRect()
      const scrollLeft = window.pageXOffset !== undefined ? window.pageXOffset : body.scrollLeft
      const scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : body.scrollTop
      return { x: left + scrollLeft, y: top + scrollTop }
    },
    setStyles() {
      if (this.MdMenu && this.MdMenu.fullWidth && this.MdMenu.instance && this.MdMenu.instance.$el) {
        const width = this.MdMenu.instance.$el.offsetWidth
        this.menuStyles = `width:${width}px;max-width:${width}px`
      } else {
        this.menuStyles = ""
      }
    },
  },
  mounted() {
    this.setPopperSettings()
    this.setStyles()
    this.$nextTick(() => {
      this.setHighlightItems()
      this.didMount = true
    })
    if (this.MdMenu) {
      this.$watch(
        () => this.MdMenu.direction,
        () => this.setPopperSettings()
      )
      this.$watch(
        () => this.MdMenu.alignTrigger,
        () => this.setPopperSettings()
      )
      this.$watch(
        () => this.MdMenu.offsetX,
        () => this.setPopperSettings()
      )
      this.$watch(
        () => this.MdMenu.offsetY,
        () => this.setPopperSettings()
      )
    }
  },
  beforeUnmount() {
    this.destroyClickEventObserver()
    this.destroyResizeObserver()
    this.destroyKeyDownListener()
  },
  render() {
    const renderMenu = () => {
      const listSlot = this.$slots.default ? this.$slots.default : undefined

      const listVNode = h(
        MdList,
        mergeProps({ class: this.listClasses }, this.filteredAttrs),
        listSlot
      )

      const container = h(
        "div",
        { class: ["md-menu-content-container", "md-scrollbar", this.$mdActiveTheme], ref: "container" },
        [listVNode]
      )

      return h(
        "div",
        {
          class: [this.menuClasses, this.mdContentClass, this.$mdActiveTheme],
          style: this.menuStyles,
          ref: "menu",
        },
        [container]
      )
    }

    const renderTransition = () =>
      h(
        Transition,
        mergeProps({ name: "md-menu-content", css: this.didMount }, this.transitionListeners),
        { default: () => [renderMenu()] }
      )

    return h(
      MdPopover,
      { mdSettings: this.popperSettings, mdActive: this.shouldRender },
      {
        default: () => (this.shouldRender ? [renderTransition()] : []),
      }
    )
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdElevation/mixins";
@import "@/components/MdLayout/mixins";

$md-menu-base-width: 56px;

.md-menu-content {
  @include md-elevation(8);
  min-width: $md-menu-base-width * 2;
  max-width: $md-menu-base-width * 5;
  max-height: 35vh;
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 60;
  border-radius: 2px;
  transition: transform .2s $md-transition-stand-timing,
              opacity .3s $md-transition-stand-timing;
  will-change: opacity, transform, top, left !important;

  &.md-shallow {
    position: fixed !important;
    top: -9999em !important;
    left: -9999em !important;
    pointer-events: none;
  }

  &.md-menu-content-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &.md-menu-content-leave-active {
    transition: opacity .4s $md-transition-default-timing;
    opacity: 0;
  }

  &.md-menu-content-enter {
    &.md-menu-content-top-start {
      transform-origin: bottom left;
      transform: translate3d(0, 8px, 0) scaleY(.95);
    }

    &.md-menu-content-top-end {
      transform-origin: bottom right;
      transform: translate3d(0, 8px, 0) scaleY(.95);
    }

    &.md-menu-content-right-start {
      transform-origin: left top;
      transform: translate3d(0, -8px, 0) scaleY(.95);
    }

    &.md-menu-content-right-end {
      transform-origin: left bottom;
      transform: translate3d(0, 8px, 0) scaleY(.95);
    }

    &.md-menu-content-bottom-start {
      transform-origin: top left;
      transform: translate3d(0, -8px, 0) scaleY(.95);
    }

    &.md-menu-content-bottom-end {
      transform-origin: top right;
      transform: translate3d(0, -8px, 0) scaleY(.95);
    }

    &.md-menu-content-left-start {
      transform-origin: right top;
      transform: translate3d(0, -8px, 0) scaleY(.95);
    }

    &.md-menu-content-left-end {
      transform-origin: right bottom;
      transform: translate3d(0, 8px, 0) scaleY(.95);
    }

    .md-list {
      opacity: 0;
    }
  }

  &.md-menu-content-medium {
    min-width: $md-menu-base-width * 3;
  }

  &.md-menu-content-big {
    min-width: $md-menu-base-width * 4;
  }

  &.md-menu-content-huge {
    min-width: $md-menu-base-width * 5;
  }
}

.md-menu-content-container {
  flex: 1;
  overflow: auto;

  .md-list {
    transition: opacity .3s $md-transition-stand-timing;
    will-change: opacity;
    font-family: 'Roboto', sans-serif;
    text-transform: none;
    white-space: nowrap;

    .md-list-item-container {
      height: 100%;
    }

    @include md-layout-small {
      font-size: 14px;
    }
  }
}
</style>
