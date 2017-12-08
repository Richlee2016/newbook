<template>
	<div class="banner-main">
		<v-head :title="bannerpage.label"></v-head>
		<div class="scroll-box" v-scroll>
      <div>
        <img class="b-img" :src="bannerpage.banner" />
        <p class="description">{{bannerpage.description}}</p>
        <div class="clear-line"></div>
        <section>
          <div class="banner-inner" v-for="(item,index) in bannerpage.items" :key="index">
            <v-blockone :prop="item" :bookfree="'限免'"></v-blockone>
          </div>
        </section>
        <v-more :titleone="'查看更多'" @onemore="$router.push({ path:'/containerthree', query:{start:0,count:10,type:4}})">
        </v-more>
      </div>
    </div>
	</div>
</template>

<script>
import bookHead from "@/components/common/bookHead";
import bookMore from "@/components/common/bookMore";
import { banner } from "@/servers/server";
import boxBlockOne from "@/components/bookblock/boxBlockOne";
export default {
  components: {
    "v-head": bookHead,
    //书块one
    "v-blockone": boxBlockOne,
    //more
    "v-more": bookMore
  },
  data() {
    return {
      bannerpage: {},
      test: 1
    };
  },
  methods: {
    //下拉加载
    _initData() {
      banner(this.$route.params.id).then(res => {
        this.bannerpage = res.data;
        this.$overLoad(200);
      });
    }
  },
  activated() {
    this._initData(200);
    this.test = 2;
  }
};
</script>
<style lang="less">
.banner-main {
  height: 100vh;
  .b-img {
    width: 100%;
  }
  .description {
    color: #8d8d8d;
    padding: 10px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
