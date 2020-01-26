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
    export default {
        name: 'profile',
        components : {
            mapComponent,
             BasicVueChat,
        },
        created : function(){
            // eslint-disable-next-line no-console
           console.log(this.$store.getters.user);
        },
        props: {
        },
        data() {
            return {
                cards: [],
                mapActive: true,
                activeIndex: null,
                friends: [{
                    name: "salim",
                    country: "Canada",
                    
                },{
                    name: "minh",
                    country: "Canada",
                 },{
                    name: "Vincent",
                    country: "Canada",
                 }]
            }
        },
        methods: {
            showChat(i,name){

                this.$store.commit('changeActiveChat', name);
                this.activeIndex = i;
                this.mapActive = false;
                document.getElementById('chatboxTitle').innerHTML = name;
            },
            showMap(){
                this.$store.commit('changeActiveChat', null);
      
                this.activeIndex = null;
                this.mapActive = true;
            }
        },
        mounted: {
            function () {
                this.mapActive = false;
                alert("test");
                
                 
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
