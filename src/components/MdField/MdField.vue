<script>
import { h, Transition, reactive, provide, ref } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdClearIcon from '@/core/icons/MdClearIcon.vue'
import MdPasswordOffIcon from '@/core/icons/MdPasswordOffIcon.vue'
import MdPasswordOnIcon from '@/core/icons/MdPasswordOnIcon.vue'
import MdButton from '@/components/MdButton/MdButton.vue'

export default MdComponent({
  name: 'MdField',
  components: {
    MdButton,
    MdClearIcon,
    MdPasswordOffIcon,
    MdPasswordOnIcon
  },
  props: {
    mdInline: Boolean,
    mdClearable: Boolean,
    mdCounter: {
      type: Boolean,
      default: true
    },
    mdTogglePassword: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    // Create reactive state in setup() to ensure proper reactivity with provide/inject
    const MdField = reactive({
      value: null,
      focused: false,
      highlighted: false,
      disabled: false,
      required: false,
      placeholder: false,
      textarea: false,
      autogrow: false,
      maxlength: null,
      counter: null,
      password: null,
      togglePassword: false,
      clear: false,
      file: false,
      hasInvalidValue: false,
      select: false,
      childHasValue: false
    })

    // Provide the reactive object
    provide('MdField', MdField)

    // Create a separate reactive value that we'll update manually for hasValue
    const fieldHasValue = ref(false)

    return {
      MdField,
      showPassword: false,
      fieldHasValue
    }
  },
  methods: {
    // Method that children can call to notify parent of value changes
    notifyValueChange(hasValue) {
      this.fieldHasValue = hasValue
    }
  },
  computed: {
    stringValue () {
      return (this.MdField.value || this.MdField.value === 0) && this.MdField.value.toString()
    },
    hasCounter () {
      return this.mdCounter && (this.MdField.maxlength || this.MdField.counter)
    },
    hasPasswordToggle () {
      return this.mdTogglePassword && this.MdField.password
    },
    hasValue () {
      // Check if child components have set the childHasValue flag directly
      return this.MdField.childHasValue || this.MdField.hasInvalidValue
    },
    valueLength () {
      if (this.stringValue) {
        return this.stringValue.length
      }

      return 0
    },
    fieldClasses () {
      return {
        'md-inline': this.mdInline,
        'md-clearable': this.mdClearable,
        'md-focused': this.MdField.focused,
        'md-highlight': this.MdField.highlighted,
        'md-disabled': this.MdField.disabled,
        'md-required': this.MdField.required,
        'md-has-value': this.hasValue,
        'md-has-placeholder': this.MdField.placeholder,
        'md-has-textarea': this.MdField.textarea,
        'md-has-password': this.MdField.password,
        'md-has-file': this.MdField.file,
        'md-has-select': this.MdField.select,
        'md-autogrow': this.MdField.autogrow
      }
    }
  },
  methods: {
    clearInput () {
      this.MdField.clear = true
      this.$emit('md-clear')
      this.$nextTick().then(() => {
        this.MdField.clear = false
      })
    },
    togglePassword () {
      this.MdField.togglePassword = !this.MdField.togglePassword
    },
    onBlur () {
      this.MdField.highlighted = false
    }
  },
  render() {
    const children = []

    // Default slot (input components)
    if (this.$slots.default) {
      children.push(...this.$slots.default())
    }

    // Character counter
    if (this.hasCounter) {
      children.push(
        h('span', { class: 'md-count' },
          `${this.valueLength} / ${this.MdField.maxlength || this.MdField.counter}`
        )
      )
    }

    // Clear button with transition
    if (this.hasValue && this.mdClearable) {
      children.push(
        h(Transition, { name: 'md-input-action', appear: true }, () => [
          h(this.$options.components.MdButton, {
            tabindex: -1,
            class: 'md-icon-button md-dense md-input-action md-clear',
            onClick: this.clearInput,
            disabled: this.MdField.disabled
          }, () => [
            h(this.$options.components.MdClearIcon)
          ])
        ])
      )
    }

    // Password toggle button with transition
    if (this.hasPasswordToggle) {
      children.push(
        h(Transition, { name: 'md-input-action', appear: true }, () => [
          h(this.$options.components.MdButton, {
            tabindex: -1,
            class: 'md-icon-button md-dense md-input-action md-toggle-password',
            onClick: this.togglePassword
          }, () => [
            this.MdField.togglePassword
              ? h(this.$options.components.MdPasswordOnIcon)
              : h(this.$options.components.MdPasswordOffIcon)
          ])
        ])
      )
    }

    return h('div', {
      class: ['md-field', this.$mdActiveTheme, this.fieldClasses],
      onBlur: this.onBlur
    }, children)
  }
})
</script>

