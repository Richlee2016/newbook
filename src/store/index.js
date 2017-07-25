import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

let state = {
    //阅读器
    book: {},
    read: {
        id: 0,
        chapter: 0,
        text: []
    },
    historyRead: []
}

export default new Vuex.Store({
    state,
    actions,
    mutations
});