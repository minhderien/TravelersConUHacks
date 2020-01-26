<template>
  <div class="background">
    <v-container></v-container>
  </div>
</template>
<script>
export default {
        name: 'login',
        props: {
        },
        data() {
            return {
                
            }

        },
          mounted() {
       
                this.$router.push("/");
          
        }

    }
</script>