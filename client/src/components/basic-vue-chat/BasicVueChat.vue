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
/* eslint-disable no-console */
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
      authorId: this.$cookie.get("TravellerConnection"), //current user id
      toggleEmojiPicker: false,
      titleChat: this.$store.getters.activeChat,
      titleChatId: this.$store.getters.activeChatId
    }
  },
  watch: {
    newMessage: function (newValue) {
      this.pushToFeed(newValue)
      scrollToBottom()
      // eslint-disable-next-line no-console
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
        id: this.$cookie.get("TravellerConnection"),
        contents: message,
        image: image,
        imageUrl: imageUrl,
        date: moment().format('HH:mm:ss')
      };

      this.pushToFeed(newOwnMessage);

      scrollToBottom()

      this.$emit('newOwnMessage', message);
      this.$socket.emit('sendMessage', newOwnMessage)
    },
    onOpenEmojiPicker (toggle) {
      this.setEmojiPickerToggle(toggle)
    }
  },
  sockets: {
        receiveMessage: function(data) {
          // check if message is from another user
          if(data.id !== this.authorId) {
            // show message as receiver 
            const newOwnMessage = {
            id: data,
            contents: data.contents,
            image: data.contents,
            imageUrl: data.imageUrl,  
            date: data.date
            };

            this.pushToFeed(newOwnMessage);

            scrollToBottom()

            this.$emit('newOwnMessage', data.contents);
            }
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
