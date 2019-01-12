<template>
	<view class="index">
		<scroll-view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @tap="tapTab">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					 
						<div class="confirmOrder-centList" v-for="(newsitem,index2) in tab.data" :key="index2" >
							<div @tap="goDetail(newsitem)" class="centList-title"><span class="headName">{{newsitem.orderNumber}}</span><span class="titleState">{{states[""+newsitem.state]}}</span></div>
							<div @tap="goDetail(newsitem)" class="confirmOrder-listCent">
								<div class="centList-cent clearfix" v-for="(sub,index3) in newsitem.subList" :key="index3">
									<image :src="sub.logo"  class="centList-centImg" />
									 
									<div class="centList-centRight">
										<h6 class="clearfix">{{sub.name}}<span class="centRight-h6"><span>×</span>{{sub.number}}</span></h6>
										<p>{{sub.spec1}} &nbsp; {{sub.spec2}}</p>
										<div class="happyi-mon"><span>¥</span>{{sub.price}}</div>
									</div>
								</div>
								 
							</div>
							<div class="centList-butt" v-if="newsitem.state!=20">
								<!-- 10待付款20已付款30已发货40已取消50已完成 -->
								<div class="buttState6 clearfix">
									  <span class="buttState-btn" style="background-color: #e05e55;color: #ffffff;" v-if="newsitem.state==10"  @tap="goPay(newsitem)">支付订单</span>
									  <span class="buttState-btn" style="border: solid 1px #e05e55;color: #e05e55;" v-if="newsitem.state==50&&newsitem.salesId==null" @tap="goApplyAfter(newsitem)" >申请售后</span>
									  <span class="buttState-btn" v-if="newsitem.state==30" @tap="goOrderOk(newsitem)">确认收货</span>
									  <span class="buttState-btn" v-if="newsitem.state==30" @tap="goLogistics(newsitem)">查看物流</span>
									  <span class="buttState-btn" v-if="newsitem.state==40"  @tap="goDelete(newsitem,index1,index2)" >删除订单</span>
								</div>
							</div>
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
					"10": "待支付",
					"20": "待收货",
					"30": "已发货",
					"50": "已完成",
					"40": "已取消"
				},
				type: '',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				tabBars: [{
					name: '全部',
					id: 'qb'
				}, {
					name: '待支付',
					id: 'dzf'
				}, {
					name: '待收货',
					id: 'dsh'
				}, {
					name: '已完成',
					id: 'ywc'
				}, {
					name: '已取消',
					id: 'yqx'
				}]
			}
		},
		onUnload() {

			this.newsitems = []

		},
        onShow() {
        	if (service.getUser().hasLogin) {
        		this.getOrderList(0);
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
			goOrderOk:function(order){
				let _this=this;
				uni.showModal({
					content: '确认收到货？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: service.orderOk(),
								data: {
									tokenId: service.getUser().tokenId,
									ordersId:order.orderNumber 
								},
								success: (data) => { 
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										 order.state=50;
										 uni.showToast({
										 	title:'操作成功' 
										 })
									}
									else{
										uni.showToast({
											title:data.data.msg 
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
			goDelete:function(order,index1,index2){
					let _this=this;
				uni.showModal({
					content: '是否删除本订单？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: service.orderDelete(),
								data: {
									tokenId: service.getUser().tokenId,
									ordersId:order.orderNumber 
								},
								success: (data) => { 
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										  _this.newsitems[index1].data.splice(index2,1);
										   uni.showToast({
										  	title:'操作成功' 
										  })
									}
									else{
										uni.showToast({
											title:data.data.msg 
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
			goPay:function(order){
				let _this=this;
				uni.request({
					url: service.orderPay(),
					data: {
						tokenId: service.getUser().tokenId,
						ordersId:order.orderNumber,
						type:1
					},
					success: (data) => { 
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.requestPayment({ 
								provider: 'wxpay', 
								timeStamp: data.data.data.timeStamp,
								nonceStr: data.data.data.nonceStr,
								package: data.data.data.package,
								signType: 'MD5',
								paySign: data.data.data.sign,
								success: function (res) {
									
									console.log('success:' + JSON.stringify(res));
									order.state=20;
								},
								fail: function (err) {
									console.log('fail:' + JSON.stringify(err));
									 
								}
							});
							
							/* uni.navigateTo({
								url:"../order/order"
							}) */
						}
						else{
							uni.showToast({
								title:data.data.msg 
							})
						}
						
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
				
				
			},
			getOrderList: function(e) {
				if (!service.getUser().hasLogin) {
					return;
				}
				
				let _this = this;
				uni.request({
					url: service.orderList(),
					data: {
						tokenId: service.getUser().tokenId,
						pageNumber: _this.newsitems[e].pageNumber,
						type: _this.type
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {

							if (_this.newsitems[e].pageNumber == 1) {
								_this.newsitems[e].data = data.data.data.list;
							} else {
								_this.newsitems[e].data = _this.newsitems[e].data.length == 0 ? data.data.data.list : _this.newsitems[e].data
									.concat(data.data.data.list);
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
			goLogistics: function(order) {
				uni.navigateTo({
					url: "../order/logistics?expressName="+order.expressName+"&invoiceNo="+order.invoiceNo
				})
			},
			goDetail: function(order) {
				uni.navigateTo({
					url: "../order/orderDetail?orderNumber="+order.orderNumber
				})
			},
			goApplyAfter: function(order) {
				uni.navigateTo({
					url: "../order/applyAfter?orderNumber="+order.orderNumber
				})
			},

			 
			loadMore(e) {
				console.log('loadMore' + this.newsitems[e].loadingType);
				if (this.newsitems[e].loadingType !== 0) {
					return;
				}
				uni.showLoading({
					title:"数据加载中..."
				})
				 
					this.newsitems[e].pageNumber++;
					this.getOrderList(e);
				 	uni.hideLoading();
			},

			async changeTab(e) {
				let index = e.target.current;
				console.log("changeTab index" + index);
				//this.newsitems[index].pageNumber = 1;
				this.newsitems[index].loadingType = 0;
				if (index == 0) {
					this.type = '';
				} else if (index == 1) {
					this.type = '10';
				} else if (index == 2) {
					this.type = '20';
				} else if (index == 3) {
					this.type = '50';
				} else if (index == 4) {
					this.type = '40';
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
				this.getOrderList(index);
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
						this.type = '';
					} else if (index == 1) {
						this.type = '10';
					} else if (index == 2) {
						this.type = '20';
					} else if (index == 3) {
						this.type = '50';
					} else if (index == 4) {
						this.type = '40';
					}
					this.getOrderList(index);
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
		width: 150upx;
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

	 

	.confirmOrder-cent {
		margin-top: 80upx;
	}

	.confirmOrder-centList {
		margin-top: 0.2rem;
		background: #fff;
	}

	.centList-title {
		padding-right: 0.3rem;
		margin-left: 0.3rem;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	.centList-title .titleState {
		float: right;
	}

	.centList-title .state {
		color: #d45048;
	}

	.centList-cent {
		position: relative;
		padding: 0.2rem 0.3rem;
		border-bottom: 1px solid #e2e2e2;
	}

	.centList-centImg {
		position: relative;
		float: left;
		width: 1.6rem;
		height: 1.6rem;
		background-size: 100% 100%;
		border: solid 1px #eeeeee;
	}

	.centList-centImg span {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 0.62rem;
		height: 0.62rem;
	}

	 

	.centList-centRight {
		position: relative;
		margin-left: 1.8rem;
		height: 1.6rem;
	}

	.centList-centRight h6 {
		margin-bottom: 0.05rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.28rem;
		color: #333333;
	}

	.centList-centRight .centRight-h6 {
		float: right;
		font-size: 0.26rem;
		color: #666;
	}

	.centList-centRight .centRight-h6 span {
		margin-right: 0.05rem;
		vertical-align: -0.01rem;
	}

	.centList-centRight p {
		font-size: 0.24rem;
	}

	.centList-centRight .happyi-mon {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 0.26rem;
		color: #EF593C;
	}

	.centList-butt {
		padding: 0 0.3rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.26rem;
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
		margin: 0.2rem 0 0 0.2rem;
		float: right;
		display: block;
		width: 1.75rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		border-radius: 0.08rem;
		border: 1px solid #cccccc;
	}

	.buttState1 .integral .happyi-mon {
		margin-left: 0.1rem;
	}

	.buttState1 .btn {
		float: right;
		margin-top: 0.2rem;
		width: 2.16rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		color: #ffffff;
		background-color: #d45048;
		border: 1px solid #d45048;
		border-radius: 0.08rem;
	}

	.buttState1 .btn strong {
		margin-left: 0.05rem;
	}

	.buttState1 .btn1 {
		background-color: #ccc;
		border: 1px solid #ccc;
	}

	.goods-total,
	.freight-total {
		padding: 0 0.3rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #333;
		background: #fff;
	}


	.goods-total {
		margin-top: 0.2rem;
		border-bottom: 1px solid #e2e2e2;
	}

	.goods-total span {
		color: #f44834;
	}

	#refundAfterSale {
		padding-top: 0.89rem;
		overflow: hidden;
	}
</style>
