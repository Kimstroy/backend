import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import * as types from './types.js'
const store = new Vuex.Store({
	state: {
		routeTab: [],
		data: []
	} ,
	getters: {
		getRouteTab(state){
			return state.routeTab
		}
	},
	mutations: {
		[types.SET_ROUTE_TAB](state, value) {
			state.routeTab = value
		},
		[types.SET_DATA](stata, value) {
			state.data = value
		}
	},
	actions: {
		setRouteTab( { commit }, value) {
			setTimeout(()=>{
				commit(types.SET_ROUTE_TAB, value)
			}, 2000)
		},
		setData({ commit }, value) {
			return new Promise((resolve, reject) => {
				if(value == 1){
					resolve()
				}else {
					reject()
				}
			})
		}
	}
})

export default store
