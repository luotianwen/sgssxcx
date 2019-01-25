<template>
	<view class="shoppingCarttop">
		<view class="shoppingCart">
			<view class="shoppingCart-list shoppingCart-list1">
				<view class="shoppingCart-listCent">

					<view class="list-cent" v-for="(item, index) in data" :key="index" v-show="login">
						<view :class="['list-centLeft',{'swipeleft':item.className}]" @touchstart="touchStart($event,index)" @touchmove="touchMove($event,index,item)">
							<view class="shoppingCart-icon">
								<input type="checkbox" :checked="item.state" @click='checkedOne(index,item)'>
							</view>
							<!-- <label for="checkbox00" class="shoppingCart-icon Cart-icon"></label> -->
							<view class="list-centRight ">
								<image class="centRight-img" @click="goGoodDetail(item)" :src="item.logo"></image>


								<view class="centRight-cent">
									<view class="centRight-centh6">{{item.name}}</view>
									<view class="centRight-centp">{{item.spec1}} &nbsp; {{item.spec2}}</view>
									<view class="centRight-centdiv">应付:<span class="happyi-mon">¥{{item.price}}</span></view>
								</view>
							</view>
							<view class="list-centData">
								<view class="centData-num ">
									<view class="centData-numspan centData-reduce" @click="getReduce(item)">－</view> <input type="number" readonly
									 v-model="item.number">
									<view class="centData-numspan centData-add" @click="getAdd(item)">＋</view>
								</view>
								<!---->
							</view>

						</view>
						<view class="list-centClose" @tap="removeCart(item,index)">
							<view class="list-centClosespan">删除</view>
						</view>
					</view>

					<view v-show="!login" style="margin-top: 50%; ">
						<button     open-type="getUserInfo" @getuserinfo="onGotUserInfo"> 登录</button>
					</view>
				</view>
			</view>

		</view>
		<view class="shoppingCart-footer ">
			<view class="shoppingCart-footerlabel"> <input type='checkbox' :checked="ids.length!=0&&ids.length === data.length"
				 @click="getCheckedAll()">全选</view>
			<view class="shoppingCart-footerlabelstrong footer-btn" @click="settlement()">结算</view>
			<view class="shoppingCart-footerspan">¥{{price}}</view>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				data: [],
				price: 0,
				ids: [],
				swipeX: true,
				swipeY: true,
				x: "",
				y: "",
				X: "",
				Y: "",
				// 初始化全选按钮, 默认不选
				isCheckedAll: false,
				login:false
			}
		},
		onShow() {
			this.login=service.getUser().hasLogin;
			this.ids = [];
			this.isCheckedAll = false;
			if (service.getUser().hasLogin) {
				this.cartlist();
			} else {
				this.getUserInfo();
			
			}
		},
		onShareAppMessage() {
			return {
				title:  "悠氧商城",
				path: '/pages/index/index',
				imageUrl:'http://yoyound.com/images/logo5_4.jpg'
			}
		},
		onLoad(d) {
             uni.showShareMenu({
                    withShareTicket: true
                });
			uni.showLoading({
				title: '加载中'
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
			settlement: function() {
				if (this.ids.length > 0) {
					uni.navigateTo({
						url: "../order/preorder?cartId=" + this.ids.join(",")
					})

				} else {
					uni.showToast({
						title: '请选择商品',
						duration: 2000
					});
				}
			},
			removeCart: function(item, index) {
				uni.showLoading({
					title: '加载中'
				});
				console.log("removeCart");
				let self = this;
				uni.request({
					url: service.removeCart(),
					data: {
						tokenId: service.getUser().tokenId,
						cartId: item.cartId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							let idIndex = self.ids.indexOf(item.cartId);
							if (idIndex >= 0) {
								self.ids.splice(idIndex, 1)
							}
							let _data = [];
							self.data.forEach(function(cart) {
								if (cart.cartId != item.cartId) {
									//self.data.rem
									_data.push(cart);
								}

							}, this)
							self.data = _data;
							//self.data.splice(index, 1)
							self.getPrices();
						}
						uni.hideLoading();
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				});
			},
			//数量减
			getReduce: function(item) {
				if (item.number <= 1) {
					item.number = 1;

				} else {
					item.number--;
				}
				this.getPrices();
				this.syncSku(item);
			},
			//数量加
			getAdd: function(item) {
				if (item.number < item.stock) {
					item.number++;
				}
				this.getPrices();
				this.syncSku(item);
			},
			syncSku: function(item) {
				uni.request({
					url: service.syncCart(),
					data: {
						tokenId: service.getUser().tokenId,
						cartId: item.cartId,
						number: item.number
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {


						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

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
						avatarUrl: infoRes.userInfo.avatarUrl
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							var d = data.data.data;
							d.hasLogin = true;
							service.setUser(d);
							this.uerInfo = d;
							this.login = true;
							this.cartlist();
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
			
					}
				})
			},
			getUserInfo() { 
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						 _this.code=loginRes.code;
						 uni.hideLoading();
					}
				});

			},
			checkedOne: function(index, item) {
				var self = this;
				setTimeout(function() {
					let id = item.cartId;
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
					if (cart.number < 1) {
						cart.number = 1;
					}
					if (cart.state) {
						_this.price = _this.price + (cart.number * cart.price);
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
						this.ids.push(cart.cartId)
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
					url: service.cartList(),
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
			goGoodDetail: function(item) {
				uni.navigateTo({
					url: "../goods/goodsDetail?goodsId=" + item.goodsId + "&name=" + item.name
				})
			}
		}
	}
</script>

<style>
	.shoppingCarttop {
		padding: 20upx 10upx 10upx;
	}


	.shoppingCart {
		overflow: hidden;
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
		font-size: 24upx;
		color: #333333;
	}

	.centRight-centp {
		font-size:  24upx;
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
		font-size: 24upx;
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
		font-size: 24upx;
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
		font-size: 24upx;
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
		font-size: 24upx;
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
		font-size: 24upx;
		color: #EF593C;
	}

	.shoppingCart-footer .footer-btn1 {
		margin: 24upx 35upx 0;
		float: right;
		width: 205upx;
		/* height: 0.54rem;
		line-height: 0.54rem; */
		text-align: center;
		font-size:  24upx;
		color: #333333;
		border: 1px solid #CCCCCC;
		border-radius: 9upx;
	}
</style>
