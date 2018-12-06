<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<div class="purchase-header">
				<div class="header-sear" @click=goSearch()>请输入商品名称</div><strong class="header-news">14</strong> <span class="header-cart" @click=goCart()></span>
			</div>
			<view class="page-section page-section-spacing swiper">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="height: 240px;">
					<swiper-item v-for="item in itemList" :key="item">
						<view class="swiper-item  ">
							<image :src="item" style="width: 100%;" />
						</view>
					</swiper-item>

				</swiper>
			</view>
		</view>
		<view>
			<div class="consult "><span>运动户外</span><span>健康生活</span><span>悠氧播报</span> </div>
			<div class="header-butt "><a>优惠券</strong><span>满300减50</span></a> <a>优惠券<i></i></strong><span>满100减20</span></a>
			</div>
		</view>
		<view>
			<div class="purchase-band"><span style="float: left;font-size: 22upx; "> 品牌馆</span><span style="float: right;font-size: 22upx; " @click="goBrandList()">更多</span></div>
		</view>
		<view>
			<div class="purchase-nav clearfix"><span @click="goBrandSearch()" style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp3.png), url();">阿迪</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp3.png), url();">Nike</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp5.png), url();">彪马</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp1.png), url();">李宁</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp2.png), url();">汉道</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp7.png), url();">卡帕</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp6.png), url();">匡威</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp6.png), url();">特步</span><span
				 style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/09/sy_gd.png), url();">狼爪</span></div>
		</view>
		<view>
			<div class="purchase-band"><span style="float: left;font-size: 30upx; "> 商品列表</span> </div>
		</view>
		<view class="uni-list">
			<div class="goodsList-cent  ">
				
				<a  @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119204036.png), url();"></div>
					<h6>女士包</h6><span>销量 1000</span>
					<p>售价：¥66</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119202901.jpg), url();"></div>
					<h6>女衣服</h6><span>销量 1000</span>
					<p>售价：¥38</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119203538.png), url();"></div>
					<h6>荣耀</h6><span>销量 1000</span>
					<p>售价：¥100</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/12/20181203152319.png), url();"></div>
					<h6>蓝牙音箱</h6><span>销量 1000</span>
					<p>售价：¥49</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119205303.png), url();"></div>
					<h6>休闲包</h6><span>销量 1000</span>
					<p>售价：¥88</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/11/20181114091039.png), url();"></div>
					<h6>闹钟</h6><span>销量 1000</span>
					<p>售价：¥0.49</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181113091034.jpg), url();"></div>
					<h6>奥康</h6><span>销量 1000</span>
					<p>售价：¥0.8</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/12/20181203201134.png), url();"></div>
					<h6>洗手机</h6><span>销量 1000</span>
					<p>售价：¥79</p>
				</a><a @click="goDetail()" class="goodsList-list">
					<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/1bd6e64da75c4014b385ae9bdf0a6798/images/shop/product/2018/12/20181201113309.jpg), url();"></div>
					<h6>沙发</h6><span>销量 1000</span>
					<p>售价： ¥ 88 </p>
				</a>
				<a v-for="(value,key) in listData" :key="key"   click="goDetail(value)"   class="goodsList-list">
					<image  class="follow-centImg" :src="value.cover"></image> 
					<p>{{value.title}}<p><span>销量 {{value.author_name}}</span>
					<p>售价： ¥ 18 </p>
				</a>
				</div>
				
		</view>
		 
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'swiper',
				itemList: [
					'http://yoyound.com/images/201802/source_img/1991_P_1517735808303.jpg',
					'http://yoyound.com/images/201802/goods_img/1983_P_1517723513939.jpg',
					'http://www.yoyound.com/images/201809/thumb_img/6256_thumb_G_1536824618570.jpg'
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,



				listData: [],
				last_id: "",
				reload: false
			}
		},
		onLoad() {

			this.getList();
		},
		onUnload() {

			this.listData = []

		},

		onReachBottom() {


			setTimeout(() => {
				this.getList();
			}, 300);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');

			setTimeout(() => {
				this.getList();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			getList() {
				var data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				};
				if (this.last_id) { //说明已有数据，目前处于上拉加载
					data.minId = this.last_id;
					data.time = new Date().getTime() + "";
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: (data) => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			
			goBrandList:function(){
				uni.navigateTo({
					url:"../brand/brandList"
				}) 
			},
			goBrandSearch:function(){
				uni.navigateTo({
					url:"../brand/search"
				}) 
			},
			goSearch:function(){
				uni.navigateTo({
					url:"../search/search"
				}) 
			},
			goCart:function(){
				uni.switchTab({
					 url:"../cart/cart"
				}) 
			},
			goDetail: function(e) {

			 
				uni.navigateTo({
					url: "../goods/goodsDetail?detailDate=" 
				})
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: e.published_at,
						title: e.title
					});
				});
				return newItems;
			}
		}
	}
