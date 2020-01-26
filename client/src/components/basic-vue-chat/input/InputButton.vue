<template>
  <div
    class="input__button"
    @click="clickButton">
    Send
  </div>
</template>

<script>

export default {
  name: 'InputButton',
  props: {
    newMessage: String,
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    send (event) {
      this.$emit('newOwnMessage')
    },
    clickButton() {
      this.$emit('newOwnMessage')
    },
  },
}
</script>

<style>

</style>
