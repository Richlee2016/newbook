<template>
  <div class="week-hot">
		<v-title
		:title="data.ad_name"	
			></v-title>
		<v-blockthree
		:prop="data.data ? data.data.data : []"	
			></v-blockthree>
		<v-more
		@onemore="onemore(data.reference_id)"	
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
		onemore (id){
			this.$router.push({ path:'/containerone/'+id})
		}
	}
}
</script>
