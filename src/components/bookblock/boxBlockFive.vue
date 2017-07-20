<template>
  	<div class="box-block-five">
		<router-link :to="{path: '/banner/' + prop.reference_id}">
  		<h3>{{prop.ad_name}}</h3>
  		<p>{{prop.ad_copy}}</p>
  		<div class="five-img">
	  		<img :src="prop.ad_pic_url"/>
  		</div>
  		<div class="clear-line"></div>
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
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.box-block-five{
	h3{
		font-size: 18px;
		color: #333;
		padding: 10px;
		font-weight: 600;
	}
	p{
		padding: 0px 10px;
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
	.five-img{
		padding: 10px;
	}
	img{
		width: 100%;
		display: block;
	}
}
</style>
