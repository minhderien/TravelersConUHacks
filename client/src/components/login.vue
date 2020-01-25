<template>
    <div class="login">

        <v-container>
            <h2>Login</h2>

            <v-text-field
                    v-model="email"
                    label="Email"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    label="Password"
                    required
            ></v-text-field>
            <v-btn v-on:click="login()" rounded dark color="Grey">
                Login
            </v-btn>
            <span></span>
            <v-snackbar v-model="snackbar" >
                {{error}}
                <v-btn color="red" text @click="snackbar = false">
                    Close
                </v-btn>
            </v-snackbar>

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
                csrf:  "csrf"
            }

        },
        methods: {
            login(){
                // eslint-disable-next-line no-console
                console.log("test")
                axios.post('http://localhost:8081/login', null, {credentials: 'include', data : {
                        email :this.email,
                        password: this.password
                    }}).then(response => {
                    // eslint-disable-next-line no-console
                        console.log(response)
                        if(response.status ==200 ){

                            this.$router.push('Profile')
                        }

                    }).catch(error => {
                    // eslint-disable-next-line no-console
                        console.log(error);
                        this.error = error
                        this.snackbar = true;

                });
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .information {
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
