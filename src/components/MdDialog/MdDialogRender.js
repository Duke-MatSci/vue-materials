import { withDirectives, vShow } from "vue"

export default {
  name: "MdDialogRender",
  props: {
    mdValue: { type: Boolean, default: false },
    mdKeepAlive: { type: Boolean, default: false },
  },
  methods: {
    dispatchResizeEvent() {
      this.$nextTick(() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("resize"))
        }
      })
    },
  },
  render() {
    const slotFn = this.$slots.default
    if (!slotFn) return null
    const vnodes = slotFn()
    if (!vnodes || vnodes.length === 0) return null

    if (this.mdKeepAlive) {
      const vnode = vnodes[0]
      const shown = withDirectives(vnode, [[vShow, this.mdValue]])
      if (this.mdValue) this.dispatchResizeEvent()
      return shown
    }

    return this.mdValue ? vnodes[0] : null
  },
}

