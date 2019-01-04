<template>
	<view class="">
		<div id="address" class="">
			<div class="circleBar-top "> <span class="seeIndex-setUp" @tap="addAddress()">新建</span></div>
			<div class="address-cent">

				<view class="address-list" v-for="(item, index) in data" :key="index">
					<view :class="['address-listLeft',{'swipeleft':item.className}]" @touchstart="touchStart($event,index)" @touchmove="touchMove($event,index,item)">
						<div class="address-listCent">
							<h6> <span class="address-listName">{{item.consignee}}</span>{{item.phone}}</h6>
							<p>{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.address}}</p>
						</div><strong class="address-modify"></strong>
					</view>

					<div class="sl-opts"><span @tap="removeAddreee(item,index)">删除</span></div>

				</view>

			</div>

		</div>
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
		onLoad() {
			this.addresslist();
		},
		onPullDownRefresh() {
			this.addresslist();
			uni.stopPullDownRefresh();

		},
		methods: {
			addresslist: function() {
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
				removeAddreee: function(item, index) {
				uni.showLoading({
					title: '加载中'
				});
			 
				let self = this;
				uni.request({
					url: service.removeAddreee(),
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
		height: 0.89rem;
		line-height: 0.89rem;
		background: #fff;
		text-align: center;
		font-size: 0.34rem;
		color: #333;
		float: right;
	}

	.circleBar-top .seeIndex-setUp {
		position: absolute;
		top: 0;
		right: 0.2rem;
		font-weight: inherit;
	}
 
	.address-cent {
		margin-top: 0.5rem;
	}

	.address-cent .active .address-listLeft {
		background-color: #e5f4ff;
	}

	.address-list {
		position: relative;
		width: 100%;
		font-size: 0.3rem;
		color: #333;
		border-bottom: 1px solid #e2e2e2;
		overflow: hidden;
	}

	.address-list .address-listLeft {
		float: left;
		position: relative;
		padding: 0.35rem 0 0 0.3rem;
		height: 1.2rem;
		z-index: 100;
		width: 96%;
		background: #fff;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
	}

	.address-list .address-modify {
		position: absolute;
		top: 50%;
		right: 0.35rem;
		display: block;
		margin-top: -0.3rem;
		width: 0.35rem;
		height: 0.45rem;
		background: url(https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMediaVd-wirt.png) no-repeat center;
		background-size: 0.35rem 0.45rem;
	}

address-listName {
  max-width: 48%;
  margin-right: 0.2rem;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address-default {
  margin-right: 0.2rem;
  display: inline-block;
  width: 0.7rem;
  height: 0.32rem;
  line-height: 0.32rem;
  text-align: center;
  background-color: #F95F61;
  border-radius: 0.04rem;
  font-size: 0.26rem;
  color: #fff;
  vertical-align: 0.02rem;
}
.address-listCent {
  padding-right: 0.8rem;
}
.address-listCent p {
  margin-top: 0.05rem;
  font-size: 0.26rem;
  color: #999;
}
.address-listCent h6 {
  position: relative;
  font-size: 0.3rem;
  color: #000;
}
.address-list:last-child {
  border-bottom: none;
}
.addAddress-top,
.addAddress-cent,
.addAddress-butt,
.addAddress-default {
  margin-top: 0.2rem;
  padding-left: 0.3rem;
  background: #fff;
  font-size: 0.3rem;
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
  margin: 0 0.2rem 0;
  width: 80.5%;
  height: 0.6rem;
  background: transparent;
  border: none;
  font-size: 0.3rem;
  color: #999;
}
.addAddress-name,
.addAddress-phone,
.addAddress-data,
.addAddress-address,
.addAddress-default {
  height: 1rem;
  line-height: 1rem;
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
  padding: 0.3rem 0;
}
.addAddress-region > span {
  display: inline-block;
  vertical-align: top;
}
.addAddress-region .pc-box {
  margin: 0 0.25rem;
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
		height: 1.56rem;
		line-height: 1.56rem;
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
		height: 1.15rem;
	}

	.address-cent1 .address-listLeft h6 {
		margin-bottom: 0.08rem;
		font-size: 0.3rem;
	}

	.address-cent1 .returnAddress-default {
		margin-right: 0.1rem;
		display: inline-block;
		width: 0.7rem;
		height: 0.32rem;
		line-height: 0.32rem;
		text-align: center;
		background-color: #d45048;
		border-radius: 0.04rem;
		font-size: 0.22rem;
		color: #fff;
	}

	.address-cent1 .returnAddress-listName {
		margin-right: 0.1rem;
	}

	.address-cent1 .sl-opts {
		height: 1.5rem;
		line-height: 1.5rem;
	}
</style>
