<template>
  <div class="map bg-1">
    <div id="mapid"></div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  props: {},
  computed: {
    start() {
      return this.$store.state.start;
    },
    goal() {
      return this.$store.state.goal;
    },
    route() {
      return this.$store.state.route;
    },

    map() {
      return this.$store.state.map;
    }
  },
  data() {
    return {
      myLayer: null
    };
  },
  methods: {
    onMapClick(e) {
      this.$store.commit("setSelected", {
        lat: e.latlng.lat,
        lon: e.latlng.lng
      });
      this.$store.commit("toggleSelected");
    }
  },

  mounted() {
    this.$store.commit(
      "setMap",
      L.map("mapid").setView([48.742211, 9.206802], 13)
    );

    this.map.on("click", this.onMapClick);

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox.streets"
      }
    ).addTo(this.map);
  },
  watch: {
    route() {
      // delete old route

      if(this.myLayer!=null){
      this.map.removeLayer(this.myLayer);

      }

      if (this.route != null) {
        console.log(this.route);
        this.myLayer = L.geoJSON().addTo(this.map);
        this.myLayer.addData(this.route);
      }
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/leaflet/dist/leaflet.css";

.bg-1 {
  background: #b2dfdb;
  color: #ffffff;
}

#mapid {
  width: 100%;
  height: 600px;
}
</style>
