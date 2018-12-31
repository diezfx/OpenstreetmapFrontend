<template>
  <div class="route-input">
    <div class="row">
      <div class="col-9">
        <div class="form-row">
          <div class="col">
            <label for="lat" class="col-form-label">Start:</label>
          </div>
          <div class="col">
            <input v-model="startLat" type="number" class="form-control in-1" id="lat" placeholder="Latitude">
          </div>
          <div class="col">
            <input v-model="startLon" type="number" class="form-control in-1" id="long" placeholder="Longitude">
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <label for="lat" class="col-form-label">Target:</label>
          </div>
          <div class="col">
            <input v-model="goalLat" type="number" class="form-control in-1" id="lat" placeholder="Latitude">
          </div>
          <div class="col">
            <input v-model="goalLon" type="number" class="form-control in-1" id="long" placeholder="Longitude">
          </div>
        </div>
      </div>

      <div class="col-3">
        <button @click="clicked" class="btn btn-dark" id="buttonInput">Calculate</button>
      </div>
    </div>
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
        this.$store.commit("changeStart", {lat:v});
      }
    },
    startLon: {
      get() {
        return this.$store.state.start.lon;
      },
      set(v) {
        this.$store.commit("changeStart", {lon:v});
      }
    },
    goalLat: {
      get() {
        return this.$store.state.goal.lat;
      },
      set(v) {
        this.$store.commit("changeGoal", {lat:v});
      }
    },
    goalLon: {
      get() {
        return this.$store.state.goal.lon;
      },
      set(v) {
        this.$store.commit("changeGoal", {lon:v});
      }
    }
  },

  methods: {
    clicked() {
      this.$emit("click");
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.bg-1 {
  background: #b2dfdb;
  color: #ffffff;
}

.bg-2 {
  background-color: #00796b;
  color: #ffffff;
}

.form-control::focus {
  color: #123123;
}

.form-control::placeholder {
  color: white;
}

.container-fluid {
  padding-top: 1em;
  padding-bottom: 0.5em;
}

.btn {
  background: #607d8b;
  height: 100%;
}
.in-1 {
  background: #009688;
  color: #ffffff;
}

.btn-dark {
  margin-top: 1rem;
  margin-bottom: 1rem;

  vertical-align: middle;

  height: 2.5rem;
}

.well {
  background-color: rgba(0, 5, 0, 0.47);
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 0.5rem;
}
</style>
