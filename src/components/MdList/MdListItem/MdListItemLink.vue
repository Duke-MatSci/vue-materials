<script>
import { h } from "vue"
import MdListItemMixin from "./MdListItemMixin"
import MdListItemContent from "./MdListItemContent.vue"

export default {
  name: "MdListItemLink",
  mixins: [MdListItemMixin],
  props: {
    download: String,
    href: String,
    hreflang: String,
    ping: String,
    rel: String,
    target: String,
    type: String,
  },
  render() {
    // Create slots object with function wrappers
    const slots = {}
    if (this.$slots.default) {
      slots.default = () => this.$slots.default()
    }

    return h(
      "a",
      { class: "md-list-item-link", ...this.$props },
      [
        h(
          MdListItemContent,
          { mdDisabled: this.isDisabled },
          slots
        ),
      ]
    )
  },
}
</script>
