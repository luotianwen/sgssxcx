<template>

	<view id="refundAfterSale">

		<div class="confirmOrder-cent">


			<view class="confirmOrder-centList" v-for="(newsitems,index2) in afterOrders" :key="index2">
				<view class="centList-title" @tap="goDetail(newsitems)"> {{newsitems.orderNumber}}
					<view class="titleState state">{{states[""+newsitems.state]}}</view>
				</view>
				<view class="confirmOrder-listCent" @tap="goDetail(newsitems)">


					<div class="centList-cent clearfix" v-for="(sub,index3) in newsitems.subList" :key="index3">
						<image :src="sub.logo" class="centList-centImg" />

						<div class="centList-centRight">
							<h6 class="clearfix">{{sub.name}}<span class="centRight-h6"><span>×</span>{{sub.number}}</span></h6>
							<p>{{sub.spec1}} &nbsp; {{sub.spec2}}</p>
							<div class="happyi-mon"><span>¥</span>{{sub.price}}</div>
						</div>
					</div>
				</view>

				<div class="centList-butt">
					<div class="buttState6 clearfix">
						<span class="buttState-btn" v-if="newsitems.state==10||newsitems.state==12" @tap="goCancel(newsitems)">取消申请</span>
						<span class="buttState-btn" v-if="newsitems.state==20||newsitems.state==30" @tap="returnExpress(newsitems)">更改发货单</span>
					</div>
				</div>
			</view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>

		</div>

	</view>
</template>

