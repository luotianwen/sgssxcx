<template>
	<view class="shoppingCarttop">
		<view class="shoppingCart">
			<view class="shoppingCart-list shoppingCart-list1">
				<view class="shoppingCart-listCent">

					<view class="list-cent" v-for="(item, index) in data" :key="index" v-show="login">
						<view class=" list-centLeft ">
							<view class="shoppingCart-icon">
								<input type="checkbox" :checked="item.state" @click='checkedOne(index,item)'>
							</view>
							<view class="list-centRight ">
								<image class="centRight-img" :src="item.headImg"></image>
								<view class="centRight-cent">
									<view class="centRight-centh6">{{item.nickname}}</view>
									<view class="centRight-centp">订单号:{{item.orderNumber}} </view>
									<view class="centRight-centp">完成时间:{{item.payTime}}</view>
									<view class="centRight-centdiv">可提现:<span class="happyi-mon">¥{{item.price}}</span></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shoppingCart-footer ">
			<view class="shoppingCart-footerlabel"> <input type='checkbox' :checked="ids.length!=0&&ids.length === data.length"
				 @click="getCheckedAll()">全选</view>
			<view class="shoppingCart-footerlabelstrong footer-btn" @click="withdrawal()">提现</view>
			<view class="shoppingCart-footerspan">¥{{price}}</view>
		</view>
	</view>
