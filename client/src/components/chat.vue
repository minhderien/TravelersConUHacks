<template>
    <div class="login">

        <v-container>
            <h2>Create</h2>

            <v-text-field
                    v-model="email"
                    :rules="emailRules"
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
                    :rules="passwordRules"
                    label="New Password"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="confirmPassword"
                    :rules="passwordRules"
                    label="Confirm Password"
                    required
            ></v-text-field>
            <v-btn rounded dark color="Grey">
                Create Account
            </v-btn>



        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'chat',
        props: {
        },
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                country: ''
            }

        },
        methods: {

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
