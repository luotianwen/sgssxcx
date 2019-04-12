<template>
	<view id="address" class="">
		<!-- <div class="circleBar-top "> <span class="seeIndex-setUp" @tap="addAddress()">新建</span></div> -->
		<div class="address-cent">

			<view class="address-list" v-for="(item, index) in data" :key="index">
				<view class=" address-listLeft ">
					<div class="address-listCent">
						<h6> 提现金额:{{item.money}} 状态:{{states[""+item.state]}} </h6>
						<p>申请时间:{{item.createDate}} 打款时间:{{item.updateDate}} </p>
					</div><strong class="address-modify"></strong>
				</view>


			</view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</div>

	</view>
</template>

<script>
	import loadMore from '../../components/load-more.vue'
	import service from '../../service.js';
	export default {
		components: {
			loadMore
		},
		data() {
			return {
				data: [],
				pageNumber: 1,
				loadingType: 0,
				states: {
					"0": "申请",
					"1": "成功"  
				},
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onShow() {

		},
		onLoad() {
			this.list();
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			console.log('onReachBottom');
			this.loadingType = 1;
			setTimeout(() => {
				this.pageNumber++;
				this.list();
			}, 300);
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.pageNumber = 1;
				this.list();
				uni.stopPullDownRefresh();
			}, 300);

		},
		methods: {
			list: function() {
				let _this = this;
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: service.agentOrderHisList(),
					data: {
						tokenId: service.getUser().tokenId,
						pageNumber: _this.pageNumber
					},
					success: (data) => {
						uni.hideLoading();
						this.data = this.data.length == 0 ? data.data.data.list : this.data.concat(data.data.data.list);
						if (data.data.data.lastPage) {
							this.loadingType = 2;
							return;
						}
						this.loadingType = 0;


					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			},

			editAddress: function(item) {
				uni.navigateTo({
					url: "../address/addAddress?addressId=" + item.addressId + "&isDefault=" + item.isDefault + "&consignee=" +
						item.consignee + "&phone=" + item.phone + "&address=" + item.address + "&provinceName=" + item.provinceName +
						"&cityName=" + item.cityName + "&areaName=" + item.areaName + "&areaId=" + item.areaId

				})
			}

		}
	}
</script>

<style>
	.circleBar-top {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 104upx;
		line-height: 104upx;
		background: #fff;
		text-align: center;
		font-size: 32upx;
		color: #333;
		float: right;
	}

	.circleBar-top .seeIndex-setUp {
		position: absolute;
		top: 0;
		right: 24upx;
		font-weight: inherit;
	}

	.address-cent {
		/* margin-top: 0.5rem; */
	}

	.address-cent .active .address-listLeft {
		background-color: #e5f4ff;
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
		padding: 40upx 0 0 35upx;
		height: 140upx;
		z-index: 100;
		width: 96%;
		background: #fff;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
	}

	.address-list .address-modify {
		position: absolute;
		top: 50%;
		right: 40upx;
		display: block;
		margin-top: -35upx;
		width: 40upx;
		height: 52upx;
		background: url(http://op.yoyound.com/static/images/left.png) no-repeat center;
		background-size: 40upx 52upx;
	}

	.address-listName {
		font-weight: bold;
		max-width: 48%;
		margin-right: 24upx;
		font-size: 35upx;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.address-default {
		margin-right: 24upx;
		display: inline-block;
		width: 82upx;
		height: 37upx;
		line-height: 37upx;
		text-align: center;
		background-color: #CDC8B1;
		border-radius: 5upx;
		font-size: 30upx;
		color: #fff;
		vertical-align: 2upx;
	}

	.address-listCent {
		padding-right: 94upx;
	}

	.address-listCent p {
		margin-top: 6upx;
		font-size: 30upx;
		color: #999;
	}

	.address-listCent h6 {
		position: relative;
		font-size: 35upx;
		color: #000;
	}

	.address-list:last-child {
		border-bottom: none;
	}

	.addAddress-top,
	.addAddress-cent,
	.addAddress-butt,
	.addAddress-default {
		margin-top: 24upx;
		padding-left: 35upx;
		background: #fff;
		font-size: 35upx;
		color: #ccc;
	}

	.addAddress-top span,
	.addAddress-cent span,
	.addAddress-butt span,
	.addAddress-default span {
		color: #333;
	}

	.addAddress-top div:first-child,
	.addAddress-cent div:first-child {
		border-bottom: 1px solid #eee;
	}

	.addAddress-top input,
	.addAddress-cent input {
		margin: 0 24upx 0;
		width: 80.5%;
		height: 70upx;
		background: transparent;
		border: none;
		font-size: 35upx;
		color: #999;
	}

	.addAddress-name,
	.addAddress-phone,
	.addAddress-data,
	.addAddress-address,
	.addAddress-default {
		height: 117upx;
		line-height: 117upx;
	}

	.addAddress-name input,
	.addAddress-phone input {
		width: 70%;
	}

	.addAddress-data input,
	.addAddress-address input {
		width: 68%;
	}

	.addAddress-region {
		padding: 35upx 0;
	}

	.addAddress-region>span {
		display: inline-block;
		vertical-align: top;
	}

	.addAddress-region .pc-box {
		margin: 0 29upx;
		display: inline-block;
		font-weight: inherit;
		width: 72%;
	}

	.addAddress-region .pc-box span {
		color: #999;
	}

	.sl-opts {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		height: 182upx;
		line-height: 182upx;
		width: 15%;
		text-align: center;
	}

	.sl-opts span {
		display: block;
		height: 100%;
		width: 100%;
		background-color: #F95F61;
		color: #fff;
	}

	address-cent1 .active .address-listLeft {
		background-color: #fffde5;
	}

	.address-cent1 .address-listLeft {
		height: 134upx;
	}

	.address-cent1 .address-listLeft h6 {
		margin-bottom: 9upx;
		font-size: 35upx;
	}

	.address-cent1 .returnAddress-default {
		margin-right: 12upx;
		display: inline-block;
		width: 82upx;
		height: 37upx;
		line-height: 37upx;
		text-align: center;
		background-color: #d45048;
		border-radius: 5upx;
		font-size: 22upx;
		color: #fff;
	}

	.address-cent1 .returnAddress-listName {
		margin-right: 12upx;
	}

	.address-cent1 .sl-opts {
		height: 176upx;
		line-height: 176upx;
	}
</style>
