<script>
import { h } from "vue"
import MdDrawer from "@/components/MdDrawer/MdDrawer.vue"

export default {
  name: "MdAppDrawer",
  inject: ["MdApp"],
  props: { mdRight: { type: Boolean, default: false }, mdActive: { type: Boolean, default: false } },
  data: () => ({ drawerElement: { mdActive: null, mode: null, submode: null }, initialized: false }),
  computed: {
    visible() { return this.drawerElement.mdActive },
    mode() { return this.drawerElement.mode },
    submode() { return this.drawerElement.submode },
  },
  watch: {
    visible(v) { this.MdApp.drawer.width = this.getDrawerWidth(); this.MdApp.drawer.active = v },
    mode(m) { this.MdApp.drawer.mode = m },
    submode(s) { this.MdApp.drawer.submode = s },
    mdRight(r) { this.MdApp.drawer.right = r },
  },
  methods: {
    getDrawerWidth() { return this.$el ? window.getComputedStyle(this.$el).width : 0 },
    updateDrawerData() {
      this.MdApp.drawer.width = this.getDrawerWidth()
      this.MdApp.drawer.active = this.visible
      this.MdApp.drawer.mode = this.mode
      this.MdApp.drawer.submode = this.submode
      this.MdApp.drawer.right = this.mdRight
    },
    clearDrawerData() {
      this.MdApp.drawer.width = 0
      this.MdApp.drawer.active = false
      this.MdApp.drawer.mode = "temporary"
      this.MdApp.drawer.submode = null
      this.MdApp.drawer.initialWidth = 0
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.MdApp.drawer.initialWidth = this.$el.offsetWidth
      // Access child component instance
      const vnode = this.$.subTree
      this.drawerElement = vnode && vnode.component ? vnode.component.proxy : {}
      this.updateDrawerData()
      this.initialized = true
    })
  },
  updated() {
    const vnode = this.$.subTree
    this.drawerElement = vnode && vnode.component ? vnode.component.proxy : {}
  },
  beforeUnmount() { this.clearDrawerData() },
  render() {
    return h(MdDrawer, { class: "md-app-drawer", mdActive: this.mdActive && this.initialized, mdRight: this.mdRight, ...this.$attrs }, this.$slots.default ? this.$slots.default() : [])
  },
}
</script>

