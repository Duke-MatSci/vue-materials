<script>
import { h } from "vue"
import MdListItemMixin from "./MdListItemMixin"
import MdListItemContent from "./MdListItemContent.vue"

export default {
  name: "MdListItemButton",
  mixins: [MdListItemMixin],
  render() {
    return h(
      "button",
      { type: "button", class: "md-list-item-button", disabled: this.disabled },
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
