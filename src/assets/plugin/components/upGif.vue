<template>
  	<div class="upGif" v-show="out">
		<div v-show="load">go</div>
		<span v-show="!load">{{text}}</span>
	</div>	  
</template>

<script>

export default {
	props :{
		
	},
	data(){
		return {
			text:'没有更多',
			load:true,
			out:true
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.upGif{
	// transform: translateY(30px);
	height: 40px;
	width: 100%;
	background: rebeccapurple;
	span{
		color: white;
	}
	div{
		color:white;
	}
}
</style>
