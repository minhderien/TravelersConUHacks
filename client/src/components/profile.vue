
<template>
    <div class="profile">
        <div class="ProfilePic">
            <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    grow
            >
                <v-tab>Map</v-tab>
                <v-tab>Chat</v-tab>

                
                <v-tab-item>
                    <v-row
          :align="alignment"
          :justify="justify"
          class="grey lighten-5"
          style="height: 300px;"
        >
                    <v-col cols="3">
                        <friendListComponent></friendListComponent>
                    </v-col>
                    <v-col cols="9">
                        <mapComponent></mapComponent>
                    </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <BasicVueChat></BasicVueChat>
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
    import mapComponent from "./mapComponent";
    import friendListComponent from "./friendListComponent"
    import BasicVueChat from './basic-vue-chat/BasicVueChat'
    export default {
        name: 'profile',
        components : {
            mapComponent,
            friendListComponent,
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
                cards: []
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
</style>
