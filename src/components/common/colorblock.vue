<template>
<router-link :to="{path:'/detail/'+ detailId}">
	<span class="color-block" :style="{background:color[index%3]}">{{container}}</span>
</router-link>	
</template>

<script>
export default {
	data (){
		return {
			color:['#fbebe8','#fcedda','#e8f9db']
		}
	},
	props :{
		index:{
			type:Number,
			default:0
		},
		container:{
			type:String,
			default:'book'
		},
		detailId:{
			type:String,
			default:1
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.color-block{
	display: inline-block;
	padding: 5px 10px;
	border: #ddd 1px solid;
	border-radius: 4px;
	margin-left: 10px;
	margin-bottom: 10px;
	font-size: 14px;
}
</style>
