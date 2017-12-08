<template>
  <div class="girl-like">
		<v-title
		:type="false"
		:title="data.ad_name"
			></v-title>
		<ul class="girl-lick-box" v-for="(n,index) in data.data?data.data.data:{}" v-show="index===num" :key="index">
			<li v-for='(item,l) in n' :key="l">
				<v-blockone
				:prop="item"	
					></v-blockone>
			</li>
		</ul>
		<v-more
		:type="false"
		:titleone="'换一换'"
		:titletwo="'女生频道>>'"
		@onemore="onemore"
		@twomore="twomore(370)"
			></v-more>
	</div>
</template>

<script>
import {change} from '@/assets/mixins'
import bookTitle from '@/components/common/bookTitle'
import bookMore from '@/components/common/bookMore'
import boxBlockOne from '@/components/bookblock/boxBlockOne'
export default {
	components:{
		//标题
		"v-title":bookTitle,
		//更多
		"v-more":bookMore,
		//书块one
		"v-blockone":boxBlockOne
	},
	mixins:[change],
	props:{
		data:{
			type:Object,
			default (){
				return {};
			}
		}
	},
	methods :{
		twomore (id){
			this.$router.push({path: '/girl/'+id})
		}
	}
}
</script>
