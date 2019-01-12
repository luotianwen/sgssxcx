<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="purchase-header">
				<view class="header-sear" @tap="goSearch()">请输入商品名称</view><strong class="header-news">{{cartCount}}</strong> <span
				 class="header-cart" @tap="goCart()"></span>
			</view>
			<view class="page-section page-section-spacing swiper" style="background-color: #fff;">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="height: 240px;width: 96%;padding-left: 2%;">
					<swiper-item v-for="item in itemList" :key="item">
						<view class="swiper-item  ">
							<image :src="item.logo" style="width: 100%;" />
						</view>
					</swiper-item>

				</swiper>
			</view>
		</view>

		<view style="margin-top: 0.2rem;">
			<view class="rectangle3">
				<view class="rectangle3center">
					<image src="../../static/img/i1.png" class="rectangle3img"></image>
					<view class="rectangle3code"> 运动户外</view>
				</view>
			</view>
			<view class="rectangle3">
				<view class="rectangle3center">
					<image src="../../static/img/i2.png" class="rectangle3img"></image>
					<view class="rectangle3code"> 健康生活</view>
				</view>
			</view>
			<view class="rectangle3">
				<view class="rectangle3center">
					<image src="../../static/img/i3.png" class="rectangle3img"></image>
					<view class="rectangle3code"> 悠氧播报</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 0.2rem;">
			<view class="combinedShape ">
				<view style="width: 14px;	height: 48px; padding-left: 15px; padding-top: 7px; text-align: center;	font-size: 14px;	font-weight: normal;	font-stretch: normal;	line-height: 16px;	letter-spacing: -1px;color: #764500;">优惠券</view>
				<view> 
					<view style="position: relative;" > 满 399 </view>
					<view style="position: relative;"  > 减 100 </view>
				</view>
			</view>
			<view class="combinedShape "> </view>
		</view>
		<view class="uni-list">
			<view class="goodsList-cent1">
				<view style="width: 100%;">
					<view class="brands1"> 品牌馆 </view>
					<view class="brandsmore " @tap="goBrandList()">更多 </view>
				</view>
				<view style="padding-top: 10px;">
					<view class="rectangle-4" @tap="goBrandSearch(value)" v-for="(value,key) in brands" :key="key" v-bind:style="{backgroundImage:'url(' + value.logo + ')'}">
						<!-- {{value.name}} -->
					</view>

				</view>
			</view>
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
				itemList: [],
				brands: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				imgsrc: 'http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp3.png',
				listData: [],
				loadingType: 0,
				pageNumber: 1,
				cartCount: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onShow() {
			/* this.pageNumber = 1;
			this.loadingType=0;
			this.listData = [];
			this.getList(); */
			this.getCartData();
		},
		onLoad() {
			service.removeUser();
			this.getList();
			this.indexData();
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
			getCartData() {
				let _this = this;
				if (!service.getUser().hasLogin) {
					return;
				}
				uni.request({
					url: service.getCartData(),
					data: {
						tokenId: service.getUser().tokenId
					},
					success: (data) => {
						console.log(JSON.stringify(data.data.data))
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.cartCount = data.data.data;

						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			indexData() {

				uni.request({
					url: service.indexData(),

					success: (data) => {
						console.log(JSON.stringify(data.data.data))
						if (data.statusCode == 200 && data.data.code == 0) {
							let _data = data.data.data;
							this.itemList = _data.carousels;
							this.brands = _data.brands;

						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
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
			goBrandSearch: function(item) {
				uni.navigateTo({
					url: "../brand/search?brandId=" + item.brandId + "&title=" + item.name
				})
			},
			goSearch: function() {
				uni.navigateTo({
					url: "../search/search1"
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
	.rectangle-4 {
		width: 23.5%;
		height: 90px;
		background-color: #ffffff;
		border: solid 1px #c0cdda;
		float: left;
	}

	.rectangle4 {
		width: 88px;
		height: 90px;
		border: 1px solid #c0cdda;
		background: #ffffff;
		color: #011959;
		font-family: PingFangSC;
		font-size: 12px;
		font-style: normal;
		font-stretch: normal;
		font-weight: 500;
		line-height: 16px;
		text-align: center;
		text-transform: none;
		text-decoration: none;
		letter-spacing: 0px;
	}

	.brands1 {
		position: relative;
		top: 0;
		width: 36px;
		height: 16px;
		color: #011959;

		font-size: 12px;
		font-style: normal;
		font-stretch: normal;
		font-weight: 500;
		line-height: 16px;
		text-align: center;
		text-transform: none;
		text-decoration: none;
		letter-spacing: 0px;


	}

	.brandsmore {
		margin-top: 0.16rem;
		top: 0;
		width: 23px;
		height: 17px;
		position: absolute;
		font-size: 12px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: -1px;
		color: #011959;
		right: 3%;
		/*  float: right;  */
		/* margin-right: 3% */
	}


	.goodsList-cent1 {
		margin-top: 0.16rem;
		/* padding: 0.1rem 0 0; */
		background: #fff;
		font-size: 0;
		margin-left: 3%;
	}

	.goodsList-cent {
		margin-top: 0.3rem;
		padding: 0 0 0.2rem;
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
		/* padding: 0.2rem 0; */
		/* position: fixed; */
		padding-left: 2%;
		top: 0;
		left: 0;
		/* z-index: 1000; */
		width: 100%;
		height: 0.71rem;
		background-color: #FFFFFF;
	}

	.purchase-header span {
		position: absolute;
		top: 0;
		display: block;
		z-index: 1000;
		width: 0.60rem;
		height: 0.60rem;
		border-radius: 50%;
	}

	.purchase-header .header-cart {
		right: 0.4rem;
		background: url(http://127.0.0.1:8082/static/images/cart1.png) no-repeat center;
		background-size: 100% 100%;
	}

	.purchase-header .header-sear {
		/* margin: 0.06rem 0 0 0.3rem; */
		padding-left: 0.6rem;
		width: 75%;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		font-size: 0.26rem;
		color: #999;
		border-radius: 0.3rem;
		background: #eeeeee url(http://127.0.0.1:8082/static/images/search.png) no-repeat 1.75rem center;
		background-size: 0.35rem 0.35rem;
	}

	.purchase-header .header-news {
		display: block;
		position: absolute;
		top: 0;
		/* top: 0.2rem; */
		right: 0.12rem;
		/* z-index: 1001; */
		height: 0.26rem;
		line-height: 0.26rem;
		padding: 0 0.1rem;
		font-size: 0.2rem;
		color: #FFFFFF;
		background: #EF593C;
		border-radius: 100px;
	}

	.rectangle3center {
		padding: 15px 30px;
	}

	.rectangle3img {
		width: 40px;
		height: 40px;
	}

	.rectangle3code {
		width: 45px;
		height: 17px;

		font-size: 12px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: -1px;
		color: #7c8895;
	}

	.rectangle3 {
		/* position: absolute;*/
		margin-top: 20upx;
		margin-left: 2.5%;
		width: 110px;
		height: 94px;
		border: 0.5px solid #c0cdda;
		background: #ffffff;
		box-shadow: 0px 1px 3px 0px #c0cdda;
		float: left;
	}

	.combinedShape {
		margin-left: 3%;
		margin-top: 20upx;
		width: 169px;
		height: 64px;
		background: url(http://127.0.0.1:8082/static/images/ic.png) no-repeat center;
		background-size: 100% 100%;
		box-shadow: 0px 1px 3px 0px #c0cdda;
		float: left;
		border-radius: 5px;
	}

	.page-body-info {
		background-color: #fff;
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
		width: 25%;
		text-align: center;
		font-size: 22upx;
		color: #666666;
		background: no-repeat top center;
		background-size: 100upx 100upx;
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
