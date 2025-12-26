<script>
import { h } from "vue"
import MdComponent from "@/core/MdComponent"
import MdDrawerRightPrevious from "@/components/MdDrawer/MdDrawerRightPrevious.vue"
import MdAppSideDrawer from "./MdAppSideDrawer.vue"
import MdAppInternalDrawer from "./MdAppInternalDrawer.vue"

function isRightDrawer(vnode) {
  const p = vnode && vnode.props
  if (!p) return false
  return p.mdRight === "" || !!p.mdRight
}

function hasInternalDrawer(vnode) {
  const p = vnode && vnode.props
  const val = p && p.mdPermanent
  return val === "clipped" || val === "card"
}

export default MdComponent({
  name: "MdApp",
  render() {
    const children = this.$slots.default ? this.$slots.default() : []
    // Pass through original vnodes to slots (no cloning)
    const clone = (v) => v || null
    let toolbar = null
    let content = null
    let drawer = null
    let drawerRight = false
    let internal = false

    children.forEach((v) => {
      const type = v && v.type && v.type.name
      if (type === "MdAppToolbar") toolbar = v
      else if (type === "MdAppContent") content = v
      else if (type === "MdAppDrawer") {
        drawer = v
        drawerRight = isRightDrawer(v)
        internal = hasInternalDrawer(v)
      }
    })

    const Wrapper = internal ? MdAppInternalDrawer : MdAppSideDrawer

    // Build props with VNode arrays instead of slots to avoid slot-context issues
    const props = {
      toolbar: toolbar ? [clone(toolbar)] : [],
      content: content ? [clone(content)] : [],
      drawerLeft: [],
      drawerRight: [],
      drawerRightPrevious: [],
    }

    if (drawer) {
      if (drawerRight) {
        props.drawerRight = [clone(drawer)]
        props.drawerRightPrevious = [h(MdDrawerRightPrevious, drawer.props || {})]
      } else {
        props.drawerLeft = [clone(drawer)]
      }
    }

    return h(Wrapper, props)
  },
})
</script>
