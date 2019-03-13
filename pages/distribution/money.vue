<template>
	<view class="happyiIndex-list">
		<view class="listCent happyi-co1" @tap="goCash()">提现<a class="happyi-left"> </a></view>
		<view class="listCent happyi-co2" @tap="goHisCash()">提现历史<a class="happyi-left"> </a></view>
		<view class="listCent happyi-co4" @tap="goCashNotice()">退现规则 <a class="happyi-left"></a></view>
		<view class="listCent  happyi-co7" style="padding 0 0 0 98upx ">
			<button plain="true" open-type="contact" size="mini" style="margin-top:10upx; border-color: #FFFFFF; font-size: 15px;text-align:left ;padding-left: 0px;">
				客服</button>
		</view>
		 
	
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				login:false 
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
			}  
		},
		methods: {
			 
			 
	
			goCash: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
				uni.navigateTo({
					url: "../distribution/cash"
				})
			},
			goHisCash: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
	
				uni.navigateTo({
					url: "../distribution/hisCash"
				})
	
	
			},
			goCashNotice: function() {
				if (!this.login) {
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
				uni.navigateTo({
					url: "../distribution/cashNotice"
				})
	
			} 
			 
			 
	
	
		}
	}
</script>

<style>  
	
	.happyiIndex-list {
		margin-bottom: 24upx;
		background: #fff;
	}
	
	.happyiIndex-list .listCent {
		position: relative;
		padding: 0 15upx 0 40upx;
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
	 
</style>
