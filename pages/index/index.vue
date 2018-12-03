<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section page-section-spacing swiper">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="height: 240px;">
					<swiper-item v-for="item in itemList" :key="item">
						<view class="swiper-item  ">
							<image :src="item" style="width: 100%;" />
						</view>
					</swiper-item>

				</swiper>
			</view>
		</view>
		<view>
			<div class="consult clearfix"><span>运动户外</span><span>健康生活</span><span>悠氧播报</span> </div>
			<div class="header-butt clearfix"><a><strong>优惠券</strong><span>满300减50</span></a> <a><strong>优惠券<i></i></strong><span>满100减20</span></a>  </div>
		</view>
		<view>
			 <div class="purchase-title purchase-icon3"><span class="purchase-titleRight">更多</span></div>
			 
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'swiper',
				itemList: [
					'http://yoyound.com/images/201802/source_img/1991_P_1517735808303.jpg',
					'http://yoyound.com/images/201802/goods_img/1983_P_1517723513939.jpg',
					'http://www.yoyound.com/images/201809/thumb_img/6256_thumb_G_1536824618570.jpg'
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {

		}
	}
</script>

<style>
	.purchase-icon3 {
		/* background: url(/imgs/purchase/index/purchase-icon3.png) no-repeat 0.3rem 0.6rem; */
		background-size: 1.85rem 0.34rem;
	}
	.purchase-icon3 {
/* 		background: url(/imgs/purchase/index/purchase-icon3.png) no-repeat 0.3rem 0.6rem; */
		background-size: 1.85rem 0.34rem;
	}
	.consult {
		/* margin-bottom: 60upx; */
		width: 100%;
		height: 60upx;
		font-size: 0;
		background-color: #fff;
	}
	 
	.consult   span {
		float: left;
		/* padding-top: 5%; */
	    text-align: center;
		width: 33%;
		display: block;
		font-size: 30upx;
		color: #666;
		border: #333333;
	}
	.header-butt {
		margin-bottom: 0.2rem;
		width: 100%;
		height: 1.2rem;
		font-size: 0;
		background-color: #fff;
	}
	.header-butt a {
		float: left;
		padding-top: 3%;
		width: 50%;
		text-align: center;
	}
	.header-butt a strong {
		position: relative;
		margin-top: 0.2rem;
		font-size: 0.3rem;
		color: #333;
		font-weight: inherit;
	}
	.header-butt a span {
		display: block;
		font-size: 0.26rem;
		color: #666;
	}
	.swiper-item {
		display: block;
		width: 100%;
		text-align: center;
	}

	.swiper-list {
		/* margin-top: 40upx; */
		margin-bottom: 0;
	}

	.page-section-title {
		padding: 0;
		margin-top: 60upx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 0;
		color: #353535;
		font-size: 30upx;
	}
</style>
