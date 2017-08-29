import types from './types'
import { sessionArr } from '@/assets/utils'
export default {
    // 书本详情
    [types.BOOK_DETAIL](state, { book }) {
        state.book = book;
    },
    // 开始阅读
    [types.BOOK_READ](state,{text}){
        state.read.text.push(text);
        state.read.addOnOff = true;
        sessionArr('set', 'readnow', { id:state.read.id, chapter: state.read.chapter});
    },
    // scroll增加chapter
    [types.BOOK_ADD](state){
        if(state.read.addOnOff){
            state.read.chapter++;
        };
        console.log(state.read);
    },
    // 进入阅读
    [types.BOOK_START](state,{id,chapter,fn}){
        state.read= {
            id:id,
            chapter:chapter,
            text:[],
            addOnOff:false
        };
        sessionArr('set', 'readnow', { id, chapter: chapter });
        fn&&fn();
    },
    // 存取 历史记录
    [types.BOOK_HISTORY_READ](state) {
        let isExist =state.historyRead.find(o => o.id === state.read.id);
        if (isExist) {
            state.historyRead.forEach(o => {
                if (o.id === state.read.id) {
                    o.chapter = state.read.chapter;
                }
            })
        } else {
            state.historyRead.push({ id:state.read.id, chapter:state.read.chapter });
        };
        if (state.historyRead.length > 6) {
            state.historyRead.shift();
        };
        sessionArr('set', 'readlist', state.historyRead);
    }
}