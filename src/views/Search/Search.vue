<template>
  <div class="search-container">
  		<v-head :titleShow='false' :iconShow='false'>
			<div slot="search" class="searchpage-box">
				<v-search
				:searchBox='false'
				@search="search"
				:goShow="true"
				></v-search>	
			</div>
		</v-head>
		<div class="search-choice">
			<v-colorblock
			v-for="(item,index) in searchChoice"
            :key="index"
			:detailId ="item.reference_id"
			:index="index"
			:container="item.ad_name"
			></v-colorblock>	
		</div>
		<ul class="search-result">
			<li v-for="(item,index) in searchData" :key="index">
				<v-blockone
				:prop="item"
				>
				<slot name="serach">
					<div class="search-text">
						<p>{{item.intro}}</p>
						<h3 class="author">{{item.role[0][1]}}</h3>
					</div>
				</slot>
				</v-blockone>
			</li>
		</ul>	  
  </div>
</template>

<script>
import bookHead from '@/components/common/bookHead'
import Search from '@/components/common/search'
import colorBlock from '@/components/common/colorblock'
import {searchpage,search} from '@/servers/server'
import boxBlockOne from '@/components/bookblock/boxBlockOne'
export default {
	components :{
		"v-head":bookHead,
		//书块one
		"v-blockone":boxBlockOne,
		//搜索
		"v-search":Search,
		//色块
		"v-colorblock":colorBlock
	},
	data (){
		return {
			searchChoice:{},
			searchData:[]
		}
	},
	methods :{
		search (keywords){
			search(0,10,keywords)
			.then( res => {
				this.searchData = res.data.items;
			})
		}
	},
	activated (){
		searchpage()
		.then( res => {
			this.searchChoice = res.data.msg.ads;
			return Promise.resolve();
		})
		.then(() => {
			this.$overLoad(100);
		})
	}
}
</script>
<style lang="less">
.searchpage-box{
	background: white;
	height:38px;
	margin-top: 2px;
	margin-right: 20px;
	border: #ddd 1px solid;
}
.search-choice{
	padding: 20px;
}
.search-result{
	border-top:1px solid #f0f0f0;
}
.search-text{
	position: absolute;
	width: 100%;
	height: 100%;
	top:26px;
	left:0px;
	padding-bottom:20px;
	margin-top: 10px;
	.author{
		margin-top: 10px;
		font-size: 14px;
		color: #999999;
	}
}
</style>
