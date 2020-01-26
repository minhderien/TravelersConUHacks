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
 
    send () {
 
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
