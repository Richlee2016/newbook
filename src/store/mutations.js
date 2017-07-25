import types from './types'

export default {
    [types.BOOK_DETAIL](state, { book }) {
        state.book = book;
    },
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
    }
}