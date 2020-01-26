<template>
  <div class="login">
    <v-container>
      <h2>Friends List</h2>

      <v-list>
        <v-list-item 
        :key="i" 
        v-for="(item, i) in friends"
        :inactive="inactive" @click="showChat()">
            <v-list-item-content>
                {{ item.name }} {{item.country}}
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "profile",
  props: {},
  data: () => ({
    friends: [{
        name: "salim",
        country: "Canada"
    },{
        name: "minh",
        country: "Canada"
    },{
        name: "Vincent",
        country: "Canada"
    }]
  }), 
  beforeMount(){
      var link = 
    axios.get(link, null, {credentials: 'include', data : {
                        
                    }}).then(response => {
                      
                      if(response){
                        this.$router.push("/login")
                      }
                    });
 },
 mounted(){
   alert(this.$cookie.get("TravellerConnection"));
    if(this.$cookie.get("TravellerConnection") == null){
      this.$router.push("/login");
    }
 }
};
</script>