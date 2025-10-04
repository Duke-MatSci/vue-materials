<script>
import { h } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdUuid from '@/core/utils/MdUuid'
import MdRipple from '@/components/MdRipple/MdRipple.vue'

export default MdComponent({
  name: 'MdRadio',
  components: {
    MdRipple
  },
  props: {
    modelValue: [String, Number, Boolean, Object],
    value: {
      type: [String, Number, Boolean, Object],
      default: 'on'
    },
    id: {
      type: String,
      default: () => 'md-radio-' + MdUuid()
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean
  },
  data: () => ({
    rippleActive: false
  }),
  computed: {
    isSelected () {
      return this.modelValue === this.value
    },
    radioClasses () {
      return {
        'md-checked': this.isSelected,
        'md-disabled': this.disabled,
        'md-required': this.required
      }
    }
  },
  methods: {
    toggleCheck () {
      if (!this.disabled) {
        this.rippleActive = true
        this.$emit('update:modelValue', this.value)
      }
    }
  },
  render() {
    const children = []

    // Container div with ripple and input
    children.push(
      h('div', {
        class: 'md-radio-container',
        onClick: (e) => {
          e.stopPropagation()
          this.toggleCheck()
        }
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
              type: 'radio',
              id: this.id,
              name: this.name,
              disabled: this.disabled,
              required: this.required,
              value: this.value,
              checked: this.isSelected
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
          class: 'md-radio-label',
          onClick: (e) => {
            e.preventDefault()
            this.toggleCheck()
          }
        }, this.$slots.default())
      )
    }

    // Root div
    return h('div', {
      class: ['md-radio', this.$mdActiveTheme, this.radioClasses]
    }, children)
  }
})
</script>

<style lang="scss">
  @import "@/components/MdAnimation/variables";

  $md-radio-size: 20px;
  $md-radio-touch-size: 48px;

  .md-radio {
    width: auto;
    margin: 16px 16px 16px 0;
    display: inline-flex;
    position: relative;

    &:not(.md-disabled) {
      cursor: pointer;

      .md-radio-label {
        cursor: pointer;
      }
    }

    .md-radio-container {
      width: $md-radio-size;
      min-width: $md-radio-size;
      height: $md-radio-size;
      position: relative;
      border: 2px solid transparent;
      border-radius: 50%;
      transition: $md-transition-stand;

      &:focus {
        outline: none;
      }

      &:before,
      &:after {
        position: absolute;
        transition: $md-transition-drop;
        content: " ";
      }

      &:before {
        width: $md-radio-touch-size;
        height: $md-radio-touch-size;
        top: 50%;
        left: 50%;
        z-index: 11;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }

      &:after {
        position: absolute;
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
        border-radius: 50%;
        opacity: 0;
        transform: scale3D(.38, .38, 1);
        content: " ";
      }

      .md-ripple {
        width: $md-radio-touch-size !important;
        height: $md-radio-touch-size !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }

      input {
        position: absolute;
        left: -999em;
      }
    }

    .md-radio-label {
      height: $md-radio-size;
      padding-left: 16px;
      position: relative;
      line-height: $md-radio-size;
    }
  }

  .md-radio.md-checked {
    .md-radio-container {
      &:after {
        opacity: 1;
        transform: scale3D(1, 1, 1);
        transition: $md-transition-stand;
      }
    }
  }

  .md-radio.md-required {
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
