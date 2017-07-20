<template>
  	<div class="search">
	  	<div>
	  		<span class="icon-search"></span>
	  	</div>
		<label v-if="searchBox">输入书名/作者/关键字</label>
		<input v-else v-model="keywords" type="" name="" id="" value="" placeholder="输入书名/作者/关键字" />
		<span v-if="goShow" class="search-go" @click="searchGo">搜索</span>  
  	</div>
</template>

<script>
export default {
	data (){
		return {
			keywords:""
		}
	},
	props :{
			searchBox:{
				type:Boolean,
				default:true
			},
			goShow:{
				type:Boolean,
				default:false
			}
	},
	methods :{
		searchGo (){
			this.$emit("search",this.keywords);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.search{
	position: relative;
	width: 100%;
	height: 36px;
	border: 1px solid #f5f5f5;
	color:rgba(0, 0, 0, 0.4);
	display: -webkit-flex;
	display: flex;
	>div{
		width: 36px;
		height: 36px;
		line-height: 40px;
		text-align: center;
		border-right:1px solid #f5f5f5;
		font-size: 18px;
	}
	input{
		flex: 1;
		padding-left: 20px;
		outline: none;
	}
	label{
		flex: 1;
		padding-left: 20px;
		outline: none;
		line-height: 36px
	}
	.search-go{
		width: 36px;
		height: 36px;
		position: absolute;
		right: 0px;
		top: 0px;
		font-size: 14px;
		text-align: center;
		line-height: 36px;
		border-left:#f5f5f5 1px solid; 
	}
}
</style>
