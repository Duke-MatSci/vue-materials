<script>
import { h } from "vue"
import MdListItemMixin from "./MdListItemMixin"
import MdListItemContent from "./MdListItemContent.vue"

export default {
  name: "MdListItemDefault",
  mixins: [MdListItemMixin],
  methods: {
    toggleControl() {
      const control = this.$el && this.$el.querySelector
        ? this.$el.querySelector(".md-checkbox-container, .md-switch-container, .md-radio-container")
        : null
      if (control) control.click()
    },
  },
  render() {
    return h(
      "div",
      { class: "md-list-item-default", onClick: this.toggleControl },
      [
        h(
          MdListItemContent,
          { mdDisabled: true },
          this.$slots.default ? { default: () => this.$slots.default() } : undefined
        ),
      ]
    )
  },
}
</script>
