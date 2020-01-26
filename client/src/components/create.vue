<template>
    <div class="login">

        <v-container>
            <h2>Create</h2>
            <v-text-field
                    v-model="name"
                    label="Name"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="email"
                   
                    label="Email"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="country"
                    label="Country"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="password"
                   :type="'password'"
                    label="New Password"
                    required
                    v-on:keyup.enter="register()"
            ></v-text-field>
            <v-btn @click="register()" rounded dark color="Grey">
                Create Account
            </v-btn>



        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'create',
        props: {
        },
        data() {
            return {
                email: '',
                password: '',
                country: '',
                name: ''
            }

        },
        methods: {
            register(){
                axios.post('http://localhost:5000/api/users/register', null, {credentials: 'include', data : {
                        email :this.email,
                        password: this.password,
                        country: this.country,
                        name: this.name
                    }}).then(response => {
                    // eslint-disable-next-line no-console
                        console.log(response)
                        if(response.status == 200 ){

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
