<template>
    <div class="profile">
        <div class="ProfilePic">
        <v-row
      
          class="grey lighten-5"
          style="height: 300px;"
        >
                    <v-col cols="3">
                        <div>
                       <h2>Friends List</h2>


                        <v-list>
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
                                <v-list-item-subtitle><span class="MessageFriendList">Message :</span>{{i}} </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <br>
                        <v-btn v-if="!mapActive" @click="showMap()" rounded dark color="#f57542">
                        Back to map
                        </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="9">
                        <div v-if="mapActive">
                        <mapComponent></mapComponent>
                        </div>
                         
                            <div v-if="!mapActive">
                        <BasicVueChat></BasicVueChat>
                            </div>
                       
                    </v-col>
                    </v-row>
               
          

        </div>
    </div>
</template>

<script>
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
            console.log(this.friends)
        },

        props: {
        },
        data() {
            return {
                cards: [],
                mapActive: true,
                activeIndex: null,
                friends: [],
                data: false,
                loaded : false,
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
                    var arr = values[0].concat(values[1]);
                    self.friends = arr.reduce((unique, o) => {
                        if(!unique.some(obj => obj.name === o.name && obj.email === o.email)) {
                            unique.push(o);
                        }
                        // eslint-disable-next-line no-console
                        return unique;
                    },[]);

                })


                // eslint-disable-next-line no-console

            },
            showChat(i,name){

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
