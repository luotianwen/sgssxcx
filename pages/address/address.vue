<template>
	<view id="address" class="">
		<!-- <div class="circleBar-top "> <span class="seeIndex-setUp" @tap="addAddress()">新建</span></div> -->
		<div class="address-cent">

			<view class="address-list" v-for="(item, index) in data" :key="index">
				<view :class="['address-listLeft',{'swipeleft':item.className}]" @touchstart="touchStart($event,index)" @touchmove="touchMove($event,index,item)">
					<div class="address-listCent">
						<h6><span class="address-default" v-if="item.isDefault==1" >默认</span>  <span class="address-listName">{{item.consignee}}</span> {{item.phone}}</h6>
						<p>{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.address}}</p>
					</div><strong class="address-modify" @tap="editAddress(item)"></strong>
				</view>

				<div class="sl-opts"><span @tap="removeAddress(item,index)">删除</span></div>

			</view>

		</div>
		<view class="btn-area" id="buttonContainer">
			<button type="primary" @tap="addAddress">新建</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				data: [],
				swipeX: true,
				swipeY: true,
				x: "",
				y: "",
				X: "",
				Y: "",

			}
		},
		onShow() {
			this.addresslist();
		},
		onLoad() {
			
		},
		onPullDownRefresh() {
			this.addresslist();
			uni.stopPullDownRefresh();

		},
		methods: {
			addresslist: function() {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: service.addresslist(),
					data: {
						tokenId: service.getUser().tokenId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.data = data.data.data;
						}
						uni.hideLoading();
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			},
			touchStart: function(event, index) {
				this.x = event.touches[0].pageX;
				this.y = event.touches[0].pageY;
				this.swipeX = true;
				this.swipeY = true;
			},
			touchMove: function(event, index, _that) {
				event.stopPropagation();
				this.X = event.touches[0].pageX;
				this.Y = event.touches[0].pageY;
				// 左右滑动
				if (this.swipeX && Math.abs(this.X - this.x) - Math.abs(this.Y - this.y) > 0) {
					// 阻止事件冒泡
					event.stopPropagation();
					if (this.X - this.x > 10) { //右滑
						event.preventDefault();
						_that.className = false; //右滑收起
						//console.log("右滑")
					}
					if (this.x - this.X > 10) { //左滑
						event.preventDefault();
						_that.className = true; //左滑展开

					}
					this.swipeY = false;
				}


			},
			editAddress:function(item){
				uni.navigateTo({
					url: "../address/addAddress?addressId="+item.addressId+"&isDefault="+item.isDefault+"&consignee="+item.consignee+"&phone="+item.phone+"&address="+item.address+"&provinceName="+item.provinceName+"&cityName="+item.cityName+"&areaName="+item.areaName+"&areaId="+item.areaId
					
				})
			},
			removeAddress: function(item, index) {
				uni.showModal({
					content: '确认要删除？',
					success: (res) => {
						if (res.confirm) {

							uni.showLoading({
								title: '加载中'
							});

							let self = this;
							uni.request({
								url: service.removeAddress(),
								data: {
									tokenId: service.getUser().tokenId,
									addressId: item.addressId
								},
								success: (data) => {
									if (data.statusCode == 200 && data.data.code == 0) {
										let _data = [];
										self.data.forEach(function(cart) {
											if (cart.addressId != item.addressId) {
												_data.push(cart);
											}

										}, this)
										self.data = _data;
										//self.data.splice(index, 1)

									}
									uni.hideLoading();
								},
								fail: (data, code) => {
									console.log('fail' + JSON.stringify(data));
									uni.hideLoading();
								}
							});
						}
					}
				})
			},
			addAddress: function() {
				uni.navigateTo({
					url: "../address/addAddress"
				})
			}
		}
	}
</script>

<style>
	.swipeleft {
		transform: translateX(-15%);
		-webkit-transform: translateX(-15%);
	}

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
		background: url(http://op.yoyound.com/static/images/wirt.png) no-repeat center;
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
