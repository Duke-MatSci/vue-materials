<script>
import { h } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdUuid from '@/core/utils/MdUuid'
import MdFieldMixin from '../MdFieldMixin'

function calculateContentHeight (el, lineHeight) {
  const origHeight = el.style.height
  const height = el.offsetHeight
  const scrollHeight = el.scrollHeight

  el.style.overflow = 'hidden'

  if (height >= scrollHeight) {
    el.style.height = (height + lineHeight) + 'px'

    if (scrollHeight < el.scrollHeight) {
      el.style.height = origHeight

      return height
    }
  }

  return scrollHeight
}

export default MdComponent({
  name: 'MdTextarea',
  mixins: [MdFieldMixin],
  props: {
    id: {
      type: String,
      default: () => 'md-textarea-' + MdUuid()
    },
    mdAutogrow: Boolean
  },
  computed: {
    textareaStyles () {
      return {
        height: this.textareaHeight
      }
    }
  },
  methods: {
    getTextAreaLineSize () {
      const style = window.getComputedStyle(this.$el)

      return parseInt(style.lineHeight, 10)
    },
    setTextAreaSize (height) {
      let newHeight = height

      if (!height) {
        const size = this.getTextAreaLineSize()

        newHeight = calculateContentHeight(this.$el, size)
      }

      this.textareaHeight = newHeight + 'px'
    },
    applyStyles () {
      if (this.mdAutogrow) {
        this.setTextAreaSize(32)
        this.$nextTick().then(() => {
          this.setTextAreaSize()
          window.setTimeout(() => {
            this.$el.style.overflow = 'auto'
          }, 10)
        })
      }
    },
    setTextarea () {
      this.MdField.textarea = true
    },
    setAutogrow () {
      this.MdField.autogrow = this.mdAutogrow
    },
    onInput (e) {
      this.model = e.target.value
      this.setFieldValue()
    }
  },
  watch: {
    localValue () {
      this.applyStyles()
    }
  },
  created () {
    this.setTextarea()
    this.setAutogrow()
  },
  mounted () {
    this.$nextTick().then(this.applyStyles)
  },
  beforeUnmount () {
    this.MdField.textarea = false
  },
  render() {
    return h('textarea', {
      class: 'md-textarea',
      style: this.textareaStyles,
      ...this.attributes,
      value: this.model,
      onInput: this.onInput,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    })
  }
})
</script>
