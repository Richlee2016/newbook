<template>
    <div class="book-box">
        <div class="book-top" v-show="showMenu">
        <section>
            <div class="back" @click="$router.goback()">
            <span class="icon-rback"></span>
            <label>返回书架</label>
            </div>
        </section>
        </div>
        <v-reader @menuHandle="menuHandle" :fontSize ="fontSize" :bd="bd"></v-reader>
        <div v-show="showStyle" class="fontChoice">
            <div class="fontbox01">
            <label>字号</label>
            <span @click="fontSize++">大</span>
            <span @click="fontSize--">小</span>
            </div>
            <div class="fontbox02">
            <label>背景</label>
            <span v-for="(n,i) in 6" :key="i" @click="bd = `bookbd0${i}`">
                <a :class="'bookbd0'+i"></a>
            </span>
            </div>
        </div>
        <ul class="book-bottom" v-show="showMenu">
            <li>
                <div class="chapter-btn">
                <router-link :to="{path:'/chapter/'+$route.params.id}">
                    <span class="icon-rmenu1"></span>
                    <p>目录</p>
                </router-link>
                </div>
            </li>
            <li>
                <div @click="showStyle = !showStyle">
                <span class="icon-rfont"></span>
                <p>字体</p>
                </div>
            </li>
            <li>
                <div @click="daytime = !daytime">
                <span v-show="daytime">
                    <label class="icon-rsun"></label>
                    <p>白天</p>
                </span>
                <span v-show="!daytime">
                    <label class="icon-rmoon"></label>
                    <p>夜晚</p>
                </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Reader from "../component/reader.vue";
export default {
  data() {
    return {
      showMenu: false,
      showStyle: false,
      daytime: true,
      fontSize: 16,
      bd: "bookbd01"
    };
  },
  watch: {
    fontSize(n, o) {
      if (this.fontSize > 24) {
        this.fontSize = 24;
      }
      if (this.fontSize < 12) {
        this.fontSize = 12;
      }
    },
    daytime(n, o) {
      if (n) {
        //白天
        this.bd = `bookbd01`;
      } else {
        this.bd = `bookbd05`;
      }
    },
    bd(n,o) {
      if (n === `bookbd05` || n === `bookbd04`) {
        this.daytime = false;
      } else{
        this.daytime = true;
      }
    }
  },
  components: {
    "v-reader": Reader
  },
  methods: {
    menuHandle(type) {
      switch (type) {
        case "out":
          this.showMenu = true;
          break;
        case "in":
          this.showStyle = false;
          this.showMenu = false;
          break;
      }
    }
  },
  mounted() {
    this.$overLoad();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.chapter-btn {
  a {
    color: white;
  }
}
.banner {
  height: 400px;
  display: flex;
  // flex-direction: column;
  li {
    flex: 1;
    height: 100%;
  }
}
</style>
