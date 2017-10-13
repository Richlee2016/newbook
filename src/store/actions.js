import { detail, read,freeSearch } from '@/servers/server'
import { sessionArr } from '@/assets/utils'

export default {
    // 书本详情
    async bookDetail({ commit,state }, { id ,fn}) {
        const { data } = await detail(id);
        commit('SET_DATA', s => (s.book = data));
        fn&&fn();
    },
    // 书本阅读
    async bookRead({commit,state},{fn}){
        commit('BOOK_ADD');
        const { data } = await read(state.read.id, state.read.chapter);
        if (data) {
            commit('BOOK_READ',{text:data});
            commit('BOOK_HISTORY_READ');
            fn&&fn();
        };
    },
    // 获取免费书源
    async bookFree({commit},{name,author}){
        console.log(name,author);
        const {data} = await freeSearch(name,author);
        commit('SET_DATA', s => (s.book = data));
    }
}