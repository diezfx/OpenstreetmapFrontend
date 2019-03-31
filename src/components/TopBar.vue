<template>
  <div class="route-input">
    <v-chip label disabled class="start">Start</v-chip>
    <v-text-field label="Latitude" id="start1" class="in-1 start1" v-model="startLat"></v-text-field>
    <v-text-field label="Longitude" id="start2" class="in-1 start2" v-model="startLon"></v-text-field>

    <v-text-field label="Range in km (0=infinite)" class="in-1 range" v-model="range"></v-text-field>

       <v-menu >
      <template v-slot:activator="{ on }">
        <v-btn class="modus"
          color="primary"
          dark
          v-on="on"
        >
          {{modus}}
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

    <v-btn @click="clicked" class="btn-dark" id="buttonInput">Calculate</v-btn>
  </div>
</template>

<script scoped>
export default {
  name: "Huhu",
  props: {
    msg: String
  },
  data() {
    return { test: "huhu", range: 0 };
  },
  computed: {
    modi() {
      return this.$store.state.modi;
    },
    modus(){
      return this.$store.state.modus;
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
    }
  },

  methods: {
     modusChange(modus){
       
      this.$store.commit("setModus",modus)
    },
    clicked() {

        this.$store.commit("calcClicked");

        console.log(this.range)

        if(this.range<=0){
        this.$store.dispatch("requestReachableStations");
        this.$store.dispatch("requestReachableArea");
        }
        else{
          this.$store.dispatch("requestReachableStationsRange",this.range)
          this.$store.dispatch("requestReachableAreaRange",this.range)
        }
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.start1 {
  grid-area: inputslo;
}
.start2 {
  grid-area: inputglo;
}
.range {
  grid-area: range;
}

.in-1 {
  width: auto;
  padding: 2em;
}

.modus{
  grid-area: input;
  padding : 2rm
}

.btn-dark {
  background-color: #2c2e5a;
  margin-top: 1rem;
  margin-bottom: 1rem;

  vertical-align: middle;
  align-self: center;

  grid-area: button;
}
</style>
