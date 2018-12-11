<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="purchase-header">
				<view class="header-sear" @click=goSearch()>请输入商品名称</view><strong class="header-news">14</strong> <span class="header-cart"
				 @click=goCart()></span>
			</view>
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
			<view class="consult "><span>运动户外</span><span>健康生活</span><span>悠氧播报</span> </view>
			<view class="header-butt "><a>优惠券 <span>满300减50</span></a> <a>优惠券<i></i> <span>满100减20</span></a>
			</view>
		</view>

		<div class="purchase-band">
			<span style="float: left;font-size: 30upx; "> 品牌馆</span>
			<span style="float: right;font-size: 30upx; " @click="goBrandList()">更多</span>
		</div>

		<view>
			<div class="purchase-nav  ">
				<span @click="goBrandSearch()" style="background-image: url( );">阿迪</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp3.png);">Nike</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp5.png);">彪马</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp1.png);">李宁</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp2.png);">汉道</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp7.png);">卡帕</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp6.png);">匡威</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp6.png);">特步</span>
				<span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp6.png);">狼爪</span>
			</div>
		</view>
		<view>
			<div class="purchase-band"><span style="float: left;font-size: 30upx; "> 商品列表</span> </div>
		</view>
		<view class="uni-list">
			<view class="goodsList-cent  ">

				<view v-for="(value,key) in listData" :key="key" @click="goDetail(value)" class="goodsList-list">
					<image class="follow-centImg" :src="value.logo"></image>
					 
					<view class="follow-centImgh6">{{value.name}}</view>
					<view class="goodsList-listp">销量： {{value.sales}}</view>
					<view class="goodsList-listp">售价：¥{{value.price}}</view>
				</view>
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>

		</view>

	</view>
</template>
<script>
	import loadMore from '../../components/load-more.vue'
	import service from '../../service.js';
	export default {
		components: {
			loadMore
		},
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
				duration: 500,
				imgsrc: 'http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp3.png',
				listData: [],
				loadingType: 0,
				pageNumber: 1,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad() {

			this.getList();
		},
		onUnload() {

			this.listData = []

		},

		onReachBottom() {

			if (this.loadingType !== 0) {
				return;
			}
			console.log('onReachBottom');
			this.loadingType = 1;
			setTimeout(() => {
				this.pageNumber++;
				this.getList();
			}, 300);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.listData = [];
			setTimeout(() => {
				this.pageNumber = 1;
				this.getList();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			getList() {

				uni.request({
					url: service.getHomeGoods(),
					data: {
						pageNumber: this.pageNumber
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.listData = this.listData.length == 0 ? data.data.data.list : this.listData.concat(data.data.data.list);
							if (data.data.data.lastPage) {
								this.loadingType = 2;
								return;
							}
							this.loadingType = 0;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},

			goBrandList: function() {
				uni.navigateTo({
					url: "../brand/brandList"
				})
			},
			goBrandSearch: function() {
				uni.navigateTo({
					url: "../brand/search"
				})
			},
			goSearch: function() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			goCart: function() {
				uni.switchTab({
					url: "../cart/cart"
				})
			},
			goDetail: function(e) {


				uni.navigateTo({
					url: "../goods/goodsDetail?goodsId=" + e.goodId + "&name=" + e.name
				})
			} 
		}
	}
</script>

<style>
	.goodsList-cent {
		margin-top: 0.1rem;
		padding: 0.3rem 0 0.2rem;
		background: #fff;
		font-size: 0;
	}

	.goodsList-list {
		display: block;
		position: relative;
		margin-bottom: 0.3rem;
		padding: 0 0.3rem 0 2.9rem;
		height: 2.4rem;
		font-size: 0;
	}

	.goodsList-list .follow-centImg {
		position: absolute;
		top: 0;
		left: 0.3rem;
		width: 240upx;
		height: 240upx;
		background-position: center center;
		background-size: cover;
	}

	.follow-centImgh6 {
		padding-top: 0.05rem;
		font-size: 0.3rem;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		white-space: inherit;
	}

	 

	.goodsList-listp {
		margin: 55upx 0;
		font-size: 24upx;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.purchase-header {
		padding: 0.2rem 0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 0.71rem;
	}

	.purchase-header span {
		position: absolute;
		top: 0.2rem;
		display: block;
		z-index: 1000;
		width: 0.76rem;
		height: 0.76rem;
		border-radius: 50%;
	}

	.purchase-header .header-cart {
		right: 0.3rem;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-cart.png) no-repeat center;
		background-size: 100% 100%;
	}

	.purchase-header .header-sear {
		margin: 0.06rem 0 0 0.3rem;
		padding-left: 0.6rem;
		width: 5rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		font-size: 0.26rem;
		color: #999;
		border-radius: 0.3rem;
		background: #eeeeee url(https://cs.h5.hongkzh.com/imgs/see/index/seeIndex-sear.png) no-repeat 1.75rem center;
		background-size: 0.35rem 0.35rem;
	}

	.purchase-header .header-news {
		display: block;
		position: absolute;
		top: 0.2rem;
		right: 0.12rem;
		z-index: 1001;
		height: 0.26rem;
		line-height: 0.26rem;
		padding: 0 0.1rem;
		font-size: 0.2rem;
		color: #FFFFFF;
		background: #EF593C;
		border-radius: 100px;
	}



	.page-body-info {
		background-color: transparent;
	}

	.page-body-content {
		padding: 0 30upx;
	}

	.text {
		margin: 16upx 0;
		width: 690upx;
		background-color: #fff;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		color: #555;
		border-radius: 8upx;
	}



	.purchase-band {
		padding: 0upx 32upx 0upx 32upx;
	}

	.purchase-nav {
		padding: 0 32upx 0upx;
	}

	.purchase-nav span {
		position: relative;
		margin-top: 40upx;
		padding-top: 102upx;
		float: left;
		width: 130upx;
		text-align: center;
		font-size: 22upx;
		color: #666666;
		background: no-repeat top center;
		background-size: 100upx 100upx;
	}

	.consult {
		/* margin-bottom: 60upx; */
		width: 100%;
		/* height: 60upx; */
		font-size: 0;
		text-align: center;
		background-color: #fff;
	}

	.consult span {
		float: left;
		padding-top: 6%;
		text-align: center;
		width: 33%;
		display: block;
		padding-left: 1upx;
		font-size: 30upx;
		color: #666;
		border: #333333;
		height: 80upx;
		border-color: #007AFF;
		/* background-color: #F0AD4E; */
	}

	.header-butt {
		margin-bottom: 20upx;
		width: 100%;
		height: 120upx;
		font-size: 0;
		background-color: #fff;
		border-color: #1AAD19;
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
