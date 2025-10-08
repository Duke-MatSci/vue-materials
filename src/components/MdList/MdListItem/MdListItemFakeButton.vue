<script>
import { h } from "vue"
import MdListItemMixin from "./MdListItemMixin"
import MdListItemContent from "./MdListItemContent.vue"

export default {
  name: "MdListItemFakeButton",
  mixins: [MdListItemMixin],
  render() {
    // Create slots object with function wrappers
    const slots = {}
    if (this.$slots.default) {
      slots.default = () => this.$slots.default()
    }

    return h(
      "div",
      { class: "md-list-item-fake-button", disabled: this.disabled },
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