</template>
<script>
	import service from '../../service.js';
	import loadMore from '../../components/load-more.vue'
	export default {
		components: {
			loadMore
		},
		data() {
			return {
				data: [],
				price: 0,
				ids: [],
				// 初始化全选按钮, 默认不选
				isCheckedAll: false,
				login: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
			}
		},
		onShow() {
			this.login = service.getUser().hasLogin;
			this.ids = [];
			this.isCheckedAll = false;
			if (service.getUser().hasLogin) {
				this.cartlist();
			}
		},
		onShareAppMessage() {
			return {
				title: "悠氧运动户外-综合网购首选-正品低价、品质保障、配送及时、轻松购物",
				path: '/pages/index/index',
				imageUrl: 'http://yoyound.com/images/logo5_4.jpg'
			}
		},
		onLoad(d) {
			uni.showShareMenu({
				withShareTicket: true
			});
			 
			//service.removeUser();


		},
		onPullDownRefresh() {

			this.isCheckedAll = false;
			this.ids = [];
			this.data = [];
			this.price = 0;
			setTimeout(() => {
				this.cartlist();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {


			withdrawal: function() {
				if (this.ids.length > 0) {
					let _orderNumber = this.ids.join(",");
					uni.showLoading({
						title: '申请中'
					});
					uni.request({ 
						url: service.agentWithdrawal(),
						data: {
							tokenId: service.getUser().tokenId,
							orderNumber:_orderNumber
						},
						success: (data) => {
							if (data.statusCode == 200 && data.data.code == 0) {
								  uni.showToast({
								 	title:'申请成功',success() {
								 		uni.navigateTo({
								 			url: "../distribution/hisCash"
								 		})
								 	} 
								 })
							} else {
								uni.showToast({
									title: data.data.msg,
									icon: 'none'
								})
							}
							uni.hideLoading();
						},
						fail: (data, code) => {
							console.log('fail' + JSON.stringify(data));
							uni.hideLoading();
						}
					})
				} else {
					uni.showToast({
						title: '请选择订单',
						icon: 'none'
					});
				}
			},

			checkedOne: function(index, item) {
				var self = this;
				setTimeout(function() {
					let id = item.orderNumber;
					item.state = !item.state;
					let idIndex = self.ids.indexOf(id);
					//console.log(idIndex);
					if (idIndex === -1) {

						// 选中该checkbox
						self.ids.push(id)
					} else {
						// 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
						self.ids.splice(idIndex, 1)
					}
					self.getPrices();

					//console.log(self.ids);
				}, 0)

			},
			getPrices: function() {
				this.price = 0;
				let _this = this;
				this.data.forEach(function(cart) {

					if (cart.state) {
						_this.price = _this.price + cart.price;
					}

				}, this)
			},
			getCheckedAll: function() {
				this.isCheckedAll = !this.isCheckedAll
				if (this.isCheckedAll) {
					// 全选时
					this.ids = []
					this.data.forEach(function(cart) {
						cart.state = true;
						this.ids.push(cart.orderNumber)
					}, this)
				} else {
					this.ids = [];
					this.data.forEach(function(cart) {
						cart.state = false;

					}, this)
				}
				this.getPrices();
			},
			cartlist: function() {

				uni.request({
					url: service.agentOrderList(),
					data: {
						tokenId: service.getUser().tokenId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.data = data.data.data;
						} else {
							uni.showToast({
								title: data.data.msg,
								icon: 'none'
							})
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
	.shoppingCarttop {
		padding: 0upx 10upx 10upx;
	}


	.shoppingCart {
		overflow: hidden;
		margin-bottom: 90upx;
	}

	.shoppingCart-list {
		margin-bottom: 24upx;
		background: #fff;
	}

	.shoppingCart-list .list-cent:first-child .list-centLeft {
		padding-top: 0;
	}

	.shoppingCart-list .Cart-icon {
		top: 40%;
	}

	.shoppingCart-list .list-cent1 .shoppingCart-icon,
	.shoppingCart-list .list-cent1 .shoppingCart-input {
		top: 31%;
	}

	.shoppingCart-list1 .list-cent {
		border-bottom: 1px solid #e2e2e2;
	}

	.shoppingCart-list1 .list-cent:last-child {
		border: none;
	}


	.list-cent {
		position: relative;
		overflow: hidden;
	}

	.list-cent .shoppingCart-input {
		width: 64upx;
		z-index: 100;
		opacity: 0;
	}



	.list-cent1 .list-centClose {
		height: 327upx;
	}

	.list-cent2 .list-centClose {
		height: 293upx;
	}

	.list-centLeft {
		position: relative;
		padding: 35upx 58upx 10upx 82upx;
		z-index: 200;
		background: #fff;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
	}

	.list-centClose {
		position: absolute;
		top: 0;
		right: 0;
		display: table;
		min-height: 228upx;
		width: 15%;
		text-align: center;
		background-color: #F95F61;
		color: #fff;
		font-size: 35upx
	}

	.list-centClosespan {
		display: table-cell;
		vertical-align: middle;
	}

	.swipeleft {
		transform: translateX(-15%);
		-webkit-transform: translateX(-15%);
	}

	.shoppingCart-icon,
	.shoppingCart-input,
	.addGoods-icon1 {
		position: absolute;
		left: 11upx;
		top: 50%;
		z-index: 100;
		display: block;
		margin-top: -35upx;

		height: 7upx;
	}




	.centRight-img {
		position: relative;
		float: left;
		width: 187upx;
		height: 187upx;
		background-size: 100% 100%;
		border: solid 1px #eeeeee;
		border-radius: 50%;
	}

	.centRight-img span {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 73upx;
		height: 73upx;
	}

	.centRight-cent {
		position: relative;
		margin-left: 211upx;
		padding-right: 24upx;
		height: 187upx;
	}

	.centRight-centh6 {
		margin-bottom: 6upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
		color: #333333;
	}

	.centRight-centp {
		font-size: 30upx;
	}

	.centRight-cent p span {
		display: inline-block;
		margin: 0 12upx;
		height: 30upx;
		border-left: 1px solid #ccc;
		vertical-align: -3upx;
	}

	.centRight-cent p strong {
		margin: 0 12upx;
		color: #f44834;
	}

	.centRight-centdiv {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 30upx;
		color: #333333;
	}

	.centRight-cent .happyi-mon {
		margin-left: 12upx;
		color: #EF593C;
	}

	.centRight-describe {
		margin-top: 24upx;
		width: 75%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
		color: #999;
	}

	.list-centData {
		position: absolute;
		bottom: 35upx;
		right: 24upx;
		width: 222upx;
	}

	.list-centData p {
		margin-top: 24upx;
		width: 100%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
		color: #999;
	}

	.list-centData1 {
		bottom: 104upx;
	}

	.centData-num {
		height: 47upx;
		line-height: 47upx;
		border: solid 1px #cccccc;
		border-radius: 5upx;
		color: #666;
	}

	.centData-numspan {
		width: 58upx;
		height: 100%;
		font-size: 58upx;
	}

	.centData-num .centData-reduce {
		float: left;
		border-right: solid 1px #cccccc;
	}

	.centData-num .centData-add {
		float: right;
		border-left: solid 1px #cccccc;
	}

	.centData-num input {
		float: left;
		width: 40%;
		height: 95%;
		background: none;
		border: none;
		font-size: 30upx;
		text-align: center;
	}

	.shoppingCart-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		padding-left: 3%;
		width: 97%;
		height: 90upx;
		line-height: 90upx;
		border-top: 1px solid #fefefe;
		background: #fff;
		font-size: 0;
	}

	.shoppingCart-footerlabel {
		display: inline-block;
		/* 	padding-left: 0.65rem; */
		font-size: 30upx;
		color: #333333;
		/* background: url(http://op.yoyound.com/static/images/nocheck.png) no-repeat left center; */
		/* 	background-size: 58upx 58upx; */
	}

	.shoppingCart-footerlabelstrong {
		margin: 0 6upx;
	}

	.shoppingCart-footer .footer-btn {
		float: right;
		width: 258upx;
		height: 100%;
		text-align: center;
		background: #e05e55;
		font-size: 37upx;
		color: #ffffff;
	}

	.shoppingCart-footerspan {
		margin-right: 35upx;
		float: right;
		font-size: 30upx;
		color: #EF593C;
	}

	.shoppingCart-footer .footer-btn1 {
		margin: 24upx 35upx 0;
		float: right;
		width: 205upx;
		/* height: 0.54rem;
		line-height: 0.54rem; */
		text-align: center;
		font-size: 30upx;
		color: #333333;
		border: 1px solid #CCCCCC;
		border-radius: 9upx;
	}
</style>
