!<template>
  <div class="info">
  <div v-if="routeStations">
    #Stations: {{routeStations.length}}
  </div>
  <div v-if="routeCosts">
    RouteDistance: {{routeCosts/100}} m
  </div>

    </div>
</template>

<script>
export default {
  computed: {
    info() {
      return this.$store.state.info;
    },
    routeStations() {
      return this.$store.state.routeStations;
    },
    routeCosts() {
      return this.$store.state.routeCosts;
    }
  },
  data() {
    return {};
  },
  watch: {
    routeStations() {
      if (this.routeStations) {
      }
    },
    routeCosts(){
      console.log(this.routeCosts)
    }

  },
  mounted() {
    this.$store.dispatch("requestMetaInfo");
  }
};
</script>

<style>
</style>
