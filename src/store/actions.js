import { detail, read } from '@/servers/server'
import types from './types'
import { sessionArr } from '@/assets/utils'

export default {
    // 书本详情
    async bookDetail({ commit }, { id }) {
        const { data } = await detail(id);
        commit(types.BOOK_DETAIL, { book: data });
    },
    // 开始读书
    async bookRead({ commit, state }, { id, chapter, fn }) {
        // 是否存在历史记录
        const isExist = state.historyRead.find(o => o.id === id);
        let readChapter;
        // 点击 开始阅读
        if (chapter === -1) {
            if (isExist) {
                readChapter = isExist.chapter;
            } else {
                readChapter = 0;
            };
        } else {
            readChapter = chapter;
        };
        // 保存正在阅读
        sessionArr('set', 'readnow', { id, chapter: readChapter });
        const { data } = await read(id, readChapter);
        if (data) {
            commit(types.BOOK_READ, { id, chapter: readChapter, text: data });
            commit(types.BOOK_HISTORY_READ, { isExist, id, chapter: readChapter });
            fn();
        };
    }
}