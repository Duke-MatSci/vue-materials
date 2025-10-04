<script>
import { h, Transition } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdFocused from '@/core/mixins/MdFocused/MdFocused'
import MdRippleMixin from '@/core/mixins/MdRipple/MdRipple'
import MdRipple from '@/components/MdRipple/MdRipple.vue'
import MdClearIcon from '@/core/icons/MdClearIcon.vue'
import MdButton from '@/components/MdButton/MdButton.vue'

export default MdComponent({
  name: 'MdChip',
  components: {
    MdButton,
    MdClearIcon,
    MdRipple
  },
  mixins: [
    MdFocused,
    MdRippleMixin
  ],
  props: {
    mdDisabled: Boolean,
    mdDeletable: Boolean,
    mdClickable: Boolean,
    mdDuplicated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    chipClasses () {
      return {
        'md-disabled': this.mdDisabled,
        'md-deletable': this.mdDeletable,
        'md-clickable': this.mdClickable,
        'md-focused': this.mdHasFocus,
        'md-duplicated': this.mdDuplicated
      }
    }
  },
  render() {
    // Inner div content: ripple wrapper or plain slot
    const innerContent = []

    if (this.mdClickable || !this.mdRipple) {
      // Wrap slot in MdRipple
      innerContent.push(
        h(this.$options.components.MdRipple, {
          mdDisabled: this.mdDisabled
        }, {
          default: () => this.$slots.default ? this.$slots.default() : []
        })
      )
    } else {
      // Plain slot
      if (this.$slots.default) {
        innerContent.push(...this.$slots.default())
      }
    }

    // Delete button with transition
    if (this.mdDeletable) {
      innerContent.push(
        h(Transition, {
          name: 'md-input-action',
          appear: true
        }, {
          default: () => [
            h(this.$options.components.MdButton, {
              tabindex: -1,
              class: 'md-icon-button md-dense md-input-action md-clear',
              onClick: (event) => {
                this.$emit('md-delete', event)
              }
            }, {
              default: () => [
                h(this.$options.components.MdClearIcon)
              ]
            })
          ]
        })
      )
    }

    // Main chip div
    const chipDiv = h('div', {
      class: ['md-chip', this.$mdActiveTheme, this.chipClasses],
      tabindex: 0,
      ...this.$attrs
    }, innerContent)

    // Wrap in outer transition
    return h(Transition, {
      name: 'md-chip',
      appear: true
    }, {
      default: () => [chipDiv]
    })
  }
})
</script>

<style lang="scss">
  @import "@/components/MdAnimation/variables";
  @import "@/components/MdElevation/mixins";

  $md-chips-height: 32px;

  .md-chip {
    height: $md-chips-height;
    padding: 0 12px;
    display: inline-block;
    cursor: default;
    border-radius: $md-chips-height;
    transition: .3s $md-transition-stand-timing;
    transition-property: background-color, color, opacity, transform, box-shadow;
    will-change: background-color, color, opacity, transform, box-shadow;
    font-size: 13px;
    line-height: $md-chips-height;
    vertical-align: middle;
    white-space: nowrap;

    &:focus {
      outline: none;
    }

    &.md-chip-enter-active,
    &.md-chip-leave-active {
      opacity: 0;
      transform: transformZ(0) scale(.8);
    }

    &.md-chip-enter-to {
      opacity: 1;
      transform: transformZ(0) scale(1);
    }

    &.md-clickable,
    &.md-deletable {
      &:not(.md-disabled):active {
        @include md-elevation(3);
      }
    }

    &.md-focused {
      @include md-elevation(3);
    }

    &.md-clickable {
      padding: 0;
      cursor: pointer;

      > .md-ripple {
        padding: 0 12px;
      }
    }

    &.md-deletable {
      padding-right: 32px;
      position: relative;

      &.md-clickable {
        padding-right: 0;

        > .md-ripple {
          padding-right: 32px;
        }
      }
    }

    &.md-disabled {
      cursor: default;
    }

    + .md-chip {
      margin-left: 4px;
    }

    .md-button.md-input-action {
      width: 18px;
      min-width: 18px;
      height: 18px;
      margin: 0;
      position: absolute;
      top: 50%;
      right: 7px;
      z-index: 11;
      transform: translate3D(0, -50%, 0);
      transition-duration: .3s;
      transition-timing-function: $md-transition-stand-timing;
      font-size: 18px;

      .md-ripple {
        padding: 0;
      }

      .md-button-content {
        height: 14px;
      }

      .md-icon {
        width: 14px;
        min-width: 14px;
        height: 14px;
        font-size: 14px !important;
        vertical-align: top;

        svg {
          transition-duration: .3s;
          transition-timing-function: $md-transition-stand-timing;
        }
      }
    }
  }
</style>
