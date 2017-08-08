import { detail, read } from '@/servers/server'
import types from './types'
import { sessionArr } from '@/assets/utils'

export default {
    // 书本详情
    async bookDetail({ commit }, { id }) {
        const { data } = await detail(id);
        commit(types.BOOK_DETAIL, { book: data });
    },
    async bookRead({commit,state},{fn}){
        commit(types.BOOK_ADD);
        const { data } = await read(state.read.id, state.read.chapter);
        if (data) {
            commit(types.BOOK_READ,{text:data});
            commit(types.BOOK_HISTORY_READ);
            fn&&fn();
        };
    }
}