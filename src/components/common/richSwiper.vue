<template>
  <div class="slide">
  		<section class="swiper" ref="slide" :style="{width:swiper.box + '00%'}">
	  			<slot name="box"></slot>
  		</section>
  </div>
</template>

<script>
//bug 2-14  当 为autoplay的时候 往后面滑动 到2  会持续到3  因为再2的时候并没有进行判断
import Hammer from "hammerjs"
export default {
	data (){
			return {
				swiper:{
					box:3,
					swiper:true,
					autoplay:false,
					loop:false
				},
				n:0,
				loopOnoff:false
			}
		},
		props:{
			slider:{
				type:Object,
				default (){
					return {}
				}
			}
		},
		computed:{

		},
	methods:{
		_transform (dom){
			if(dom){
				dom.style.WebkitTransform = 'translateX('+ (-100/this.swiper.box)*this.n +'%)';
			};
		},
		//左右滑动
		_swiper (){
			var slide = new Hammer(this.$refs.slide);
			var self = this;
			myHam(slide);
			function myHam(obj) {
			    var ham = obj;
					//左滑动
			    ham.on("swipeleft", function (e) {
			    		self.n++;
			    		if(self.n >= self.swiper.box){
								if(self.swiper.loop){
									self.n = 0;
				    		}else{
				    			self.n = self.swiper.box-1;
				    		};
							};
			    		self._transform.call(self,self.$refs.slide);
			    		self.$emit("swiperLeft");
			    		console.log(self.n,self.swiper.box);
			    });

			    //右滑动
			    ham.on("swiperight", function (e) {
			    		self.n--;
			    		if(self.n <0){
								if(self.swiper.loop){
									self.n = self.swiper.box-1;
				    		}else{
				    			self.n = 0;
				    		};
							};
			    		self._transform.call(self,self.$refs.slide);
			    		self.$emit("swiperRight");
			    });
			};
		},
		//自动播放
		_autoplay (){
			var timer = setInterval(() => {
				if(this.swiper.loop){
					this.n++;
					if(this.n >= this.swiper.box){
						this.n =0;
					};
				}else{
					if(this.onOff){
						this.n--;
					}else{
						this.n++;
					};
					if(this.n === this.swiper.box-1){
						this.onOff = true;
					}else if(this.n === 0){
						this.onOff= false;
					}
				};
				this._transform.call(self,this.$refs.slide);
			},(this.swiper.autoplay*1000));
		},
		//继承函数
		_extend (){
			this.swiper = Object.assign({}, this.swiper,this.slider);
		}
	},
	created (){
		this.$nextTick(function(){
				this._extend();
				if(this.swiper.swiper === true){
					this._swiper();
				};
				if(this.swiper.autoplay){
					this._autoplay();
				};
		});
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
html,body{
	width: 100%;
	overflow-x: hidden;
}
.slide{
	width: 100%;
	overflow-x: hidden;
}
.swiper{
	display: -webkit-flex;
	-webkit-transition: 0.4s ease-in-out;
	>div{
		flex: 1;
		float: left;
	}
}

</style>
