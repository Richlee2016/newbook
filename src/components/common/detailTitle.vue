<template>
	<section class="detail-title">
		<div class="clear-line"></div>
		<div class="slot-box">
			<h3 :style="{color:fontcolor,fontSize:fontSize+'px'}">{{title}}</h3>
			<slot>内容</slot>
		</div>
	</section>
</template>

<script>
export default {
	data (){
		return {
			
		}
	},
	props :{
		fontSize:{
			type:Number,
			default:14
		},
		title:{
			type:String,
			default:'title'
		},
		fontcolor:{
			type:String,
			default:'#666666'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.slot-box{
	padding: 0px 20px;
	h3{
		line-height: 40px;
	}
}	
</style>
