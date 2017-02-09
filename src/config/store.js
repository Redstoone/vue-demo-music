import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        detailUrl: '',
    },
    mutations: {
        increment(state) {
            state.count++
        },
        addDetailUrl(state, data) {
            state.detailUrl = data
        }
    },
    actions: {
        getData(context, object){
            let progress = object.progress;
            let isRefresh = object.refresh;
            
            // progress.$Progress.start();
            // context.commit('updateLoadingState', false);
            // context.commit('updateBusyState', true);
        }
    }
})

export default store