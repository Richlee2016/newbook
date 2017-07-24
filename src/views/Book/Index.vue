<template>
  <div class="bookIndex">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'bookIndex',
}
</script>

<style lang="less">
@import './book.less';
</style>
