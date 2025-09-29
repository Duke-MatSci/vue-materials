<script>
import { h, mergeProps } from "vue"
import MdUuid from "@/core/utils/MdUuid"
import MdFileIcon from "@/core/icons/MdFileIcon.vue"
import MdFieldMixin from "../MdFieldMixin"

const extractListeners = (attrs = {}) => {
  const listeners = {}
  Object.keys(attrs).forEach((key) => {
    const value = attrs[key]
    if (key.startsWith("on") && typeof value === "function") {
      listeners[key] = value
    }
  })
  return listeners
}

export default {
  name: "MdFile",
  inheritAttrs: false,
  components: {
    MdFileIcon,
  },
  mixins: [MdFieldMixin],
  inject: ["MdField"],
  props: {
    id: {
      type: String,
      default: () => "md-file-" + MdUuid(),
    },
    name: String,
  },
  computed: {
    iconClass() {
      return {
        "md-disabled": this.disabled,
      }
    },
    fileListeners() {
      return extractListeners(this.$attrs)
    },
  },
  methods: {
    getMultipleName(files) {
      const names = []
      Array.from(files || []).forEach(({ name }) => names.push(name))
      return names.join(", ")
    },
    getFileName(files, target) {
      if (!files || files.length === 0) {
        return target.value.split("\\").pop()
      }

      if (files.length > 1) {
        return this.getMultipleName(files)
      }

      if (files.length === 1) {
        return files[0].name
      }

      return null
    },
    openPicker() {
      this.onFocus()
      if (this.$refs.inputFile) {
        this.$refs.inputFile.click()
      }
    },
    onChange(event) {
      this.onFileSelected(event)
      const handler = this.fileListeners.onChange
      if (handler) {
        handler(event)
      }
    },
    onFileSelected({ target, dataTransfer }) {
      const files = (target && target.files) || (dataTransfer && dataTransfer.files)
      this.model = this.getFileName(files, target)
      this.setFieldValue()
      this.$emit("md-change", files || (target && target.value))
    },
  },
  created() {
    this.MdField.file = true
  },
  beforeUnmount() {
    this.MdField.file = false
  },
  render() {
    const fileListeners = { ...this.fileListeners }
    delete fileListeners.onChange

    const textInput = h(
      "input",
      mergeProps(
        {
          class: "md-input",
          readonly: true,
          value: this.model,
        },
        {
          disabled: this.disabled,
          required: this.required,
          placeholder: this.placeholder,
        },
        {
          onClick: this.openPicker,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
        }
      )
    )

    const fileInput = h(
      "input",
      mergeProps(
        {
          type: "file",
          ref: "inputFile",
          onChange: this.onChange,
        },
        this.attributes,
        fileListeners
      )
    )

    return h("div", { class: "md-file" }, [
      h(MdFileIcon, { class: ["md-file-icon", this.iconClass], onClick: this.openPicker }),
      textInput,
      fileInput,
    ])
  },
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

