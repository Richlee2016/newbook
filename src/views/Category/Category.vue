<template>
	<div class="container-four">
		<v-head :title="'分类'"></v-head>
		<section v-for="(item,index) in container.title" :key="index">
			<div class="title">
				<label :style="{background:index===1?'#ffae20':'#4b79c2'}" class="icon-class"></label>
				<span>{{item.name}}</span>
			</div>
			<ul class="four_main">
				<li v-for="data in container.data[index]" :key="data.category_id">
					<router-link :to="{name:'CategoryFiction',params:{id:data.category_id} }">
						<div class="left">
							<span>{{data.label}}</span>
							<label>{{data.fiction_count}}</label>
						</div>
						<div class="right">
							<img :src="data.new_image" />
						</div>
					</router-link>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
import bookHead from '@/components/common/bookHead'
import { category } from '@/servers/server'
export default {
	components: {
		//抬头
		"v-head": bookHead
	},
	data() {
		return {
			container: {}
		}
	},
	mounted() {
		category()
			.then(res => {
				let data = res.data;
				this.container = {
					title: [data.section[2], data.section[3]],
					data: [data.male, data.female]
				};
				console.log(this.container);
			})
	}
}
</script>
<style lang="less">
.container-four {
	padding: 5px;
	.title {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #f0f0f0;
		label {
			display: inline-block;
			width: 30px;
			height: 30px;
			border-radius: 30px;
			text-align: center;
			line-height: 30px;
			color: white;
		}
		span {
			padding-left: 10px;
		}
	}
}

.four_main {
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	li {
		flex: 1;
		min-width: 46%;
		padding: 5px;
		float: left;
		position: relative;
	}
	.left {
		padding: 16px;
		z-index: 9;
		position: absolute;
		left: 0px;
		top: 0px;
		span,
		label {
			display: block;
			line-height: 20px;
		}
	}
	.right {
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
