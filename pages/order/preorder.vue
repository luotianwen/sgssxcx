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
					<image class="slide-img" src="http://op.yoyound.com/static/images/timg.jpg"></image>

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
		onShow(){
			this.getPreorder();
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
								timeStamp: data.data.data.timeStamp+"",
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
									uni.showModal({
										content: "支付失败,原因为: " + err.errMsg,
										showCancel: false
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
		padding: 0  0 176upx;
	}

	.confirmOrder-address {
		height: 187upx;
		width: 100%;
	}

	.address-bg {
		width: 100%;
		height: 12upx;
		background: url(http://op.yoyound.com/static/images/address-icon.png) no-repeat left top;
		background-size: 100% 12upx;
	}


	.address-list {
		position: relative;
		width: 100%;
		font-size: 35upx;
		color: #333;
		border-bottom: 1px solid #e2e2e2;
		overflow: hidden;
	}

	.address-list .address-listLeft {
		float: left;
		position: relative;
		padding: 41upx 0 0 35upx;
		height: 140upx;
		z-index: 100;
		width: 96%;
		background: #fff;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
	}

	 
	.address-cent {
		position: relative;
		padding: 35upx 0 0 35upx;
		height: 140upx;
		background-color: #fffde5;
	}

	.address-centh6 {
		margin-bottom: 12upx;
		font-size: 35upx;
		font-weight: inherit;
		color: #333;
	}

	.address-cent .default-icon {
		margin-right: 29upx;
		width: 82upx;
		height: 37upx;
		background-color: #d45048;
		border-radius: 5upx;
		color: #ffffff;
		font-size: 22upx;
	}

	.address-cent .address-name {
		margin-right: 29upx;
	}

	.address-centp {
		font-size: 26upx;
		color: #999;
	}

	.address-cent .address-left {
		position: absolute;
		top: 50%;
		right: 29upx;
		margin-top: -28upx;
		width: 56upx;
		height: 56upx;
		background: url(http://op.yoyound.com/static/images/left.png) no-repeat center;
		background-size: 56upx 56upx;
	}

	.confirmOrder-centList {
		margin-top: 24upx;
		background: #fff;
	}


	.centList-cent {
		position: relative;
	}

	.centList-cent:first-child .centList-centCent {
		border-top: none;
	}

	.centList-centCent {
		margin-left: 35upx;
		padding: 24upx 35upx 24upx 0;
		border-top: 1px solid #e2e2e2;
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




	.centList-centRight {
		position: relative;
		margin-left: 210upx;
		height: 187upx;
	}

	.centList-centRighth6 {
		margin-bottom: 6upx;
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

	.centList-centRight .centRight-h6span {
		margin-right: 6upx;
		vertical-align: -1upx;
	}

	.centList-centRightp {
		font-size: 24upx;
	}

	.centList-centRight .happyi-mon {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 35upx;

	}

	.centList-centRight .happyi-monspan {
		font-size: 24upx;
	}








	.centList-Btn {
		border-color: #666;
	}



	.goods-total,
	.freight-total,
	.centList-butt {
		margin-left: 35upx;
		padding-right: 35upx;
		height: 117upx;
		line-height: 117upx;
		font-size: 24upx;
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
		right: 29upx;
		margin-top: -28upx;
		width: 56upx;
		height: 56upx;
		background: url(http://op.yoyound.com/static/images/left.png) no-repeat center;
		background-size: 56upx 56upx;
	}

	.centList-buttLeft {
		display: inline-block;
		width: 105upx;

		color: #333;
	}





	.confirmOrder-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 114upx;
		line-height: 114upx;
		border-top: 1px solid #fefefe;
		background: #fff;
		color: #333333;
		font-size: 28upx;
	}

	.confirmOrder-footer .footer-btn {
		float: right;
		width: 40%;
		height: 100%;
		text-align: center;
		background: #e05e55;
		font-size: 37upx;
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
		padding: 12upx 0 0 4%;
		line-height: 47upx;
	}

	.confirmOrder-footer span {
		font-size: 37upx;

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
		height: 936upx;
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
		height: 936upx;
		background: #F5F5F5;

		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		border-radius: 10upx;
	}

	#voucher .confirmPayment-title {
		padding-left: 35upx;
		background: #fff;
	}

	#voucher .goods-totalRight {
		left: 35upx;
	}

	/* .voucher-cent {
		padding: 14upx 35upx 35upx;
	}
 */

	.coupon-list {
		position: relative;
		/* 	margin-top: 0.1936upx;
	 	padding-top: 41upx; */
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
		top: 40upx;
		left: 40upx;
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
		padding: 35upx 24upx 0 238upx;
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
		width: 88upx;
		height: 37upx;
		background-size: 88upx 37upx;
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
		height: 94upx;
		line-height: 94upx;
		font-size: 26upx;
		color: #666;
	}

	.coupon-list .list-buttMoney {
		margin-left: 6upx;
		padding-left: 47upx;
		font-size: 28upx;
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
		width: 128upx;
		height: 128upx;
	}



	.coupon-list .coupon-txt {
		top: 7upx;
		z-index: 100;
		text-align: center;
		font-size: 37upx;
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
