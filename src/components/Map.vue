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
    layers() {
      return this.$store.state.layers;
    },
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
    },
    modus() {
      return this.$store.state.modus;
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
    getInfosAreaOnEvent() {
      // check if zoom is too high ->would show too many stations -> dont show any
      if (this.map.getZoom() < 13) {
        this.$store.commit("setStations", null);
        this.$store.commit("setRouteArea", null);
        return;
      }

      let bound = this.map.getBounds();
      this.$store.commit("changeBounds", bound);
      this.$store.dispatch("requestInfosArea");
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
    this.map.on("dragend", this.getInfosAreaOnEvent.bind(this));
    this.map.on("zoomend", this.getInfosAreaOnEvent.bind(this));

    let bounds = this.map.getBounds();
    this.$store.commit("changeBounds", bounds);
    this.$store.dispatch("requestInfosArea");
  },
  watch: {
    layers() {
      if (layers.fullEdges === true) {
      } else {
      }
    },
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
      if (this.stationLayer != null) {
        this.map.removeLayer(this.stationLayer);
      }
      let marker = [];

      let zoomLevel = this.map.getZoom();

      // scale radius
      const scale = zoomLevel - 7;
      // max zoom is 18 ;min8    now 1,10

      const radius = scale * 2;

      if (this.stations == null) return;

      if (this.layers.stations && this.modus === "stationsReach") {
        for (let node of this.stations.unreachable.Stations) {
          let options;

          options = { color: "#424ef4" };

          options.radius = 10;
          marker.push(L.circleMarker([node.lat, node.lon], options));
        }

        for (let node of this.stations.reachable.Stations) {
          let options;
          options = { color: "#f44141" };

          options.radius = 10;
          marker.push(L.circleMarker([node.lat, node.lon], options));
        }

        this.stationLayer = L.layerGroup(marker);

        this.stationLayer.addTo(this.map);
      } else {
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
      console.log(this.routeArea);
      if (this.routeAreaLayer != null) {
        this.map.removeLayer(this.routeAreaLayer);
      }

      if (this.routeArea != null && this.layers.fullEdges) {
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
