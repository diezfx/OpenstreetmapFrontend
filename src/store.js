import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        start: {
            lat: '',
            lon: ''
        },
        goal: {
            lat: '',
            lon: ''
        },
        selected: 'start',
        mymap: null
    },
    mutations: {
        changeStart(state, { lat, lon }) {
            if (lat != null) {
                state.start.lat = lat
            }
            if (lon != null)
                state.start.lon = lon
        },

        changeGoal(state, { lat, lon }) {
            if (lat != null)
                state.goal.lat = lat
            if (lon != null)
                state.goal.lon = lon
        },

        setMap(state, map) {
            state.map = map
        },

        changeSelected(state, selected) {
            state.selected = selected
        },
        toggleSelected(state) {
            if (state.selected === "start") {
                state.selected = "goal"
            }
            else {
                state.selected = "start"
            }

        },
        setSelected(state, coords) {
            if (state.selected === "start") {
                state.start = coords
            }
            else {
                state.goal = coords
            }
        }

    },

})