<template>
	<view id="confirmOrder">

		<view class="confirmOrder-address">
			<view class="address-bg"></view>
			<view class="address-cent" v-show="!show">
				<view class="address-centh6">请选择地址</view>
				<view class="address-left"></view>
			</view>
			<view class="address-cent" v-show="show" v-if=data.address>
				<view class="address-centh6">
					<view class="address-name">{{data.address.consignee||''}} {{data.address.phone||''}}</view>
				</view>
				<view class="address-centp">{{data.address.provinceName}}{{data.address.cityName}}{{data.address.areaName}}{{data.address.address}}</view>
				<view class="address-left"></view>
			</view>
		</view>
		<view class="confirmOrder-cent">
			<view class="confirmOrder-centList">

				<view class="confirmOrder-listCent" v-for="(item, index) in data.carts" :key="index" v-if=data.carts>
					<view class="centList-cent clearfix">
						<view class="centList-centCent">
							<image class="centList-centImg" :src="item.logo"></image>
							<view class="centList-centRight">
								<view class="centList-centRighth6">{{item.name}}
									<view class="centRight-h6 centRight-h6span">×{{item.number}}</view>
								</view>
								<view class="centList-centRightp">{{item.spec1}} &nbsp; {{item.spec1}}</view>
								<view class="happyi-mon">
									<view class="happyi-monspan">¥{{item.price}}</view>
								</view>
							</view>
						</view>

					</view>
				</view>

				<view class="centList-butt">
					<span class="centList-buttLeft">优惠券</span>
					<span    >可用折扣券{{data.coupons}}张</span>
					<strong class="centList-buttRight" @click="getMyCouponsByProductId(list)"></strong>
				</view>
				<view class="centList-butt">
					<span class="centList-buttLeft"> 运费 </span>
					<span  >{{data.freight}}</span>
				</view>
			</view>
		</view>
		<view class="confirmOrder-footer">
			<view class="footer-money">¥{{data.total}}</view>
			<view class="footer-money1">
				<p>总额：<span>¥{{data.product}}</span></p>
				<p>立减：<span>¥{{data.coupon}}</span></p>
			</view>
			<view class="footer-btn" @click="submitOrder()">提交订单</view>
		</view>




		<div id="voucher" class="">
			<h6 class="confirmPayment-title"><strong class="goods-totalRight"></strong> 优惠券<span></span></h6>
			<div class="voucher-cent"></div>
		</div>
		<div id="prompt-view">
			<!---->
		</div>

	</view>
</template>

