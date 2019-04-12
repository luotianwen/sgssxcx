<template>
	<view id="goodsDetails">
			<view class="purchase-header">
				 <strong class="header-news">{{cartCount}}</strong> <span class="header-cart"
				 @tap="goCart()"></span>
			</view>
		<view class=" page-section-spacing swiper" style="background: #fff;">
			<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="height: 700upx;width: 96%;padding-left: 2%;">
				<swiper-item v-for="item in data.images" :key="item">
					<view class="swiper-item  ">
						<image :src="item" style="width: 100%;height: 700upx;" />
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="goodsDetails-title">
			<view class="goodsDetails-titleh6">{{data.name}}</view>
			<div class="title-money clearfix"><span class="title-moneyNum"><span>¥</span>{{data.price}}</span><span class="title-moneyRight">月销{{data.sales}}笔</span></div>
		</view>

		<view class="goodsDetails-InfoCent">
			<view style="text-align: center;"> 商品介绍</view>

			<view class="InfoCent-Img">
				<rich-text class="richText" :nodes="data.details"></rich-text>
			</view>
		</view>
		<view class="goodsDetails-butt">
			
			<a class="goodsDetails-buttBtn" @click="addCart()">加入购物车</a> 
			<a class="goodsDetails-buttColor"  @click="buy()">立即购买</a>
			<!-- <a class="goodsDetails-buttBtn1" @click="goCart()">购物车</a> -->
		</view>


		<view class="goodsDetails-choice" v-show="show">
			<view class="goodsDetails-choiceBtn" @click="show=false">×</view>
			<view class="choice-top goodsDetails-choicediv">
				<image :src="data.logo" class="choice-topstrong"></image>
				<view class="choice-topmt choice-topp goodsDetails-choicep">价格：&yen; {{price}} </view>
				<view class="choice-topp goodsDetails-choicep ">已选：{{spec1}}&nbsp;&nbsp; {{spec2}} </view>
				<view class="choice-topp goodsDetails-choicep stocks">库存：{{stock}}</view>
				<!---->
			</view>
			<view class="goodsDetails-choiceCent goodsDetails-choicediv">
				<view class="choice-cent">
					<view class="choice-centp goodsDetails-choicep">{{data.spec1}}</view>
					<view v-for="specc1 in data.spec1s" :key="specc1" :class="['choice-centspan',{'choice-centactive':spec1==specc1}]"
					 @click="getInfo(1,specc1)"> {{specc1}}</view>
				</view>
				<div class="choice-cent">
					<view class="choice-centp goodsDetails-choicep">{{data.spec2}}</view>
					<view v-for="specc2 in data.spec2s" :key="specc2" :class="['choice-centspan',{'choice-centactive':spec2==specc2}]"
					 @click="getInfo(2,specc2)">{{specc2}}</view>
				</div>
				<div class="choice-butt">
					<view class="choice-buttp goodsDetails-choicep">购买数量</view>
					<div class="choice-buttDiv  ">
						<view class="choice-buttspan choice-buttBtn1" @click="getReduce()">－</view> <input type="number" v-model="number"
						 name="num">
						<view class="choice-buttspan choice-buttBtn2" @click="getAdd()">＋</view>
					</div>
				</div>
			</view>
		</view>


	</view>
</template>

