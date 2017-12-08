<template>
    <div class="container-one">
        <v-head :title="label"></v-head>
        <div class="scroll-box" v-scroll>
            <div>
                <section class="scroll-list">
                    <div class="container-inner" v-for="(item,index) in allbooks" :key="index">
                        <v-blockone :prop="item"></v-blockone>
                    </div>
                </section>
                <r-upgif ref="upGif"></r-upgif>
            </div>
        </div>
    </div>
</template>

<script>
import bookHead from "@/components/common/bookHead";
import boxBlockOne from "@/components/bookblock/boxBlockOne";
import { morefiction } from "@/servers/server";
export default {
  components: {
    "v-head": bookHead,
    //书块one
    "v-blockone": boxBlockOne,
  },
  data() {
    return {
      RS_opt: {
        upLoad: true
      },
      label: "",
      allbooks: [],
      loadshow: false
    };
  },
  methods: {
    morecate() {
      this.$router.push({
        path: "/containerthree",
        query: { start: 0, count: 10, type: 4 }
      });
    },
    RS_upload(down, over) {
      let count = 4;
      let start = this.allbooks.length;
      morefiction(this.$route.params.id, start, count).then(res => {
        this.label = res.data.label;
        this.allbooks = this.allbooks.concat(res.data.items);
        if (res.data.count === 0) {
          over&&over();
        } else {
          down&&down();
        }
      });
    }
  },
  activated() {
    this.allbooks = [];
    this.RS_upload();
    this.$overLoad();
  }
};
</script>