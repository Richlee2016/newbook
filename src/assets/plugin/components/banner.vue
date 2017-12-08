<template>
    <div v-slide>
        <ul class="banner">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.banner {
  // height: 400px;
  display: flex;
  // flex-direction: column;
  li {
    flex: 1;
    height: 100%;
  }
}
</style>
