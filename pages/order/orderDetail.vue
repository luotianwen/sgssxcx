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

			<strong class="footer-btn1" v-if="newsitems.state==10" @tap="goPay()">支付订单</strong>
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
								timeStamp: data.data.data.timeStamp,
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
  padding: 0.89rem 0 0.98rem;
} */
	.confirmOrder-address {
		height: 1.6rem;
		width: 100%;
	}

	.address-bg {
		width: 100%;
		height: 0.1rem;
		background: url(http://127.0.0.1:8082/static/images/address-icon.png) no-repeat left top;
		background-size: 100% 0.1rem;
	}

	.address-cent {
		position: relative;
		padding: 0.3rem 0 0 0.3rem;
		height: 1.2rem;
		background-color: #fffde5;
	}

	.address-centh6 {
		margin-bottom: 0.1rem;
		font-size: 0.3rem;
		font-weight: inherit;
		color: #333;
	}

	.address-cent .default-icon {
		margin-right: 0.25rem;
		width: 0.7rem;
		height: 0.32rem;
		background-color: #d45048;
		border-radius: 0.04rem;
		color: #ffffff;
		font-size: 0.22rem;
	}

	.address-cent .address-name {
		margin-right: 0.25rem;
	}

	.address-centp {
		font-size: 0.26rem;
		color: #999;
	}

	  
	.confirmOrder-describe {
		position: relative;
		padding: 0.3rem;
		margin-top: 0.2rem;
		background: #fff;
	}

	.confirmOrder-describe h6 {
		margin-bottom: 0.1rem;
		font-size: 0.3rem;
		font-weight: inherit;
		color: #333;
	}

	.confirmOrder-describe p {
		font-size: 0.26rem;
		color: #999;
	}
 
	.confirmOrder-centList {
		margin-top: 0.2rem;
		background: #fff;
	}

	.confirmOrder-listCent {
		padding-left: 0.3rem;
	}

	.confirmOrder-listCent .centList-cent:first-child {
		border-bottom: none;
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
		padding: 0.2rem 0.3rem 0.2rem 0;
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

	.centList-describe {
		margin-top: 0.2rem;
		width: 75%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.2rem;
		color: #999;
	}

	.centList-Btn,
	.centList-Btnactive {
		display: block;
		width: 1.88rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		border: 1px solid transparent;
		border-radius: 0.08rem;
		font-size: 0.24rem;
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
		padding-right: 0.3rem;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: right;
		font-size: 0.26rem;
		color: #666;
	}

	.centList-butt strong {
		font-weight: inherit;
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

	.goods-total span,
	.freight-total span {
		float: right;
		height: 100%;
	}

	.goods-total {
		margin-top: 0.2rem;
		border-bottom: 1px solid #e2e2e2;
	}

	.goods-total span {
		color: #EF593C;
	}

	.myOrderInfo-info {
		margin-top: 0.2rem;
		padding-left: 0.3rem;
		font-size: 0.26rem;
		background: #fff;
	}

	.myOrderInfo-info strong {
		display: inline-block;
		width: 1.6rem;
		color: #333;
	}

	.myOrderInfo-info span {
		display: inline-block;
	}

	.myOrderInfo-info .myOrderInfo-infoTop,
	.myOrderInfo-info .myOrderInfo-infoCent {
		padding: 0.3rem 0;
		border-bottom: 1px solid #e2e2e2;
	}

	.myOrderInfo-info .myOrderInfo-infoTop p,
	.myOrderInfo-info .myOrderInfo-infoCent p {
		margin-bottom: 0.15rem;
	}

	.myOrderInfo-info .myOrderInfo-infoTop p:last-child,
	.myOrderInfo-info .myOrderInfo-infoCent p:last-child {
		margin-bottom: 0;
	}

	 

	.myOrderInfo-info .myOrderInfo-total {
		height: 1rem;
		line-height: 1rem;
	}

	.myOrderInfo-info .myOrderInfo-total span {
		height: 100%;
		color: #d45048;
		background-position: left 0.35rem;
	}

	.myOrderInfo-butt,
	.myOrderInfo-butt1 {
		margin: 0.2rem 0;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		background: #fff;
		font-size: 0.28rem;
		color: #333;
	}
 
	.myOrderInfo-butt1 {
		position: relative;
		padding: 0 0.9rem;
	}

	.myOrderInfo-butt1 .butt-kefu {
		float: left;
	}

	.myOrderInfo-butt1 .butt-lxmj {
		float: right;
	}

	.myOrderInfo-butt1 strong {
		position: absolute;
		top: 0.3rem;
		left: 49.9%;
		display: inline-block;
		border-left: 1px solid #999;
		height: 0.4rem;
		vertical-align: -0.05rem;
	}

	.confirmOrder-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		padding: 0 4%;
		width: 92%;
		height: 0.98rem;
		line-height: 0.98rem;
		border-top: 1px solid #ccc;
		background: #fff;
		color: #333333;
		font-size: 0.26rem;
	}

	.confirmOrder-footer strong {
		font-weight: inherit;
	}

	.confirmOrder-footer .footer-btn {
		margin: 0.2rem 0 0 0.2rem;
		float: right;
		width: 2.16rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		/* color: #ffffff;
		background-color: #d45048; 
		border: 1px solid #d45048; */
		border-radius: 0.08rem;
	}

	.confirmOrder-footer .footer-btn2 {
		background-color: #e2e2e2;
		border: 1px solid #e2e2e2;
	}

	.confirmOrder-footer .footer-btn1 {
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

	.confirmOrder-footer .money {
		display: inline-block;
		color: #EF593C;
	}

 
 
</style>
