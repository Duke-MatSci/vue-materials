<script>
import { h, mergeProps, Transition, nextTick } from "vue"
import Popper from "popper.js"
import deepmerge from "deepmerge"
import MdComponent from "@/core/MdComponent"
import MdObserveEvent from "@/core/utils/MdObserveEvent"
import MdResizeObserver from "@/core/utils/MdResizeObserver"
import MdContains from "@/core/utils/MdContains"
import MdPortal from "@/components/MdPortal/MdPortal.vue"
import MdList from "@/components/MdList/MdList.vue"

export default MdComponent({
  name: "MdMenuContent",
  inheritAttrs: false,
  components: {
    MdPortal,
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
    popperInstance: null,
    anchorEl: null,
    menuEl: null,
    shouldActivate: false,
  }),
  computed: {
    filteredAttrs() {
      const attrs = { ...(this.$attrs || {}) }
      delete attrs.id
      delete attrs.class
      delete attrs.style
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

      // Merge class from $attrs (e.g., "md-select-menu" from MdSelect)
      const attrClass = this.$attrs.class
      if (attrClass) {
        if (typeof attrClass === 'string') {
          attrClass.split(' ').filter(c => c).forEach(c => obj[c] = true)
        } else if (Array.isArray(attrClass)) {
          attrClass.forEach(c => {
            if (typeof c === 'string') {
              c.split(' ').filter(s => s).forEach(s => obj[s] = true)
            } else if (typeof c === 'object') {
              Object.assign(obj, c)
            }
          })
        } else if (typeof attrClass === 'object') {
          Object.assign(obj, attrClass)
        }
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
        nextTick(() => {
          if (this.anchorEl && this.menuEl) {
            this.createPopper()
          }
          this.setInitialHighlightIndex()
          this.createClickEventObserver()
          this.createResizeObserver()
          this.createKeydownListener()
        })
      } else {
        this.shouldActivate = false
        this.highlightIndex = -1
        this.clearAllHighlights()
        this.destroyClickEventObserver()
        this.destroyResizeObserver()
        this.destroyKeyDownListener()
        this.killPopper()
      }
    },
    popperSettings: {
      deep: true,
      handler() {
        if (this.popperInstance) {
          this.createPopper()
        }
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
        // Use this.menuEl instead of this.$refs.menu because the element is teleported
        const menuEl = this.menuEl
        if (!menuEl) {
          return
        }

        // Check if click is inside the menu trigger element
        const isMenu = this.MdMenu.$el && MdContains(this.MdMenu.$el, event.target)
        // Check if click is inside the menu content (dropdown)
        const isContent = MdContains(menuEl, event.target)

        // Close if: closeOnClick is enabled, OR click is outside both trigger and content
        if (this.MdMenu.closeOnClick || (!isMenu && !isContent)) {
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
    getPopperOptions() {
      return {
        placement: "bottom",
        modifiers: {
          preventOverflow: { boundariesElement: "viewport", padding: 16 },
          computeStyle: { gpuAcceleration: false },
        },
        onCreate: () => {
          this.shouldActivate = true
        },
      }
    },
    killPopper() {
      if (this.popperInstance) {
        this.popperInstance.destroy()
        this.popperInstance = null
      }
    },
    createPopper() {
      const options = deepmerge(this.getPopperOptions(), this.popperSettings || {})
      if (this.menuEl && this.anchorEl) {
        this.killPopper()
        this.popperInstance = new Popper(this.anchorEl, this.menuEl, options)
      }
    },
    handleAnchorMount(vnode) {
      // Use MdMenu.$el as the anchor for positioning, not the teleport span
      this.anchorEl = this.MdMenu && this.MdMenu.$el ? this.MdMenu.$el : null
      if (this.shouldRender && this.anchorEl && this.menuEl) {
        nextTick(() => this.createPopper())
      }
    },
    handleMenuMount(vnode) {
      this.menuEl = vnode && vnode.el ? vnode.el : null
      if (this.shouldRender && this.anchorEl && this.menuEl) {
        nextTick(() => this.createPopper())
      }
    },
    handleMenuUnmount() {
      this.menuEl = null
      this.killPopper()
    },
  },
  mounted() {
    this.setPopperSettings()
    this.setStyles()
    this.$nextTick(() => {
      this.setHighlightItems()
      this.didMount = true
      // Ensure anchorEl is set after MdMenu has mounted
      if (this.MdMenu && this.MdMenu.$el && !this.anchorEl) {
        this.anchorEl = this.MdMenu.$el
        if (this.shouldRender && this.menuEl) {
          this.createPopper()
        }
      }
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
      // Watch for MdMenu.$el to be set
      this.$watch(
        () => this.MdMenu.$el,
        (newEl) => {
          if (newEl && !this.anchorEl) {
            this.anchorEl = newEl
            if (this.shouldRender && this.menuEl) {
              this.createPopper()
            }
          }
        },
        { immediate: true }
      )
    }
  },
  beforeUnmount() {
    this.destroyClickEventObserver()
    this.destroyResizeObserver()
    this.destroyKeyDownListener()
    this.killPopper()
  },
  render() {
    const renderMenu = () => {
      const listSlot = this.$slots.default ? this.$slots.default : undefined

      const listVNode = h(
        MdList,
        mergeProps({ class: this.listClasses, mdTheme: this.$mdActiveTheme }, this.filteredAttrs),
        listSlot
      )

      const container = h(
        "div",
        { class: ["md-menu-content-container", "md-scrollbar", this.$mdActiveTheme], ref: "container" },
        [listVNode]
      )

      // Merge styles from $attrs with menuStyles
      let combinedStyles = {}

      // Parse menuStyles if it's a string
      if (typeof this.menuStyles === 'string') {
        this.menuStyles.split(';').forEach(rule => {
          const [key, value] = rule.split(':').map(s => s.trim())
          if (key && value) combinedStyles[key] = value
        })
      } else if (typeof this.menuStyles === 'object') {
        combinedStyles = { ...this.menuStyles }
      }

      // Merge $attrs.style
      const attrStyle = this.$attrs.style
      if (attrStyle) {
        if (typeof attrStyle === 'string') {
          attrStyle.split(';').forEach(rule => {
            const [key, value] = rule.split(':').map(s => s.trim())
            if (key && value) combinedStyles[key] = value
          })
        } else if (typeof attrStyle === 'object') {
          combinedStyles = { ...combinedStyles, ...attrStyle }
        }
      }

      return h(
        "div",
        {
          class: [this.menuClasses, this.mdContentClass, this.$mdActiveTheme],
          style: combinedStyles,
          ref: "menu",
          onVnodeMounted: this.handleMenuMount,
          onVnodeUnmounted: this.handleMenuUnmount,
        },
        [container]
      )
    }

    const renderTransition = () =>
      h(
        Transition,
        mergeProps({ name: "md-menu-content", css: this.didMount }, this.transitionListeners),
        { default: () => (this.shouldRender ? [renderMenu()] : []) }
      )

    const portal = h(
      MdPortal,
      { mdTarget: typeof document !== "undefined" ? document.body : null },
      { default: () => (this.shouldRender ? [renderTransition()] : []) }
    )

    // Anchor element
    return h(
      "span",
      {
        style: { display: "contents" },
        onVnodeMounted: this.handleAnchorMount
      },
      [portal]
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
