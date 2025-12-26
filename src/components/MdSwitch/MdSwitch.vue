<script>
import { h } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdCheckboxMixin from '@/components/MdCheckbox/MdCheckboxMixin'
import MdUuid from '@/core/utils/MdUuid'

export default MdComponent({
  name: 'MdSwitch',
  mixins: [MdCheckboxMixin],
  props: {
    id: {
      type: String,
      default: () => 'md-switch-' + MdUuid()
    }
  },
  render() {
    const children = []

    // Container div with thumb and ripple
    children.push(
      h('div', {
        class: 'md-switch-container',
        onClick: (e) => {
          e.stopPropagation()
          this.toggleCheck()
        }
      }, [
        h('div', {
          class: 'md-switch-thumb'
        }, [
          h(this.$options.components.MdRipple, {
            mdCentered: true,
            mdActive: this.rippleActive,
            'onUpdate:mdActive': (val) => {
              this.rippleActive = val
            },
            mdDisabled: this.disabled
          }, {
            default: () => [
              h('input', {
                id: this.id,
                type: 'checkbox',
                name: this.name,
                disabled: this.disabled,
                required: this.required,
                value: this.value
              })
            ]
          })
        ])
      ])
    )

    // Optional label with slot
    if (this.$slots.default) {
      children.push(
        h('label', {
          for: this.id,
          class: 'md-switch-label',
          onClick: (e) => {
            e.preventDefault()
            this.toggleCheck()
          }
        }, this.$slots.default())
      )
    }

    // Root div
    return h('div', {
      class: ['md-switch', this.$mdActiveTheme, this.checkClasses]
    }, children)
  }
})
</script>

<style lang="scss">
  @import "@/components/MdAnimation/variables";
  @import "@/components/MdElevation/mixins";

  $md-switch-width: 34px;
  $md-switch-height: 14px;
  $md-switch-size: 20px;
  $md-switch-touch-size: 48px;

  .md-switch {
    width: auto;
    margin: 16px 16px 16px 0;
    display: inline-flex;
    position: relative;

    &:not(.md-disabled) {
      cursor: pointer;

      .md-switch-label {
        cursor: pointer;
      }
    }

    .md-switch-container {
      width: $md-switch-width;
      min-width: $md-switch-width;
      height: $md-switch-height;
      margin: 3px 0;
      display: flex;
      align-items: center;
      position: relative;
      border-radius: $md-switch-height;
      transition: $md-transition-stand;
    }

    .md-switch-thumb {
      @include md-elevation(1);
      width: $md-switch-size;
      height: $md-switch-size;
      position: relative;
      border-radius: 50%;
      transition: $md-transition-stand;

      &:before {
        width: $md-switch-touch-size;
        height: $md-switch-touch-size;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 11;
        transform: translate(-50%, -50%);
        content: " ";
      }

      .md-ripple {
        width: $md-switch-touch-size !important;
        height: $md-switch-touch-size !important;
        top: 50% !important;
        left: 50% !important;
        position: absolute;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }

      input {
        position: absolute;
        left: -999em;
      }
    }

    .md-switch-label {
      height: $md-switch-size;
      padding-left: 16px;
      position: relative;
      line-height: $md-switch-size;
    }
  }

  .md-switch.md-checked {
    .md-switch-thumb {
      transform: translate3d(15px, 0, 0);
    }
  }

  .md-switch.md-required {
    label:after {
      position: absolute;
      top: 2px;
      right: 0;
      transform: translateX(calc(100% + 2px));
      content: "*";
      line-height: 1em;
      vertical-align: top;
    }
  }
</style>
