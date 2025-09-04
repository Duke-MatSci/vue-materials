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
    return h(
      "a",
      { class: "md-list-item-link", ...this.$props },
      [
        h(
          MdListItemContent,
          { mdDisabled: this.isDisabled },
          this.$slots.default ? { default: () => this.$slots.default() } : undefined
        ),
      ]
    )
  },
}
</script>
