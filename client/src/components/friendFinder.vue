<template>
    <div class="profile">
        <div class="ProfilePic">
        <v-row
      
          class="grey lighten-5"
          style="height: 300px;"
        >
                    <v-col cols="3">
                        <div v-if="mapActive" >
                       <h2>Friends List</h2>


                        <v-list  >
                            <v-list-item 
                            :key="i" 
                            :flat="true"
                            :subheader="true"
                            :nav="true"
                            :two-line="true"
                            v-for="(item, i) in friends"
                             :class="{'active': i == activeIndex}"
                             @click="showChat(i, item.name)">
                             
                                <v-list-item-content>
                                    <v-list-item-title >{{item.name}} - <span class="displayCountry">{{item.country}}</span></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <br>
                       
                        </div> <v-btn v-if="!mapActive" @click="showMap()" rounded dark color="#f57542">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="9">
                        <div v-if="mapActive">
                        <mapComponent ref="mapComponentRef"></mapComponent>
                        </div>
                         
                            <div v-if="!mapActive">
                        <BasicVueChat :activeConversation="activeConversation"></BasicVueChat>
                            </div>
                       
                    </v-col>
                    </v-row>
               
          

        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console */
    import mapComponent from "./mapComponent";
    import BasicVueChat from './basic-vue-chat/BasicVueChat'
    import axios from 'axios'
    export default {

        name: 'profile',
        components : {
            mapComponent,
             BasicVueChat,
        },
        created : function(){
            this.getUsers();
            // eslint-disable-next-line no-console
        },
        data() {
            return {
                cards: [],
                mapActive: false,
                activeIndex: null,
                friends: [],
                data: false,
                loaded : false,
                activeConversation: null,
            }
        },
        methods: {
            getUsers(){
                var promise1 = axios.get('http://localhost:5000/api/users/active/conversations', {headers: {userId: this.$store.getters.userId}})
                    .then(function (res) {
                        return res.data
                    });
                var promise2 = axios.get('http://localhost:5000/api/users/nearby/', {headers: {userId: this.$store.getters.userId}})
                    .then(function (res) {
                        return res.data


                    });
                var self = this;
                Promise.all([promise1, promise2]).then(function (values){
                    var arr = [];
                    if(values[0][0] != null && values[1][0] != null){
                         arr = values[0].concat(values[1]);
                    }else{
                        if(values[0][0] == null && values[1][0] != null){
                            arr = values[1]
                        }else{
                            arr = values[0]
                        }
                        
                    }


                    self.friends = arr.reduce((unique, o) => {
                        if(!unique.some(obj => obj.name === o.name && obj.email === o.email)) {
                            unique.push(o);
                            var coordinates = {
                                "lat" : o.location.coordinates[0],
                                "lng" : o.location.coordinates[1]
                            }
                            self.$store.commit('changeMarkers', JSON.stringify(coordinates));


                        }



                        setTimeout(function(){
                            self.mapActive = true;
                        },2000);
                        return unique;
                    },[]);

                })


                // eslint-disable-next-line no-console

            },
            async showChat(i,name){
                // eslint-disable-next-line no-console
                let friendId = this.friends[i]._id;
                let userId = this.$cookie.get("TravellerConnection");
                let isConversation = false;
                let activeConvoId;

               let conversation = await axios.get(`http://localhost:5000/api/conversations/${userId}/${friendId}`);


                const {data} = conversation;
                if(data.length == 0) { // create convo
                    let newConvo = await axios.post(`http://localhost:5000/api/conversations/new/${userId}/${friendId}`);
                    self.activeConversation = newConvo;
                    isConversation = true;
                    activeConvoId = newConvo._id;
                }

                else {
                    self.activeConversation = data[0];
                    this.$store.commit('changeActiveChatId', data[0]._id);
                    isConversation = true;
                    activeConvoId = data[0]._id;
                }

                if(isConversation) {
                    const messages = await axios.get(`http://localhost:5000/api/conversations/${activeConvoId}`);
                    this.$store.commit('changeActiveMessages', messages.data.messages);
                }

                this.$store.commit('changeActiveChat', name);
                this.activeIndex = i;
                this.mapActive = false;
                if(this.mapActive){
                    document.getElementById('chatboxTitle').innerHTML = name;
                }

            },
            showMap(){
                this.$store.commit('changeActiveChat', null);
      
                this.activeIndex = null;
                this.mapActive = true;
          
            }
        },
        mounted() {
      
            if(this.$cookie.get("TravellerConnection") == null){
                this.$router.push("/login");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .NoCards {
        margin: auto;
        width: 50%;
    }
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .nameFriendList{
        color:black;
        font-weight:bold;
        font-size: 16px;

    }
    .v-list-item.active{
        background-color:   #fdcece
;
    }
    .displayCountry{
        color: grey;
    }
</style>
