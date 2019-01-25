<template>
		<view class="content">我们只做品牌正品，我们一切的付出与努力只为创造完美的购物体验！
YOYOUND SPORT 运用创新化的商业理念，通过现代电子商务模式与传统零售业进行创新性融合，运用网络技术与国际、国内优质合作伙伴进行商务对接，以先进的直销营销思维，配合高效完善的物流系统，真正做到物美价廉，快捷便利的为消费者提供高品质正品授权的运动户外产品，逐步成为优质的运动户外用品商城！
			 <button type="primary" open-type="share">分享</button>  
		</view>
		 
</template>

<script>
	export default {
		data(){
			return {
				 
			}
		},
		onShareAppMessage() {
			return {
				title:  "悠氧商城",
				path: '/pages/index/index',
				imageUrl:'http://yoyound.com/images/logo5_4.jpg'
			}
		},
		onLoad() {
		 uni.showShareMenu({
                    withShareTicket: true
                });
			 
		},
		methods:{
			  
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}
	 
	 
	.content{
		flex: 1;
		padding:0 30upx 430upx 30upx;
		 flex-direction: column;
		justify-content: center;  
	}
	 
	button{
		width: 100%;
		margin-top: 40upx;
	}
	 
</style>
