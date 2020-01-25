<template>
  <div
    class="basic-vue-chat"
    @click="setEmojiPickerToggle(false)">
    <section class="window" >
      <header id="chatboxTitle"  class="window__header__container" >
        <slot  name="header" v-html="chatboxTitle">
         {{chatboxTitle}}
        </slot>
      </header>
      <section
        id="window__messages__container"
        class="window__messages__container">
        <slot>
          <messages-list
            :feed="feed"
            :author-id="authorId"
            class="messages-list" />
        </slot>
      </section>
      <div class="window__input__container">
        <slot name="input-container">
          <input-container
            :toggle-emoji-picker="toggleEmojiPicker"
            @newOwnMessage="onNewOwnMessage"
            @openEmojiPicker="onOpenEmojiPicker"
          />
        </slot>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { scrollToBottom } from '../../helpers/scroll.js'
import MessagesList from './messages/MessagesList.vue'
import InputContainer from './input/InputContainer.vue'

export default {
  name: 'BasicVueChat',
  components: {
    MessagesList,
    InputContainer
  },
  props: {
    title: { //change for user name contacted
      type: String,
      default:  '' ,
      required: false
    },
    initialAuthorId: {
      type: Number, //change to current user id
      default: 0,
      required: false
    },
    attachMock: {
      type: Boolean,
      default: false,
      required: false
    },
    initialFeed: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    newMessage: {
      type: Object,
      default: function () {
        return {}
      },
      required: false
    }
  },
  data: function () {
    return {
      feed: [],
      authorId: 0, //get from state
      toggleEmojiPicker: false,
      titleChat: this.$store.getters.activeChat,
      titleChatId: this.$store.getters.activeChatId
    }
  },
  watch: {
    newMessage: function (newValue) {
      this.pushToFeed(newValue)
      scrollToBottom()
    }
  },
  mounted () {
    /*if (this.attachMock) {
      import('./mocks/mock-messages-list.js')
        .then(mockData => {
          this.feed = mockData.default.feed
          this.setAuthorId(mockData.default.authorId)
        })

    } else {
      this.feed = this.initialFeed
      this.authorId = this.initialAuthorId
    }*/
  },
  methods: {
    setEmojiPickerToggle (toggle) {
      this.toggleEmojiPicker = toggle
    },
    pushToFeed (element) {
      this.feed.push(element)
    },
    onNewOwnMessage (message, image, imageUrl) {
      const newOwnMessage = {
        id: this.authorId,
        contents: message,
        image: image,
        imageUrl: imageUrl,
        date: moment().format('HH:mm:ss')
      };

      this.pushToFeed(newOwnMessage);

      scrollToBottom()

      this.$emit('newOwnMessage', message)
    },
    onOpenEmojiPicker (toggle) {
      this.setEmojiPickerToggle(toggle)
    }
  },
  computed: {
    // a computed getter
    chatboxTitle: function () {
      // `this` points to the vm instance
      return this.titleChat
    }
  }
}
</script>

<style lang="scss">

@import "../../assets/scss/main.scss";
</style>
