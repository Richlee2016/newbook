<template>
  <div id="app">
    <keep-alive :exclude="['containerOne']">
    <router-view style="height:100vh;overflow:hidden;"></router-view>
    </keep-alive>
    <div class="loadyet" v-show="fade">
			<img src="./assets/images/bookloading.gif" />
			<span>Loding......</span>
		</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      fade:false
    }
  },
  watch :{
		'$route' (to, from){
      this.fade = true;
		}
	}
}
</script>

<style  lang='less'>
.loadyet{
	position: fixed;
	z-index: 99;
	left: 0px;
	top: 0px;
	bottom:0px;
	right:0px;
	width: 100%;
	background: rgba(255,255,255,1);
	img{
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -150px;
		margin-top:-85px;
	}
	span{
		width: 100%;
		line-height: 40px;
		text-align: center;
		position: absolute;
		left: 0px;
		top: 50%;
		margin-top:30px;
	}
}
#app>div{
	background: white;
}
</style>