<style lang="scss">
  @import "@/components/MdAnimation/variables";

  $md-input-height: 32px;

  .md-field {
    width: 100%;
    min-height: 48px;
    margin: 4px 0 24px;
    padding-top: 16px;
    display: flex;
    position: relative;
    font-family: inherit;

    &:before,
    &:after {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
      transition: border .3s $md-transition-default-timing,
                  opacity .3s $md-transition-default-timing,
                  transform 0s .3s $md-transition-default-timing;
      will-change: border, opacity, transform;
      content: " ";
    }

    &:after {
      height: 1px;
    }

    &:before {
      height: 2px;
      z-index: 2;
      opacity: 0;
      transform: scaleX(.12);
    }

    label {
      position: absolute;
      top: 23px;
      left: 0;
      pointer-events: none;
      transition: $md-transition-stand;
      transition-duration: .3s;
      font-size: 16px;
      line-height: 20px;
    }
    .md-suffix {
      font-size: 16px;
      line-height: 32px;
      align-self: center;
      justify-self: center;
    }

    .md-prefix {
      display: none;
      padding-right: 4px;
      font-size: 16px;
      line-height: 32px;
      align-self: center;
      justify-self: center;
    }

    &.md-focused, &.md-has-value {
      .md-prefix {
        display: block;
      }
    }

    .md-input,
    .md-textarea {
      height: $md-input-height;
      padding: 0;
      display: block;
      flex: 1;
      border: none;
      background: none;
      transition: $md-transition-stand;
      transition-property: font-size, padding-top, color;
      font-family: inherit;
      font-size: 16px;
      line-height: $md-input-height;

      &[type="date"] {
        font-size: 16px;
      }

      &[disabled] {
        cursor: default;
      }

      &:focus {
        outline: none;
      }

      &::-webkit-input-placeholder {
        font-size: 16px;
        text-shadow: none;
        -webkit-text-fill-color: initial;
        transition: $md-transition-stand;
        transition-property: font-size, color;
      }
    }

    .md-textarea {
      min-height: 32px;
      max-height: 230px;
      padding: 5px 0;
      resize: none;
      line-height: 1.3em;
    }

    .md-helper-text,
    .md-error,
    .md-count {
      height: 20px;
      position: absolute;
      bottom: -22px;
      font-size: 12px;
      transition: .3s $md-transition-default-timing;
    }

    .md-error {
      display: block !important;
      left: 0;
      opacity: 0;
      transform: translate3d(0, -8px, 0);
    }

    .md-count {
      right: 0;
    }

    .md-input-action {
      width: 32px;
      min-width: 32px;
      height: 32px;
      margin: 0;
      position: absolute;
      top: 16px;
      right: 0;
      transition: $md-transition-default;

      &.md-input-action-enter-active,
      &.md-input-action-leave-active {
        opacity: 0;
      }

      &.md-input-action-enter-to {
        opacity: 1;
      }
    }

    > .md-icon {
      margin: 4px auto;
      position: relative;
      z-index: 3;
      transition: $md-transition-stand;

      &:last-of-type:not(:first-child):after {
        display: none;
      }

      &:after {
        width: 37px;
        height: 4px;
        position: absolute;
        left: -1px;
        bottom: -5px;
        transition: .3s $md-transition-default-timing;
        content: "";
      }

      ~ {
        label {
          left: 36px;
        }

        .md-input,
        .md-textarea,
        .md-file {
          margin-left: 12px;
        }
      }
    }
  }

  .md-field {
    + .md-has-textarea:not(.md-autogrow) {
      margin-top: 36px;
    }

    &.md-has-placeholder {
      label {
        pointer-events: auto;
        top: 10px;
        opacity: 0;
        font-size: 12px;
      }

      .md-input,
      .md-textarea {
        font-size: 16px;
      }
    }

    &.md-has-textarea:not(.md-autogrow) {
      &:before,
      &:after {
        height: auto;
        pointer-events: none;
        top: 0;
        bottom: 0;
        transform: none;
        background: none !important;
        border: 1px solid transparent;
        border-radius: 3px;
      }

      &:before {
        border-width: 2px;
      }

      label {
        top: 16px;
        left: 16px;
      }

      .md-textarea {
        min-height: 100px;
        padding: 0 16px;
        resize: vertical;
      }

      > .md-icon {
        position: absolute;
        top: 6px;
        right: 6px;
        z-index: 3;
      }

      .md-count {
        right: 6px;
        bottom: 2px;
      }

      .md-clear {
        top: 6px;
        right: 6px;
      }

      &.md-focused,
      &.md-has-value {
        label {
          top: 6px;
        }

        .md-textarea {
          padding-top: 10px;
        }
      }
    }

    &.md-has-file {
      &:before,
      &:after,
      label {
        left: 36px;
      }

      .md-input {
        margin-left: 12px;
      }
    }

    &.md-focused,
    &.md-highlight {
      &:before {
        opacity: 1;
        transform: scaleX(1);
        transition: .3s $md-transition-default-timing;
        transition-property: border, opacity, transform;
      }
    }

    &.md-focused,
    &.md-has-value {
      label {
        pointer-events: auto;
        top: 0;
        opacity: 1;
        font-size: 12px;
      }

      .md-input,
      .md-textarea {
        font-size: 16px;
      }
    }

    &.md-inline {
      label {
        pointer-events: none;
      }

      &.md-focused {
        label {
          top: 23px;
          font-size: 16px;
        }
      }

      &.md-has-value {
        label {
          opacity: 0;
        }
      }
    }

    &.md-disabled {
      &:after {
        background: bottom left repeat-x;
        background-size: 4px 1px;
      }
    }

    &.md-has-password {
      .md-toggle-password {
        margin: 0;
        position: absolute;
        right: 0;
        bottom: -2px;

        svg {
          width: 22px;
          height: 22px;
        }
      }
    }

    &.md-clearable {
      .md-input {
        padding-right: 30px;
      }
    }

    &.md-invalid {
      @keyframes md-invalid-shake {
        10%, 90% {
          transform: translate3d(-1px, 0, 0);
        }

        30%, 70% {
          transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
          transform: translate3d(4px, 0, 0);
        }
      }

      &.md-has-value label:not(:focus) {
        animation: md-invalid-shake .4s $md-transition-default-timing both;
        backface-visibility: hidden;
        perspective: 1000px;
      }

      &.md-has-textarea:not(.md-autogrow) {
        &:before {
          border-width: 2px;
        }
      }

      .md-error {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .md-helper-text {
        opacity: 0;
        transform: translate3d(0, -8px, 0);
      }
    }

    &.md-required {
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
  }
</style>
