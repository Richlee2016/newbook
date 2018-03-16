import { detail, read,freeRead, freeSearch, fetchFreeBook } from "@/servers/server";
import { sessionArr } from "@/assets/utils";

export default {
  // 书本详情
  async bookDetail({ commit, state }, { id, fn }) {
    const { data } = await detail(id);
    const {authors,title,fiction_id} = data.item;
    commit("SET_DATA", s => {
      s.book = data;
      s.book = Object.assign(s.book,{
        name: title,
        author: authors,
        id:fiction_id
      })
    });
    sessionArr('set', 'bookdetail', { 
      name: title,
      author: authors,
      id:fiction_id});
    fn && fn();
  },
  // 书本阅读
  async bookRead({ commit, state }, payload) {
    const {fn,free} = payload;
    commit("BOOK_ADD",{free});
    console.log(free);
    let res;
    if(free){
      res = await freeRead(state.read.id, state.read.chapter);
    }else{
      res = await read(state.read.id, state.read.chapter);
    };
    const {data} = res;
    if (data) {
      commit("BOOK_READ", { text: data });
      commit("BOOK_HISTORY_READ");
      fn && fn();
    }
  },
  // 获取免费书源
  async bookFree({ commit, state }, { name, author, id }) {
    commit("SET_DATA", s => {
      s.free.loading = true;
    });
    const { book } = state.free;
    try {
      const {data:{freeId,chapter}} = await freeSearch(name, author, id);
      if (chapter&&chapter.length>0) {
        commit("SET_DATA", s => {
          s.free = {
            id:freeId,
            name,
            author,
            chapter,
            loading: false
          };
        });
      } else{
        commit("SET_DATA", s => {
          s.free = {
            id: null,
            loading: false
          };
        });
      }
    } catch (error) {
      console.log("error");
    }
  },
  // 免费阅读
  async fetchFreeBook({ commit, state }, bookid) {
    const res = await fetchFreeBook(bookid);
    const { id, name, author, href, chapter } = res.data;
    commit("SET_DATA", s => {
      s.free = {
        id,
        name,
        author,
        href,
        chapter,
        loading: false
      };
    });
  }
};
