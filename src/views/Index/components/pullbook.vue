<template>
  <ul class="pull-book">
		<li v-for="(item,index) in data" :key="index">
			<v-blockone
			:prop="item"
				></v-blockone>
		</li>
	</ul>
</template>

<script>
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
		"v-blockone":boxBlockOne,
	},
	props:{
		data:{
			type:Array,
			default (){
				return [];
			}
		}
	}
}
</script>

