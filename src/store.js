import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export const store = new Vuex.Store({

    state: {

        //route 
        //routeReach route reachable with reach constraint
        //stationsReach all reachable stations from start
        modus: "stationsReach",
        layers: {

            fullEdges: true,
            stations: true,
            route: true
        }, // to turn off or on layers in map
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
        bounds: null,
        calcClicked: 0,
        route: null,
        routeStations: null,
        info: null,
        stations: null,
        routeArea: null,
        notifications: { Title: "hallo" }
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
        changeBounds(state, bounds) {
            state.bounds = bounds
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
        setRouteWithStations(state, newRoute, stations) {
            state.route = newRoute;
            state.routeStations = stations;
        },
        setInfo(state, newInfo) {
            state.info = newInfo
        },
        setStations(state, newStations) {
            state.stations = newStations
        },
        setRouteArea(state, newRouteArea) {
            state.routeArea = newRouteArea
        },

        setNotification(state, noti) {
            state.notifications = noti
        }

    },
    actions: {
        async requestWay(context) {

            let state = context.state

            let queryString = `?startlat=${state.start.lat}&startlon=${state.start.lon}&endlat=${state.goal.lat}&endlon=${state.goal.lon}`

            const response = await fetch('http://localhost:8000/v1/route' + queryString)
            if(!response.ok){
                const myJson = await response.json();
                context.commit("setNotification",myJson)
                return
            }
            const myJson = await response.json();
            context.commit("setRoute", myJson['Route'])

        },
        requestWayWithStations(context, rangeKm) {
            let state = context.state

            let queryString = `?startlat=${state.start.lat}&startlon=${state.start.lon}&endlat=${state.goal.lat}&endlon=${state.goal.lon}&rangeKm=${rangeKm}`


            fetch('http://localhost:8000/v1/routewithstation' + queryString)
                .then(function (response) {
                    return response.json();
                }).catch(error => console.log(error))
                .then(function (myJson) {
                    console.log(myJson)
                    context.commit("setRoute", myJson['Route'])
                });
        },
        requestReachableStations(context) {
            // special case: reachable stations starting from "start"
            let state = context.state
            if (state.modus == "stationsReach") {
                let queryString = `?startlat=${state.start.lat}&startlon=${state.start.lon}`
                queryString += `&nelat=${state.bounds._northEast.lat}&nelon=${state.bounds._northEast.lng}&swlat=${state.bounds._southWest.lat}&swlon=${state.bounds._southWest.lng}`
                fetch('http://localhost:8000/v1/reachablestations' + queryString).then(function (response) {
                    return response.json();
                })
                    .then(function (myJson) {
                        context.commit("setStations", myJson)
                    });
            }
        },
        requestMetaInfo(context) {
            fetch('http://localhost:8000/v1/info').then(function (response) {
                return response.json();
            })
                .then(function (myJson) {
                    context.commit("setInfo", myJson)
                });


        },
        requestInfosArea(context) {


            let state = context.state
            let queryString = `?nelat=${state.bounds._northEast.lat}&nelon=${state.bounds._northEast.lng}&swlat=${state.bounds._southWest.lat}&swlon=${state.bounds._southWest.lng}`


            //stations in the area
            if (state.layers.stations && state.modus !== "stationsReach") {
                fetch('http://localhost:8000/v1/stations' + queryString).then((response) => { return response.json(); })
                    .then((myJson) => {
                        context.commit("setStations", myJson)
                    })
            }

            // all routes in the area
            if (state.layers.fullEdges) {
                fetch('http://localhost:8000/v1/route/area' + queryString).then((response) => { return response.json(); })
                    .then((myJson) => {
                        context.commit("setRouteArea", myJson)
                    })
            }
        },
    }

})