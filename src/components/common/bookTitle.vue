<template>
	<div>
		<div class="book-title titleone" v-if="type">{{title}}</div>
		<div v-else class="book-title titletwo">
			<div>
				<h1>{{title}}</h1>
				<label v-if="label">{{label}}</label>
			</div>
			<div v-if="tabShow">
				<span @click="boyGo" :class="{'active':active}">男</span>
				<span>丨</span>
				<span @click="girlGo" :class="{'active':!active}">女</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			active:true,
		}
	},
	props :{
		title:{
			type:String,
			default:""
		},
		type:{
			type:Boolean,
			default:true
		},
		label:{
			type:String,
			default:""
		},
		labelShow:{
			type:Boolean,
			default:false
		},
		tabShow:{
			type:Boolean,
			default:false
		}
	},
	methods:{
		boyGo (){
			this.active = true;
			this.$emit("boyGo");
		},
		girlGo (){
			this.active = false;
			this.$emit("girlGo");
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.book-title{
    position: relative;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f0f0f0;
}
.titleone{
    padding-left: 20px;
	border-left: 6px solid #ffab18;
}
.titletwo{
	padding:0px 20px;
	display: -webkit-flex;
	justify-content: space-between;
	h1{
		display: inline-block;
		font-size: 12px;
		font-weight: 600;
	}
	label{
		display: inline-block;
		width: 26px;
		height: 16px;
		line-height: 16px;
		color: white;
		text-align: center;
		background: #53ac7d;
		font-size: 12px;
	}
	span,i{
		font-size: 12px;
	}
	.active{
		color: #528ae8;
	}
}
</style>
