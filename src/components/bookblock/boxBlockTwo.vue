<template>
  	<div class="box-block-two">
		<router-link :to="{path:'/detail/'+ prop.fiction_id}"> 
			<span class="rank">{{rankNum}}</span>
			<p>{{prop.title}}</p>
			<label>{{prop.authors}}</label>
		</router-link> 
  	</div>
</template>

<script>

export default {
	props :{
		prop:{
			type:Object,
			default (){
				return {}
			}
		},
		rank :{
			type:Number,
			default:1
		}
	},
	computed :{
		rankNum (){
			if(this.rank <10){
				return '0' + this.rank;
			}else{
				return this.rank;
			};
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.box-block-two{
		width: 100%;
		height: 24px;
		padding: 12px 10px;
		line-height: 24px;
		border-bottom: 1px solid #f0f0f0;
		span{
			display: inline-block;
			width: 24px;
			height: 24px;
			/*text-align: center;*/
			color: red;
		}
		p{
			display: inline-block;
			padding-right: 10px;
		}
		label{
			font-size: 12px;
			color: rgba(0,0,0,0.4);
		}
	}
</style>
