<script>
import { h } from "vue"
import MdListItemMixin from "./MdListItemMixin"
import MdListItemContent from "./MdListItemContent.vue"

export default {
  name: "MdListItemFakeButton",
  mixins: [MdListItemMixin],
  render() {
    return h(
      "div",
      { class: "md-list-item-fake-button", disabled: this.disabled },
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
