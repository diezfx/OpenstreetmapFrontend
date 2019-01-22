<template>
  <div class="map bg-1">
    <div id="mapid"></div>
  </div>
</template>

<script>
import L from "leaflet";

// workaround...
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

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
    stations() {
      return this.$store.state.stations;
    }
  },

  data() {
    return {
      routeLayer: null,
      stationLayer: null,
      map: null
    };
  },
  methods: {
    onMapClick(e) {
      this.$store.commit("setSelected", {
        lat: e.latlng.lat,
        lon: e.latlng.lng
      });
      this.$store.commit("toggleSelected");
    },
    getStationsOnEvent ()  {
      
      // check if zoom is too high ->would show too many stations -> dont show any
      if (this.map.getZoom() < 10) {
        this.$store.commit("setStations", null);
        return;
      }
      let bound = this.map.getBounds();
      console.log(bound)
      this.$store.dispatch("requestStations",bound);
    }
  },

  mounted() {
    this.map = L.map("mapid").setView([48.742211, 9.206802], 13);

    this.map.on("click", this.onMapClick);
    this.map.on("dragend", this.getStationsOnEvent.bind(this));
    this.map.on("zoomend",this.getStationsOnEvent.bind(this));

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

    this.$store.dispatch("requestStations");
  },
  watch: {
    route() {
      // delete old route

      if (this.routeLayer != null) {
        this.map.removeLayer(this.routeLayer);
      }

      if (this.route != null) {
        this.routeLayer = L.geoJSON().addTo(this.map);
        this.routeLayer.addData(this.route);
      }
    },
    stations() {
      console.log(this.stationLayer)
      if (this.stationLayer != null) {
        console.log("hallooo")
        this.map.removeLayer(this.stationLayer);
      }
      let marker = [];

      if (this.stations != null) {
        let i = 0;
        for (let node of this.stations.Stations) {
          marker.push(L.marker([node.lat, node.lon]));
          i++;
          if (i > 500) break;
        }

        this.stationLayer = L.layerGroup(marker);

        this.stationLayer.addTo(this.map);
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
