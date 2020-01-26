<template>

        <v-parallax
                dark
                height="1200"
                src="../assets/banner.jpg"

        >
            <v-row
                    align="center"
                    justify="center"
            >
                <v-col class="text-left" cols="12">
                    <div class="text1">
                        <v-card
                                class="mx-auto"
                                max-width="400"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4"></div>
                                    <v-list-item-title class="headline mb-1">Traveling</v-list-item-title>
                                    <v-list-item-subtitle>Travel to your destination alone or with friends </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="100"
                                        color="grey"
                                ><img
                                        src="../assets/undraw_aircraft_fbvl.svg"
                                ></v-list-item-avatar>
                            </v-list-item>

                        </v-card>
                    </div>
                    <div class="text2">
                        <v-card
                                class="mx-auto"
                                max-width="400"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4"></div>
                                    <v-list-item-title class="headline mb-1">Find fellow travelers</v-list-item-title>
                                    <v-list-item-subtitle>Find fellow travelers wherever you are going using our friend finder</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="100"
                                        color="grey"
                                ><img
                                        src="../assets/undraw_Map_light_3hjy.svg"
                                ></v-list-item-avatar>
                            </v-list-item>

                        </v-card>
                    </div>
                    <div class="text3">
                        <v-card
                                class="mx-auto"
                                max-width="400"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4"></div>
                                    <v-list-item-title class="headline mb-1">Chat</v-list-item-title>
                                    <v-list-item-subtitle>Chat with your new friends and do your travel plans</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="100"
                                        color="grey"
                                ><img
                                        src="../assets/undraw_chatting_2yvo.svg"
                                ></v-list-item-avatar>
                            </v-list-item>

                        </v-card>
                    </div>
                    <div class="text4">
                        <v-card
                                class="mx-auto"
                                max-width="400"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4"></div>
                                    <v-list-item-title class="headline mb-1">Meet up</v-list-item-title>
                                    <v-list-item-subtitle>Meet up and enjoy everything the world has to offer</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="100"
                                        color="grey"
                                ><img
                                        src="../assets/undraw_Waiting__for_you_ldha.svg"
                                ></v-list-item-avatar>
                            </v-list-item>

                        </v-card>
                    </div>
                    <div class="text5">
                        <v-card
                                class="mx-auto"
                                max-width="400"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4"></div>
                                    <v-list-item-title class="headline mb-1">Join us !</v-list-item-title>
                                    <v-list-item-subtitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                        !</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-avatar
                                        tile
                                        size="100"
                                        color="grey"
                                ><img
                                        src="../assets/undraw_community_8nwl.svg"
                                >
                                </v-list-item-avatar>
                            </v-list-item>

                                <v-card-actions>
                                        <v-btn @click="register()" text>
                                            Register
                                        </v-btn>
                                        <v-btn @click="login()" text>
                                            Login
                                        </v-btn>

                                </v-card-actions>


                                

                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-parallax>

</template>

<script>

    export default {
        name: 'login',
        props: {
        },
        data() {
            return {
                email: '',
                password: '',
                snackbar: false,
                error: '',
                csrf:  "csrf"
            }

        },
        methods: {
            login(){
               this.$router.push('Login');
            },
            register(){
                this.$router.push('Create');
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .text2{
        border-radius: 150px;
        position: absolute;
        bottom: 60%;
        left: 10px;
        font-size: 18px;
        margin: 10px;
        background-color: #ffffff;
        filter: alpha(opacity=60); /* For IE8 and earlier */
    }
    .text1{
        border-radius:150px;
        position: absolute;
        bottom: 80%;
        right: 10px;
        font-size: 18px;
        margin: 10px;
        background-color: #ffffff;
        filter: alpha(opacity=60); /* For IE8 and earlier */
    }
    .text3{
        border-radius:150px;
        position: absolute;
        bottom: 40%;
        right: 10px;
        font-size: 18px;
        margin: 10px;
        background-color: #ffffff;
        filter: alpha(opacity=60); /* For IE8 and earlier */
    }
    .text4{
        border-radius:150px;
        position: absolute;
        bottom: 20%;
        left: 10px;
        font-size: 18px;
        margin: 10px;
        background-color: #ffffff;
        filter: alpha(opacity=60); /* For IE8 and earlier */
    }
    .text5{
        border-radius:150px;
        position: absolute;
        bottom: 0%;
        right: 10px;
        font-size: 18px;
        margin: 10px;
        background-color: #ffffff;
        filter: alpha(opacity=60); /* For IE8 and earlier */
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
