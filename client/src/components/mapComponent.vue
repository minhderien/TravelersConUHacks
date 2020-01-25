<template>
    <div class="login">

        <v-container>
            <h2>Create</h2>

            <v-text-field
                    v-model="map"
                    label="map"
                    required
            ></v-text-field>



        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'mapComponent',
        props: {
        },
        data() {
            return {
                map: '',
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
