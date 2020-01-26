<template>
    <div class="background">

        <v-container>
            <div class="login">
                <h2>Login</h2>

                <v-text-field
                        v-model="email"
                        label="Email"
                        required
                ></v-text-field>
                <v-text-field
                        :type="'password'"
                        v-model="password"
                        label="Password"
                        required
                        v-on:keyup.enter="login()"
                ></v-text-field>
                <v-btn @click="login()" class="loginBtn" rounded dark color="Grey">
                    Login
                </v-btn>
                <v-btn @click="create()" rounded dark color="Grey">
                    Register
                </v-btn>
                <span></span>
                <v-snackbar v-model="snackbar" >
                    {{error}}
                    <v-btn color="red" text @click="snackbar = false">
                        Close
                    </v-btn>
                </v-snackbar>
            </div>


        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'

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
                csrf:  "csrf",
                location: null
            }

        },
        methods: {
            login(){
             var link = "http://localhost:5000/api/users/login";   
             var linkLocation = ""; 
                // eslint-disable-next-line no-console
                  axios.post(link, null, {credentials: 'include', data : {
                        email :this.email,
                        password: this.password
                    }}).then(response => {
                        
                        if(response.status ==200 ){
                             this.$store.commit('changeUser', response.data.name);
                             this.$store.commit('changeCountry', response.data.country);
                             this.$store.commit('changeUserId', response.data.id);
                             this.$router.push('FriendFinder');

                             this.$cookie.set("TravellerConnection", response.data.id, 1);
                           
                        }
                        // eslint-disable-next-line no-console

                            linkLocation = "http://localhost:5000/api/users/location/" + response.data.id  ;
                            //(linkLocation)
                            axios.post(linkLocation, null, {credentials: 'include', data : {
                                latitude: this.location.coords.latitude,
                                longitude: this.longitude.coords.longitude
                            } }).catch();

                    }).catch(error => {
                    // eslint-disable-next-line no-console
                        console.log(error);
                        this.error = error
                        this.snackbar = true;

                });
               
                        navigator.geolocation.getCurrentPosition(pos => {
                               
                                this.location = pos;
                            }, err => {
                                
                                this.errorStr = err.message;
                            })
                         
            },
            create(){
                location.href = "/#/create"
            }

            
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .background{
        background-image: url("../assets/BackgroundLogin.jpeg");
        background-size:     cover;                      /* <------ */
        background-repeat:   no-repeat;
        background-position: center center;
        height: 1000px;
    }
    .loginBtn{
        margin-right: 15px;
    }
    .login {
        padding-top: 15%;
       
        margin: auto;
        width: 50%;
        display:block
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
