<script>
import { h } from 'vue'
import MdComponent from '@/core/MdComponent'
import MdUuid from '@/core/utils/MdUuid'
import MdFieldMixin from '../MdFieldMixin'

export default MdComponent({
  name: 'MdInput',
  mixins: [MdFieldMixin],
  props: {
    id: {
      type: String,
      default: () => 'md-input-' + MdUuid()
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    toggleType () {
      return this.MdField.togglePassword
    },
    isPassword () {
      return this.type === 'password'
    }
  },
  watch: {
    type (type) {
      this.setPassword(this.isPassword)
    },
    toggleType (toggle) {
      if (toggle) {
        this.setTypeText()
      } else {
        this.setTypePassword()
      }
    }
  },
  methods: {
    setPassword (state) {
      this.MdField.password = state
      this.MdField.togglePassword = false
    },
    setTypePassword () {
      this.$el.type = 'password'
    },
    setTypeText () {
      this.$el.type = 'text'
    }
  },
  created () {
    this.setPassword(this.isPassword)
  },
  beforeUnmount () {
    this.setPassword(false)
  },
  render() {
    return h('input', {
      class: 'md-input',
      ...this.attributes,
      value: this.model,
      onInput: (e) => {
        this.model = e.target.value
      },
      onFocus: this.onFocus,
      onBlur: this.onBlur
    })
  }
})
</script>