<script>
	import service from '../../service.js';
	import loadMore from '../../components/load-more.vue'
	export default {
		components: {
			loadMore
		},
		data() {
			return {

				states: {
					"10": "申请退货",
					"12": "申请换货",
					"20": "同意退货",
					"30": "同意换货",
					"50": "拒绝换货",
					"60": "售后完成",
					"40": "拒绝退货"
				},
				loadingType: 0,
				pageNumber: 1,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				afterOrders: []
			}
		},
		onShow() {
			this.pageNumber=1;
			this.loadingType=0;
			
			this.afterOrderList();
			
		},
		onLoad() {
			//this.afterOrderList();
		},
		onReachBottom() {

			if (this.loadingType !== 0) {
				return;
			}
			console.log('onReachBottom');
			this.loadingType = 1;
			setTimeout(() => {
				this.pageNumber++;
				this.afterOrderList();
			}, 300);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.afterOrders = [];
			setTimeout(() => {
				this.pageNumber = 1;
				this.afterOrderList();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			afterOrderList: function() {
				uni.request({
					url: service.afterOrderList(),
					data: {
						tokenId: service.getUser().tokenId,
						pageNumber: this.pageNumber
					},
					success: (data) => {
						console.log(JSON.stringify(data.data.data.list))
						if (data.statusCode == 200 && data.data.code == 0) {
							this.afterOrders = this.afterOrders.length == 0 ? data.data.data.list : this.afterOrders.concat(data.data.data
								.list);
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
			returnExpress: function(newsitems) {
				uni.navigateTo({
					url: "../service/deliverGoods?afterOrderId=" + newsitems.afterOrderId
				})

			},
			goCancel: function(newsitems) {

				let _this = this;
				uni.showModal({
					content: '确认要取消？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: service.cancelAfterOrder(),
								data: {
									tokenId: service.getUser().tokenId,
									afterOrderId: newsitems.afterOrderId
								},
								success: (data) => {
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										uni.showToast({
											title: '操作成功',
											duration: 3000,
											success() {
												_this.pageNumber = 1;
												_this.afterOrderList();
											}
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
			goDetail: function(newsitems) {
				uni.navigateTo({
					url: "../service/afterOrderDetail?afterOrderId=" + newsitems.afterOrderId
				})
			}
		}
	}
</script>

<style>
	.myOrder-tab {
		position: fixed;
		
		left: 0;
		width: 100%;
		z-index: 100;
		height: 96upx;
		line-height: 96upx;
		font-size: 32upx;		
		color: #7c7c7c;
		border-bottom: 1px solid #e2e2e2;
		background: #fff;
		white-space: nowrap;
		overflow: hidden;
		overflow-x: scroll;
		/* 1 */
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		-webkit-overflow-scrolling: touch;
		/* 2 */
		text-align: justify;
		/* 3 */
	}

	.myOrder-tab span {
		margin-left: 52upx;
		display: inline-block;
		height: 91upx;
		border-bottom: 5upx solid transparent;
	}

	.myOrder-tab .active {
		color: #000;
		border-bottom-color: #EF593C;
	}

	.myOrder-tab::-webkit-scrollbar {
		display: none;
	}

	.confirmOrder-centList {
		margin-top: 24upx;
		background: #fff;
	}

	.centList-title {
		padding-right: 35upx;
		margin-left: 35upx;
		height: 94upx;
		line-height: 94upx;
		font-size: 26upx;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	.centList-title .headImg {
		margin: 0 12upx0 24upx;
		display: inline-block;
		width: 42upx;
		height: 42upx;
		border-radius: 50%;
		vertical-align: middle;
		background-size: 100% 100%;
	}

	.centList-title .titleState {
		float: right;
	}

	.centList-title .state {
		color: #d45048;
	}

	.centList-cent {
		position: relative;
		padding: 24upx 35upx;
		border-bottom: 1px solid #e2e2e2;
	}

	.centList-centImg {
		position: relative;
		float: left;
		width: 187upx;
		height: 187upx;
		background-size: 100% 100%;
		border: solid 1px #eeeeee;
	}

	.centList-centImg span {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 72upx;
		height: 72upx;
	}

	.centList-centRight {
		position: relative;
		margin-left: 210upx;
		height: 187upx;
	}

	.centList-centRight h6 {
		margin-bottom: 6upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 32upx;
				color: #333333;
	}

	.centList-centRight .centRight-h6 {
		float: right;
		font-size: 26upx;
		color: #666;
	}

	.centList-centRight .centRight-h6 span {
		margin-right: 6upx;
		vertical-align: -1upx;
	}

	.centList-centRight p {
		font-size: 24upx;
	}

	.centList-centRight .happyi-mon {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 26upx;
		color: #EF593C;
	}

	.centList-butt {
		padding: 0 35upx;
		height: 117upx;
		line-height: 117upx;
		font-size: 26upx;
		color: #666;
	}

	.centList-butt strong {
		font-weight: inherit;
	}

	.centList-butt .happyi-mon {
		display: inline-block;
		height: 100%;
		color: #EF593C;
	}

	.centList-butt .buttState-btn {
		margin: 24upx 0 0 24upx;
		float: right;
		display: block;
		width: 204upx;
		height: 63upx;
		line-height: 63upx;
		text-align: center;
		border-radius: 9upx;
		border: 1px solid #cccccc;
	}

	.buttState1 .integral .happyi-mon {
		margin-left: 12upx;
	}

	.buttState1 .btn {
		float: right;
		margin-top: 24upx;
		width: 252upx;
		height: 63upx;
		line-height: 63upx;
		text-align: center;
		color: #ffffff;
		background-color: #d45048;
		border: 1px solid #d45048;
		border-radius: 9upx;
	}

	.buttState1 .btn strong {
		margin-left: 6upx;
	}

	.buttState1 .btn1 {
		background-color: #ccc;
		border: 1px solid #ccc;
	}

	.goods-total,
	.freight-total {
		padding: 0 35upx;
		height: 117upx;
		line-height: 117upx;
		font-size: 35upx;
		color: #333;
		background: #fff;
	}

	.goods-total {
		margin-top: 24upx;
		border-bottom: 1px solid #e2e2e2;
	}

	.goods-total span {
		color: #f44834;
	}

	#refundAfterSale {
		 
	}
</style>