</script>

<style>
	.goodsList-cent {
		margin-top: 0.1rem;
		padding: 0.3rem 0 0.2rem;
		background: #fff;
		font-size: 0;
	}

	.goodsList-list {
		display: block;
		position: relative;
		margin-bottom: 0.3rem;
		padding: 0 0.3rem 0 2.9rem;
		height: 2.4rem;
		font-size: 0;
	}

	.goodsList-list .follow-centImg {
		position: absolute;
		top: 0;
		left: 0.3rem;
		width: 240upx;
		height: 240upx;
		background-position: center center;
		background-size: cover;
	}

	.goodsList-list h6 {
		padding-top: 0.05rem;
		font-size: 0.3rem;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		white-space: inherit;
	}

	.goodsList-list span {
		display: inline-block;
		margin: 0.25rem 0;
		padding: 0 0.1rem;
		height: 0.3rem;
		line-height: 0.3rem;
		font-size: 0.2rem;
		/* color: #fff; */
		/* background: #FC8872; */
		border-radius: 100px;
	}

	.goodsList-list p {
		font-size: 0.24rem;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.purchase-header {
		padding: 0.2rem 0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 0.71rem;
	}

	.purchase-header span {
		position: absolute;
		top: 0.2rem;
		display: block;
		z-index: 1000;
		width: 0.76rem;
		height: 0.76rem;
		border-radius: 50%;
	}

	.purchase-header .header-cart {
		right: 0.3rem;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-cart.png) no-repeat center;
		background-size: 100% 100%;
	}

	.purchase-header .header-sear {
		margin: 0.06rem 0 0 0.3rem;
		padding-left: 0.6rem;
		width: 5rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		font-size: 0.26rem;
		color: #999;
		border-radius: 0.3rem;
		background: #eeeeee url(https://cs.h5.hongkzh.com/imgs/see/index/seeIndex-sear.png) no-repeat 1.75rem center;
		background-size: 0.35rem 0.35rem;
	}

	.purchase-header .header-news {
		display: block;
		position: absolute;
		top: 0.2rem;
		right: 0.12rem;
		z-index: 1001;
		height: 0.26rem;
		line-height: 0.26rem;
		padding: 0 0.1rem;
		font-size: 0.2rem;
		color: #FFFFFF;
		background: #EF593C;
		border-radius: 100px;
	}

	 

	.page-body-info {
		background-color: transparent;
	}

	.page-body-content {
		padding: 0 30upx;
	}

	.text {
		margin: 16upx 0;
		width: 690upx;
		background-color: #fff;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		color: #555;
		border-radius: 8upx;
	}



	.purchase-band {
		padding: 0upx 32upx 0upx 32upx;
	}

	.purchase-nav {
		padding: 0 32upx 50upx;
	}

	.purchase-nav span {
		position: relative;
		margin-top: 40upx;
		padding-top: 102upx;
		float: left;
		width: 130upx;
		text-align: center;
		font-size: 22upx;
		color: #666666;
		background: no-repeat top center;
		background-size: 86upx 86upx;
	}

	.consult {
		/* margin-bottom: 60upx; */
		width: 100%;
		/* height: 60upx; */
		font-size: 0;
		text-align: center;
		background-color: #fff;
	}

	.consult span {
		float: left;
		  padding-top: 6%;  
		text-align: center;
		width: 33%;
		display: block;
		padding-left: 1upx;
		font-size: 30upx;
		color: #666;
		border: #333333;
		height: 80upx;
		border-color: #007AFF;
		/* background-color: #F0AD4E; */
	}

	.header-butt {
		margin-bottom: 20upx;
		width: 100%;
		height: 120upx;
		font-size: 0;
		background-color: #fff;
	}

	.header-butt a {
		float: left;
		padding-top: 3%;
		width: 50%;
		text-align: center;
	}

	.header-butt a strong {
		position: relative;
		margin-top: 0.2rem;
		font-size: 0.3rem;
		color: #333;
		font-weight: inherit;
	}

	.header-butt a span {
		display: block;
		font-size: 0.26rem;
		color: #666;
	}

	.swiper-item {
		display: block;
		width: 100%;
		text-align: center;
	}

	.swiper-list {
		/* margin-top: 40upx; */
		margin-bottom: 0;
	}

	.page-section-title {
		padding: 0;
		margin-top: 60upx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 0;
		color: #353535;
		font-size: 30upx;
	}
</style>
