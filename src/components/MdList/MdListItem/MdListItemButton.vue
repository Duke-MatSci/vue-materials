<script>
import { h } from "vue"
import MdListItemMixin from "./MdListItemMixin"
import MdListItemContent from "./MdListItemContent.vue"

export default {
  name: "MdListItemButton",
  mixins: [MdListItemMixin],
  inheritAttrs: false,
  render() {
    // Merge classes from parent (md-list-item-container, md-button-clean) with button class
    const classes = ["md-list-item-button"]
    const attrClass = this.$attrs.class
    if (attrClass) {
      if (typeof attrClass === 'string') {
        classes.push(...attrClass.split(' ').filter(c => c))
      } else if (Array.isArray(attrClass)) {
        classes.push(...attrClass.filter(c => c))
      }
    }

    // Extract non-class attrs
    const attrs = { ...this.$attrs }
    delete attrs.class

    return h(
      "button",
      {
        type: "button",
        class: classes.join(' '),
        disabled: this.disabled,
        ...attrs
      },
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
