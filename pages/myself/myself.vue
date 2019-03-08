<template>
	<view id="happyiIndex">
		<view class="happyiIndex-header"  v-show="uerInfo.hasLogin">
			<view class="header-bg" >
				<image :src="uerInfo.hasLogin ? uerInfo.headImg :avatarUrl"></image>
			</view>
			<view class="header-bg1"></view>
			<view class="header-info">
				<view class="infoRight-title" >{{uerInfo.hasLogin ? uerInfo.name : ''}}</view>
				 
				

				<view class="header-infoRight">
					<image :src="uerInfo.hasLogin ? uerInfo.headImg :avatarUrl" class="header-infoLeft"></image>
				</view>
			</view> 
		</view>
		
		<view class="happyiIndex-header" v-show="!uerInfo.hasLogin">
			<view class="header-bg" >
				<image :src="avatarUrl"></image>
			</view>
			<button  class="header-info" style="background:none;border:none;outline:none"  open-type="getUserInfo" @getuserinfo="onGotUserInfo"> 登录</button>
		</view>
		
		<view class="happyiIndex-list">
			<view class="listCent happyi-co1" @tap="goOrder()">我的订单<a class="happyi-left">{{orders}}</a></view>
			<view class="listCent happyi-co2" @tap="goAfterOrder()">退换/售后<a class="happyi-left">{{afterOrders}}</a></view>
			<view class="listCent happyi-co4" @tap="goAddress()">收货地址 <a class="happyi-left"></a></view>
			<view class="listCent happyi-co3" @tap="goCoupon()">我的券<a class="happyi-left">{{coupons}}</a></view>
			<!-- <view class="listCent happyi-co5" @tap="goFeedback()"> 反馈 <a class="happyi-left"></a></view> -->
			<view class="listCent  happyi-co5" style="padding 0 0 0 98upx ">
			
				<button plain="true" open-type="feedback" size="mini" style="margin-top:10upx;  border-color: #FFFFFF; font-size: 15px;text-align:left ;padding-left: 0px;">
					反馈</button>
				 <!-- <a class="happyi-left"></a>  --> 
			</view>
			<view class="listCent happyi-co6" @tap="goAccount()">账号安全<a class="happyi-left"></a></view>
			<view class="listCent happyi-co8" v-show="vshow!=1" @tap="goDistribution()">申请分销<a class="happyi-left"></a></view>
			<view class="listCent happyi-co8" v-show="vshow==1"  @tap="goDistributionPrice()">查询分销价格<a class="happyi-left"></a></view>
			<view class="listCent happyi-co9" @tap="goAbout()">关于<a class="happyi-left"></a></view>
			<view class="listCent  happyi-co7" style="padding 0 0 0 98upx ">

				<button plain="true" open-type="contact" size="mini" style="margin-top:10upx; border-color: #FFFFFF; font-size: 15px;text-align:left ;padding-left: 0px;">
					客服</button>
				 <!-- <a class="happyi-left"></a>  -->
			</view>

			  

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
				login: false,
				code:"",
				vshow:"0"
			}
		},
		onShareAppMessage() {
			return {
				title:  "悠氧运动户外-综合网购首选-正品低价、品质保障、配送及时、轻松购物",
				path: '/pages/index/index',
				imageUrl:'http://yoyound.com/images/logo5_4.jpg'
			}
		},
		onLoad(d) {
			
			uni.showShareMenu({
                    withShareTicket: true
                });
			

		},
		onShow() {
			if (service.getUser().hasLogin) {
				this.login = true;
				this.uerInfo = service.getUser();
				this.getData();
			} else {
			
				 this.getUserInfo();
			
			}
			this.getAgentData();
		},
		methods: {
			getAgentData: function() {
				let _this = this;
				uni.request({
					url: service.getUserAgentData(),
					data: {
						tokenId: _this.uerInfo.tokenId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.vshow = data.data.data.vshow;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
			
					}
				})
			},
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
			getUserInfo() { //获取用户信息api在微信小程序可直接使用，在5+app里面需要先登录才能调用
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_this.code=loginRes.code;
					}
				});
			
			},
			onGotUserInfo: function(e) {
				let _this=this;
				let infoRes = e.detail;
                console.log("userInfo   "+JSON.stringify(infoRes));
				uni.request({
					url: service.login(),
					data: {
						nickName: infoRes.userInfo.nickName,
						code: _this.code, //infoRes.userInfo.openId,
						avatarUrl: infoRes.userInfo.avatarUrl,
						agentId:service.getAgent()
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
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
				uni.navigateTo({
					url: "../myself/account"
				})
			},
			goAddress: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}

				uni.navigateTo({
					url: "../address/address"
				})


			},
			goOrder: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
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
			goDistributionPrice: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
				uni.navigateTo({
					url: "../distribution/price"
				})
			},
			goDistribution: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
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
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
				uni.navigateTo({
					url: "../coupon/coupon"
				})
			},
			goAfterOrder: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
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
		padding-top: 6upx;
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
		background-image: url("http://op.yoyound.com/static/images/star.png");
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
		margin: 0 25upx 0 43upx;
		height: 65upx;
		line-height: 65upx;
		font-size: 13px;
	}

	 

	.header-topDetailed {
		padding-left: 37upx;
		border-left: 1px solid #fff;
	}

	 
 

	.header-info {
		position: relative;
		z-index: 100;
		margin: 25upx 0 44upx;
		padding: 0 46upx 0 35upx;
	}

	.header-info .infoRight-title {
		margin-bottom: 6upx;
		padding-top: 12upx;
		font-size: 46upx;
		font-weight: inherit;
	}

	 
	.header-infoRight {
		position: absolute;
		top: 0;
		right: 30upx;
		padding-right: 46upx;
		width: 131upx;
		height: 131upx;
		background: url(http://op.yoyound.com/static/images/left1.png) no-repeat right center;
		background-size: 24upx 40upx;
	}

	.header-infoRight input,
	.header-infoRight img {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 131upx;
		height: 131upx;
		border: 5upx solid #fff;
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
		width: 131upx;
		height: 131upx;
		border: 5upx solid #fff;
		background-size: 100% 100%;
		border-radius: 50%;
	}

	  

	.header-butt {
		margin-bottom: 24upx;
		width: 100%;
		height: 140upx;
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
		margin-top: 24upx;
		font-size: 35upx;
		color: #333;
		font-weight: inherit;
	}

	.header-butt a strong i {
		position: absolute;
		top: 5upx;
		right: -12upx;
		width: 9upx;
		height: 9upx;
		background-color: #ea3e27;
		border-radius: 50%;
	}

	.header-butt a span {
		display: block;
		font-size: 30upx;
		color: #666;
	}
  

	.happyiIndex-list {
		margin-bottom: 24upx;
		background: #fff;
	}

	.happyiIndex-list .listCent {
		position: relative;
		padding: 0 35upx 0 98upx;
		height: 97upx;
		line-height: 97upx;
		font-size: 35upx;
		color: #333;
		border-bottom: 1px solid #e2e2e2;
	}

	.happyiIndex-list .listCent:last-child {
		border-bottom: none;
	}

	.happyiIndex-list .happyi-left {
		position: absolute;
		top: 0;
		right: 24upx;
		padding-right: 56upx;
		height: 100%;
		font-size: 33upx;
		color: #f76654;
		background: url("http://op.yoyound.com/static/images/left.png") no-repeat right center;
		background-size: 56upx 56upx;
	}

	.happyiIndex-list .happyi-co3 .happyi-left {
		color: #666;
	}

	.happyiIndex-list .happyi-co1 {
		background: url(http://op.yoyound.com/static/images/m1.png) no-repeat 30upx center;
		background-size: 46upx 46upx;
	}

	.happyiIndex-list .happyi-co2 {
		background: url(http://op.yoyound.com/static/images/m2.png) no-repeat 30upx center;
		background-size: 46upx 46upx;
	}

	.happyiIndex-list .happyi-co3 {
		background: url(http://op.yoyound.com/static/images/m3.png) no-repeat 30upx center;
		background-size: 46upx 46upx;
	}
	.happyiIndex-list .happyi-co4 {
		background: url(http://op.yoyound.com/static/images/m4.png) no-repeat 30upx center;
		background-size: 46upx 46upx;
	}
	 
	.happyiIndex-list .happyi-co5 {
		background: url(http://op.yoyound.com/static/images/m5.png) no-repeat 30upx center;
		background-size: 46upx 46upx;
	}
	.happyiIndex-list .happyi-co6 {
		background:url(http://op.yoyound.com/static/images/m6.png) no-repeat 30upx center;
		background-size: 46upx 46upx;
	}
	.happyiIndex-list .happyi-co7 {
		background: url(http://op.yoyound.com/static/images/m7.png) no-repeat 30upx center;
		background-size: 46upx 46upx;
	}
	 .happyiIndex-list .happyi-co8 {
	  	background: url(http://op.yoyound.com/static/images/m8.png) no-repeat 30upx center;
	  	background-size: 46upx 46upx;
	  }
	 .happyiIndex-list .happyi-co9 {
	  	background: url("http://op.yoyound.com/static/images/about.png") no-repeat 30upx center;
	  	background-size: 46upx 46upx;
	  }
	  .happyiIndex-list .happyi-co10 {
	   	background: url("http://op.yoyound.com/static/images/about.png") no-repeat 30upx center;
	   	background-size: 46upx 46upx;
	   }
</style>
