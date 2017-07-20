<template>
	<div>
		<div v-if="load" class="loadone" title="7">
		<div class="svg">
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
			<rect x="0" y="10" width="4" height="10" fill="#FF6700" opacity="0.2">
			<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
			</rect>
			<rect x="8" y="10" width="4" height="10" fill="#FF6700"  opacity="0.2">
			<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			</rect>
			<rect x="16" y="10" width="4" height="10" fill="#FF6700"  opacity="0.2">
			<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			</rect>
			</svg>
		</div>	
		<span>{{loadMsg}}</span>
		</div>	
		<div class="seemore" v-else @click="$emit('more')">更多专题</div>
	</div>
</template>

<script>
import _throttle from 'lodash/throttle'
import $ from 'assets/zepto'
export default {
	props:{
		loadMsg:{
			type:String,
			default:'正在加载书籍...'
		},
		load:{
			type:Boolean,
			default:true
		},
		options:{
			type:Object,
			default(){
				return {
					start:0,
					count:6,
					isLoad:true
				}
			}
		}
	},
	methods:{
		_loading(){
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop === 0){
				this.$emit('inLoading');
			};
            let updatePosition = () => {
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				let docHei = document.querySelector('.view-container').offsetHeight;
				let disY = docHei - window.screen.height - 200;;
                if (scrollTop >= disY) {
                   this.$emit('inLoading');
                };
            }
            //throttle 节流绑定
            $(window).on('scroll', _throttle(updatePosition, 500));
		}
	},
	created(){
		this._loading();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.loadone{
	padding: 18px 0px;
	height: 30px;
	text-align: center;
	display: -webkit-flex;
	justify-content:center ;
	.svg{
		width: 24px;
		height: 30px;
	}
	span{
		color: rgba(0,0,0,0.4);
		line-height: 30px;
	}
}
.seemore{
	// margin-top: 20px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border-top: #efeff0 1px solid;
	color:#999;
	font-size: 14px;
}
</style>
