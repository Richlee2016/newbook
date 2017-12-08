<template>
  <div class="index">
    <div class="top-nav">
      <a>熊猫人之书城联盟</a>
    </div>
    <div class="scroll-box" v-scroll>
    <div class="bookcity" ref="cityscroll">
      <section>
        <!--banner-->
        <v-banner :data="bannerData"></v-banner>
        <!--本周最热-->
        <div class="clear-line"></div>
        <v-weekhot :data="weekHotData"></v-weekhot>
        <!--重磅推荐-->
        <div class="clear-line"></div>
        <v-recommend :data="recommendData"></v-recommend>
        <!--女生最爱-->
        <div class="clear-line"></div>
        <v-girllike :data="girllike"></v-girllike>
        <!--男生最爱-->
        <div class="clear-line"></div>
        <v-boylike :data="boylike"></v-boylike>
        <!--限时免费-->
        <div class="clear-line"></div>
        <v-timefree :data="timefree"></v-timefree>
        <!--精选专题-->
        <div class="clear-line"></div>
        <v-persistent :data="special"></v-persistent>
        <!--瀑布流-->
        <div class="clear-line"></div>
        <v-pullbook :data="pullbook"></v-pullbook>
        <!--下拉加载  -->
        <r-upgif ref="upGif"></r-upgif>
      </section>
    </div>
    </div>
  </div>
</template>

<script>
import Banner from "./components/banner";
import weekHot from "./components/weekhot";
import Recommend from "./components/recommend";
import girlLike from "./components/girllike";
import boyLike from "./components/boylike";
import timeFree from "./components/timefree";
import persistent from "./components/persistent";
import pullBook from "./components/pullbook";

import defaultsDeep from "lodash/defaultsDeep";
import { index, pull } from "@/servers/server";
import { setGroup } from "@/assets/utils";

export default {
  name: "index",
  data() {
    return {
      RS_opt: {
        upLoad: true
      },
      allData: null,
      bannerData: [], //banner
      weekHotData: {}, //本周最热
      recommendData: {}, //重磅推荐
      girllike: {}, //女生最爱
      boylike: {}, //男生最爱
      timefree: {}, //限时免费
      special: {}, //精选专题
      pullbook: [] //瀑布流
    };
  },
  components: {
    "v-banner": Banner,
    "v-weekhot": weekHot,
    "v-recommend": Recommend,
    "v-girllike": girlLike,
    "v-boylike": boyLike,
    "v-timefree": timeFree,
    "v-persistent": persistent,
    "v-pullbook": pullBook,
  },
  methods: {
    // 转化数组
    _turnGroup(arr, num) {
      let group = defaultsDeep({}, arr);
      if (group.data) {
        group.data.data = setGroup(group.data.data, { num: num });
      }
      return group;
    },
    // 初始化数据
    _getData() {
      index().then(res => {
        this.allData = res.data.items;
        this._banner(this.allData[0]);
        this._weekHot(this.allData[1]);
        this._recommend(this.allData[2]);
        this._personlike();
        this._timefree(this.allData[5]);
        this._special(this.allData[6]);
        this.$overLoad(200);
      });
    },
    _banner(data) {
      let res = defaultsDeep({}, data);
      this.bannerData = setGroup(res.data.data, 3, 5);
      // console.log(this.bannerData);
    },
    _weekHot(data) {
      let res = defaultsDeep({}, data);
      this.weekHotData = res;
    },
    _recommend(data) {
      let res = defaultsDeep({}, data);
      let arr = [];
      if (res.data) {
        arr = setGroup(res.data.data, { num: 6 });
        arr = arr.map(o => setGroup(o, 1, 4));
        arr = setGroup(arr, { num: 2 });
        res.data.data = arr;
      }
      this.recommendData = res;
    },
    _personlike() {
      this.girllike = this._turnGroup(this.allData[3], 3);
      this.boylike = this._turnGroup(this.allData[4], 3);
    },
    _timefree(data) {
      let res = defaultsDeep({}, data);
      let arr = [];
      if (res.data) {
        arr = res.data.data.map(o => {
          return {
            title: o.ad_name,
            cover: o.data.cover
          };
        });
      }
      this.timefree = {
        ad_name: data.ad_name || "",
        data: arr,
        id: 371
      };
    },
    _special(data) {
      let res = defaultsDeep({}, data);
      this.special = res;
    },
    //自写瀑布流插件
    RS_upload(down, over) {
      let count = 4;
      let start = this.pullbook.length;
      start = start === 0 ? 0 : start + count;
      pull(start, count).then(res => {
        this.pullbook = this.pullbook.concat(res.data.items);
        down && down();
      });
    }
  },
  created() {
    this._getData();
  },
  activated() {
    this.$overLoad(200);
  }
};
</script>

<style lang='less'>
@import "./index.less";
</style>
