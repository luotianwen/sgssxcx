<template>
	<view class="">
		<div  >
			<div class="goodsList-header">
				<!-- <header class="discount-header"><span class="goback"></span> 商品列表 <span class="discount-sears"></span></header> -->
				<div class="newProduct-screen  "><span>热销</span> <span>综合<strong></strong></span><span>价格 <span class="collage-icon2"></span></span></div>
			</div>
			 <div class="goodsList-cent  ">
			 	
			 	<a @click="goGoodDetail()" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119204036.png), url();"></div>
			 		<h6>女士包</h6><span>销量 1000</span>
			 		<p>售价：¥66</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=05ee30695f7c41fe9789753d32c3e0f5" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119202901.jpg), url();"></div>
			 		<h6>女衣服</h6><span>销量 1000</span>
			 		<p>售价：¥38</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=27560bc2822f49f4bc430a85107b223b" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119203538.png), url();"></div>
			 		<h6>荣耀</h6><span>销量 1000</span>
			 		<p>售价：¥100</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=2f123b523af64538b12b6cff46494532" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/12/20181203152319.png), url();"></div>
			 		<h6>蓝牙音箱</h6><span>销量 1000</span>
			 		<p>售价：¥49</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=59b5f5b784194dda89e54d4daca1cc10" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181119205303.png), url();"></div>
			 		<h6>休闲包</h6><span>销量 1000</span>
			 		<p>售价：¥88</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=ac0d086ce6044739bc1922426ef78c7a" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/11/20181114091039.png), url();"></div>
			 		<h6>闹钟</h6><span>销量 1000</span>
			 		<p>售价：¥0.49</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=bbb6226225c14011b712df2cbba4046d" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/8baaf29ad3d74653a9c1de503b60fc06/images/shop/product/2018/11/20181113091034.jpg), url();"></div>
			 		<h6>奥康</h6><span>销量 1000</span>
			 		<p>售价：¥0.8</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=c37982c7bc8b401ea86516b89b291798" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/12/20181203201134.png), url();"></div>
			 		<h6>洗手机</h6><span>销量 1000</span>
			 		<p>售价：¥79</p>
			 	</a><a href="/purchase/goodsDetails?type=1&amp;productId=c6f74de6a15f46db8f3bde85a8c8b527" class="goodsList-list">
			 		<div class="follow-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/1bd6e64da75c4014b385ae9bdf0a6798/images/shop/product/2018/12/20181201113309.jpg), url();"></div>
			 		<h6>沙发</h6><span>销量 1000</span>
			 		<p>售价： ¥ 88 </p>
			 	</a>
			 <!-- 	<a v-for="(value,key) in listData" :key="key"   click="goDetail(value)"   class="goodsList-list">
			 		<image  class="follow-centImg" :src="value.cover"></image> 
			 		<p>{{value.title}}<p><span>销量 {{value.author_name}}</span>
			 		<p>售价： ¥ 18 </p>
			 	</a> -->
			 	</div>
			 
			 
		</div>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					 
					listData: [] 
				}
			},
			onLoad() {
	
				this.getList();
			},
			onUnload() {
	 
	
			},
	 
			onReachBottom() {
	
	
				setTimeout(() => {
					this.getList();
				}, 300);
			},
			onPullDownRefresh() {
				console.log('onPullDownRefresh');
				this.listData = [];
				setTimeout(() => {
					this.getList();
					uni.stopPullDownRefresh();
				}, 300);
			},
			methods: {
				goGoodDetail:function(){
					uni.navigateTo({
						url:"../goods/goodsDetail"
					}) 
				},
				getList() {
					 
				},
			    searchContent:function(){
					this.getList();
				} 
				 
			}
		}
</script>

<style>
 
 .goodsList-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  background: #fefefe;
}
 .discount-sears {
  right: 0.2rem;
}
.newProduct-screen {
  margin-top: 0.19rem;
  height: 0.82rem;
  line-height: 0.82rem;
  font-size: 0.28rem;
  color: #333333;
  text-align: center;
  overflow: hidden;
}
.newProduct-screen > span {
  float: left;
  width: 33%;
}
.newProduct-screen > span:nth-child(2) {
  width: 34%;
}
.newProduct-screen strong {
  margin-left: 0.05rem;
  vertical-align: -0.21rem;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 3px 0 3px;
  border-color: #AEAEAE transparent transparent transparent;
}
.newProduct-screen .collage-icon,
.newProduct-screen .collage-icon1,
.newProduct-screen .collage-icon2 {
  display: inline-block;
  width: 0.24rem;
  height: 0.24rem;
  vertical-align: -0.04rem;
}
.newProduct-screen .collage-icon {
  background: url("https://cs.h5.hongkzh.com/imgs/purchase/coupon/collage-icon.png") no-repeat center;
  background-size: 0.24rem 0.24rem;
}
.newProduct-screen .collage-icon1 {
  background: url("https://cs.h5.hongkzh.com/imgs/purchase/coupon/collage-icon1.png") no-repeat center;
  background-size: 0.24rem 0.24rem;
}
.newProduct-screen .collage-icon2 {
  background: url("https://cs.h5.hongkzh.com/imgs/purchase/coupon/collage-icon2.png") no-repeat center;
  background-size: 0.24rem 0.24rem;
} 
		.goodsList-cent {
				margin-top: 120upx;
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
</style>
