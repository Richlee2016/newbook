import types from './types'
import { sessionArr } from '@/assets/utils'
export default {
    // 书本详情
    [types.BOOK_DETAIL](state, { book }) {
        state.book = book;
    },
    // 开始阅读
    [types.BOOK_READ](state, { id, chapter, text }) {
        let isExist = state.read.text.find(o => o.txt === text.txt);
        if (state.read.id !== id) {
            state.read = Object.assign(state.read, {
                id,
                chapter
            })
            state.read.text.length = 0;
        }
        if (!isExist) {
            state.read.text.push(text);
        };
    },
    // 存取 历史记录
    [types.BOOK_HISTORY_READ](state, { isExist, id, chapter }) {
        if (isExist) {
            state.historyRead.forEach(o => {
                if (o.id === id) {
                    o.chapter = chapter;
                }
            })
        } else {
            state.historyRead.push({ id, chapter });
        };
        if (state.historyRead.length > 6) {
            state.historyRead.length = 6;
        };
        sessionArr('set', 'readlist', state.historyRead);
    }
}