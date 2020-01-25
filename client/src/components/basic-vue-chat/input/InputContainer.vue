<template>
  <div class="input__container">
    <img
      v-show="file"
      :src="imagePreview"
      class="image--uploaded">
    <slot name="input-field">
      <input-field
        v-model="message"
        @newOwnMessage="onNewOwnMessage" />
    </slot>
    <slot name="input-button">
      <input-button @newOwnMessage="onNewOwnMessage" />
    </slot>
  </div>
</template>

<script>
import InputField from './InputField.vue'
import InputButton from './InputButton.vue'



export default {
  name: 'InputContainer',
  components: {
      InputField,
      InputButton,
    
  },
  props: {
    toggleEmojiPicker: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data: function () {
    return {
      message: '',
      file: undefined,
      imagePreview: ''
    }
  },
  methods: {
    onNewOwnMessage () {
      if ((!this.message || this.message === '') && !this.file) {
        return
      }

      this.$emit('newOwnMessage', this.message, this.file, this.imagePreview)

      this.message = ''

      this.file = undefined

      this.imagePreview = ''
    },
    handleFileUpload () {
      this.file = this.$refs.image.files[0]
      let reader = new FileReader()

      reader.addEventListener(
        'load',
        function () {
          this.imagePreview = reader.result
        }.bind(this),
        false
      )

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    },
    openEmojiPicker () {
      this.$emit('openEmojiPicker', true)
    },
    emojiPicked (emoji) {
      this.message += emoji.native
    }
  }
}
</script>

<style lang="scss" scoped>
.visible {
  display: none;
}
</style>
