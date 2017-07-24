<template>
  <div class="recommend">
		<v-title
		:type="false"
		:title="data.ad_name"
		:tabShow="true"
		@boyGo="tabn=0"
		@girlGo="tabn=1"
			></v-title>
		<div v-for="(tab,tabnum) in data.data?data.data.data:{}" v-if="tabnum===tabn" :key="tabnum">
		<ul class="recommend-box" v-for="(n,nnum) in tab" v-show="nnum===num" :key="nnum">
			<li v-for="(item,l) in n[0]" :key="l">
  				<v-blockone
  				:prop="item"
  				:bookrank="1"
  					></v-blockone>
			</li>
			<li v-for="(item,index) in n[1]" :key="index">
  				<v-blocktwo
  				:prop="item"
  				:rank="index+2"
  					></v-blocktwo>
			</li>
		</ul>
		</div>	
		<v-more
		:type="false"
		:titleone="'换一换'"
		@onemore="onemore"
		@twomore="twomore"
			></v-more>
	</div>
</template>

<script>
import {change} from '@/assets/mixins'
import bookTitle from '@/components/common/bookTitle'
import bookMore from '@/components/common/bookMore'
import boxBlockOne from '@/components/bookblock/boxBlockOne'
import boxBlockTwo from '@/components/bookblock/boxBlockTwo'
export default {
	components:{
		//标题
		"v-title":bookTitle,
		//更多
		"v-more":bookMore,
		//书块one
		"v-blockone":boxBlockOne,
		//书块two
		"v-blocktwo":boxBlockTwo
	},
	mixins:[change],
	data (){
		return {
			recommend :{},
			tabn:0
		}
	},
	props:{
		data:{
			type:Object,
			default (){
				return {};
			}
		}
	},
	methods :{
		twomore (){
			let id =369;
			if(this.tabn === 0){
				id = 369;
			}else{
				id = 370;
			};
			this.$router.push({path: '/channel/'+id})
		}
	}
}
</script>

