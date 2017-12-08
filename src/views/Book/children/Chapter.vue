<template>
    <div class="chapter-container">
        <v-head :title="freeChapterBox?label:free.name"></v-head>
        <div class="scroll-box" v-scroll>
            <ul class="chapter-box" v-if="freeChapterBox">
                <li v-for="(item,index) in chapter" @click="read(item)" :key="index">
                    <label>{{item.title}}</label>
                    <span class="isfree" v-show="Number(item.price) === 0">免费</span>
                </li>
            </ul>
            <ul class="chapter-box" v-else>
                <li v-for="(item,index) in free.chapter" @click="readFree(item)" :key="index">
                    <label>{{item.text}}</label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import bookHead from "@/components/common/bookHead";
import { mapActions, mapState } from "vuex";
import { chapterCatalogue } from "@/servers/server";
export default {
  data() {
    return {
      label: "",
      chapter: []
    };
  },
  components: {
    "v-head": bookHead
  },
  watch: {
    $route(to, from) {
      this.$overLoad();
      if (this.$route.query.free) {
          this.fetchFreeBook(this.$route.params.id);
      } else {
        this._getChapterCatalogue();
      }
    }
  },
  computed: {
    ...mapState(["free"]),
    freeChapterBox() {
      const { free } = this.$route.query;
      if (Number(free) === 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
      ...mapActions([
          'fetchFreeBook'
      ]),
    _getChapterCatalogue() {
      chapterCatalogue(this.$route.params.id).then(res => {
        this.label = res.data.item.title;
        this.chapter = res.data.item.toc;
        let freeChapter = this.chapter
          .filter(o => {
            return o.free;
          })
          .map(o => {
            return o.chapter_id;
          });
        this.$overLoad();
      });
    },
    read(item) {
      if (item.price === 0) {
        this.$store.commit("BOOK_START", {
          id: this.$route.params.id,
          chapter: item.chapter_id,
          fn: () => {
            this.$router.push({
              path: `/detail/${this.$route.params.id}/book`
            });
          }
        });
      } else {
        this.$router.push({ path: `/detail/${this.$route.params.id}/history` });
      }
    },
    readFree(item) {
      console.log(item.href);
    }
  },
  created() {
    this.$overLoad();
    if (this.$route.query.free) {
      this.fetchFreeBook(this.$route.params.id);
    } else {
      this._getChapterCatalogue();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.chapter-box {
  width: 100%;
  li {
    line-height: 40px;
    padding: 0 20px;
    border-top: #efeff0 1px solid;
    .isfree {
      float: right;
      color: #6cb378;
    }
  }
}
</style>
