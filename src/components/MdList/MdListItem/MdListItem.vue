<script>
import { h } from "vue"
import MdInteractionEvents from "@/core/utils/MdInteractionEvents"
import MdListItemDefault from "./MdListItemDefault.vue"
import MdListItemFakeButton from "./MdListItemFakeButton.vue"
import MdListItemButton from "./MdListItemButton.vue"
import MdListItemLink from "./MdListItemLink.vue"
import MdListItemRouter from "./MdListItemRouter.vue"
import MdListItemExpand from "./MdListItemExpand.vue"
import MdButton from "@/components/MdButton/MdButton.vue"

function hasExpansion(props) {
  return Object.prototype.hasOwnProperty.call(props, "mdExpand") && props.mdExpand !== false
}

function hasMdExpandSlot(props, slots) {
  return hasExpansion(props) && slots && typeof slots["md-expand"] === "function"
}

function hasChildrenButtons(children, Button) {
  if (!children || !children.default) return false
  const nodes = children.default()
  return nodes.some((vnode) => {
    const t = vnode && vnode.type
    return t === Button || (t && t.name === "MdButton") || t === "md-button"
  })
}

function shouldRenderButtonWithListener(attrs) {
  const names = Object.keys(attrs || {})
  return names.some((n) => MdInteractionEvents.includes(n))
}

function hasRouter(instance) {
  const gp =
    (instance &&
      instance.$ &&
      instance.$.appContext &&
      instance.$.appContext.config &&
      instance.$.appContext.config.globalProperties) ||
    {}
  return !!gp.$router
}

function createListComponent(props, routerAvailable, attrs, slots) {
  if (hasExpansion(props)) return MdListItemExpand
  if (props.disabled) return MdListItemButton
  if (routerAvailable && props.to) return MdListItemRouter
  if (props.href) return MdListItemLink
  if (shouldRenderButtonWithListener(attrs)) return renderButtonWithListener(slots)
  return MdListItemDefault
}

function renderButtonWithListener(slots) {
  return hasChildrenButtons(slots, MdButton) ? MdListItemFakeButton : MdListItemButton
}

export default {
  name: "MdListItem",
  components: { MdButton },
  inheritAttrs: false,
  props: {
    href: String,
    target: String,
    disabled: Boolean,
    to: [String, Object],
    download: String,
    hreflang: String,
    ping: String,
    rel: String,
    type: String,
    mdExpanded: Boolean,
    mdExpand: Boolean,
  },
  render() {
    const slots = this.$slots
    const listenersAndAttrs = this.$attrs || {}
    const listComponent = createListComponent(this.$props, hasRouter(this), listenersAndAttrs, slots)

    let liClass = "md-list-item"
    if (listenersAndAttrs.class) liClass += " " + listenersAndAttrs.class

    // Pass attrs both to li and inner container to preserve behavior
    const childProps = {
      class: ["md-list-item-container", "md-button-clean", listenersAndAttrs.class || ""],
      ...listenersAndAttrs,
      ...(this.mdExpanded !== undefined ? { mdExpanded: this.mdExpanded } : {}),
      ...(this.disabled !== undefined ? { disabled: this.disabled } : {}),
      ...(this.to ? { to: this.to } : {}),
      ...(this.href ? { href: this.href } : {}),
      ...(this.target ? { target: this.target } : {}),
      ...(this.download ? { download: this.download } : {}),
      ...(this.hreflang ? { hreflang: this.hreflang } : {}),
      ...(this.ping ? { ping: this.ping } : {}),
      ...(this.rel ? { rel: this.rel } : {}),
      ...(this.type ? { type: this.type } : {}),
    }

    const slotObj = {}
    if (slots && typeof slots.default === "function") slotObj.default = () => slots.default()
    if (hasMdExpandSlot(this.$props, slots)) slotObj["md-expand"] = () => slots["md-expand"]()

    return h("li", { ...listenersAndAttrs, class: liClass }, [h(listComponent, childProps, slotObj)])
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-list-item {
  height: auto;
  position: relative;
  z-index: 2;

  &.md-inset {
    .md-list-item-content { padding-left: 72px; }
  }

  .md-icon {
    &:first-child { margin-right: 32px; }
    &:last-child { margin-left: 16px; }
  }
}

.md-list-item-container {
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  text-transform: none;

  &:not(.md-list-item-default):not([disabled]) > .md-list-item-content {
    user-select: none;
    cursor: pointer;
  }

  &.md-button-clean:hover { opacity: 1; text-decoration: none; }
}

.md-list-item-content {
  min-height: 48px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: padding .4s $md-transition-stand-timing;
  will-change: padding;

  .md-list.md-dense & { min-height: 40px; font-size: 13px; }
  .md-list.md-double-line & { min-height: 72px; }
  .md-list.md-double-line.md-dense & { min-height: 60px; }
  .md-list.md-triple-line & { min-height: 88px; }
  .md-list.md-triple-line.md-dense & { min-height: 76px; }

  .md-list-action { margin: 0 -10px 0 0; }
  .md-list-action:last-of-type { margin: 0 -10px 0 16px; }
}

.md-list-item-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  line-height: 1.25em;
  white-space: nowrap;

  .md-list.md-dense & { font-size: 13px; }

  * {
    width: 100%;
    margin: 0;
    overflow: hidden;
    line-height: 1.25em;
    text-overflow: ellipsis;
  }

  :nth-child(2), :nth-child(3) { font-size: 14px; }
  .md-list.md-dense & * { font-size: 13px; }
}
</style>
