<template>
  <div>
    <br>
    <gmap-map
      :center="center"
      :zoom="10"
      style="width:100%;  height: 600px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "mapComponent",
    props: ['friends'],
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  created: function(){
      var markers = this.$store.getters.markers;
      var objs = markers.map(JSON.parse);
      // eslint-disable-next-line no-console
      for(var i =0 ; i < objs.length;i++){
          this.addMarker(objs[i].lat, objs[i].lng)
      }
  },
  mounted() {
    this.geolocate();







  },

  methods: {
    addMarkers() {
        const users = [
            {lat:45.508, lng: -73.587},
            {lat:46.522, lng: -73.530},
            {lat:45.502, lng: -73.590},
            {lat:46.516, lng: -73.600}
        ];
        
        users.forEach(u => {
            this.markers.push({ position: u });
        });
    },

    addMarker(lat,lng) {
        // eslint-disable-next-line no-console
        console.log(lat + " " + lng);
        var object = {
            "lat" : lat,
            "lng" : lng
        };
        this.markers.push({position : object});
        // eslint-disable-next-line no-console
        console.log(this.markers)

    },

    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>