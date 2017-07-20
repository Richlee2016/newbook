<template>
	<div class="book-more">
		<span @click="onemore" :class="{'size':!type,'border':!type}">{{titleone}}</span>
		<span @click="twomore" :class="{'size':!type}" v-if="!type">{{titletwo}}</span>
	</div>
</template>

<script>
export default {
	props :{
		type:{
			type:Boolean,
			default:true
		},
		titleone:{
			type:String,
			default:'查看更多'
		},
		titletwo:{
			type:String,
			default:'查看全部'
		}
	},
	methods :{
		onemore (){
			this.$emit("onemore");
		},
		twomore (){
			this.$emit("twomore");
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.book-more{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		/*border-top: 1px solid #f0f0f0 ;*/
		font-size: 14px;
		display: -webkit-flex;
		display: flex;
		>span{
			flex: 1;
			text-align: center;
		}
		.size{
			font-size: 12px;
		}
		.border{
			border-right:1px solid #f0f0f0 ;
		}
	}
</style>
