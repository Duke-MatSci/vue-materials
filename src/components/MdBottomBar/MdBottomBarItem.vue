<script>
import { h } from 'vue'
import MdAssetIcon from '@/core/mixins/MdAssetIcon/MdAssetIcon'
import MdRouterLink from '@/core/mixins/MdRouterLink/MdRouterLink'
import MdUuid from '@/core/utils/MdUuid'
import MdRouterLinkProps from '@/core/utils/MdRouterLinkProps'
import MdButton from '@/components/MdButton/MdButton.vue'
import MdIcon from '@/components/MdIcon/MdIcon.vue'

const ignoredProps = ['id', 'mdLabel', 'mdIcon', 'mdDisabled']

export default {
  name: 'MdBottomBarItem',
  components: {
    MdButton,
    MdIcon
  },
  mixins: [MdAssetIcon, MdRouterLink],
  props: {
    id: {
      type: String,
      default: () => 'md-bottom-bar-item-' + MdUuid()
    },
    mdLabel: String,
    mdIcon: String,
    mdDisabled: Boolean
  },
  inject: ['MdBottomBar'],
  watch: {
    $props: {
      deep: true,
      handler() {
        this.setItemData()
      }
    },
    $attrs: {
      deep: true,
      handler() {
        this.setItemData()
      }
    }
  },
  computed: {
    itemClasses() {
      return {
        'md-active': this.id === this.MdBottomBar.activeItem
      }
    },
    attrs() {
      let attrs = { ...this.$attrs }

      const propNames = Object.keys(this.$options.propsData || {})
      propNames.forEach(prop => {
        if (!ignoredProps.includes(prop)) {
          attrs[prop] = this[prop]
        }
      })

      return attrs
    }
  },
  methods: {
    getPropValues() {
      const propNames = Object.keys(this.$options.props)
      let values = {}

      propNames.forEach(prop => {
        if (!ignoredProps.includes(prop)) {
          if (this[prop]) {
            values[prop] = this[prop]
          } else if (this.$attrs && this.$attrs.hasOwnProperty(prop)) {
            if (prop) {
              values[prop] = this.$attrs[prop]
            } else {
              values[prop] = true
            }
          }
        }
      })

      return values
    },
    setItemData() {
      this.MdBottomBar.items[this.id] = {
        disabled: this.mdDisabled,
        options: this.mdTemplateOptions,
        props: this.getPropValues()
      }
    },
    setActiveItem($event) {
      if (!this.MdBottomBar.syncRoute) {
        this.MdBottomBar.activeItem = this.id
      }

      if (this.MdBottomBar.type === 'shift') {
        this.MdBottomBar.mouseEvent = $event
      }
    }
  },
  beforeCreate() {
    if (this.$router && this.$options.propsData && this.$options.propsData.to) {
      const componentProps = MdRouterLinkProps(this, this.$options.props)
      this.$options.props = componentProps
    }
  },
  created() {
    this.setItemData()
  },
  beforeUnmount() {
    delete this.MdBottomBar.items[this.id]
  },
  render() {
    // Extract class from $attrs if present
    const staticClass = this.$attrs.class
    const attrs = { ...this.attrs }
    delete attrs.class

    // Extract event listeners from $attrs (Vue 3 merged $listeners into $attrs)
    const listeners = {}
    Object.keys(this.$attrs).forEach(key => {
      if (key.startsWith('on')) {
        listeners[key] = this.$attrs[key]
        delete attrs[key]
      }
    })

    let content
    if (this.$slots.default && this.$slots.default().length) {
      content = this.$slots.default()
    } else {
      const iconElement = this.isAssetIcon(this.mdIcon)
        ? h(MdIcon, {
            class: 'md-bottom-bar-icon',
            mdSrc: this.mdIcon
          })
        : h(MdIcon, {
            class: 'md-bottom-bar-icon'
          }, () => this.mdIcon)

      const labelElement = h('span', {
        class: 'md-bottom-bar-label'
      }, this.mdLabel)

      content = [iconElement, labelElement]
    }

    return h(MdButton, {
      class: [
        'md-bottom-bar-item',
        this.itemClasses,
        staticClass
      ],
      id: this.id,
      disabled: this.mdDisabled,
      mdRipple: this.MdBottomBar.type === 'fixed',
      ...attrs,
      ...listeners,
      onClick: this.setActiveItem
    }, () => content)
  }
}
</script>
