<template>
  <div class="book" @touchmove="navHide" :class="bodyBd">
    <div class="book-top" v-show="navOnOff">
      <section>
        <div class="back">
          <router-link :to="`/detail/${$route.params.id}`">
            <span class="icon-rback"></span>
            <label>返回书架</label>
          </router-link>
        </div>
      </section>
    </div>
    <!-- 阅读器  -->
    <div class="book-main" @click="navHandle" v-for="item in readList" :key="item.t">
      <div v-if="isfree">
        <h4>{{item.t}}</h4>
        <ul class="book-body">
          <li v-for="(text,index) in item.p" :key="index" :style="{fontSize:fontSize + 'px',lineHeight:fontSize + 20 + 'px'}">{{text}}</li>
        </ul>
      </div>
      <div class="book-main-none" v-else>这Tm的不是免费</div>
    </div>
    <!--下拉加载  -->
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner="circles"></infinite-loading>
    <!-- 菜单 -->
    <transition name="slide-fade">
      <div v-show="fontShow" class="fontChoice">
        <div class="fontbox01">
          <label>字号</label>
          <span @click="fontSize++">大</span>
          <span @click="fontSize--">小</span>
        </div>
        <div class="fontbox02">
          <label>背景</label>
          <span v-for="(n,i) in 6" :key="i" @click="getBodyBd(i)" :class="{'active':borderOnOff[i]}">
            <a :class="'bookbd0'+i"></a>
          </span>
        </div>
      </div>
    </transition>
    <ul class="book-bottom" v-show="navOnOff">
      <li>
        <div class="catagrolBox">
          <router-link :to="{path:'/chapter/'+$route.params.id}">
            <span class="icon-rmenu1"></span>
            <p>目录</p>
          </router-link>
        </div>
      </li>
      <li>
        <div @click="fontShow = !fontShow">
          <span class="icon-rfont" :class="{'fontcolor':fontShow}"></span>
          <p>字体</p>
        </div>
      </li>
      <li>
        <div @click="dayChange">
          <span v-show="dayNight">
            <label class="icon-rmoon"></label>
            <p>夜晚</p>
          </span>
          <span v-show="!dayNight">
            <label class="icon-rsun"></label>
            <p>白天</p>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { read } from '@/servers/server'
import { mapActions, mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading';
export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      navOnOff: false,
      dayNight: false,
      fontShow: false,
      bodyBd: "bookbd01",
      oldBd: "bookbd01",
      fontBorderIndex: 1,
      fontSize: 16,
      bookcontainer: {},
      isfree: true,
      //是否下拉更新章节
      firstChapter: Number(this.$route.query.chapter)
    }
  },
  computed: {
    ...mapState([
      'read'
    ]),
    readList() {
      return this.read.map(o => JSON.parse(o.txt));
    },
    borderOnOff() {
      let onOff = [];
      for (let i = 0; i < 6; i++) {
        onOff.push(false);
      }
      onOff[this.fontBorderIndex] = true;
      return onOff;
    }
  },
  watch: {
    fontSize(n, o) {
      if (this.fontSize > 24) {
        this.fontSize = 24;
      };
      if (this.fontSize < 12) {
        this.fontSize = 12;
      };
    }
  },
  methods: {
    ...mapActions([
      'bookRead'
    ]),
    // 下拉加载
    onInfinite() {
      const self = this;
      // 读取阅读记录
      const readHistory = sessionArr('get', 'readChapter');
      const isRead = readHistory.find(o => o.id === this.$route.params.id);
      let chapter = isRead ? isRead.chapter : 0;
      this.bookRead({
        id: this.$route.params.id,
        chapter: chapter,
        // 回调
        fn() {
          self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          if (isRead) {
            const read = readHistory.map(o => {
              if (o.id === self.$route.params.id) {
                o.chapter = ++chapter;
              };
              return o;
            });
            console.log(read);
            sessionArr('set', 'readChapter', read);
          } else {
            readHistory.push({ id: self.$route.params.id, chapter });
            if (readHistory.length > 5) {
              read.length = 5;
            };
            console.log(readHistory);
            sessionArr('set', 'readChapter', readHistory);
          };
        }
      });
    },
    // 是否历史阅读
    isRead(id) {
      let chapter;
      const readChapter = sessionArr('get', 'readChapter');
      console.log(readChapter);
      readChapter.forEach(o => {
        if (o.id === id) {
          chapter = o.chapter;
        };
      });
      return chapter;
    },
    navHide() {
      if (this.navOnOff) {
        this.navOnOff = false;
        this.fontShow = false;
      };
    },
    navHandle() {
      this.navOnOff = !this.navOnOff;
      this.fontShow = false;
    },
    dayChange() {
      if (this.dayNight) {
        this.fontBorderIndex = 5;
        this.bodyBd = this.oldBd;
      } else {
        this.bodyBd = "bookbd05";
        this.fontBorderIndex = 1;
      };
      this.dayNight = !this.dayNight;
    },
    getBodyBd(i) {
      this.bodyBd = "bookbd0" + i;
      this.fontBorderIndex = i;
      console.log(i);
      switch (i) {
        case 5:
          this.dayNight = true;
          break;
        case 2:
          this.dayNight = true;
          break;
      }
    }
  }
}
</script>
