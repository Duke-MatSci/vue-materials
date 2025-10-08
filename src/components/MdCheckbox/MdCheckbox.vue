<script>
import { h } from 'vue'
import MdComponent from "@/core/MdComponent"
import MdCheckboxMixin from "./MdCheckboxMixin"
import MdRipple from '@/components/MdRipple/MdRipple.vue'

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
        h(MdRipple, {
          mdActive: this.rippleActive,
          mdCentered: true,
          mdDisabled: this.disabled,
          'onUpdate:mdActive': (val) => {
            this.rippleActive = val
          }
        }, {
          default: () => {
            const inputProps = {
              type: 'checkbox',
              ...this.attrs,
              '.indeterminate': this.indeterminate
            }

            // Use .checked to set DOM property, not attribute
            inputProps['.checked'] = this.isSelected

            return [h('input', inputProps)]
          }
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

