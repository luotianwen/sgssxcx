<template>
		<view id="happyiIndex">
			<view class="happyiIndex-header">
				<view class="header-bg">
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

				<view class="listCent happyi-co2" @tap="goOrder()">我的订单<a class="happyi-left">{{orders}}</a></view>
				<view class="listCent happyi-co3" @tap="goAfterOrder()">退换/售后<a class="happyi-left">{{afterOrders}}</a></view>
				<view class="listCent happyi-co4" @tap="goAddress()">收货地址 <a class="happyi-left"></a></view>
				<view class="listCent happyi-co8" @tap="goCoupon()">我的券<a class="happyi-left">{{coupons}}</a></view>
				<view class="listCent happyi-co13" @tap="goFeedback()"> 反馈 <a class="happyi-left"></a></view>  
				<view class="listCent happyi-co13" @tap="goAccount()">账号安全<a class="happyi-left"></a></view>
				<view class="listCent happyi-co13" @tap="goCustomerService()">客服<a class="happyi-left"></a></view>
				<view class="listCent happyi-co1" @tap="goDistribution()">申请分销<a class="happyi-left"></a></view>
				<view class="listCent happyi-co1" @tap="goAbout()">关于<a class="happyi-left"></a></view>
				<view class="listCent happyi-co1" @tap="goSli()">侧滑<a class="happyi-left"></a></view>

				<button type="primary" v-show="!uerInfo.hasLogin" open-type="getUserInfo" @getuserinfo="onGotUserInfo"> 登录</button>
				 
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
				orders:0,
				afterOrders:0,
				coupons:0
			}
		},
		onLoad(d) {
			console.log(JSON.stringify(service.getUser()));
			  //service.removeUser();
			if (service.getUser().hasLogin) {
				this.login = true;
				this.uerInfo = service.getUser();
				//this.cartlist();
			} else {
				
				//this.getUserInfo();

			}  

		},
		methods: {
			onGotUserInfo: function(e) {
				let infoRes = e.detail;
				console.log(JSON.stringify(e.detail));
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
							this.uerInfo =d; 
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},
			goSli: function() {
				uni.navigateTo({
					url: "../test/slidelist"
				})
			},
			goAccount: function() {
				uni.navigateTo({
					url: "../myself/account"
				})
			},
			goAddress: function() {
				uni.navigateTo({
					url: "../address/address"
				})
			},
			goOrder: function() {
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
				uni.navigateTo({
					url: "../coupon/coupon"
				})
			},
			goAfterOrder: function() {
				uni.navigateTo({
					url: "../service/afterOrder"
				})
			}


		}
	}
</script>

