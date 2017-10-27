<template>
    <div class="reader-box" ref='readerBox' @mouseup="pagego">
      <div ref="wrapper" style="height:100vh">
        <div  style="width:100%;height:2000px">
        <div class="test" v-for="n in 5" :key="n">{{n}}</div>
        </div>
      </div>
        <!-- <ul class="book-bottom" v-show="navOnOff">321</ul> -->
    </div>
    </div>
</template>

<script>
import Hammer from "hammerjs";
import bookHead from "@/components/common/bookHead";
// import BS from "@/assets/plugin/bscroll.js"
export default {
  components: {
    "v-head": bookHead
  },
  data() {
    return {
      navOnOff: false,
      hei: document.documentElement.clientHeight,
      num: 0,
      scroll
    };
  },
  computed: {},
  methods: {
    // 返回点击位置
    _part(c) {
      const part = this.hei / 3;
      if (c > 0 && c <= part) {
        return "top";
      } else if (c > part && c <= part * 2) {
        return "center";
      } else if (c > part * 2 && c <= part * 3) {
        return "bottom";
      }
      return "bottom";
    },
    // 翻页
    pagego(e) {
      // const part = this._part(e.clientY);
      // const scrollTop = document.body.scrollTop;
      // if (part === "top") {
      //   document.body.scrollTop = scrollTop - this.hei;
      // } else if (part === "bottom") {
      //   document.body.scrollTop = scrollTop + this.hei;
      // }
    },
    setter() {
      console.log();
    },
    panMenu() {
      const self = this;
      this.$overLoad();
      var leftPan = new Hammer(this.$refs.readerBox);
      leftPan.get("pan").set({ threshold: 100 });
      leftPan.on("panleft", function(ev) {
        const x = -ev.deltaX;
        if (x < 130) {
          self.navOnOff = true;
        }
      });
    }
  },
  mounted() {
    //   显示菜单
    this.panMenu();
    // console.log(BS);
    // this.scroll = new BS(this.$refs.wrapper,{})
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.test {
  height: 500px;
  width: 100%;
}

.reader-box {
  min-height: 100vh;
}
</style>
