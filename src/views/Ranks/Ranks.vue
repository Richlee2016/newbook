<template>
  <div class="rank-container">
  		<v-head
  		:title="'排行'"	
  			></v-head>
  		<ul class="rank-box">
  			<li v-for="(item,index) in rankcontainer.data" :key="item.id">
				<router-link :to="{path:'/ranksfiction/' + item.ranks,query:{title:item.name}}">  
					<div class="left">
						<img :src="item.cover"/>
					</div>
					<div class="right">
						<p v-for="(n,i) in rankcontainer.description[index]" :key="i">{{i+1}}:{{n}}</p>
					</div>
				</router-link>
  			</li>
  		</ul>
  </div>
</template>

<script>
import bookHead from '@/components/common/bookHead'
import boxBlockOne from '@/components/bookblock/boxBlockOne'
import {ranks} from '@/servers/server'
export default {
	components :{
		"v-head":bookHead,
		//书块one
		"v-blockone":boxBlockOne,
	},
	data (){
		return {
			ranks:{}
		}
	},
	computed: {
		rankcontainer (){
			var res = this.ranks.items;
			var data = [],
				description=[];
			if(res){
				data = res.filter( (o) => o.id>19);
				description =data.map( (o) => {
					if( /、/g.test(o.description) ){
						return o.description.split("、");
					}else{
						return o.description.split("\n");
					};
				});
			};
			console.log({data,description});
			return{data:data,description:description};
		}
	},
	mounted (){
		ranks()
		.then(res => {
            this.ranks = res.data;
            
			return Promise.resolve();
		})
		.then(() => {
			// this.$overLoad();
		})
		.catch( err => {
			console.log(err)
		})	
	}
}
</script>
<style lang="less">
.rank-box{
	li{
		padding: 10px;
		border-bottom: #ddd 1px solid;
		a{
			display: -webkit-flex;
			display: flex;
		}
		>div{
			-webkit-flex: 1;
			flex: 1;
		}
		.left{
			max-width: 90px;
		}
		.right{
			padding-left: 10px;
		}
		img{
			width: 90px;
			height: 90px;
		}
		p{
			line-height: 30px;
			font-size: 16px;
			font-size: 14px;
			color: #666666;
		}
	}
}

</style>