<style>
	#happyiIndex {
		padding-bottom: 1rem;
	}

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
		background-image: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-star.png");
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

	.happyi-mon {
		display: inline-block;
		margin-right: 0.32rem;
		padding-left: 0.44rem;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-mon.png") no-repeat left center;
		background-size: 0.34rem 0.34rem;
		font-size: 15px;
		font-weight: bold;
	}

	.header-topDetailed {
		padding-left: 0.32rem;
		border-left: 1px solid #fff;
	}

	.happyi-ewm {
		position: absolute;
		top: 0;
		right: 0.67rem;
		display: block;
		width: 0.56rem;
		height: 0.56rem;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-ewm.png") no-repeat center;
		background-size: 0.56rem 0.56rem;
	}

	.happyi-set {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 0.56rem;
		height: 0.56rem;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-set.png") no-repeat center;
		background-size: 0.56rem 0.56rem;
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

	.header-info p {
		padding-left: 0.34rem;
		font-size: 0.28rem;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-icon.png") no-repeat left center;
		background-size: 0.24rem 0.26rem;
	}

	.header-infoRight {
		position: absolute;
		top: 0;
		right: 0.25rem;
		padding-right: 0.4rem;
		width: 1.12rem;
		height: 1.12rem;
		background: url(https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-left1.png) no-repeat right center;
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

	.infoRight-grade {
		padding: 0 0.3rem;
		position: relative;
		z-index: 100;
		font-size: 10px;
	}

	.infoRight-ranking {
		display: inline-block;
		height: 0.24rem;
		line-height: 0.24rem;
		margin-left: 0.1rem;
		padding-left: 0.1rem;
		border-left: 1px solid #fff;
	}

	.infoRight-number {
		float: right;
		margin-top: 0.05rem;
	}

	.infoRight-number span {
		margin: 0 0.05rem;
	}

	.infoRight-strip {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 100;
		height: 0.1rem;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}

	.infoRight-strip span {
		display: block;
		width: 20%;
		height: 0.1rem;
		background: #0092ff;
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

	.happyiIndex-slider {
		position: relative;
		margin-bottom: 0.2rem;
		padding: 0.2rem;
		background: #fff;
		border-top: 1px solid #e2e2e2;
	}

	.happyiIndex-slider .happyi-more11 {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
		z-index: 999;
		display: block;
		width: 0.94rem;
		height: 1.2rem;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-more11.png") no-repeat center;
		background-size: 0.94rem 100%;
	}

	.happyiIndex-slider .swiper-container {
		height: 1.2rem;
		border-radius: 0.1rem;
	}

	.happyiIndex-slider .swiper-container a,
	.happyiIndex-slider .swiper-container img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.happyiIndex-slider .swiper-pagination {
		height: 0.12rem;
		font-size: 0;
	}

	.happyiIndex-slider .swiper-pagination .swiper-pagination-bullet {
		margin: 0 0.05rem;
		height: 0.1rem;
		width: 0.1rem;
		border: 1px solid #fff;
		background: none;
		opacity: 1;
	}

	.happyiIndex-slider .swiper-pagination .swiper-pagination-bullet-active {
		opacity: 1;
		background: #fff;
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
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-left.png") no-repeat right center;
		background-size: 0.48rem 0.48rem;
	}

	.happyiIndex-list .happyi-co3 .happyi-left {
		color: #666;
	}

	.happyiIndex-list .happyi-co1 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co1.png") no-repeat 0.25rem center;
		background-size: 0.33rem 0.32rem;
	}

	.happyiIndex-list .happyi-co2 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co2.png") no-repeat 0.25rem center;
		background-size: 0.28rem 0.29rem;
	}

	.happyiIndex-list .happyi-co3 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co3.png") no-repeat 0.25rem center;
		background-size: 0.27rem 0.29rem;
	}

	.happyiIndex-list .happyi-co4 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co4.png") no-repeat 0.25rem center;
		background-size: 0.28rem 0.28rem;
	}

	.happyiIndex-list .happyi-co6 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co6.png") no-repeat 0.25rem center;
		background-size: 0.29rem 0.27rem;
	}

	.happyiIndex-list .happyi-co8 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co8.png") no-repeat 0.25rem center;
		background-size: 0.29rem 0.25rem;
	}

	.happyiIndex-list .happyi-co9 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co9.png") no-repeat 0.25rem center;
		background-size: 0.30rem 0.28rem;
	}

	.happyiIndex-list .happyi-co10 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co10.png") no-repeat 0.25rem center;
		background-size: 0.27rem 0.27rem;
	}

	.happyiIndex-list .happyi-co11 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co11.png") no-repeat 0.25rem center;
		background-size: 0.27rem 0.34rem;
	}

	.happyiIndex-list .happyi-co12 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co12.png") no-repeat 0.25rem center;
		background-size: 0.29rem 0.28rem;
	}

	.happyiIndex-list .happyi-co13 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co13.png") no-repeat 0.25rem center;
		background-size: 0.29rem 0.23rem;
	}

	.happyiIndex-list .happyi-co15 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co15.png") no-repeat 0.25rem center;
		background-size: 0.29rem 0.27rem;
	}

	.happyiIndex-Insurance,
	.happyiIndex-zRaise {
		padding-bottom: 0.42rem;
		background: #fff;
	}

	.happyiIndex-Insurance h6,
	.happyiIndex-zRaise h6 {
		font-weight: inherit;
		color: #333;
		font-size: 15px;
	}

	.happyiIndex-Insurance p,
	.happyiIndex-zRaise p {
		color: #666;
		font-size: 12px;
	}

	.happyiIndex-Insurance {
		margin-bottom: 0.2rem;
	}

	.happyiIndex-Insurance .Insurance-cent h6 {
		margin-bottom: 0.15rem;
		width: 5.54rem;
		line-height: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.Insurance-cent,
	.zRaise-cent {
		margin: 0.36rem 0.3rem 0;
		padding-left: 0.87rem;
		padding-bottom: 0.35rem;
		min-height: 0.77rem;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-co16.png") no-repeat 0.1rem 0;
		background-size: 0.77rem 0.77rem;
	}

	.happyiIndex-title {
		height: 0.89rem;
		line-height: 0.89rem;
		text-align: center;
		color: #333;
		font-size: 15px;
		border-bottom: 1px solid #d8d8d8;
	}

	.happyiIndex-title span {
		display: inline-block;
		padding-left: 0.45rem;
		height: 100%;
	}

	.happyiIndex-title .happyi-p1 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-p1.png") no-repeat left center;
		background-size: 0.32rem 0.32rem;
	}

	.happyiIndex-title .happyi-p2 {
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-p2.png") no-repeat left center;
		background-size: 0.32rem 0.32rem;
	}

	.happyiIndex-btn {
		margin: 0.38rem auto 0;
		width: 2.4rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		border-radius: 27px;
		border: solid 1px #f17d37;
		font-size: 13px;
		color: #f17d37;
	}

	.happyiIndex-zRaise .zRaise-cent {
		border-bottom: 1px solid #d8d8d8;
	}

	.happyiIndex-zRaise .zRaise-cent h6 {
		margin-bottom: 0.15rem;
		width: 5.54rem;
		line-height: 0.5rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.happyiIndex-zRaise .zRaise-cent .happyi-mon {
		padding-left: 0.3rem;
		font-size: 12px;
		color: #f44834;
		background: url(https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-mon.png) no-repeat left center;
		background-size: 0.24rem 0.24rem;
	}

	.happyiIndex-zRaise .happyiIndex-btn {
		border: solid 1px #0092ff;
		color: #0092ff;
	}

	.happyiIndex-add {
		height: 3.4rem;
		font-size: 13px;
		color: #666;
		text-align: center;
	}

	.happyi-newmore {
		display: block;
		margin: 0.83rem 0 0.2rem;
		width: 100%;
		height: 1.23rem;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-newmore.png") no-repeat center;
		background-size: 1.23rem 1.23rem;
	}
</style>
