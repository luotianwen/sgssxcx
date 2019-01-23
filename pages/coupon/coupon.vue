<template>
	<view id="myCoupon" class="">

		<scroll-view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @tap="tapTab" :style="{width: halfWidth}">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">



					<div class="coupon-list"  v-for="(newsitem,index2) in tab.data" :key="index2">
					 <strong :class="newsitem.state==1? 'coupon-icon' :newsitem.state==2? 'coupon-icon2' : 'coupon-icon1'"></strong>
						<!-- <strong class="coupon-txt">{{newsitem.name}}</strong> -->
						<image class="slide-img" src="http://op.yoyound.com/static/images/timg.jpg"></image>
						 
						<h6>满{{newsitem.full}}减{{newsitem.reduction}}</h6>
					<!-- 	<p>有效期{{newsitem.beginDate}}至{{newsitem.endDate}}</p> -->
					<div class="list-butt">有效期{{newsitem.beginDate}}至{{newsitem.endDate}}<span class="list-btn" v-if="newsitem.state==1" @tap="goCategory">立即使用</span>
					<span class="list-btn" v-if="newsitem.state==3" @tap="goDelete(newsitem,index1,index2)">立即删除</span></div>
					</div>
					<load-more :loadingType="tab.loadingType" :contentText="tab.contentText"></load-more>
				</scroll-view>
			</swiper-item>

		</swiper>



	</view>
</template>
<script>
	import service from '../../service.js';
	import loadMore from '../../components/load-more.vue'
	export default {
		computed: {
			halfWidth() {
				return uni.upx2px(750 / 3) + 'px';
			}
		},
		components: {
			loadMore
		},
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [],
				states: {
					"1": "未使用",
					"2": "已使用",
					"3": "已过期"
				},
				type: '1',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				tabBars: [{
					name: '未使用',
					id: 'wsy'
				}, {
					name: '已使用',
					id: 'ysy'
				}, {
					name: '已过期',
					id: 'ygq'
				}]
			}
		},
		onUnload() {

			this.newsitems = []

		},
		onShow() {
			if (service.getUser().hasLogin) {
				this.getCouponList(0);
			}

		},
		onLoad() {
			let ary = [];
			for (let i = 0, length = this.tabBars.length; i < length; i++) {
				let aryItem = {
					pageNumber: 1,
					loadingType: 0,
					contentText: this.contentText,
					data: []
				};

				ary.push(aryItem);
			}
			console.log(JSON.stringify(ary));
			this.newsitems = ary;


		},
		methods: {

			goDelete: function(order, index1, index2) {
				let _this = this;
				uni.showModal({
					content: '是否删除优惠券？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: service.removeCoupon(),
								data: {
									tokenId: service.getUser().tokenId,
									couponId: order.couponId
								},
								success: (data) => {
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										_this.newsitems[index1].data.splice(index2, 1);
										uni.showToast({
											title: '操作成功'
										})
									} else {
										uni.showToast({
											title: data.data.msg
										})
									}

								},
								fail: (data, code) => {
									console.log('fail' + JSON.stringify(data));
									uni.hideLoading();
								}
							})
						}
					}
				})




			},

			getCouponList: function(e) {
				if (!service.getUser().hasLogin) {
					return;
				}

				let _this = this;
				uni.request({
					url: service.getCouponList(),
					data: {
						tokenId: service.getUser().tokenId,
						pageNumber: _this.newsitems[e].pageNumber,
						type: _this.type
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							let _datas=data.data.data.list;
								_datas.forEach(function(_data) {
								 _data.beginDate=_data.beginDate.substring(0,10);
								_data.endDate=_data.endDate.substring(0,10);
							}, this)
							if (_this.newsitems[e].pageNumber == 1) {
								_this.newsitems[e].data = _datas;
							} else {
								_this.newsitems[e].data = _this.newsitems[e].data.length == 0 ? _datas : _this.newsitems[e].data
									.concat(_datas);
							}
							if (data.data.data.lastPage) {
								_this.newsitems[e].loadingType = 2;
								return;
							} else {
								_this.newsitems[e].loadingType = 0;
							}
							//console.log(JSON.stringify(_this.newsitems));
							//console.log('this.loadingType' + this.loadingType);
						}
						uni.hideLoading();
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			},
			goCategory: function() {
				uni.switchTab({
					url: "../category/allCategory"
				})
			},




			loadMore(e) {
				console.log('loadMore' + this.newsitems[e].loadingType);
				if (this.newsitems[e].loadingType !== 0) {
					return;
				}
				uni.showLoading({
					title: "数据加载中..."
				})

				this.newsitems[e].pageNumber++;
				this.getCouponList(e);
				uni.hideLoading();
			},

			async changeTab(e) {
				let index = e.target.current;
				console.log("changeTab index" + index);
				//this.newsitems[index].pageNumber = 1;
				this.newsitems[index].loadingType = 0;
				if (index == 0) {
					this.type = '1';
				} else if (index == 1) {
					this.type = '2';
				} else if (index == 2) {
					this.type = '3';
				}
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
				this.getCouponList(index);
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async tapTab(e) { //点击tab-bar

				let index = e.target.dataset.current;
				console.log(this.tabIndex + "tapTab index" + index);
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current
					//this.newsitems[index].pageNumber = 1;
					this.newsitems[index].loadingType = 0;
					if (index == 0) {
						this.type = '1';
					} else if (index == 1) {
						this.type = '2';
					} else if (index == 2) {
						this.type = '3';
					}
					this.getCouponList(index);
				}
			}

		}
	}
</script>

