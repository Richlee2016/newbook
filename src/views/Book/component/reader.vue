<template>
    <div class="reader-box" ref='readerBox' @click="pagego">
      <div class="read-container" :class="bd" v-scroll>
        <div class="read-main" v-if="!$route.query.free">
          <div v-for="item in readList" :key="item.t" >
            <h4>{{item.t}}</h4>
            <ul class="book-body">
              <li v-for="(text,index) in item.p" :key="index" :style="{fontSize:fontSize + 'px',lineHeight:fontSize + 20 + 'px'}">{{text}}</li>
            </ul>
          </div>
          <r-upgif ref="upGif" :gifbd="'none'"></r-upgif>
        </div>
        <div class="read-main" v-else>
          <div v-for="(book,n) in readList" :key="n" >
            <h4>{{book.title}}</h4>
            <ul class="book-body">
              <li :style="{fontSize:fontSize + 'px',lineHeight:fontSize + 20 + 'px'}" v-html="textDecode().decode(book.text)"></li>
            </ul>
          </div>
          <r-upgif ref="upGif" :gifbd="'none'"></r-upgif>
        </div>
        
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import he from "he";
import bookHead from "@/components/common/bookHead";
export default {
  components: {
    "v-head": bookHead
  },
  data() {
    return {
      RS_opt: {
        upLoad: true
      },
      RS: null,
      m: 5
    };
  },
  props: {
    fontSize: {
      type: Number,
      default: 16
    },
    bd: {
      type: String,
      default: "bookbd01"
    }
  },
  computed: {
    ...mapState(["read", "book"]),
    readList() {
      // console.log(this.read);
      const { free } = this.$route.query;
      if (free) {
        return this.read.text.map(o => {
          return {
            text: o.text[0],
            title: o.title
          };
        });
      } else {
        return this.read.text.map(o => JSON.parse(o.txt));
      }
    }
  },
  methods: {
    ...mapActions(["bookRead", "bookFree"]),
    // 返回点击位置
    textDecode() {
      return he;
    },
    _part(hei, c) {
      const part = hei / 3;
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
    pagego() {
      const { pointX, pointY, wrapperHeight, y, maxScrollY } = this.RS;
      const part = this._part(wrapperHeight, pointY);
      if (part === "top") {
        if (y + wrapperHeight >= 0) {
          this.RS.scrollTo(0, 0, 0);
        } else {
          this.RS.scrollTo(0, y + wrapperHeight, 0);
        }
      } else if (part === "bottom") {
        if (y - wrapperHeight < maxScrollY) {
          this.RS.scrollTo(0, maxScrollY, 0);
          this.RS_upload(function() {});
        } else {
          this.RS.scrollTo(0, y - wrapperHeight, 0);
        }
      } else if (part === "center") {
        this.$emit("menuHandle");
      }
    },
    RS_upload(down, over) {
      const self = this;
      const { free } = self.$route.query;
      this.bookRead({
        fn: () => {
          down();
        },
        free: self.$route.query.free
      });
    },
    menuout() {
      const { pointY, wrapperHeight } = this.RS;
      const part = this._part(wrapperHeight, pointY);
    }
  },
  mounted() {
    if(this.$route.query.free){
      const { author, name, id } = this.book;
      this.bookFree({ name, author, id });
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.read-container {
  height: 100vh;
  // background: #e9dfc7;
}
.reader-box {
  min-height: 100vh;
}
.read-main {
  padding: 15px;
  max-width: 900px;
  margin: auto;
  h4 {
    font-size: 24px;
    line-height: 34px;
    margin-bottom: 10px;
    color: #736357;
    border-bottom: solid 1px #736357;
    letter-spacing: 2px;
    font-weight: bold;
  }
}
</style>
