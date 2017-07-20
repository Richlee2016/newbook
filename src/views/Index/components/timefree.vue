<template>
  <div class="time-free">
		<v-title
		:title="data.ad_name"	
			></v-title>
		<v-blockthree
		:prop="data.data"	
			></v-blockthree>
		<v-more
		:titleone="'更多限免佳作>>'"
		@onemore="onemore"
			></v-more>	
	</div>
</template>

<script>
import bookTitle from '@/components/common/bookTitle'
import bookMore from '@/components/common/bookMore'
import boxBlockThree from '@/components/bookblock/boxBlockThree'
export default {
	components:{
		//标题
		"v-title":bookTitle,
		//更多
		"v-more":bookMore,
		//书块 three
		"v-blockthree":boxBlockThree
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
		onemore (){
			this.$router.push({ path:'/free'})
		}
	}
}
</script>

