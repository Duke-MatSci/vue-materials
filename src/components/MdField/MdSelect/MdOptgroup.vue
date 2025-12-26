<script>
import { h } from 'vue'
import MdSubheader from '@/components/MdSubheader/MdSubheader.vue'

export default {
  name: 'MdOptgroup',
  components: {
    MdSubheader
  },
  props: {
    label: String,
    disabled: Boolean
  },
  provide () {
    return {
      MdOptgroup: {
        disabled: this.disabled
      }
    }
  },
  render() {
    return h('div', { class: 'md-optgroup' }, [
      h(this.$options.components.MdSubheader, {}, () => this.label),
      this.$slots.default ? this.$slots.default() : []
    ])
  }
}
</script>

<style lang="scss">
  .md-optgroup {
    .md-subheader {
      text-transform: uppercase;
    }

    .md-ripple.md-list-item-content {
      padding-left: 24px;
    }
  }
</style>
