<template>
  	<div class="box-block-one">
		<router-link :to="{path:'/detail/'+ newid}">  
  		<div class="img">
  			<div class="img-box">
	 	 		<img :src="prop.cover"/>
	 	 		<span class="bookfree" v-if="bookfree">{{bookfree}}</span>
  			</div>
 	 		<label v-if="bookrank">{{bookrank}}</label>
 	 		<p>{{imglabel}}</p>
  		</div>
  		<div class="text">
  			<h1>{{prop.title}}</h1>
  			<h3>{{prop.authors}}</h3>
  			<p>{{prop.summary}}</p>
			<slot name="search"></slot>
  			<div>
	  			<label v-for="(n,index) in prop.tags" v-if="index<4" :key="index">{{n}}</label>
  			</div>
  		</div>
		</router-link>  
  	</div>
</template>

<script>
import bookTitle from '@/components/common/bookTitle'
export default {
	props :{
		prop:{
			type:Object,
			default (){              
				return {}
			}
		},
		//是否完结
		imglabel:{
			type:String,
			default:""
		},
		//是否排行
		bookrank:{
			type:Number,
			default:0
		},
		//是否限免
		bookfree:{
			type:String,
			default:""
		}
	},
	computed:{
		newid (){
			return this.prop.fiction_id || this.prop.sid;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.box-block-one{
	/*width: 100%;*/
	min-height: 121px;
	padding: 12px;
    border-bottom: 1px solid #f0f0f0;
	a{
		display: -webkit-flex;
		display: flex;
	}
	.img{
		position: relative;
		width: 125px;
		height: 100%;
		img{
			display: block;
			width: 87px;
			height: 120px;
		}
		label{
			width: 14px;
			height: 22px;
			color: white;
			background: url(../../assets/link.png) no-repeat center;
			background-size: 14px 22px;
			position: absolute;
			left: 10px;
			top: 0px;
			text-align: center;
			line-height: 20px;
			font-size: 12px;
		}
		p{
			position: absolute;
			left: 0px;
			bottom: 0px;
			line-height: 26px;
			color: white;
			font-size: 14px;
			padding-left: 10px;
		}
		.bookfree{
		    position: absolute;
		    top: 0;
		    left: 0;
		    line-height: 1.4;
			background: #49ab3f;
		    color: #fff;
		    width: 100%;
		    -webkit-transform-origin: top center;
		    -webkit-transform: translateX(50%) rotate(45deg) translateY(50%) scale(0.8);
		    font-size: 14px;
		    text-align: center;
		}
		.img-box{
			position: relative;
			overflow: hidden;
			width: 87px;
			height: 100%;
		}
	}
	.text{
		flex:1;
		position: relative;
		h1{
			line-height: 26px;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			word-break: break-all;
		}
		h3{
			color: rgba(0,0,0,0.7);
			line-height: 20px;
			font-size: 14px;
		}	
		p{
		    overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 12px;
			/*max-height: 40px;*/
			height: 40px;
			line-height: 20px;
			color: rgba(0,0,0,0.6);
		}
		div{
			max-height: 56px;
			overflow: hidden;
		}
		label{
			margin-top: 6px;
			display: inline-block;
			padding:2px 6px;
			border:#53ac7d 1px solid;
			color:#53ac7d;
			font-size: 12px;
			margin-right: 6px;
			border-radius: 2px;
		}	
	}
}
</style>
