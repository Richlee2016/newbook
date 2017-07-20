<template>
  	<ul class="box-block-four">
		<li v-for="(item,index) in prop">
			<router-link :to="{path: '/banner/' + item.reference_id}">
			<img :src="item.ad_pic_url"/>
			</router-link>
		</li>
  	</ul>
</template>

<script>
export default {
	props:{
		prop :{
			type:Array,
			default (){
				return [1,2]
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.box-block-four{
	display: -webkit-flex;
	display: flex;
	border-bottom: 1px solid #f0f0f0;
	padding: 10px 0px;
	li{
		flex: 1;
		text-align: center;
		img{
			width: 90%;
		}
	}
}
</style>
