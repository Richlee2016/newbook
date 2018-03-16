<template>
    <div class="detail-container">
        <v-head :title="container.item.title"></v-head>
        <div class="scroll-box" v-scroll>
            <div>
                <div class="scroll-list">
                    <div class="detail-descr">
                        <div class="left">
                            <img :src="container.item.cover" alt="">
                        </div>
                        <div class="right">
                            <h3>{{container.item.title}}</h3>
                            <label>{{container.item.authors}}</label>
                            <span>价格:{{container.item.price}}书币/千字</span>
                            <span>字数:{{Math.ceil(container.item.word_count/10000)}}万字</span>
                        </div>
                    </div>
                    <div class="detail-btn">
                        <div class="start-read">
                            <button @click="startRead" :disabled="haveFreeChapter.active?true:false" :class="!haveFreeChapter.active? 'orange': 'black' ">{{!isFree?`书币阅读`:`请免费食用`}}</button>
                        </div>
                        <div class="download">
                              <button @click="startFreeRead" :disabled="haveFreeChapter.active?false:true"  :class="haveFreeChapter.active? 'orange': 'black' ">{{haveFreeChapter.msg}}</button>
                        </div>
                    </div>
                    <p class="detail-box">{{container.item.content}}</p>
                    <p class="detail-book-title">
                        <a @click="goChapter">最新:{{container.item.latest}}</a>
                    </p>
                    <v-detailtitle :title="'类别标签'" :fontSize=16>
                        <slot>
                            <span class="detail-label" v-for="(item,index) in container.item.categories" :style="{background:labelBd[index]}" :key="index">
                                <a @click="categoryLink(item)">
                                    {{item.label}}
                                </a>
                            </span>
                        </slot>
                    </v-detailtitle>

                    <v-detailtitle :title="'作者其他书'" :fontSize=16 v-if="detail.author_books?detail.author_books.length>0:false">
                        <slot>
                            <v-blockthree :prop="detail.author_books"></v-blockthree>
                        </slot>
                    </v-detailtitle>

                    <v-detailtitle :title="'图书信息'" :fontSize=16>
                        <slot>
                            <p class="info">{{container.item.rights}}</p>
                        </slot>
                    </v-detailtitle>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import bookHead from "@/components/common/bookHead";
