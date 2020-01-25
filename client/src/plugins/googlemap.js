import Vue from 'vue';
import VueGoogleMaps from "vue2-google-maps";
import 'vuetify/dist/vuetify.min.css';

Vue.use(VueGoogleMaps);

export default new VueGoogleMaps({
    load: {
        key: "AIzaSyDb38eOeort7qc_U56E6esfIcpnXEBZzho",
        libraries: "places" // necessary for places input
    }
})
