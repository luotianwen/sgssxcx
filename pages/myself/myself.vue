<template>
	<view id="happyiIndex">
		<view class="happyiIndex-header">
			<view class="header-bg" >
				<image :src="uerInfo.hasLogin ? uerInfo.headImg :avatarUrl"></image>
			</view>
			<view class="header-bg1"></view>
			<view class="header-info">
				<view class="infoRight-title">{{uerInfo.hasLogin ? uerInfo.name : '您未登录'}}</view>

				<view class="header-infoRight">
					<image :src="uerInfo.hasLogin ? uerInfo.headImg :avatarUrl" class="header-infoLeft"></image>
				</view>
			</view>
		</view>
		<view class="happyiIndex-list">
			<view class="listCent happyi-co1" @tap="goOrder()">我的订单<a class="happyi-left">{{orders}}</a></view>
			<view class="listCent happyi-co2" @tap="goAfterOrder()">退换/售后<a class="happyi-left">{{afterOrders}}</a></view>
			<view class="listCent happyi-co4" @tap="goAddress()">收货地址 <a class="happyi-left"></a></view>
			<view class="listCent happyi-co3" @tap="goCoupon()">我的券<a class="happyi-left">{{coupons}}</a></view>
			<view class="listCent happyi-co5" @tap="goFeedback()"> 反馈 <a class="happyi-left"></a></view>
			<view class="listCent happyi-co6" @tap="goAccount()">账号安全<a class="happyi-left"></a></view>
			<view class="listCent happyi-co8" @tap="goDistribution()">申请分销<a class="happyi-left"></a></view>
			<view class="listCent happyi-co9" @tap="goAbout()">关于<a class="happyi-left"></a></view>
			<view class="listCent  happyi-co7" style="padding 0 0 0 0.84rem ">

				<button plain="true" open-type="contact" size="mini" style="border-color: #FFFFFF; font-size: 15px;text-align:left ;padding-left: 0px;">
					客服</button>
				<a class="happyi-left"></a>
			</view>

			<button class="deliverGoods-btn" type="primary" plain="true" v-show="!uerInfo.hasLogin" open-type="getUserInfo"
			 @getuserinfo="onGotUserInfo">
				登录</button>

		</view>



	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				avatarUrl: '',
				uerInfo: {},
				orders: 0,
				afterOrders: 0,
				coupons: 0,
				login: false
			}
		},
		onLoad(d) {
			console.log(JSON.stringify(service.getUser()));

			if (service.getUser().hasLogin) {
				this.login = true;
				this.uerInfo = service.getUser();
				this.getData();
			} else {

				//this.getUserInfo();

			}

		},
		onShow() {
			if (service.getUser().hasLogin) {
				this.getData();
			}
		},
		methods: {
			getData: function() {
				let _this = this;
				uni.request({
					url: service.getUserData(),
					data: {
						tokenId: service.getUser().tokenId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							var d = data.data.data;
							_this.orders = d.orders;
							_this.afterOrders = d.afterOrders;
							_this.coupons = d.coupons;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},
			onGotUserInfo: function(e) {
				let infoRes = e.detail;

				uni.request({
					url: service.login(),
					data: {
						nickName: infoRes.userInfo.nickName,
						openId: "11", //infoRes.userInfo.openId,
						avatarUrl: infoRes.userInfo.avatarUrl
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							var d = data.data.data;
							d.hasLogin = true;
							service.setUser(d);
							this.uerInfo = d;
							this.login = true;
							this.getData();
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},

			goAccount: function() {
				if (!this.login) {
					uni.showToast({
						icon: 'none',
						title: '请登录'
					})
					return;
				}
				uni.navigateTo({
					url: "../myself/account"
				})
			},
			goAddress: function() {
				if (!this.login) {
					uni.showToast({
						icon: 'none',
						title: '请登录'
					})
					return;
				}

				uni.navigateTo({
					url: "../address/address"
				})


			},
			goOrder: function() {
				if (!this.login) {
					uni.showToast({
						icon: 'none',
						title: '请登录'
					})
					return;
				}
				uni.navigateTo({
					url: "../order/order"
				})

			},
			goFeedback: function() {

				uni.navigateTo({
					url: "../feedback/feedback"
				})
			},
			goCustomerService: function() {
				uni.navigateTo({
					url: "../customerService/index"
				})
			},
			goDistribution: function() {
				uni.navigateTo({
					url: "../distribution/index"
				})
			},
			goAbout: function() {
				uni.navigateTo({
					url: "../about/about"
				})
			},
			goCoupon: function() {
				if (!this.login) {
					uni.showToast({
						icon: 'none',
						title: '请登录'
					})
					return;
				}
				uni.navigateTo({
					url: "../coupon/coupon"
				})
			},
			goAfterOrder: function() {
				if (!this.login) {
					uni.showToast({
						icon: 'none',
						title: '请登录'
					})
					return;
				}
				uni.navigateTo({
					url: "../service/afterOrder"
				})

			}


		}
	}
</script>

<style>
	 

	.happyiIndex-header {
		position: relative;
		padding-top: 0.05rem;
		width: 100%;
		height: 200upx;
		color: #fff;
		overflow: hidden;
	}

	.header-bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		background-image: url("http://127.0.0.1:8082/static/images/star.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		transform: scale(1.5, 1.5);

		-webkit-filter: blur(10px);
		-moz-filter: blur(10px);
		-ms-filter: blur(10px);
		filter: blur(10px);
	}

	.header-bg1 {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.header-top {
		position: relative;
		z-index: 100;
		margin: 0 0.21rem 0 0.37rem;
		height: 0.56rem;
		line-height: 0.56rem;
		font-size: 13px;
	}

	 

	.header-topDetailed {
		padding-left: 0.32rem;
		border-left: 1px solid #fff;
	}

	 
 

	.header-info {
		position: relative;
		z-index: 100;
		margin: 0.45rem 0 0.38rem;
		padding: 0 0.4rem 0 0.3rem;
	}

	.header-info .infoRight-title {
		margin-bottom: 0.05rem;
		padding-top: 0.1rem;
		font-size: 0.4rem;
		font-weight: inherit;
	}

	 
	.header-infoRight {
		position: absolute;
		top: 0;
		right: 0.25rem;
		padding-right: 0.4rem;
		width: 1.12rem;
		height: 1.12rem;
		background: url(http://127.0.0.1:8082/static/images/left1.png) no-repeat right center;
		background-size: 0.2rem 0.34rem;
	}

	.header-infoRight input,
	.header-infoRight img {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 1.12rem;
		height: 1.12rem;
		border: 0.04rem solid #fff;
	}

	.header-infoRight img {
		z-index: 98;
		border-radius: 50%;
	}

	.header-infoRight input {
		z-index: 100;
		border: none;
		background: transparent;
		opacity: 0;
	}

	.header-infoLeft {
		display: block;
		width: 1.12rem;
		height: 1.12rem;
		border: 0.04rem solid #fff;
		background-size: 100% 100%;
		border-radius: 50%;
	}

	  

	.header-butt {
		margin-bottom: 0.2rem;
		width: 100%;
		height: 1.2rem;
		font-size: 0;
		background-color: #fff;
	}

	.header-butt a {
		float: left;
		padding-top: 3%;
		width: 25%;
		text-align: center;
	}

	.header-butt a strong {
		position: relative;
		margin-top: 0.2rem;
		font-size: 0.3rem;
		color: #333;
		font-weight: inherit;
	}

	.header-butt a strong i {
		position: absolute;
		top: 0.04rem;
		right: -0.1rem;
		width: 0.08rem;
		height: 0.08rem;
		background-color: #ea3e27;
		border-radius: 50%;
	}

	.header-butt a span {
		display: block;
		font-size: 0.26rem;
		color: #666;
	}
  

	.happyiIndex-list {
		margin-bottom: 0.2rem;
		background: #fff;
	}

	.happyiIndex-list .listCent {
		position: relative;
		padding: 0 0.3rem 0 0.84rem;
		height: 0.99rem;
		line-height: 0.99rem;
		font-size: 0.3rem;
		color: #333;
		border-bottom: 1px solid #e2e2e2;
	}

	.happyiIndex-list .listCent:last-child {
		border-bottom: none;
	}

	.happyiIndex-list .happyi-left {
		position: absolute;
		top: 0;
		right: 0.2rem;
		padding-right: 0.48rem;
		height: 100%;
		font-size: 0.28rem;
		color: #f76654;
		background: url("http://127.0.0.1:8082/static/images/left.png") no-repeat right center;
		background-size: 0.48rem 0.48rem;
	}

	.happyiIndex-list .happyi-co3 .happyi-left {
		color: #666;
	}

	.happyiIndex-list .happyi-co1 {
		background: url(http://127.0.0.1:8082/static/images/m1.png) no-repeat 0.25rem center;
		background-size: 0.4rem 0.4rem;
	}

	.happyiIndex-list .happyi-co2 {
		background: url(http://127.0.0.1:8082/static/images/m2.png) no-repeat 0.25rem center;
		background-size: 0.4rem 0.4rem;
	}

	.happyiIndex-list .happyi-co3 {
		background: url(http://127.0.0.1:8082/static/images/m3.png) no-repeat 0.25rem center;
		background-size: 0.4rem 0.4rem;
	}
	.happyiIndex-list .happyi-co4 {
		background: url(http://127.0.0.1:8082/static/images/m4.png) no-repeat 0.25rem center;
		background-size: 0.4rem 0.4rem;
	}
	 
	.happyiIndex-list .happyi-co5 {
		background: url(http://127.0.0.1:8082/static/images/m5.png) no-repeat 0.25rem center;
		background-size: 0.4rem 0.4rem;
	}
	.happyiIndex-list .happyi-co6 {
		background:url(http://127.0.0.1:8082/static/images/m6.png) no-repeat 0.25rem center;
		background-size: 0.4rem 0.4rem;
	}
	.happyiIndex-list .happyi-co7 {
		background: url(http://127.0.0.1:8082/static/images/m7.png) no-repeat 0.25rem center;
		background-size: 0.4rem 0.4rem;
	}
	 .happyiIndex-list .happyi-co8 {
	  	background: url(http://127.0.0.1:8082/static/images/m8.png) no-repeat 0.25rem center;
	  	background-size: 0.4rem 0.4rem;
	  }
	 .happyiIndex-list .happyi-co9 {
	  	background: url("http://127.0.0.1:8082/static/images/about.png") no-repeat 0.25rem center;
	  	background-size: 0.4rem 0.4rem;
	  }
	  .happyiIndex-list .happyi-co10 {
	   	background: url("http://127.0.0.1:8082/static/images/about.png") no-repeat 0.25rem center;
	   	background-size: 0.4rem 0.4rem;
	   }
</style>
