<script>
import { h } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdPropValidator from '@/core/utils/MdPropValidator'
import MdBadgeStandalone from './MdBadgeStandalone.vue'

export default MdComponent({
  name: 'MdBadge',
  components: {
    MdBadgeStandalone
  },
  props: {
    mdContent: [String, Number],
    mdPosition: {
      type: String,
      default: 'top',
      ...MdPropValidator('md-position', [
        'top',
        'bottom'
      ])
    },
    mdDense: Boolean
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    },
    badgeClasses() {
      // In Vue 3, get classes from $attrs
      const externalClass = this.$attrs.class || ''
      const classArray = typeof externalClass === 'string'
        ? externalClass.split(' ').filter(val => val)
        : Array.isArray(externalClass) ? externalClass : [externalClass]

      const classObj = classArray.reduce((result, key) => {
        if (key && typeof key === 'string') {
          result[key] = true
        }
        return result
      }, {})

      return {
        ['md-position-' + this.mdPosition]: true,
        'md-dense': this.mdDense,
        ...classObj
      }
    },
    styles() {
      // In Vue 3, get styles from $attrs
      return this.$attrs.style || {}
    }
  },
  render() {
    const badgeStandalone = h(MdBadgeStandalone, {
      class: this.badgeClasses,
      style: this.styles
    }, {
      default: () => this.hasDefaultSlot
        ? [h('div', {}, this.mdContent)]
        : [this.mdContent]
    })

    if (this.hasDefaultSlot) {
      return h('div', {
        class: 'md-badge-content'
      }, [
        ...(this.$slots.default ? this.$slots.default() : []),
        badgeStandalone
      ])
    }

    return badgeStandalone
  }
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-badge-content {
  position: relative;
  display: inline-block;
  .md-position {
    &-top {
      top: -4px;
    }
    &-bottom {
      bottom: -4px;
    }
  }
}
</style>
