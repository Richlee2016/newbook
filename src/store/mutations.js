import types from './types'

export default {
    [types.BOOK_DETAIL](state, { book }) {
        state.book = book;
    },
    [types.BOOK_READ](state, { chapter }) {
        state.read.push(chapter);
    }
}