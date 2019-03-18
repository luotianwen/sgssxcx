<template>
	<view style=" padding:20upx;">
		<view class="content">
			一  分销提现流程 <br />
			1 选择可结算订单(订单完成时间7天后)-申请提现<br />
			2 后台审核-付款<br />
			3 查看历史提现
		</view>
	 
		 
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				vshow: -1,
				vphone: "",
				name:"",
				login: false,
				uerInfo: {}
			}
		},
		onShareAppMessage() {
			return {
				title: "悠氧商城",
				path: '/pages/index/index',
				imageUrl: 'http://yoyound.com/images/logo5_4.jpg'
			}
		},

		onLoad() {
			uni.showShareMenu({
				withShareTicket: true
			});

		},
		onShow() {
			 
/* console.log(JSON.stringify(service.getUser())); */
		},
		methods: {
			 
			 
		}
	}
</script>

<style>
	/* 
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}
	 */

	.content {
		flex: 1;
		width: 100%;
		/* padding:0 30upx 430upx 30upx; */
		/* flex-direction: column;
		justify-content: center;  */
	}

	button {
		width: 100%;
		margin-top: 40upx;
	}
</style>
