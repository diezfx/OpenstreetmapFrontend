<template>
  <div id="app">
    <div class="container-fluid">
      <div class="container">
        <HelloWorld v-on:click="calculate" msg="Welcome to Your Vue.js App"/>
      </div>

      <div class="col-9">
        <Map/>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Map from "./components/Map.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    Map
  },
  methods: {
    calculate() {}
  },
  data() {
    return {};
  },
  computed: {},
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
