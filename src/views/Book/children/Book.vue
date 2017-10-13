<template>
  <div class="book" @touchmove="navHide" :class="bodyBd">
    <div class="book-top" v-show="navOnOff">
      <section>
        <div class="back" @click="$router.goback()">
          <span class="icon-rback"></span>
          <label>返回书架</label>
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
    }
  },
  computed: {
    ...mapState([
      'read'
    ]),
    readList() {
      console.log(this.read);
      return this.read.text.map(o => JSON.parse(o.txt));
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
    },
    "$route"(to, from) {
      // console.log(to, from);
      // console.log(this.read);
    }
  },
  methods: {
    ...mapActions([
      'bookRead'
    ]),
    // 下拉加载
    onInfinite() {
      const self = this;
      this.bookRead({
        fn(){
            self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          }
      })
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
  },
  created(){
    this.$overLoad();
  }
}
</script>
