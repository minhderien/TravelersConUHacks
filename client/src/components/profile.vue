
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
                    <mapComponent></mapComponent>
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
    import BasicVueChat from './basic-vue-chat/BasicVueChat'
    export default {
        name: 'profile',
        components : {
            mapComponent,
            BasicVueChat,
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
