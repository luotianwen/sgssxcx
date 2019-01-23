<template>
	<view>
		<div class="refundInfo-top">
			<view class="refundInfo-topp"> 快递名称: {{courier}}</view>
			<view class="refundInfo-topp"> 快递单号: {{orderNumber}}</view>
		</div>
		<div class="refundInfo logistics">
			<div id="canvas"></div>
			<div class="refundInfo-cent">

				<div class="refundInfo-list" v-for="(item1, index) in item" :key="index">
					<div class="list-cent">
						<view class="refundInfo-listh6"><view class="refundInfo-listb listB"></view>{{item1.context}}</view>
						<view class="refundInfo-listp list-data">{{item1.time}}</view>
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
				item: [],
				orderNumber: "",
				courier: ""
			}
		},
		onLoad(d) {
			this.orderNumber = d.invoiceNo;
			this.courier = d.expressName;
			this.getInfos();
		},
		methods: {
			getInfos: function() {
				let _this = this;
				uni.request({
					url: service.logistics(),
					data: {
						tokenId: service.getUser().tokenId,
						courier: _this.courier,
						courierNumber: _this.orderNumber 
					},
					success: (data) => {
						//console.log('success' + JSON.stringify(data));
						console.log('success' +  (data.data.data));
						if (data.statusCode == 200 && data.data.code == 0) {
							 _this.item=JSON.parse(data.data.data).data;
						}
						uni.hideLoading();
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
	.refundInfo-top {
		padding: 20upx 0 0 0;
		font-size: 28upx;
		color: #333333;
		background: #fff;
	}

	.refundInfo-topp {
		position: relative;
		padding: 0 20upx 0 30upx;
		margin-bottom: 6upx;
	}

	.refundInfo-top strong {
		position: absolute;
		top: 0;
		left: 0;
		margin-right: 12upx;
	}

	.refundInfo-top span {
		margin-right: 12upx;
		color: #d45048;
	}

	.refundInfo {
		position: relative;
		margin-top: 24upx;
		padding-left: 70upx;
		overflow: hidden;
		background: #fff;
	}

	#canvas {
		position: absolute;
		top: 64upx;
		left: 40upx;
		width: 10%;
		height: 80%;
		border-left: 1px solid #e2e2e2;
	}

	.refundInfo-list {
		padding-top: 47upx;
		border-top: 1px solid #e2e2e2;
	}

	.refundInfo-listh6 {
		position: relative;
		font-size:32upx;
		color: #333;
	}

	.refundInfo-listb {
		position: absolute;
		top: 18upx;
		left: -32upx	;
			display: block;
		width: 10upx;
		height: 10upx;
		background-color: #999999;
	}

	.refundInfo-listp {
		margin-bottom: 9upx;
		font-size: 24upx;
		color: #999;
	}

	.refundInfo-list .list-cent {
		padding: 0 35upx 47upx 0;
	}

	.refundInfo-list .list-centImg {
		font-size: 0;
		white-space: nowrap;
		overflow: hidden;
		overflow-x: scroll;
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		-webkit-overflow-scrolling: touch;
		text-align: justify;
	}

	.refundInfo-list .list-centImg strong {
		display: inline-block;
		margin-right: 9upx;
		width: 121upx;
		height: 121upx;
		background-size: 100% 100%;
	}

	.refundInfo-list .list-centImg::-webkit-scrollbar {
		display: none;
	}

	.refundInfo-list .list-data {
		margin: 9upx 0 24upx;
	}

	.refundInfo-list .list-btn {
		padding: 24upx 35upx 24upx 0;
		text-align: right;
		font-size: 0;
		border-top: 1px solid #e2e2e2;
	}

	.refundInfo-list .list-btn span {
		margin-left: 24upx;
		display: inline-block;
		width: 204upx;
		height: 63upx;
		line-height: 63upx;
		text-align: center;
		font-size: 26upx;
		color: #333;
		border-radius: 9upx;
		border: 1px solid #cccccc;
	}

	.refundInfo-list .list-btn .spanBtn {
		width: 269upx;
	}

	.refundInfo-list:first-child {
		border-top: none;
	}

	.refundInfo-list:first-child b {
		top: 18upx;
		left: -35upx;
		width: 13upx;
		height: 13upx;
		background-color: #f76654;
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
		border-top: 1px solid #eee;
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
		width: 252upx;
		height: 63upx;
		line-height: 63upx;
		text-align: center;
		color: #ffffff;
		background-color: #d45048;
		border: 1px solid #d45048;
		border-radius: 9upx;
	}

	.confirmOrder-footer .footer-btn2 {
		background-color: #e2e2e2;
		border: 1px solid #eee;
	}

	.confirmOrder-footer .footer-btn1 {
		margin: 24upx 0 0 24upx;
		float: right;
		display: block;
		width: 204upx;
		height: 63upx;
		line-height: 63upx;
		text-align: center;
		border-radius: 9upx;
		border: 1px solid #cccccc;
	}

	.confirmOrder-footer .money {
		display: inline-block;
		padding-left: 35upx;
		color: #f44834;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-mons.png) no-repeat left 38upx;
		background-size: 32upx 32upx
}
	#refuseRefund {
		padding-top: 127upx;
	}

	.refuseRefund-cent {
		padding: 35upx;
		background: #fff;
		font-size: 0;
	}

	.refuseRefund-cent textarea {
		height: 643upx;
		width: 100%;
		resize: none;
		border: none;
		font-size: 35upx;
		color: #333333;
	}

	.refuseRefund-butt {
		padding: 0 35upx 35upx;
		margin-top: 24upx;
		background: #fff;
	}

	.refuseRefund-butt p {
		margin-bottom: 6upx;
		font-size: 26upx;
		color: #cccccc;
	}

	.refuseRefund-title {
		height: 117upx;
		line-height: 117upx;
		font-size: 35upx;
		color: #333;
	}

	.refuseRefund-img {
		margin-bottom: 27upx;
		height: 163upx;
		font-size: 0;
		white-space: nowrap;
		overflow: hidden;
		overflow-x: scroll;
		/* 1 */
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		-webkit-overflow-scrolling: touch;
		/* 2 */
		text-align: justify;
		/* 3 */
	}

	.refuseRefund-img span {
		margin-right: 24upx;
		position: relative;
		display: inline-block;
		width: 163upx;
		height: 163upx;
		background: url(" https://cs.h5.hongkzh.com/imgs/see/userPage/addGoods-icon.png") no-repeat;
		background-size: 100%;
	}

	.refuseRefund-img input {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 102;
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.refuseRefund-img img {
		position: relative;
		z-index: 100;
		display: block;
		max-width: 100%;
		height: 100%;
	}

	.refuseRefund-img::-webkit-scrollbar {
		display: none;
	}

	.refuseRefund-btn {
		margin: 47upx auto;
		display: block;
		width: 92%;
		height: 114upx;
		line-height: 114upx;
		text-align: center;
		background-color: #e2e2e2;
		border-radius: 12upx;
		font-size: 32upx;
		color: #ffffff;
	}

	.refuseRefund-btn1 {
		background-color: #d45048;
	}

	#popup-frame {
		background: #fff;
		border-radius: 12upx
	}

	.complaint {
		margin-bottom: 24upx;
		padding: 0 12upx0 35upx;
		height: 117upx;
		line-height: 117upx;
		font-size: 35upx;
		color: #333333;
		background: #fff;
	}

	.complaint span {
		float: right;
		padding-right: 58upx;
		height: 100%;
		background: url(https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMedia-hotmore.png) no-repeat right center;
		background-size: 70upx 70upx;
	}

	.ios-select-widget-box ul li.at {
		border-top: 1px solid #e2e2e2;
		border-bottom: 1px solid #e2e2e2;
	}

	.logistics .list-data {
		margin: 9upx 0 0;
	}
</style>
