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
    import axios from 'axios'

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
      authorId: this.$cookie.get("TravellerConnection"), //get from state
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
    this.getAllMessages()
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
      axios.post('http://localhost:5000/api/conversations/'+ this.$store.getters.activeChatId, null, {credentials: 'include', data : {
                       composedMessage: message,
                        idAuthor: this.$store.getters.userId 
                    }}).then(response => {
                    // eslint-disable-next-line no-console
                        console.log(this.$store.getters.conversationId)
                        if(response.status == 200 ){

                           // alert("message sent :" + message + " to " + this.$store.getters.conversationId._id);
                        }

                    }).catch(error => {
                    // eslint-disable-next-line no-console
                        console.log(error);
                        this.error = error
                        this.snackbar = true;

                });
      scrollToBottom()

      this.$emit('newOwnMessage', message);
      console.log('here')
      this.$socket.emit('sendMessage', newOwnMessage)
    },
    onOpenEmojiPicker (toggle) {
      this.setEmojiPickerToggle(toggle)
    },
    getAllMessages() {
      self.authorId = this.$cookie.get("TravellerConnection");
      let messages = this.$store.getters.messages;

      let compare =   function ( a, b ) {
      if ( a.createdAt < b.createdAt ){
        return -1;
      }
      if ( a.createdAt> b.createdAt ){
        return 1;
      }
      return 0;
    }
    console.log('messages', messages)
    messages = messages.sort( compare );
    messages.forEach(m => {

        const newOwnMessage = {
          id: m.author._id,
          contents: m.body,
          image: '',
          imageUrl: '',
          date: moment(m.createdAt).format('DD MM YYYY - HH:mm:ss')
        };

        this.pushToFeed(newOwnMessage);

        scrollToBottom()

        this.$emit('newOwnMessage', m.body);
    });
    }
  },
  sockets: {
        receiveMessage: function(data) {
          if(this.$cookie.get("TravellerConnection") == data.id) {
            return;
          }

          const newOwnMessage = {
          id: data.id,
          contents: data.contents,
          image: '',
          imageUrl: '',
          date: moment(data.data).format('DD MM YYYY - HH:mm:ss')
        };

        this.pushToFeed(newOwnMessage);

        scrollToBottom()

        this.$emit('newOwnMessage', data.contents);
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
