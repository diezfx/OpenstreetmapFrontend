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
        mymap: null,
        calcClicked: 0,
        route: null,
        info: null
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

        calcClicked(state) {
            state.calcClicked += 1
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
        },

        setRoute(state, newRoute) {

            state.route = newRoute
        },
        setInfo(state, newInfo) {
            state.info = newInfo
        }

    },
    actions: {
        requestWay(context) {

            let state = context.state

            let queryString = `?startlat=${state.start.lat};startlon=${state.start.lon};endlat=${state.goal.lat};endlon=${state.goal.lon}`


            fetch('http://localhost:8000/v1/route' + queryString)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    context.commit("setRoute", myJson['Route'])
                });
        },
        requestMetaInfo(context) {
            fetch('http://localhost:8000/v1/info').then(function (response) {
                return response.json();
            })
                .then(function (myJson) {
                    context.commit("setInfo", myJson)
                });


        }
    }

})