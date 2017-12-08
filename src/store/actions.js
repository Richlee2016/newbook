import { detail, read, freeSearch, fetchFreeBook } from "@/servers/server";
import { sessionArr } from "@/assets/utils";

export default {
  // 书本详情
  async bookDetail({ commit, state }, { id, fn }) {
    const { data } = await detail(id);
    commit("SET_DATA", s => (s.book = data));
    fn && fn();
  },
  // 书本阅读
  async bookRead({ commit, state }, { fn }) {
    commit("BOOK_ADD");
    const { data } = await read(state.read.id, state.read.chapter);
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
    const { data } = await freeSearch(name, author, id);
    console.log(data.code);
    if (data.code === 1) {
      commit("SET_DATA", s => {
        s.free = {
          id,
          name,
          author,
          href: data.data.href,
          chapter: data.data.chapter,
          loading: false
        };
      });
    } else if (data.code === 0) {
      commit("SET_DATA", s => {
        s.free = {
          id: null,
          loading: false
        };
      });
    }
  },
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
