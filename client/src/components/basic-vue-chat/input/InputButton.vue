<template>
  <div
    class="input__button"
    @click="send">
    Send
  </div>
</template>

<script>

export default {
  name: 'InputButton',
  methods: {
    send () {
      this.$emit('newOwnMessage')
    }
  }
}
</script>

<style>

</style>