<script>
	import service from '../../service.js';

	export default {

		data() {
			return {
				show: false,
				data: {
					"product": 0,
					"total": 0,
					"coupon": 0,
					"freight": 0, 
				},
				addressId:"",
				cartId:"",
				couponId:""
			}
		},

		onLoad(d) {
			this.cartId = d.cartId;
            this.getPreorder();
		},
		methods: {
			getPreorder: function() {
                let _this=this;
				uni.request({
					url: service.preorder(),
					data: {
						tokenId: service.getUser().tokenId,
						addressId:_this.addressId,
						cartId:_this.cartId,
						couponId:_this.couponId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.data = data.data.data;
							if(_this.data.address){
								_this.show=true;
								_this.addressId=_this.data.address.addressId;
							}
						}
						uni.hideLoading();
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			},
			submitOrder:function(){
				uni.showLoading({
					title: '提交中'
				});
				let _this=this; 
				uni.request({
					url: service.saveOrder(),
					data: {
						tokenId: service.getUser().tokenId,
						addressId:_this.addressId,
						cartId:_this.cartId,
						couponId:_this.couponId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.pay(data.data.data.ordersId);
							
							/* uni.navigateTo({
							 	url:"../order/order"
							 }) */ 
						}
						
					}, 
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			},
			pay:function(ordersId){
				let _this=this;
				uni.request({
					url: service.orderPay(),
					data: {
						tokenId: service.getUser().tokenId,
						ordersId:ordersId,
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
									uni.navigateTo({
										url:"../order/order"
									})
								},
								fail: function (err) {
									console.log('fail:' + JSON.stringify(err));
									uni.navigateTo({
										url:"../order/order"
									})
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
				
				
			}
		}
	}
</script>

<style>
	#confirmOrder {
		padding: 0rem 0 1.5rem;
	}

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

	.address-cent .address-left {
		position: absolute;
		top: 50%;
		right: 0.25rem;
		margin-top: -0.24rem;
		width: 0.48rem;
		height: 0.48rem;
		background: url(http://127.0.0.1:8082/static/images/left.png) no-repeat center;
		background-size: 0.48rem 0.48rem;
	}

	.confirmOrder-centList {
		margin-top: 0.2rem;
		background: #fff;
	}


	.centList-cent {
		position: relative;
	}

	.centList-cent:first-child .centList-centCent {
		border-top: none;
	}

	.centList-centCent {
		margin-left: 0.3rem;
		padding: 0.2rem 0.3rem 0.2rem 0;
		border-top: 1px solid #e2e2e2;
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

	 


	.centList-centRight {
		position: relative;
		margin-left: 1.8rem;
		height: 1.6rem;
	}

	.centList-centRighth6 {
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

	.centList-centRight .centRight-h6span {
		margin-right: 0.05rem;
		vertical-align: -0.01rem;
	}

	.centList-centRightp {
		font-size: 0.24rem;
	}

	.centList-centRight .happyi-mon {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 0.3rem;
		 
	}

	.centList-centRight .happyi-monspan {
		font-size: 0.24rem;
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

	.centList-data {
		position: absolute;
		bottom: 0.2rem;
		right: 0.3rem;
	}

	.centList-data p {
		margin-top: 0.2rem;
		text-align: center;
		font-size: 0.2rem;
		color: #333333;
	}

	.centList-data1 {
		bottom: 0.79rem;
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

	.goods-total,
	.freight-total,
	.centList-butt {
		margin-left: 0.3rem;
		padding-right: 0.3rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.24rem;
		color: #333;
		background: #fff;
	}

	.centList-butt {
		position: relative;
		border-bottom: 1px solid #e2e2e2;
	}

	 

	.centList-butt .centList-buttRight {
		position: absolute;
		top: 50%;
		right: 0.25rem;
		margin-top: -0.24rem;
		width: 0.48rem;
		height: 0.48rem;
		background: url(http://127.0.0.1:8082/static/images/left.png) no-repeat center;
		background-size: 0.48rem 0.48rem;
	}

	.centList-buttLeft {
		display: inline-block;
		width: 0.9rem;

		color: #333;
	}





	.confirmOrder-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 0.98rem;
		line-height: 0.98rem;
		border-top: 1px solid #fefefe;
		background: #fff;
		color: #333333;
		font-size: 0.28rem;
	}

	.confirmOrder-footer .footer-btn {
		float: right;
		width: 40%;
		height: 100%;
		text-align: center;
		background: #CDC8B1;
		font-size: 0.32rem;
		color: #ffffff;
	}

	.confirmOrder-footer .footer-money {
		position: absolute;
		top: 0;
		left: 0;
		width: 26%;
		text-align: center;
		border-right: 1px solid #e2e2e2;
	}

	.confirmOrder-footer .footer-money1 {
		position: absolute;
		top: 0;
		left: 25%;
		width: 30%;
		padding: 0.1rem 0 0 4%;
		line-height: 0.4rem;
	}

	.confirmOrder-footer span {
		font-size: 0.32rem;
		 
	}

	div#mask {
		display: none;
	}


	.maskShow {
		display: block !important;
	}



	#voucher {
		display: none;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2000;
		width: 100%;

		height: 8rem;
		background: #F5F5F5;
	}

	#voucher .confirmPayment-title {
		background: #fff;
	}

	#voucher .goods-totalRight {
		left: 0.3rem;
	}

	.voucher-cent {
		padding: 0.12rem 0.3rem 0.3rem;
	}

	.coupon-list {
		position: relative;
		margin-top: 0.18rem;
		padding-top: 0.5rem;
		height: 1.9rem;
		background: url(http://127.0.0.1:8082/static/images/purchase-bg.png) no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .slide-img {
		position: absolute;
		display: block;
		top: 0.5rem;
		left: 0.34rem;
		width: 1.4rem;
		height: 1.4rem;
		background: #eee;
		background-size: 100% 100%;
	}

	.coupon-list h6,
	.coupon-list .purchase-icon2,
	.coupon-list p {
		position: relative;
		z-index: 11;
		padding: 0 0.2rem 0 2.14rem;
	}

	.coupon-list h6 {
		margin-top: 0.04rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.3rem;
		color: #333333;
	}



	.coupon-list p {
		font-size: 0.24rem;
		color: #666;
	}

	.coupon-list .list-butt {
		position: absolute;
		left: 0;
		bottom: 0.1rem;
		padding: 0 4.5%;
		width: 91%;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #666;
	}

	.coupon-list .list-buttMoney {
		margin-left: 0.05rem;
		padding-left: 0.4rem;
		font-size: 0.28rem;
		 
		/* background: url(https://cs.h5.hongkzh.com/imgs/purchase/goodsDetails/goodsDetails-icon.png) no-repeat left center;
		background-size: 0.3rem 0.3rem; */
		vertical-align: -0.01rem;
	}

	.coupon-list .list-btn,
	.coupon-list .list-btn1 {
		margin: 0.15rem 0 0 0.2rem;
		float: right;
		width: 1.3rem;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		border-radius: 0.05rem;
		font-size: 0.24rem;
	}

	.coupon-list .list-btn {
		color: #EF593C;
		border: 1px solid #EF593C;
	}

	.coupon-list .list-btn1 {
		color: #666666;
		border: 1px solid #CCCCCC;
	}

	.coupon-list .coupon-lableIcon,
	.coupon-list .coupon-txt {
		position: absolute;
		left: 0;
		display: block;
		width: 1.09rem;
		height: 1.09rem;
	}

	.coupon-list .coupon-lableIcon {
		top: 0;
		z-index: 10;
		/* background: url(https://cs.h5.hongkzh.com/imgs/purchase/coupon/coupon-lableIcon.png) no-repeat center; */
		background-size: 100% 100%;
	}

	.coupon-list .coupon-txt {
		top: 0.02rem;
		z-index: 100;
		text-align: center;
		font-size: 0.32rem;
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
</style>
