<template>
  <div class="route-input">
    <v-btn
      color="#afbfc7"
      v-bind:class="{'v-btn--active': $store.state.selected==='start'?true:false}"
      @click="$store.commit('changeSelected','start')"
      class="start"
    >Start</v-btn>
    <v-text-field label="Latitude" class="in-1" v-model="startLat"></v-text-field>
    <v-text-field label="Longitude" class="in-1" v-model="startLon"></v-text-field>
    <v-btn
      color="#afbfc7"
      v-bind:class="{'v-btn--active': $store.state.selected==='goal'?true:false}"
      @click="$store.commit('changeSelected','goal')"
      class="goal"
    >Goal:</v-btn>

    <v-text-field label="Latitude" class="in-1" v-model="goalLat"></v-text-field>
    <v-text-field label="Longitude" class="in-1" v-model="goalLon"></v-text-field>

    <button @click="clicked" class="btn-dark" id="buttonInput">Calculate</button>
  </div>
</template>

<script>
export default {
  name: "Huhu",
  props: {
    msg: String
  },
  data() {
    return { test: "huhu" };
  },
  computed: {
    startLat: {
      get() {
        return this.$store.state.start.lat;
      },
      set(v) {
        this.$store.commit("changeStart", { lat: v });
      }
    },
    startLon: {
      get() {
        return this.$store.state.start.lon;
      },
      set(v) {
        this.$store.commit("changeStart", { lon: v });
      }
    },
    goalLat: {
      get() {
        return this.$store.state.goal.lat;
      },
      set(v) {
        this.$store.commit("changeGoal", { lat: v });
      }
    },
    goalLon: {
      get() {
        return this.$store.state.goal.lon;
      },
      set(v) {
        this.$store.commit("changeGoal", { lon: v });
      }
    }
  },

  methods: {
    clicked() {
      if (this.goalLon == "" || this.goalLat == "") {
        this.$store.map.panTo([this.startLat, this.startLon]);
      } else {
        this.$store.commit("calcClicked");
        this.$store.dispatch("requestWay");
      }

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.route-input {
  display: grid;
  grid-template-columns: auto auto auto 100 px;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "start input input button"
    "goal input input button"
    ". . . .";
}

.start {
  grid-area: "start";
  align-self: center;
}
.goal {
  grid-area: "goal";
  align-self: center;
}

.v-btn--active {
  background-color: #009688 !important;
}

.bg-1 {
  background: #b2dfdb;
  color: #ffffff;
}

.bg-2 {
  background-color: #1a237e;
  color: #ffffff;
}

.in-1 {
  width: auto;
  padding: 2em;
}

.btn-dark {
  margin-top: 1rem;
  margin-bottom: 1rem;

  vertical-align: middle;
  align-self: center;

  height: 5rem;
  grid-area: button;
}
</style>
