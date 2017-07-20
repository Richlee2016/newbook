<template>
	<ul>
		<li>
			<span v-for="(tab,index) in tabs" :class="{'span-active':index === tabNum}" @click="tabChoice(index)">{{tab.label}}</span>
		</li>
	</ul>
</template>

<script>
export default {
	data (){
		return {
			tabNum:0
		}
	},
	props:{
		tabs:{
			type:Array,
			default(){
				return []
			}
		}
	},
	methods:{
		tabChoice(i){
			this.tabNum = i;
			this.$emit('tabChoice',i);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
ul{
	margin-top: 4px;
}
li{
	// padding: 4px 0px;
	span::nth-of-type(1){
		padding-left: 0px;
	}
	span{
		display: inline-block;
		height: 20px;
		line-height: 20px;
		padding: 0 4px;
	}
	.span-active{
		color: #4b99a7;
		font-weight: 600;
	}
}
</style>
