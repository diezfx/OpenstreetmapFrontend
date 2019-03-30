<template>
  <div id="app">
    <FlashMessage/>
    <div class="container-fluid">
      <div class="container">
        <div v-if="modus === 'stationsReach'">
          <TopBar />
        </div>
        <div v-else>
          <HelloWorld/>
        </div>
      </div>
      <div class="col-9">
        <Map/>
        <Info/>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import FlashMessage from "./components/FlashMessage.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Map from "./components/Map.vue";
import Info from "./components/Info.vue";
export default {
  name: "app",
  components: {
    FlashMessage,
    TopBar,
    HelloWorld,
    Map,
    Info
  },
  methods: {
    calculate() {}
  },
  data() {
    return {};
  },
  computed: {
    modus() {
      return this.$store.state.modus;
    }
  },
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.row {
  padding-top: 1rem;
}
</style>
