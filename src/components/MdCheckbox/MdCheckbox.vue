<script>
import { h } from 'vue'
import MdComponent from "@/core/MdComponent"
import MdCheckboxMixin from "./MdCheckboxMixin"

export default MdComponent({
  name: "MdCheckbox",
  mixins: [MdCheckboxMixin],
  props: {
    id: String
  },
  render() {
    const children = []

    // Container div with ripple and input
    children.push(
      h('div', {
        class: 'md-checkbox-container',
        onClick: (e) => {
          e.stopPropagation()
          this.toggleCheck()
        }
      }, [
        h(this.$options.components.MdRipple, {
          mdActive: this.rippleActive,
          mdCentered: true,
          'onUpdate:mdActive': (val) => {
            this.rippleActive = val
          }
        }, {
          default: () => [
            h('input', {
              class: 'md-checkbox-input',
              type: 'checkbox',
              ...this.attrs,
              checked: this.isSelected,
              onChange: () => this.toggleCheck()
            })
          ]
        })
      ])
    )

    // Optional label with slot
    if (this.$slots.default) {
      children.push(
        h('label', {
          for: this.id,
          class: 'md-checkbox-label',
          onClick: (e) => {
            e.preventDefault()
            this.toggleCheck()
          }
        }, this.$slots.default())
      )
    }

    // Root div
    return h('div', {
      class: ['md-checkbox', this.$mdActiveTheme, this.checkClasses]
    }, children)
  }
})
</script>

<style lang="scss">
/* styling from prebuilt CSS */
</style>

