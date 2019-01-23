<template>

	<view id="myOrderInfo">

		<view class="confirmOrder-address">
			<view class="address-bg"></view>
			<view class="address-cent">
				<view class="address-centh6">
					<view class="address-name">{{newsitems.consignee||''}} {{newsitems.phone||''}}</view>
				</view>
				<view class="address-centp">{{newsitems.provinceName}}{{newsitems.cityName}}{{newsitems.areaName}}{{newsitems.address}}</view>

			</view>
		</view>
		<view class="confirmOrder-cent">
			<view class="confirmOrder-centList">
				<view class="centList-title"> {{newsitems.orderNumber}} 
					<view class="titleState state">{{states[""+newsitems.state]}}</view>
				</view>
				<view class="confirmOrder-listCent">


					<div class="centList-cent clearfix" v-for="(sub,index3) in newsitems.subList" :key="index3">
						<image :src="sub.logo" class="centList-centImg" />

						<div class="centList-centRight">
							<h6 class="clearfix">{{sub.name}}<span class="centRight-h6"><span>×</span>{{sub.number}}</span></h6>
							<p>{{sub.spec1}} &nbsp; {{sub.spec2}}</p>
							<div class="happyi-mon"><span>¥</span>{{sub.price}}</div>
						</div>
					</div>



				</view>
			</view>
			<div class="myOrderInfo-info">
				<div class="myOrderInfo-infoTop">
					<p><strong>订单编号:</strong>{{newsitems.orderNumber}}</p>
					<p><strong>下单时间:</strong>{{newsitems.orderTime}}</p>
				</div>
				<div class="myOrderInfo-infoCent">
					<p><strong>支付方式:</strong>{{payTypes[""+newsitems.payType]}}</p>
					<p><strong>商品合计:</strong><span>¥{{newsitems.goodsPrice}}</span></p>
					<p><strong>运费:</strong><span>¥{{newsitems.freight}}</span></p>
					<p><strong>优惠合计:</strong><span>¥{{newsitems.favorablePrice}}</span></p>
				</div>
				<div class="myOrderInfo-total"><strong>应付合计:</strong> <span>¥{{newsitems.totalPrice}}</span></div>
			</div>
		</view>
		<div class="confirmOrder-footer">应付: <span class="money">¥{{newsitems.totalPrice}}</span>

			<strong class="footer-btn1" style="background-color: #e05e55;color: #ffffff;" v-if="newsitems.state==10" @tap="goPay()">支付订单</strong>
			<strong class="footer-btn1" v-if="newsitems.state==10" @tap="cancel()">取消订单</strong>
			<strong class="footer-btn1" v-if="newsitems.state==30" @tap="goOrderOk()">确认收货</strong>
			 <strong class="footer-btn1" v-if="newsitems.state==40"  @tap="goDelete()" >删除订单</strong>
			 <strong class="footer-btn1" v-if="newsitems.state==30" @tap="goLogistics()">查看物流</strong>
		</div>

	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				newsitems: {},
				states: {
					"10": "待支付",
					"20": "待收货",
					"30": "已发货",
					"50": "已完成",
					"40": "已取消"
				},
				payTypes: {
					"1": "微信",
					"2": "支付宝"
				},
				orderNumber: ""

			}
		},
		onUnload() {

			this.newsitems = {}

		},
		onShow() {
			this.orderDetail();

		},
		onLoad(d) {
			this.orderNumber = d.orderNumber;
			//this.orderDetail();
		},
		methods: {
			goPay: function() {
				let _this = this;
				uni.request({
					url: service.orderPay(),
					data: {
						tokenId: service.getUser().tokenId,
						ordersId: this.orderNumber,
						type: 1
					},
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: data.data.data.timeStamp+"",
								nonceStr: data.data.data.nonceStr,
								package: data.data.data.package,
								signType: 'MD5',
								paySign: data.data.data.sign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									_this.newsitems.state = 20;
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));

								}
							});

							/* uni.navigateTo({
								url:"../order/order"
							}) */
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


			},
			orderDetail: function() {
				let _this = this;
				uni.request({
					url: service.orderDetail(),
					data: {
						tokenId: service.getUser().tokenId,
						orderNumber: this.orderNumber
					},
					success: (data) => {
						console.log(JSON.stringify(data.data.data))
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.newsitems = data.data.data;
						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			},
			goLogistics: function() {
				uni.navigateTo({
					url: "../order/logistics?expressName="+this.newsitems.expressName+"&invoiceNo="+this.newsitems.invoiceNo
				})
			},
			goDelete:function(){
					let _this=this;
				uni.showModal({
					content: '是否删除本订单？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: service.orderDelete(),
								data: {
									tokenId: service.getUser().tokenId,
									ordersId:_this.orderNumber 
								},
								success: (data) => { 
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										  
										  uni.showToast({
										  	title: '操作成功',
										  	success() {
										  		uni.navigateBack({
										  				delta: 1
										  		});
										  	}
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
			goOrderOk: function() {
				let _this = this;
				uni.showModal({
					content: '确认收到货？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: service.orderOk(),
								data: {
									tokenId: service.getUser().tokenId,
									ordersId: _this.orderNumber
								},
								success: (data) => {
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										_this.newsitems.state = 50;
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
			cancel: function() {
				let _this = this;
				uni.showModal({
					content: '确认要取消订单？',
					success: (res) => {
						if (res.confirm) {

							uni.request({
								url: service.cancelOrder(),
								data: {
									tokenId: service.getUser().tokenId,
									orderNumber: this.orderNumber
								},
								success: (data) => {
									console.log(JSON.stringify(data.data.data))
									if (data.statusCode == 200 && data.data.code == 0) {
										_this.newsitems.state = 40;
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
			}
		}

	}
</script>

<style>
	/* 	#myOrderInfo { 
  padding: 0.89rem 0 114upx;
} */
	.confirmOrder-address {
		height: 187upx;
		width: 100%;
	}

	.address-bg {
		width: 100%;
		height: 0.117upx;
		background: url(http://op.yoyound.com/static/images/address-icon.png) no-repeat left top;
		background-size: 100% 0.117upx;
	}

	.address-cent {
		position: relative;
		padding: 35upx 0 0 35upx;
		height: 140upx;
		background-color: #fffde5;
	}

	.address-centh6 {
		margin-bottom: 0.117upx;
		font-size: 35upx;
		font-weight: inherit;
		color: #333;
	}

	.address-cent .default-icon {
		margin-right: 29upx;
		width: 81upx;
		height: 37upx;
		background-color: #d45048;
		border-radius: 5upx;
		color: #ffffff;
		font-size:  22upx;
	}

	.address-cent .address-name {
		margin-right: 29upx;
	}

	.address-centp {
		font-size: 26upx;;
		color: #999;
	}

	  
	.confirmOrder-describe {
		position: relative;
		padding: 35upx;
		margin-top: 24upx;
		background: #fff;
	}

	.confirmOrder-describe h6 {
		margin-bottom: 0.117upx;
		font-size: 35upx;
		font-weight: inherit;
		color: #333;
	}

	.confirmOrder-describe p {
		font-size: 26upx;;
		color: #999;
	}
 
	.confirmOrder-centList {
		margin-top: 5upx;
		background: #fff;
	}

	.confirmOrder-listCent {
		padding-left: 35upx;
	}

	.confirmOrder-listCent .centList-cent:first-child {
		border-bottom: none;
	}

	.centList-title {
		padding-right: 35upx;
		margin-left: 35upx;
		height: 94upx;
		line-height: 94upx;
		font-size: 26upx;;
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
		padding: 24upx 35upx 24upx 0;
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
		height: 200upx;
	}

	.centList-centRight h6 {
		margin-bottom: 6upx;;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28upx;
		color: #333333;
	}

	.centList-centRight .centRight-h6 {
		float: right;
		font-size: 26upx;
		color: #666;
	}

	.centList-centRight .centRight-h6 span {
		margin-right: 6upx; 
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

	.centList-describe {
		margin-top: 24upx;
		width: 75%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 24upx;
		color: #999;
	}

	.centList-Btn,
	.centList-Btnactive {
		display: block;
		width: 220upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		border: 1px solid transparent;
		border-radius: 9upx;
		font-size: 24upx;
		color: #666666;
	}

	.centList-Btn {
		border-color: #666;
	}

	.centList-Btnactive {
		border-color: #d45048;
		background: #d45048;
		color: #fff;
	}

	.centList-butt {
		padding-right: 35upx;
		height: 94upx;
		line-height: 94upx;
		text-align: right;
		font-size: 26upx;;
		color: #666;
	}

	.centList-butt strong {
		font-weight: inherit;
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

	.goods-total span,
	.freight-total span {
		float: right;
		height: 100%;
	}

	.goods-total {
		margin-top: 24upx;
		border-bottom: 1px solid #e2e2e2;
	}

	.goods-total span {
		color: #EF593C;
	}

	.myOrderInfo-info {
		margin-top: 24upx;
		padding-left: 35upx;
		font-size: 26upx;;
		background: #fff;
	}

	.myOrderInfo-info strong {
		display: inline-block;
		width: 187upx;
		color: #333;
	}

	.myOrderInfo-info span {
		display: inline-block;
	}

	.myOrderInfo-info .myOrderInfo-infoTop,
	.myOrderInfo-info .myOrderInfo-infoCent {
		padding: 35upx 0;
		border-bottom: 1px solid #e2e2e2;
	}

	.myOrderInfo-info .myOrderInfo-infoTop p,
	.myOrderInfo-info .myOrderInfo-infoCent p {
		margin-bottom: 18upx;
	}

	.myOrderInfo-info .myOrderInfo-infoTop p:last-child,
	.myOrderInfo-info .myOrderInfo-infoCent p:last-child {
		margin-bottom: 0;
	}

	 

	.myOrderInfo-info .myOrderInfo-total {
		height: 117upx;
		line-height: 117upx;
	}

	.myOrderInfo-info .myOrderInfo-total span {
		height: 100%;
		color: #d45048;
		background-position: left 41upx;
	}

	.myOrderInfo-butt,
	.myOrderInfo-butt1 {
		margin: 24upx 0;
		height: 117upx;
		line-height: 117upx;
		text-align: center;
		background: #fff;
		font-size: 28upx;
		color: #333;
	}
 
	.myOrderInfo-butt1 {
		position: relative;
		padding: 0 105upx;
	}

	.myOrderInfo-butt1 .butt-kefu {
		float: left;
	}

	.myOrderInfo-butt1 .butt-lxmj {
		float: right;
	}

	.myOrderInfo-butt1 strong {
		position: absolute;
		top: 35upx;
		left: 49.9%;
		display: inline-block;
		border-left: 1px solid #999;
		height: 47upx;
		vertical-align: -6upx;;
	}

	.confirmOrder-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		padding: 0 4%;
		width: 92%;
		height: 114upx;
		line-height: 114upx;
		border-top: 1px solid #ccc;
		background: #fff;
		color: #333333; 
		font-size: 26upx;
	}

	.confirmOrder-footer strong {
		font-weight: inherit;
	}

	.confirmOrder-footer .footer-btn {
		margin: 24upx 0 0 24upx;
		float: right;
		width: 2.16rem;
		height: 63upx;
		line-height: 63upx;
		text-align: center;
		/* color: #ffffff;
		background-color: #d45048; 
		border: 1px solid #d45048; */
		border-radius: 9upx;
	}

	.confirmOrder-footer .footer-btn2 {
		background-color: #e2e2e2;
		border: 1px solid #e2e2e2;
	}

	.confirmOrder-footer .footer-btn1 {
		margin: 24upx 0 0 24upx;
		float: right;
		display: block;
		width: 205upx;
		height: 63upx;
		line-height: 63upx;
		text-align: center;
		border-radius: 9upx;
		border: 1px solid #cccccc;
	}

	.confirmOrder-footer .money {
		display: inline-block;
		color: #EF593C;
	}

 
 
</style>
