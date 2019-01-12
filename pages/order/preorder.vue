<template>
	<view id="confirmOrder">

		<view class="confirmOrder-address">
			<view class="address-bg"></view>
			<view class="address-cent" v-show="!show" @tap="addAddress()">
				<view class="address-centh6">请选择地址</view>
				<view class="address-left"></view>
			</view>
			<view class="address-cent" v-show="show" v-if=data.address >
				<view class="address-centh6">
					<view class="address-name">{{data.address.consignee||''}} {{data.address.phone||''}}</view>
				</view>
				<view class="address-centp">{{data.address.provinceName}}{{data.address.cityName}}{{data.address.areaName}}{{data.address.address}}</view>
				<view class="address-left" @tap="chioceAddress()" ></view>
			</view>
		</view>
		<view class="mask" v-show="showMask" @click="hide"></view>
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
								<view class="centList-centRightp">{{item.spec1}} &nbsp; {{item.spec2}}</view>
								<view class="happyi-mon">
									<view class="happyi-monspan">¥{{item.price}}</view>
								</view>
							</view>
						</view>

					</view>
				</view>

				<view class="centList-butt">
					<span class="centList-buttLeft">优惠券</span>
					<span @tap="chioceVoucher()">{{coupons}}</span>
					<strong class="centList-buttRight" @click="chioceVoucher()"></strong>
				</view>
				<view class="centList-butt">
					<span class="centList-buttLeft"> 运费 </span>
					<span>{{data.freight}}</span>
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



		<div class="address-cent1" v-show="showAddress">

			<view class="address-list" v-for="(item, index) in addresss" :key="index" @tap="chioceAddressOk(item)">
				<view class="address-listLeft">
					<div class="address-listCent">
						<h6><span class="address-default" v-if="item.isDefault==1">默认</span> <span class="address-listName">{{item.consignee}}</span>
							{{item.phone}}</h6>
						<p>{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.address}}</p>
					</div>
				</view>

			</view>

		</div>

		<div id="voucher" v-show="showVoucher">
			<h6 class="confirmPayment-title"><strong class="goods-totalRight"></strong> 优惠券 </h6>
			<div class="voucher-cent">
				<div class="coupon-list" v-for="(newsitem,index2) in vouchers" :key="index2">
					<strong :class="newsitem.state==1? 'coupon-icon' :newsitem.state==2? 'coupon-icon2' : 'coupon-icon1'"></strong>
					<!-- <strong class="coupon-txt">{{newsitem.name}}</strong> -->
					<image class="slide-img" src="http://127.0.0.1:8082/static/images/timg.jpg"></image>

					<h6>满{{newsitem.full}}减{{newsitem.reduction}}</h6>
					<!-- 	<p>有效期{{newsitem.beginDate}}至{{newsitem.endDate}}</p> -->
					<div class="list-butt">有效期{{newsitem.beginDate}}至{{newsitem.endDate}}<span class="list-btn" v-if="newsitem.state==1"
						 @tap="voucherOk(newsitem)">立即使用</span>
					</div>
				</div>
			</div>
		</div>


	</view>
</template>

