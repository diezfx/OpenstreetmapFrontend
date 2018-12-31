<template>
  <div class="map">
    <div id="mapid"></div>
    <button @click="test">test</button>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  props: {},
  computed: {
    start() {
      return this.$store.getters.start;
    },
    goal() {
      return this.$store.getters.goal;
    }
  },
  data() {
    return {};
  },
  methods: {
    test() {
      this.$store.commit("changeStartLon", 25325235);
    },
    test2(e) {
      console.log(e);
    },
    onMapClick(e) {
      this.$store.commit("setSelected", {
        lat: e.latlng.lat,
        lon: e.latlng.lng
      });
      this.$store.commit("toggleSelected");
    }
  },

  mounted() {
    this.$store.map = L.map("mapid").setView([51.505, -0.09], 13);

    this.$store.map.on("click", this.onMapClick);

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
    ).addTo(this.$store.map);
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
