
<template>
  <v-app>
    <div id="app">

      <v-card
              color="grey lighten-4"
              flat
              tile
      >
        <v-toolbar>
        <div class="logo">
          <router-link :to="{name: 'Home'}">
            <v-img
                    height="200px"
                    width="200px"
                    contain
                    src="./assets/logo.png"
            >
            </v-img>
          </router-link>
        </div>

          <v-spacer></v-spacer>
          <div v-if="this.$store.getters.user">
            <router-link :to="{name: 'FriendFinder'}">
              <v-btn icon>
                <v-icon>mdi-compass</v-icon>
              </v-btn>
            </router-link>
            <v-btn @click="logout()" icon>
              Logout
            </v-btn>
          </div>
          <div v-if="!this.$store.getters.user"><!--switch to !user-->
            <router-link :to="{name: 'Login'}">
              <v-btn icon>
               Login
              </v-btn>
            </router-link>
          </div>

        </v-toolbar>
      </v-card>
      <v-content>
        <router-view></router-view>
      </v-content>
    </div>
  </v-app>

</template>

<script>
import axios from 'axios'

 

export default {
  name: 'App',

  components: {

  },
 created: function (){
   //Get connected userID
    this.$cookie.get("TravellerConnection")
 },
  data: () => ({
    user : ''

  }),
  methods: {

    logout(){
       var link = "http://localhost:5000/api/users/logout";
       axios.get(link, null, {credentials: 'include', data : {
                        
                    }}).then(response => {
                      
                      if(response){
                          this.$router.push("/login");
                          this.$store.commit('changeUser', null);
                          this.$store.commit('changeCountry', null);
                          this.$cookie.delete('TravellerConnection');
                      }
                    });
    }
  }
};

</script>

<style>
  .logo{

  }
</style>