<script>
	import service from '../../service.js';

	export default {

		data() {
			return {
				showAddress: false,
				showVoucher: false,
				show: false,
				data: {
					"product": 0,
					"total": 0,
					"coupon": 0,
					"freight": 0,
				},
				addressId: "",
				cartId: "",
				couponId: "",
				addresss: [],
				coupons: "选择优惠券",
				showMask: false,
				vouchers: []
			}
		},
		onBackPress() {
				console.log("onBackPress");
			this.hide();
			return true;

		},
		onLoad(d) {
			this.cartId = d.cartId;
			this.getPreorder();
		},
		methods: {
			hide() {
				this.showMask = false;
				this.showAddress = false;
				this.showVoucher = false;
			},
			voucherOk: function(e) {

				this.couponId = e.couponId;
				this.hide();
				this.coupons = e.name;
				this.getPreorder();
			},
			chioceAddressOk: function(e) {
				//console.log(JSON.stringify(e));
				this.addressId=e.addressId;
				this.hide();
				this.data.address=e;
				//console.log(JSON.stringify(this.data.address));
				this.hide();
				this.getPreorder();
			},
			addAddress: function() {
				uni.navigateTo({
					url: "../address/addAddress"
				})
			},
			chioceAddress: function() {
				this.showMask = true;
				this.showAddress = true;
				let _this = this;
				uni.request({
					url: service.addresslist(),
					data: {
						tokenId: service.getUser().tokenId 
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
				
							_this.addresss = data.data.data;
				
						}
				
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
				
					}
				})
			},
			chioceVoucher: function() {
				this.showMask = true
				this.showVoucher = true;
				let _this = this;
				uni.request({
					url: service.getCouponList(),
					data: {
						tokenId: service.getUser().tokenId,
						pageNumber: 1,
						type: 1
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							let _datas = data.data.data.list;
							_datas.forEach(function(_data) {
								_data.beginDate = _data.beginDate.substring(0, 10);
								_data.endDate = _data.endDate.substring(0, 10);
							}, this)

							_this.vouchers = _datas;

							//console.log(JSON.stringify(_this.vouchers));

						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},
			getPreorder: function() {
				let _this = this;
				uni.request({
					url: service.preorder(),
					data: {
						tokenId: service.getUser().tokenId,
						addressId: _this.addressId,
						cartId: _this.cartId,
						couponId: _this.couponId
					},
					success: (data) => {
						console.log("ddd" + JSON.stringify(data.data.data));
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.data = data.data.data;
							if (_this.data.address) {
								_this.show = true;
								_this.addressId = _this.data.address.addressId;
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
			submitOrder: function() {
				uni.showLoading({
					title: '提交中'
				});
				let _this = this;
				uni.request({
					url: service.saveOrder(),
					data: {
						tokenId: service.getUser().tokenId,
						addressId: _this.addressId,
						cartId: _this.cartId,
						couponId: _this.couponId
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
			pay: function(ordersId) {
				let _this = this;
				uni.request({
					url: service.orderPay(),
					data: {
						tokenId: service.getUser().tokenId,
						ordersId: ordersId,
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
									uni.navigateTo({
										url: "../order/order"
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.navigateTo({
										url: "../order/order"
									})
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


	.address-list {
		position: relative;
		width: 100%;
		font-size: 0.3rem;
		color: #333;
		border-bottom: 1px solid #e2e2e2;
		overflow: hidden;
	}

	.address-list .address-listLeft {
		float: left;
		position: relative;
		padding: 0.35rem 0 0 0.3rem;
		height: 1.2rem;
		z-index: 100;
		width: 96%;
		background: #fff;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
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








	.centList-Btn {
		border-color: #666;
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
		background: #e05e55;
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

	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}
	.address-cent1 {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		width: 100%;
		overflow-y: scroll;
		/* border:1px solid #000; */
		/* opacity: 0.6; */
		height: 8rem;
		background: #F5F5F5;

		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		border-radius: 10upx;
	}

	#voucher {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		width: 100%;
		overflow-y: scroll;
		/* border:1px solid #000; */
		/* opacity: 0.6; */
		height: 8rem;
		background: #F5F5F5;

		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		border-radius: 10upx;
	}

	#voucher .confirmPayment-title {
		padding-left: 0.3rem;
		background: #fff;
	}

	#voucher .goods-totalRight {
		left: 0.3rem;
	}

	/* .voucher-cent {
		padding: 0.12rem 0.3rem 0.3rem;
	}
 */

	.coupon-list {
		position: relative;
		/* 	margin-top: 0.18rem;
	 	padding-top: 0.35rem; */
		height: 2.6rem;
		background: url("http://127.0.0.1:8082/static/images/coupon.png") no-repeat center;
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
		top: 0.19rem;
		right: 0.19rem;
		z-index: 10;
		width: 1.6rem;
		height: 1.4rem;
	}

	.coupon-list .coupon-icon {
		background: url("http://127.0.0.1:8082/static/images/coupon-wgq.png") no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .coupon-icon1 {
		background: url("http://127.0.0.1:8082/static/images/coupon-ygq.png") no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .coupon-icon2 {
		background: url("http://127.0.0.1:8082/static/images/coupon-yjy.png") no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .slide-img {
		top: 0.34rem;
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
		padding: 0.3rem 0.2rem 0 2.04rem;
	}

	.coupon-list h6 {
		margin-top: 0.04rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.3rem;
		color: #333333;
	}

	.coupon-list .purchase-icon2 {
		margin: 0.12rem 0 0.08rem;
		display: block;
		width: 0.76rem;
		height: 0.32rem;
		background-size: 0.76rem 0.32rem;
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
		color: #EF593C;
		background-size: 0.3rem 0.3rem;
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
		left: 0.04rem;
		display: block;
		width: 1.09rem;
		height: 1.09rem;
	}



	.coupon-list .coupon-txt {
		top: 0.06rem;
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
