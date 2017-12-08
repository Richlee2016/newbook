import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import { sessionArr } from '@/assets/utils'
// 正在读的书籍
let readNow = sessionArr('get', 'readnow') || { id: 0, chapter: 0 };
// 读取历史记录、
let historyRead = sessionArr('get', 'readlist') || [];
// 阅读器样式
const defaultStyle = {
    bdColor:'#e9dfc7',
    fontSize:'14',
    color:'#333',
}
let readerStyle = sessionArr('get', 'readerStyle') || defaultStyle;

Vue.use(Vuex)

let state = {
    book: {}, //书本详情
    read: { //正在阅读
        id: readNow.id,
        chapter: readNow.chapter,
        text: [],
        addOnOff:false
    },
    free:{
        id:null,
        loading:true,
        name:null,
        author:null,
        href:null,
        chapter:[]
    },
    historyRead: historyRead, // 阅读历史
    readerStyle:readerStyle
}

export default new Vuex.Store({
    state,
    actions,
    mutations
});