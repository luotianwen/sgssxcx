<template>
	<view>
		<!-- <page-head :title="title"></page-head> -->
		<view class="page-body">
			<view class="purchase-header">
				<view class="header-sear" @tap="goSearch()">请输入商品名称</view><strong class="header-news">{{cartCount}}</strong> <span
				 class="header-cart" @tap="goCart()"></span>
			</view>
			<view class="page-section page-section-spacing swiper" style="background-color: #fff;">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="height: 475upx;width: 96%;padding-left: 2%;">
					<swiper-item v-for="item in carousels" :key="item">
						<view class="swiper-item  ">
							<image :src="item.logo" style="width: 100%;" />
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view>
			<view class="rectangle3" @tap="openydhw(1)">
				<view class="rectangle3center">
					<image src="../../static/img/i1.png" class="rectangle3img"></image>
					<view class="rectangle3code"> 运动户外</view>
				</view>
			</view>
			<view class="rectangle3" @tap="openydhw(2)">
				<view class="rectangle3center">
					<image src="../../static/img/i2.png" class="rectangle3img"></image>
					<view class="rectangle3code"> 健康生活</view>
				</view>
			</view>
			<view class="rectangle3" @tap="openydhw(3)">
				<view class="rectangle3center">
					<image src="../../static/img/i3.png" class="rectangle3img"></image>
					<view class="rectangle3code"> 悠氧播报</view>
				</view>
			</view>
		</view>
		<view>

			<view class="combinedShape" @tap="goCoupon(value)" v-for="(value,key) in coupons" :key="key">
				<view class="combinedShape-coupon">优惠券</view>
				<view class="combinedShape-coupon-right">
					<view class="combinedShape-coupon-right-top"> 满{{value.full}} </view>
					<view class="combinedShape-coupon-right-bottom"> 减{{value.reduction}} </view>
				</view>
			</view>

		</view>
		<view class="uni-list">
			<view class="goodsList-cent1">
				<view style="width: 100%;">
					<view class="brands1"> 品牌馆 </view>
					<view class="brandsmore " @tap="goBrandList()">
						<view class="brandsmore-more">更多</view>
					</view>
				</view>
				<view style="padding-top: 10px;">
					<view class="app-portal" @tap="goBrandSearch(value)" v-for="(value,key) in brands" :key="key">
						<!-- {{value.name}} v-bind:style="{backgroundImage:'url(' + value.logo + ');background-position: center;background-repeat: no-repeat;background-size: 1005 100%'}"-->
						<image :src="value.logo" class="app-portalimg"></image>
					</view>

				</view>
			</view>
		</view>

		<view style="position:relative ;width:100%; border: 0upx;background: #ffffff;">
			<view class="goodsList-cent  ">

				<view v-for="(value,key) in goodsData" :key="key" @click="goDetail(value)" class="goodsList-list">
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
				carousels: [],
				brands: [],
				weixin:[],
				coupons: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				goodsData: [],
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
			this.goodsData = [];
			this.getList(); */
			this.indexData();
			this.getCartData();
			/* console.log("userInfo   "+JSON.stringify(service.getUser())); */
		},
		onShareAppMessage() {
			return {
				title: "悠氧运动户外-综合网购首选-正品低价、品质保障、配送及时、轻松购物",
				path: '/pages/index/index',
				imageUrl: ''
			}
		},
		onLoad() {
			 //service.removeUser();
             const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					service.removeUser();
					updateManager.onUpdateReady(function(res) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});

					});
					updateManager.onUpdateFailed(function(res) {
						// 新的版本下载失败
						uni.showModal({
							title: '提示',
							content: '检查到有新版本，但下载失败，请检查网络设置',
							showCancel: false,
						})

					});
				}
			});



			wx.showShareMenu({
				withShareTicket: true
			});

			this.getList();
			this.indexData();
		},
		onUnload() {

			this.goodsData = []

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
			this.goodsData = [];
			setTimeout(() => {
				this.pageNumber = 1;
				this.getList();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: { 
			openydhw: function(i) { 
				var _wx=this.weixin[i-1];
				//console.log(_wx.url)
				//console.log(_wx.name)
				let _url=encodeURIComponent(_wx.url);
				let _name=encodeURIComponent(_wx.name);
				uni.navigateTo({
					url: "../index/webview?name="+_name+"&url="+ _url
				})
				
			},
			goCoupon: function(coupon) {
				let _this = this;
				if (!service.getUser().hasLogin) {
					uni.showModal({
						content: "请登录领取优惠券",
						showCancel: false
					});
					return;
				}
				uni.request({
					url: service.gainCouponById(),
					data: {
						tokenId: service.getUser().tokenId,
						couponId: coupon.couponId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.showToast({
								icon: 'success',
								title: "领取成功"
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: data.data.msg
							})
						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})

			},
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

						if (data.statusCode == 200 && data.data.code == 0) {
							let _data = data.data.data;
							this.carousels = _data.carousels;
							this.brands = _data.brands;
							this.coupons = _data.coupons;
							this.weixin=_data.weixin;
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
							this.goodsData = this.goodsData.length == 0 ? data.data.data.list : this.goodsData.concat(data.data.data.list);
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
	page {
		  background-color: #FFFFFF; 
		height: 100%;
		font-size: 32upx;
		line-height: 1.6;
	}
		
	.brandsmore {


		margin-top: 0.16rem;
		top: 0;
		width: 23px;
		height: 17px;
		position: absolute;
		
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: -1px;
		color: #011959;
		right: 3%;
		padding-right: 0.01rem;
		/*  float: right;  */
		/* margin-right: 3% */
	}

	.brandsmore-more {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 80upx;
		/* padding-right: 0.48rem; */
		height: 100%;
		font-size: 12px;
		background: url("http://op.yoyound.com/static/images/left.png") no-repeat right center;
		background-size: 50upx 50upx;
	}

	.app-portal {
		padding-top: 2upx;
		width: 175upx;
		height: 175upx;
		text-align: center;
		display: inline-block
	}

	.rectangle-4 {
		width: 175upx;
		height: 175upx;
		background-color: #ffffff;
		border: solid 1px #c0cdda;
		float: left;
	}

	.app-portalimg {
		width: 150upx;
		height: 150upx
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
		width: 100upx;
		height: 19upx;
		color: #011959;

		font-size: 35upx;
		font-style: normal;
		font-stretch: normal;
		font-weight: 500;
		line-height: 19upx;
		text-align: center;
		text-transform: none;
		text-decoration: none;
		letter-spacing: 0px;


	}




	.goodsList-cent1 {
		margin-top: 19upx;
		/* padding: 12upx0 0; */
		background: #fff;
		font-size: 0;
		margin-left: 3%;
	}

	.goodsList-cent {
		  margin-top: 25upx; 
		/* padding-top: 25upx; */
		padding: 0 0 23upx;
		background: #ffffff;
		font-size: 0;
	}

	.goodsList-list {
		display: block;
		position: relative;
		/* margin-bottom: 35upx; */
		padding: 0 35upx 0 35upx;
		height: 260upx;
		font-size: 0;
	}

	.goodsList-list .follow-centImg {
		position: absolute;
		top: 0;
		left: 35upx;
		width: 240upx;
		height: 240upx;
		background-position: center center;
		background-size: cover;
	}

	.follow-centImgh6 {
		padding-left: 250upx;

		font-size: 30upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		white-space: inherit;
	}



	.goodsList-listp {
		padding-left: 250upx;
		/* margin: 21upx 0; */
		font-size: 30upx;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.purchase-header {
		/* padding: 24upx 0; */
		/* position: fixed; */
		padding-left: 2%;
		top: 0;
		left: 0;
		/* z-index: 1000; */
		width: 100%;
		height: 84upx;
		background-color: #FFFFFF;
	}

	.purchase-header span {
		position: absolute;
		top: 0;
		display: block;
		z-index: 1000;
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}

	.purchase-header .header-cart {
		right: 47upx;
		background: url(http://op.yoyound.com/static/images/cart1.png) no-repeat center;
		background-size: 100% 100%;
	}

	.purchase-header .header-sear {
		/* margin: 0.06rem 0 0 35upx; */
		padding-left: 70upx;
		width: 72%;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 30upx;
		color: #999;
		border-radius: 35upx;
		background: #eeeeee url(http://op.yoyound.com/static/images/search.png) no-repeat 205upx center;
		background-size: 41upx 41upx;
	}

	.purchase-header .header-news {
		display: block;
		position: absolute;
		top: 0;
		/* top: 24upx; */
		right: 14upx;
		/* z-index: 1001; */
		height: 30upx;
		line-height: 30upx;
		padding: 0 12upx;
		font-size: 23upx;
		color: #FFFFFF;
		background: #EF593C;
		border-radius: 117upx;
	}

	.rectangle3center {
		padding: 10% 30%;
	}

	.rectangle3img {
		width: 120upx;
		height: 120upx;
	}

	.rectangle3code {
		width: 152upx;
		height: 19upx;

		font-size: 35upx;
		font-weight: normal;
		font-stretch: normal;
		/* letter-spacing: -1px; */
		color: #7c8895;
	}

	.rectangle3 {
		/* position: absolute;*/
		/* margin-top: 20upx; */
		/* margin-left: 2.5%; */
		width: 33.333%;
		height: 220upx;
		/* border: 0.5px solid #c0cdda; */
		background: #ffffff;
		box-shadow: 0px 1px 3px 0px #c0cdda;
		float: left;
	}

	.combinedShape {
		margin-left: 3%;
		margin-top: 20upx;
		margin-bottom: 20upx;
		width: 45.5%;
		height: 120upx;
		background: url(http://op.yoyound.com/static/images/ic.png) no-repeat center;
		background-size: 100% 100%;
		box-shadow: 0px 1px 3px 0px #c0cdda;
		float: left;
		border-radius: 5px;
	}

	.combinedShape-coupon-right {
		width: 60%;
		float: left;
		position: relative;
		left: 50px;
		top: -50px;
		z-index: 1000;
	}

	.combinedShape-coupon-right-top {
		font-size: 12px;
		text-align: center;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: -1px;
		color: #764500;
	}

	.combinedShape-coupon-right-bottom {
		margin-top: -10px;
		font-size: 30px;
		text-align: center;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: -1px;
		color: #ffffff;
	}

	.combinedShape-coupon {
		width: 14px;
		height: 48px;
		padding-left: 15px;
		padding-top: 7px;
		text-align: center;
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 16px;
		letter-spacing: -1px;
		color: #764500;
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