import detailTitle from "@/components/common/detailTitle";
import boxBlockThree from "@/components/bookblock/boxBlockThree";
import { detail } from "@/servers/server";
export default {
  name: "bookDetail",
  data() {
    return {
      labelBd: ["#fbebe8", "#fcedda", "#e8f9db"],
      idchange: "",
      detailFade: false,
      isFree: false
    };
  },
  components: {
    //抬头
    "v-head": bookHead,
    //书块 three
    "v-blockthree": boxBlockThree,
    //标题模块
    "v-detailtitle": detailTitle
  },
  computed: {
    // state分发
    ...mapState({
      detail: "book",
      historyRead: "historyRead",
      free: "free"
    }),
    haveFreeChapter() {

      if (this.free.loading) {
        return { active: false, msg: "免费获取中..." };
      }else{
        const book = this.detail;
        const free = this.free;
        if(book.name === free.name&&book.author === free.author){
          return { active: true, msg: "免费阅读" };
        }else{
          return { active: false, msg: "无免费资源" };
        };
      }
    },
    // 是否历史阅读
    isRead() {
      // const read = this.historyRead.find(o => o.id === this.$route.params.id);
      // return read ? read.chapter : this.isFree ? this.free.chapter[0].href : 0;
      const old = this.historyRead[this.historyRead.length - 1];
      let read;
      if(!old){
        return this.isFree ? this.free.chapter[0].href : 0;
      };
      if(this.isFree){
        console.log(1);
        const myFree = this.free.id.join();
        if(Array.isArray(old.id)){
          read = myFree === old.id.join()?true : false;
        }
      }else{
        if(!Array.isArray(old.id)){
          read = this.historyRead.find(o => o.id === this.$route.params.id)?true:false;
        }
      }
      return read ? old.chapter : this.isFree ? this.free.chapter[0].href : 0;
    },
    // 详情数据
    container() {
      var res = this.detail;
      if (res.item) {
        return {
          comment: res.comment,
          item: res.item
        };
      }
      return {
        comment: {},
        item: {}
      };
    }
  },
  methods: {
    // actions 分发
    ...mapActions({
      // 获取数据
      getData: "bookDetail",
      // 文章加载
      bookRead: "bookRead",
      // 免费阅读加载
      bookFree: "bookFree"
    }),
    // 类别跳转
    categoryLink(data) {
      const reg = /\d00000/;
      if (data.category_id >= 1000000 && reg.test(data.category_id)) {
        this.$router.push({ path: "/categoryfiction/" + data.category_id });
      } else {
        this.$router.push({
          path: "/categoryfiction/" + encodeURI(data.label)
        });
      }
    },
    // 开始阅读
    startRead() {
      this.isFree = false;
      this.$store.commit("BOOK_START", {
        id: this.$route.params.id,
        chapter: this.isRead,
        fn: () => {
          this.$router.push({ path: `/detail/${this.$route.params.id}/book` });
        }
      });
    },
    //免费书目加载
    startFreeRead() {
      this.isFree = true;
      this.$store.commit("BOOK_START", {
        id: this.free.id,
        chapter: this.isRead,
        fn: () => {
          this.$router.push({
            path: `/detail/${this.$route.params.id}/book`,
            query: { free: 1 }
          });
        }
      });
    },
    //目录
    goChapter() {
      if (this.free.id) {
        this.$router.push({
          path: `/detail/${this.$route.params.id}/chapter`,
          query: { free: 1 }
        });
      } else {
        this.$router.push({ path: `/detail/${this.$route.params.id}/chapter` });
      }
    }
  },
  // 监听路由变化
  watch: {
    $route(to, from) {
      this.isFree = false;
      const id = this.$route.params.id;
      if (id && id.length < 7 && id.length >= 5) {
        this.getData({
          id: this.$route.params.id,
          fn: () => {
            this.bookFree({
              name: this.container.item.title,
              author: this.container.item.authors,
              id: this.$route.params.id
            });
            this.$overLoad();
          }
        });
      }
    }
  },
  // 初始化数据
  created() {
    this.getData({
      id: this.$route.params.id,
      fn: () => {
        this.bookFree({
          name: this.container.item.title,
          author: this.container.item.authors,
          id: this.$route.params.id
        });
        this.$overLoad();
      }
    });
  }
};
</script>
<style lang="less">
.detail-enter-active,
.detail-leave-active {
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}

.detail-enter,
.detail-leave-active {
  opacity: 0;
}

.detail-descr {
  display: -webkit-flex;
  display: flex;
  margin-top: 30px;
  > div {
    flex: 1;
    text-align: center;
    img {
      width: 95px;
      height: 125px;
    }
  }
  .right {
    text-align: left;
    h3 {
      line-height: 30px;
      font-size: 16px;
    }
    label {
      line-height: 24px;
      font-size: 12px;
      color: #4b99a7;
    }
    span {
      display: block;
      line-height: 24px;
      font-size: 14px;
      color: #727272;
    }
  }
}

.detail-btn {
  display: -webkit-flex;
  display: flex;
  margin-top: 20px;
  > div {
    flex: 1;
    text-align: center;
    button {
      outline: none;
      display: inline-block;
      width: 90%;
      height: 36px;
      line-height: 36px;
      border-radius: 6px;
    }
    .orange {
      color: white;
      background: #f35d02;
      border: #f35d02 1px solid;
    }
    .black {
      color: #ddd;
      background: white;
      border: #ddd 1px solid;
    }
  }
}

.detail-box {
  margin: 10px 20px;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.detail-book-title {
  border-top: #dddddd 1px solid;
  text-align: center;
  line-height: 40px;
  color: #666666;
}

.detail-label {
  display: inline-block;
  padding: 5px 10px;
  border: #ddd 1px solid;
  border-radius: 4px;
  margin-left: 10px;
  margin-bottom: 10px;
}

.more-like {
  h3 {
    line-height: 30px;
    color: #999;
    font-size: 14px;
    padding: 0 20px;
  }
}

.info {
  line-height: 20px;
  padding: 0 20px;
  color: #999999;
  font-size: 14px;
}
</style>