<style>
	page {
		display: flex;
	}

	.index {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.list {
		width: 750upx;
		height: 100%;
	}

	.swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 100upx;
		height: 100upx;
		border-bottom: 1px solid #c8c7cc;
	}


	.swiper-tab-list {
		font-size: 30upx;

		display: inline-block;
		text-align: center;
		color: #555;
	}

	.active {
		color: #007AFF;
	}

	.swiper-box {
		flex: 1;
		width: 100%;
		height: calc(100% - 100upx);
	}

	.loadmore {
		height: 70upx;
		width: 750upx;
		flex-direction: column;
		justify-content: center;
	}

	.loadmore-text {
		font-size: 30upx;
		text-align: center;
		color: #999999;
	}


	.myPost-tab {
		position: fixed;
		/* top: 0.89rem; */
		left: 0;
		width: 100%;
		z-index: 100;
		height: 96upx;
		line-height: 96upx;
		font-size: 32upx;
			color: #333;
		background: #fff;
	}

	.myPost-tab>span {
		float: left;
		width: 33%;
		height: 91upx;
		text-align: center;
		border-bottom: 5upx solid transparent;
	}

	.myPost-tab>span span {
		opacity: 0;
	}

	.myPost-tab .active {
		color: #EF593C;
	}

	.myPost-tab .active span {
		opacity: 1;
	}

	#myCoupon {
		padding: 0 0 117upx;
	}

	.myCoupon {
		padding: 80upx 35upx 0;
	}

	.coupon-list {
		position: relative;
		margin-top: 21upx;
		padding-top: 41upx;
		height: 304upx;
		background: url("http://op.yoyound.com/static/images/coupon.png") no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .slide-img,
	.coupon-list .coupon-icon,
	.coupon-list .coupon-icon1,
	.coupon-list .coupon-icon2 {
		position: absolute;
		display: block;
	}

	.coupon-list .coupon-icon,
	.coupon-list .coupon-icon1,
	.coupon-list .coupon-icon2 {
		top: 22upx;
		right: 22upx;
		z-index: 10;
		width: 187upx;
		height: 163upx;
	}

	.coupon-list .coupon-icon {
		background: url("http://op.yoyound.com/static/images/coupon-wgq.png") no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .coupon-icon1 {
		background: url("http://op.yoyound.com/static/images/coupon-ygq.png") no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .coupon-icon2 {
		background: url("http://op.yoyound.com/static/images/coupon-yjy.png") no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .slide-img {
		top: 39upx;
		left: 39upx;
		width: 163upx;
		height: 163upx;
		background: #eee;
		background-size: 100% 100%;
	}

	.coupon-list h6,
	.coupon-list .purchase-icon2,
	.coupon-list p {
		position: relative;
		z-index: 11;
		padding: 0 24upx 0 238upx;
	}

	.coupon-list h6 {
		margin-top: 5upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 35upx;
		color: #333333;
	}

	.coupon-list .purchase-icon2 {
		margin: 14upx 0 9upx;
		display: block;
		width: 89upx;
		height: 37upx;
		background-size: 89upx 37upx;
	}

	.coupon-list p {
		font-size: 24upx;
		color: #666;
	}

	.coupon-list .list-butt {
		position: absolute;
		left: 0;
		bottom: 12upx;
		padding: 0 4.5%;
		width: 91%;
		height: 96upx;
		line-height: 96upx;
		font-size: 26upx;
		color: #666;
	}

	.coupon-list .list-buttMoney {
		margin-left: 6upx;
		padding-left: 46upx;
		font-size: 32upx;
				color: #EF593C;
		background-size: 35upx 35upx;
		vertical-align: -1upx;
	}

	.coupon-list .list-btn,
	.coupon-list .list-btn1 {
		margin: 18upx 0 0 24upx;
		float: right;
		width: 152upx;
		height: 58upx;
		line-height: 58upx;
		text-align: center;
		border-radius: 6upx;
		font-size: 24upx;
	}

	.coupon-list .list-btn {
		color: #CDC8B1;
		border: 1px solid #CDC8B1;
	}

	.coupon-list .list-btn1 {
		color: #666666;
		border: 1px solid #CCCCCC;
	}

	.coupon-list .coupon-lableIcon,
	.coupon-list .coupon-txt {
		position: absolute;
		left: 5upx;
		display: block;
		width: 127upx;
		height: 127upx;
	}

	 

	.coupon-list .coupon-txt {
		top: 7upx;
		z-index: 100;
		text-align: center;
		font-size: 32upx;
		color: #fff;
		transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		/* IE 9 */
		-moz-transform: rotate(-45deg);
		/* Firefox */
		-webkit-transform: rotate(-45deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(-45deg);
		/* Opera */
	}

	.newList {
		font-size: 0;
	}

	.newList .slide-img {
		background-size: 100% 100%;
	}

	.coupon-lable {
		margin: 12upx 0 112upx 5upx;
		display: inline-block;
		padding: 0 9upx;
		height: 37upx;
		line-height: 37upx;
		text-align: center;
		font-size: 24upx;
		color: #EF593C;
		border: 1px solid #EF593C;
		border-radius: 4upx;
	}

	.myCoupon-footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 1000;
		width: 100%;
		height: 117upx;
		line-height: 117upx;
		font-size: 32upx;
		background: #fff;
	}

	.myCoupon-footer a {
		float: left;
		width: 49.8%;
		color: #EF593C;
		text-align: center;
	}

	.myCoupon-footer a:first-child {
		border-right: 1px solid #e2e2e2;
	}

	 
 
	 
 
</style>
