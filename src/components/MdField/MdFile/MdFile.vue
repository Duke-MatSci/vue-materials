<script>
import { h } from 'vue'
import MdUuid from '@/core/utils/MdUuid'
import MdFileIcon from '@/core/icons/MdFileIcon.vue'
import MdFieldMixin from '../MdFieldMixin'

export default {
  name: 'MdFile',
  components: {
    MdFileIcon
  },
  mixins: [MdFieldMixin],
  props: {
    id: {
      type: String,
      default: () => 'md-file-' + MdUuid()
    },
    name: String
  },
  computed: {
    iconClass () {
      return {
        'md-disabled': this.disabled
      }
    }
  },
  methods: {
    getMultipleName (files) {
      let names = [];

      [...files].forEach(({ name }) => names.push(name))

      return names.join(', ')
    },
    getFileName (files, target) {
      if (!files || files.length === 0) {
        return target.value.split('\\').pop()
      }

      if (files.length > 1) {
        return this.getMultipleName(files)
      }

      if (files.length === 1) {
        return files[0].name
      }

      return null
    },
    openPicker () {
      this.onFocus()
      // Access the file input by its unique ID
      const fileInput = document.getElementById(this.id)
      if (fileInput) {
        fileInput.click()
      }
    },
    onChange ($event) {
      this.onFileSelected($event)
    },
    onFileSelected ({ target, dataTransfer }) {
      const files = target.files || dataTransfer.files

      this.model = this.getFileName(files, target)
      this.$emit('md-change', files || target.value)
    }
  },
  created () {
    this.MdField.file = true
  },
  beforeUnmount () {
    this.MdField.file = false
  },
  render() {
    // Extract only the attributes we need for the file input (no readonly, placeholder, etc.)
    const fileInputAttrs = {
      type: 'file',
      id: this.id,
      name: this.name,
      disabled: this.disabled,
      required: this.required
    }

    // Add additional attributes from parent (like accept, multiple, etc.)
    const additionalAttrs = { ...this.$attrs }
    delete additionalAttrs.class  // Don't pass class through

    return h('div', { class: 'md-file' }, [
      h(this.$options.components.MdFileIcon, {
        class: ['md-file-icon', this.iconClass],
        onClick: this.openPicker
      }),
      h('input', {
        class: 'md-input',
        readonly: true,
        value: this.model,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        onClick: this.openPicker,
        onBlur: this.onBlur
      }),
      h('input', {
        ...fileInputAttrs,
        ...additionalAttrs,
        onChange: this.onChange
      })
    ])
  }
}
</script>

<style lang="scss">
  .md-file {
    display: flex;
    flex: 1;

    input[type="file"] {
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      position: absolute;
      clip: rect(0 0 0 0);
      border: 0;
    }

    .md-file-icon {
      &:not(.md-disabled) {
        cursor: pointer;
      }

      &.md-disabled {
        pointer-events: none;
      }
    }
  }
</style>
