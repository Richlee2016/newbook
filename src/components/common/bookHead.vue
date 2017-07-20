<template>
	<section class="book-header">
		<div class="book-head">
			<div class="left">
				<span class="icon-rback" @click="$router.goback()"></span>
			</div>
			<div class="title" v-if="titleShow">{{title}}</div>
			<div class="right" v-if="iconShow">
				<span class="icon-home"></span>
			</div>
			<slot name="search"></slot>
		</div>
	</section>
</template>

<script>
export default {
	props :{
		title:{
			type:String,
			default:""
		},
		titleShow:{
			type:Boolean,
			default:true
		},
		iconShow:{
			type:Boolean,
			default:true
		}
	},
	methods :{
		goBack (){
			this.$router.go(-1);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.book-header{
		width: 100%;
		height: 44px;
	}
	.book-head{
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 999;
		width: 100%;
		height: 44px;
		line-height: 44px;
		display: -webkit-flex;
		display: flex;
		background: #efeff0;
		border: 1px solid #ddd;
		>div{
			flex:1 1;
		}
		.left{
			max-width: 44px;
			span{
				display: inline-block;
				width: 44px;
				line-height: 44px;
				text-align: center;
				font-size: 20px;
			}
		}
		.right{
			max-width: 44px;
			span{
				float: right;
				width: 44px;
				height: 44px;
				line-height: 44px;
				text-align: center;
				color: black;
			}
		}
	}
</style>
