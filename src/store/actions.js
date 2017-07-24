import { detail, read } from '@/servers/server'
import types from './types'
export default {
    async bookDetail({ commit }, { id }) {
        const { data } = await detail(id);
        commit(types.BOOK_DETAIL, { book: data });
    },
    async bookRead({ commit }, { id, chapter, fn }) {
        const { data } = await read(id, chapter);
        if (data) {
            commit(types.BOOK_READ, { chapter: data });
            fn();
        };
    }
}