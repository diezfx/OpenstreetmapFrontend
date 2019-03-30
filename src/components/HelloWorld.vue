<template>
  <div class="route-input">
    <v-btn
      color="#afbfc7"
      v-bind:class="{'v-btn--active': $store.state.selected==='start'?true:false}"
      @click="$store.commit('changeSelected','start')"
      class="start"
    >Start</v-btn>
    <v-text-field label="Latitude" id="start1" class="in-1 start1" v-model="startLat"></v-text-field>
    <v-text-field label="Longitude" id="start2" class="in-1 start2" v-model="startLon"></v-text-field>
    <v-btn
      color="#afbfc7"
      v-bind:class="{'v-btn--active': $store.state.selected==='goal'?true:false}"
      @click="$store.commit('changeSelected','goal')"
      class="goal"
    >Goal:</v-btn>

    <v-text-field label="Latitude" id="goal1" class="in-1 goal1" v-model="goalLat"></v-text-field>
    <v-text-field label="Longitude" id="goal2" class="in-1 goal2" v-model="goalLon"></v-text-field>

    <v-text-field label="Range in km (0=infinite)"  class="in-1 range" v-model="range"></v-text-field>

     <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
          class="modus"
        >
          Modus
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in modi"
          :key="index"
          @click="modusChange(item)"
        >
          <v-list-tile-title>{{ item }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn @click="clicked" color="secondary" dark class="btn-dark" id="buttonInput">Calculate</v-btn>
  </div>
</template>

<script>
export default {
  name: "Huhu",
  props: {
    msg: String
  },
  data() {
    return { test: "huhu", range:0 };
  },
  computed: {
    modi() {
      return this.$store.state.modi;
    },
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
    modusChange(modus){
      this.$store.commit("setModus",modus)
    },
    clicked() {
      if (this.goalLon == "" || this.goalLat == "") {
        //todo fix
        this.$store.map.panTo([this.startLat, this.startLon]);
      }else if(this.range>0){

        this.$store.commit("calcClicked");
        this.$store.dispatch("requestWayWithStations",this.range);

      }
       else {
        this.$store.commit("calcClicked");
        this.$store.dispatch("requestWay");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.route-input {
  display: grid;
  grid-template-columns: auto auto auto auto 100 px;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "start inputsl inputslo range button"
    "goal inputgl inputglo input button"
    ". . . . .";
}

.start {
  align-self: center;
  grid-area: start;
}
.goal {
  grid-area: goal;
  align-self: center;
}

.v-btn--active {
  background-color: #009688 !important;
}

.goal1 {
  align-self: center;
  grid-area: inputgl;
}
.goal2 {
  align-self: center;
  grid-area: inputglo;
}
.start1 {
  grid-area: inputsl;
}
.start2 {
  grid-area: inputslo;
}
.range{
  grid-area:range;
}

.modus{
  grid-area: input;
}

.in-1 {
  width: auto;
  padding: 2em;
}

.btn-dark {
  background-color: #2c2e5a;
  margin-top: 1rem;
  margin-bottom: 1rem;

  vertical-align: middle;
  align-self: center;

  height: 5rem;
  grid-area: button;
}
</style>
