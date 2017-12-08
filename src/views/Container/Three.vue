<template>
    <div class="container-three">
        <v-head :title="'精选书单'"></v-head>
        <div class="scroll-box" v-scroll>
            <div class="scroll-list">
                <section v-for="(item,index) in list" :key="index">
                    <v-blockfive :prop="item"></v-blockfive>
                </section>
                <r-upgif ref="upGif"></r-upgif>
            </div>
        </div>
    </div>
</template>

<script>
import { chineseReg } from "@/assets/utils";
import bookHead from "@/components/common/bookHead";
import bookMore from "@/components/common/bookMore";
import boxBlockFive from "@/components/bookblock/boxBlockFive";
import { persistent } from "@/servers/server";
export default {
  components: {
    //抬头
    "v-head": bookHead,
    //书块one
    "v-blockfive": boxBlockFive
  },
  data() {
    return {
      RS_opt: {
        upLoad: true
      },
      container: {},
      list: []
    };
  },
  computed: {},
  methods: {
    RS_upload(down, over) {
      let count = 4;
      let start = this.list.length;
      start = start === 0 ? 0 : start + count;
      persistent(start, count, 4).then(res => {
        this.list = this.list.concat(res.data.items);
        if (res.data.items <= 0) {
            over();
        } else {
            down();
        }
      });
    }
  },
  activated() {
    this.$overLoad(200);
  }
};
</script>