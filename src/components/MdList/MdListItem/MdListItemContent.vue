<script>
import { h } from "vue"
import MdRipple from "@/components/MdRipple/MdRipple.vue"

export default {
  name: "MdListItemContent",
  components: { MdRipple },
  props: { mdDisabled: Boolean },
  render() {
    const slots = {}
    if (this.$slots.default) {
      slots.default = () => this.$slots.default()
    }

    return h(
      MdRipple,
      { class: "md-list-item-content", mdDisabled: this.mdDisabled },
      slots
    )
  },
}
</script>
