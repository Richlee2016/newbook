<template>
  	<div class="upGif" v-show="out">
		<span>loading...</span>
	</div>	  
</template>

<script>

export default {
	props :{
		
	},
	data(){
		return {
			out:true
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.upGif{
	height: 40px;
	width: 100%;
	background: rebeccapurple;
	span{
		color: white;
	}
}
</style>