<script>
	import service from '../../service.js';

	export default {

		data() {
			return {
				goodsId: "",
				data: "",
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				show: false,
				price: "",
				stock: "",
				spec1: "",
				spec2: "",
				number: 1,
				skuId: "",
				hasLogin: false,
				type: 0,
				cartCount:0,
				agentId:"",
				 
			}
		},
         onShow() {
         	this.getCartData();
         },
		 onShareAppMessage() {
		 	return {
		 		title:  this.data.name,
		 		path: "/pages/goods/goodsDetail?goodsId=" + this.goodsId + "&name=" + this.data.name+"&agentId="+this.agentId,
		 		imageUrl:''//this.data.images[0]
		 	}
		 },
		onLoad(d) {
			wx.showShareMenu({
			  withShareTicket: true
			});
			uni.setNavigationBarTitle({
				title: d.name
			})
			this.goodsId = d.goodsId;
			this.getDetail();
			
			if(d.agentId!=undefined&&d.agentId!=""){
				console.log(JSON.stringify(d));
				//this.userAgentId=d.agentId;
				service.setAgent(d.agentId);
			}
			if (service.getUser().hasLogin){
			    this.agentId=service.getUser().tokenId;
			 }
			 //console.log("this.agentId"+this.agentId);
		},
		methods: {
				getCartData(){
				let _this=this;
				if (!service.getUser().hasLogin) {
					return ;
					}
				uni.request({
					url: service.getCartData(),
					 data: {
					 	tokenId: service.getUser().tokenId
					 },
					success: (data) => {
						console.log(JSON.stringify(data.data.data))
						if (data.statusCode == 200 && data.data.code == 0) {
							 _this.cartCount=data.data.data;
							 
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
 

			//选择及时改变
			getInfo: function(type, item) {
				if (type == 1) {
					this.spec1 = item;
				} else if (type == 2) {
					this.spec2 = item;
				}

				if (this.spec1.length > 0 && this.spec2.length > 0) {
					this.getSkuInfo();
				}
			},
			getSkuInfo: function() {
				var skus = this.data.skus;
				this.skuId = "";
				this.stock = 0;
				this.price = "";
				for (var s in skus) {
					// console.log(skus[s].spec1+"spec1"+(skus[s].spec1==this.spec1)+"  "+this.spec1);
					//console.log(skus[s].spec2+"spec2"+(skus[s].spec2==this.spec2)+"  "+this.spec2);
					if (skus[s].spec1 == this.spec1 && skus[s].spec2 == this.spec2) {
						this.skuId = skus[s].skuId;
						this.stock = skus[s].stock;
						this.price = skus[s].price;
						break;
					}
				}
			},
			//数量减
			getReduce: function() {
				if (this.number == 1) {
					return false;
				} else {
					this.number--;
				}
			},
			//数量加
			getAdd: function() {
				if (this.number < this.stock) {
					this.number++;
				}
			},
			goCart: function() {
				uni.switchTab({
					url: "../cart/cart"
				})
			},
			addCart: function() {
				
				this.type = 0;
				if (this.show) {
					if(this.number> this.stock){
						uni.showModal({
							content: "库存不够",
							showCancel: false
						});
						return;
					}
					if (this.skuId.length > 0) {
						this.hasLogin = service.getUser().hasLogin;

						uni.showLoading({
							title: '加载中'
						});
						if (!this.hasLogin) {
							 uni.showToast({
							 	icon: 'none',
							 	title: '请登录'
							 })
							 return ;
						} else {
							this.addCartToService();
						}
						uni.hideLoading();
					} else {
						uni.showToast({
							icon:'none',
							title: "请选择商品"
						})
					}
				}
				this.show = true;

			},
			buy: function() {
				this.type = 1;
				
				if (this.show) {
					if(this.number> this.stock){
						uni.showModal({
							content: "库存不够",
							showCancel: false
						});
						return;
					}
					if (this.skuId.length > 0) {

						this.hasLogin = service.getUser().hasLogin;

						uni.showLoading({
							title: '加载中'
						});
						if (!this.hasLogin) {
							uni.showToast({
								icon: 'none',
								title: '请登录'
							})
							return;
						} else {
							this.addCartToService()
						}

						uni.hideLoading();

					} else {
						uni.showToast({
							icon:'none',
							title: "请选择商品"
						})
					}
				}
				this.show = true;
			},
			addCartToService: function() {


				uni.request({
					url: service.addCart(),
					data: {
						skuId: this.skuId,
						tokenId: service.getUser().tokenId,
						number: this.number,
						type: this.type
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							if (this.type == 0) {
								uni.showToast({
									title: "加入购物车成功"
								})
							}
							else{
								console.log(data.data.data.cartId);
								  uni.navigateTo({
									url: "../order/preorder?cartId="+data.data.data.cartId
								})  
								
							}
							this.show = false;
							this.skuId = "";
							this.stock = 0;
							this.price = "";
							this.spec1 = "";
							this.spec2 = "";
							this.type = 0;
						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						if (this.type == 0) {
							uni.showToast({
								title: "加入购物车失败"
							})
						}
					}
				})

			},
			getDetail: function() {
				uni.request({
					url: service.getGoodsByGooId(),
					data: {
						goodsId: this.goodsId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.data = data.data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			}
		}
	}
</script>

<style>
	 
	 
	 .swiper-item {
	 	display: block;
	 	width: 100%;
	 	text-align: center;
	 }
	 
	 .swiper-list {
	 	/* margin-top: 40upx; */
	 	margin-bottom: 0;
	 }
	 
	.purchase-header {
		/* padding-left: 2%; */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 84upx;
	}
	
	.purchase-header span {
		position: absolute;
		top: 0;
		display: block;
		z-index: 1000;
		width:  70upx;
		height: 70upx;
		border-radius: 50%;
	}
	
	.purchase-header .header-cart {
		right: 47upx;
		background: url(http://op.yoyound.com/static/images/cart1.png) no-repeat center;
		background-size: 100% 100%;
	}
	
	.purchase-header .header-sear {
		padding-left: 70upx;
		width: 72%;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 30upx;
		color: #999;
		border-radius: 35upx;
		background: #eeeeee url(http://op.yoyound.com/static/images/search.png) no-repeat 205upx center;
		background-size: 41upx 41upx;
		/* margin: 0.06rem 0 0 0.351upx;
		padding-left: 70upx;
		width: 5rem;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 0.26rem;
		color: #999;
		border-radius: 0.351upx;
		background: #eeeeee url(http://op.yoyound.com/static/images/search.png) no-repeat 1.75rem center;
		background-size: 41upx 41upx; */
	}
	
	.purchase-header .header-news {
		/* display: block;
		position: absolute;
		top: 0.243upx;
		right: 0.1243upx;
		z-index: 1001;
		height: 0.26rem;
		line-height: 0.26rem;
		padding: 0 12upx;
		font-size: 0.243upx;
		color: #FFFFFF;
		background: #EF593C;
		border-radius: 100px; */
		
		display: block;
		position: absolute;
		top: 0;
		/* top: 0.243upx; */
		right: 14upx;
		/* z-index: 1001; */
		height: 30upx;
		line-height: 30upx;
		padding: 0 12upx;
		font-size: 23upx;
		color: #FFFFFF;
		background: #EF593C;
		border-radius: 117upx;
	}
	
	
	#goodsDetails {
		position: relative;
		padding-bottom: 0.98rem;
	}




	.goodsDetails-title {
		padding: 23upx 35upx 0;
		background: #fff;
	}

	.goodsDetails-titleh6 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		white-space: inherit;
		font-size: 36upx;
		color: #333333;
	}

	.goodsDetails-title strong {
		margin: 0 10upx;
		font-size: 53upx;
	}

	.goodsDetails-title .title-money {
		height: 129upx;
		line-height: 129upx;
		font-size: 30upx;
		color: #999;
	}

	.goodsDetails-title .title-moneyNum {
		font-size: 30upx;
		/* color: #EF593C; */
	}

	.goodsDetails-title .title-moneyNum span {
		margin-right: 10upx;
		font-size: 30upx;
	}



	.goodsDetails-title .title-moneyRight {
		float: right;
	}

	.goodsDetails-top {
		padding-left: 28upx;
		background: #fff;
	}






	.goodsDetails-butt {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2000;
		height: 100upx;
		line-height: 100upx;  
		width: 100%;
		background: #fff;
		text-align: right;
		border-top: 1px solid #eee;
		font-size: 0;
		/* margin-bottom: 5upx; */
	}

	.goodsDetails-butt>span {
		position: absolute;
		top: 0;
		display: block;
		width: 117upx;
		height: 100%;
		border-right: 1px solid #e2e2e2;
	}

	.goodsDetails-butt a {
		float: right;
		font-size: 36upx;
		color: #fff;
		width: 50%;
		height: 100%;
		text-align: center;
	}

	.goodsDetails-butt .goodsDetails-buttBtn {
		background: #dec171;
	}

	.goodsDetails-butt .goodsDetails-buttBtn1 {
		background:#e05e55;
	}

	.goodsDetails-butt .goodsDetails-buttColor {
		background:#e05e55;
	}
 



	.goodsDetails-Btn1 {
		margin-top: 105upx;
	}

	.goodsDetails-InfoCent {
		padding-bottom: 42upx;
		background: #fff;
	}
 

	.goodsDetails-InfoCent .InfoCent-Img {
		padding: 10upx;
		font-size: 30upx;
		color: #333;
	}

	 

	.goodsDetails-choice {
		padding: 10upx 0;
		position: fixed;
		left: 0;
		bottom: 85upx;
		z-index: 2000;
		width: 100%;
		background: #fff;
	}

	.goodsDetails-choicediv {
		margin: 0 35upx;
		overflow: hidden;
	}

	.goodsDetails-choice .goodsDetails-choiceCent {
		/* height: 330upx; */
		overflow-y: auto;
	}

	.goodsDetails-choicep {
		font-size: 30upx;
		color: #333333;
	}

	.goodsDetails-choice p {
		font-size: 30upx;
		color: #333333;
	}

	.goodsDetails-choice .goodsDetails-choiceBtn {
		position: absolute;
		top: 12upx;
		right: 35upx;
		font-size: 70upx;
	}

	.goodsDetails-choice .choice-top .choice-topmt {
		padding-top: 18upx;
	}

	.goodsDetails-choice .choice-top .stocks {
		color: #999;
	}

	.goodsDetails-choice .choice-topstrong {
		float: left;
		width: 243upx;
		height: 243upx;
		background-size: 100% 100%;
	}

	.goodsDetails-choice .choice-topp {
		margin-top: 6upx;
		padding-left: 255upx;
	}

	.goodsDetails-choice .choice-cent,
	.goodsDetails-choice .choice-butt {
		font-size: 0;
	}

	.goodsDetails-choice .choice-cent {
		padding-bottom: 12upx;
		border-bottom: 1px solid #f1f1f1;
	}

	.goodsDetails-choice .choice-centp {
		height: 50upx;
		line-height: 50upx;
	}

	.goodsDetails-choice .choice-centspan {
		display: inline-block;
		/* margin: 0 12upx 0.243upx 0; */
		padding: 0 30upx;
		height: 50upx;
		line-height: 50upx;
		background-color: #ffffff;
		border-radius: 100px;
		border: solid 1px #7c8895;
		color: #666;
		font-size: 30upx;
		
		 
	}

	.goodsDetails-choice .choice-butt .choice-buttDiv {
		position: absolute;
		top: 0;
		right: 0;
		width: 351upx;
		height: 40upx;
		line-height:40upx;
		border: 1px solid #eee;
		text-align: center;
		color: #666;
		font-size: 33upx;
	}

	.goodsDetails-choice .choice-centactive {
		background-color: #d3f0ee;
		 color: #10aca4;
	    border: solid 1px #10aca4;
	}

	.goodsDetails-choice .choice-butt {
		position: relative;
		margin-top: 0.243upx;
	}

	.goodsDetails-choice .choice-buttp {
		height: 50upx;
		line-height: 50upx;
	}

	.goodsDetails-choice .choice-butt .choice-buttview {
		position: absolute;
		top: 0;
		right: 0;
		width: 351upx;
		height: 50upx;
		line-height: 50upx;
		border: 1px solid #eee;
		text-align: center;
		color: #666;
		font-size: 33upx;
	}

	.goodsDetails-choice .choice-butt input {
		float: left;
		width: 40%;
		height: 95%;
		background: none;
		border: none;
		font-size: 30upx;
		text-align: center;
	}

	.goodsDetails-choice .choice-buttspan {
		display: inline-block;
		width: 87upx;
		height: 100%;
		font-size: 59upx;
	}

	.goodsDetails-choice .choice-butt .choice-buttBtn1 {
		float: left;
		border-right: 1px solid #eee;
	}

	.goodsDetails-choice .choice-butt .choice-buttBtn2 {
		float: right;
		border-left: 1px solid #eee;
	}
</style>
