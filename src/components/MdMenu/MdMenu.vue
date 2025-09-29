<script>
import { h, mergeProps } from "vue"
import MdPropValidator from "@/core/utils/MdPropValidator"

export default {
  name: "MdMenu",
  props: {
    mdActive: Boolean,
    mdAlignTrigger: Boolean,
    mdOffsetX: Number,
    mdOffsetY: Number,
    mdFullWidth: Boolean,
    mdDense: Boolean,
    mdDirection: {
      type: String,
      default: "bottom-start",
      ...MdPropValidator("md-direction", ["top-end", "top-start", "bottom-end", "bottom-start"]),
    },
    mdCloseOnSelect: {
      type: Boolean,
      default: true,
    },
    mdCloseOnClick: {
      type: Boolean,
      default: false,
    },
    mdSize: {
      type: String,
      default: "small",
      ...MdPropValidator("md-size", ["auto", "small", "medium", "big", "huge"]),
    },
  },
  data() {
    const menu = {
      instance: null,
      active: this.mdActive,
      direction: this.mdDirection,
      size: this.mdSize,
      alignTrigger: this.mdAlignTrigger,
      offsetX: this.mdOffsetX,
      offsetY: this.mdOffsetY,
      fullWidth: this.mdFullWidth,
      dense: this.mdDense,
      closeOnSelect: this.mdCloseOnSelect,
      closeOnClick: this.mdCloseOnClick,
      bodyClickObserver: null,
      windowResizeObserver: null,
      $el: null,
      items: [],
      registerItem(item) {
        if (item && menu.items.indexOf(item) === -1) {
          menu.items.push(item)
        }
      },
      unregisterItem(item) {
        if (!item) return
        menu.items = menu.items.filter((i) => i !== item)
      },
    }

    return {
      triggerEl: null,
      MdMenu: menu,
    }
  },
  provide() {
    return { MdMenu: this.MdMenu }
  },
  computed: {
    isActive() {
      return this.MdMenu.active
    },
  },
  watch: {
    mdActive: {
      immediate: true,
      handler(isActive) {
        this.MdMenu.active = isActive
      },
    },
    mdDirection(direction) {
      this.MdMenu.direction = direction
    },
    mdSize(size) {
      this.MdMenu.size = size
    },
    mdAlignTrigger(aligned) {
      this.MdMenu.alignTrigger = aligned
    },
    mdOffsetX(offset) {
      this.MdMenu.offsetX = offset
    },
    mdOffsetY(offset) {
      this.MdMenu.offsetY = offset
    },
    mdFullWidth(val) {
      this.MdMenu.fullWidth = val
    },
    mdDense(val) {
      this.MdMenu.dense = val
    },
    mdCloseOnSelect(val) {
      this.MdMenu.closeOnSelect = val
    },
    mdCloseOnClick(val) {
      this.MdMenu.closeOnClick = val
    },
    isActive(isActive) {
      this.$emit("update:mdActive", isActive)
      this.$emit(isActive ? "md-opened" : "md-closed")
    },
  },
  methods: {
    toggleContent() {
      this.MdMenu.active = !this.MdMenu.active
    },
  },
  mounted() {
    this.MdMenu.$el = this.$el
    this.MdMenu.instance = this

    this.$nextTick(() => {
      if (!this.$el || !this.$el.querySelector) return
      this.triggerEl = this.$el.querySelector("[md-menu-trigger]")
      if (this.triggerEl) {
        this.triggerEl.addEventListener("click", this.toggleContent)
      }
    })
  },
  beforeUnmount() {
    if (this.triggerEl) {
      this.triggerEl.removeEventListener("click", this.toggleContent)
    }
  },
  render() {
    const slot = this.$slots.default ? this.$slots.default() : []
    return h(
      "div",
      mergeProps({ class: "md-menu" }, this.$attrs),
      slot
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdLayout/mixins";

.md-menu {
  display: inline-block;

  > .md-button {
    margin: 0;
  }
}
</style>

