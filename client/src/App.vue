<template>
  <v-app>
    <div id="app">

      <v-card
              color="grey lighten-4"
              flat
              tile
      >
        <v-toolbar dense>

          <router-link :to="{name: 'Feed'}">
            <v-toolbar-title>TravelersConUHacks</v-toolbar-title>
          </router-link>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <div v-if="user"> <!--switch to user-->
            <router-link :to="{name: 'Profile'}">
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </router-link>
            <v-btn @click="logout()" icon>
              Logout
            </v-btn>
          </div>
          <div v-if="!user"><!--switch to !user-->
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

  data: () => ({
    user : {
    

    },

  }),
  methods: {

    logout(){
       var link = "http://localhost:5000/api/users/logout";
       axios.get(link, null, {credentials: 'include', data : {
                        
                    }}).then(response => {
                      
                      if(response){
                        this.$router.push("/login")
                      }
                    });
    }
  }
};

</script>
