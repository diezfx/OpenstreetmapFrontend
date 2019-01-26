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
    },
    routeArea() {
      return this.$store.state.routeArea;
    }
  },

  data() {
    return {
      routeLayer: null,
      stationLayer: null,
      routeAreaLayer: null,
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
    getStationsOnEvent() {
      // check if zoom is too high ->would show too many stations -> dont show any
      if (this.map.getZoom() < 10) {
        this.$store.commit("setStations", null);
        return;
      }

      let bound = this.map.getBounds();
      this.$store.dispatch("requestStations", bound);
    },
    getRoutesAreaOnEvent() {
      // check if zoom is too high ->would show too many stations -> dont show any
      if (this.map.getZoom() < 15) {
        this.$store.commit("setRouteArea", null);
        return;
      }

      let bound = this.map.getBounds();
      this.$store.dispatch("requestRouteArea", bound);
    }
  },

  mounted() {
    this.map = L.map("mapid").setView([48.742211, 9.206802], 13);
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

    this.map.on("click", this.onMapClick);
    this.map.on("dragend", this.getStationsOnEvent.bind(this));
    this.map.on("zoomend", this.getStationsOnEvent.bind(this));
    this.map.on("dragend", this.getRoutesAreaOnEvent.bind(this));
    this.map.on("zoomend", this.getRoutesAreaOnEvent.bind(this));

    let bounds = this.map.getBounds();
    this.$store.dispatch("requestStations", bounds);
    this.$store.dispatch("requestRouteArea", bounds);
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
      console.log(this.stations.Stations.length);
      if (this.stationLayer != null) {
        this.map.removeLayer(this.stationLayer);
      }
      let marker = [];

      let zoomLevel = this.map.getZoom();

      // scale radius
      const scale = zoomLevel - 7;
      // max zoom is 18 ;min8    now 1,10

      const radius = scale * 2;

      if (this.stations != null) {
        for (let node of this.stations.Stations) {
          let options;
          if (node.type == 1) {
            options = { color: "#424ef4" };
          } else {
            options = { color: "#f44141" };
          }

          options.radius = 1;
          marker.push(L.circleMarker([node.lat, node.lon], options));
        }

        this.stationLayer = L.layerGroup(marker);

        this.stationLayer.addTo(this.map);
      }
    },
    routeArea() {
      if (this.routeAreaLayer != null) {
        this.map.removeLayer(this.routeAreaLayer);
      }

      console.log(this.routeArea.coordinates.length)
      if (this.routeArea != null) {
        this.routeAreaLayer = L.geoJSON().addTo(this.map);
        this.routeAreaLayer.addData(this.routeArea);
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
