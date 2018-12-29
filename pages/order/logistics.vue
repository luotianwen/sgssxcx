<template>
	<view>
		<div class="refundInfo-top">
			<view class="refundInfo-topp"> 快递单号: {{orderNumber}}</view>
			<view class="refundInfo-topp"> 快递名称: {{courier}}</view>
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
	export default {
		data() {
			return {
				item: [],
				orderNumber: "",
				courier: ""
			}
		},
		onLoad(d) {
			this.orderNumber = d.expressName;
			this.courier = d.invoiceNo;
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
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.item=JSON.parse(data.data.data.data);
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
		padding: 20upx 0 0rem 0rem;
		font-size: 20upx;
		color: #333333;
		background: #fff;
	}

	.refundInfo-topp {
		position: relative;
		padding: 0 20upx 0 30upx;
		margin-bottom: 0.05rem;
	}

	.refundInfo-top strong {
		position: absolute;
		top: 0;
		left: 0;
		margin-right: 0.1rem;
	}

	.refundInfo-top span {
		margin-right: 0.1rem;
		color: #d45048;
	}

	.refundInfo {
		position: relative;
		margin-top: 0.2rem;
		padding-left: 0.6rem;
		overflow: hidden;
		background: #fff;
	}

	#canvas {
		position: absolute;
		top: 0.55rem;
		left: 0.345rem;
		width: 10%;
		height: 80%;
		border-left: 1px solid #e2e2e2;
	}

	.refundInfo-list {
		padding-top: 0.4rem;
		border-top: 1px solid #e2e2e2;
	}

	.refundInfo-listh6 {
		position: relative;
		font-size: 0.28rem;
		color: #333;
	}

	.refundInfo-listb {
		position: absolute;
		top: 0.15rem;
		left: -0.28rem;
		display: block;
		width: 0.09rem;
		height: 0.09rem;
		background-color: #999999;
	}

	.refundInfo-listp {
		margin-bottom: 0.08rem;
		font-size: 0.24rem;
		color: #999;
	}

	.refundInfo-list .list-cent {
		padding: 0 0.3rem 0.4rem 0;
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
		margin-right: 0.08rem;
		width: 1.04rem;
		height: 1.04rem;
		background-size: 100% 100%;
	}

	.refundInfo-list .list-centImg::-webkit-scrollbar {
		display: none;
	}

	.refundInfo-list .list-data {
		margin: 0.08rem 0 0.2rem;
	}

	.refundInfo-list .list-btn {
		padding: 0.2rem 0.3rem 0.2rem 0;
		text-align: right;
		font-size: 0;
		border-top: 1px solid #e2e2e2;
	}

	.refundInfo-list .list-btn span {
		margin-left: 0.2rem;
		display: inline-block;
		width: 1.75rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		font-size: 0.26rem;
		color: #333;
		border-radius: 0.08rem;
		border: 1px solid #cccccc;
	}

	.refundInfo-list .list-btn .spanBtn {
		width: 2.3rem;
	}

	.refundInfo-list:first-child {
		border-top: none;
	}

	.refundInfo-list:first-child b {
		top: 0.16rem;
		left: -0.3rem;
		width: 0.11rem;
		height: 0.11rem;
		background-color: #f76654;
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
		border-top: 1px solid #eee;
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
		color: #ffffff;
		background-color: #d45048;
		border: 1px solid #d45048;
		border-radius: 0.08rem;
	}

	.confirmOrder-footer .footer-btn2 {
		background-color: #e2e2e2;
		border: 1px solid #eee;
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
		padding-left: 0.3rem;
		color: #f44834;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-mons.png) no-repeat left 0.33rem;
		background-size: 0.28rem 0.28rem;
	}

	#refuseRefund {
		padding-top: 1.09rem;
	}

	.refuseRefund-cent {
		padding: 0.3rem;
		background: #fff;
		font-size: 0;
	}

	.refuseRefund-cent textarea {
		height: 5.5rem;
		width: 100%;
		resize: none;
		border: none;
		font-size: 0.3rem;
		color: #333333;
	}

	.refuseRefund-butt {
		padding: 0 0.3rem 0.3rem;
		margin-top: 0.2rem;
		background: #fff;
	}

	.refuseRefund-butt p {
		margin-bottom: 0.05rem;
		font-size: 0.26rem;
		color: #cccccc;
	}

	.refuseRefund-title {
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #333;
	}

	.refuseRefund-img {
		margin-bottom: 0.25rem;
		height: 1.4rem;
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
		margin-right: 0.2rem;
		position: relative;
		display: inline-block;
		width: 1.4rem;
		height: 1.4rem;
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
		margin: 0.4rem auto;
		display: block;
		width: 92%;
		height: 0.98rem;
		line-height: 0.98rem;
		text-align: center;
		background-color: #e2e2e2;
		border-radius: 0.1rem;
		font-size: 0.32rem;
		color: #ffffff;
	}

	.refuseRefund-btn1 {
		background-color: #d45048;
	}

	#popup-frame {
		background: #fff;
		border-radius: 0.1rem;
	}

	.complaint {
		margin-bottom: 0.2rem;
		padding: 0 0.1rem 0 0.3rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #333333;
		background: #fff;
	}

	.complaint span {
		float: right;
		padding-right: 0.5rem;
		height: 100%;
		background: url(https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMedia-hotmore.png) no-repeat right center;
		background-size: 0.6rem 0.6rem;
	}

	.ios-select-widget-box ul li.at {
		border-top: 1px solid #e2e2e2;
		border-bottom: 1px solid #e2e2e2;
	}

	.logistics .list-data {
		margin: 0.08rem 0 0;
	}
</style>
