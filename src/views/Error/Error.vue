<template>
    <div class="error" v-scroll>
        <div class="scroll-box">
            <div class="test" v-for="n in 5" :key="n">{{n}}</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      //   scroll: null
      opt: {
        box: 1
      }
    };
  },
  methods: {
    box() {
      console.log(0);
    },
    IS_more(){
        console.log(1);
    }
  },
  activated() {
    this.$overLoad();
  }
};
</script>
<style lang="less">
.scroll-box {
  //   height: 100vh;
}
.error {
  height: 100vh;
}
.test {
  width: 100%;
  height: 300px;
}
</style>
