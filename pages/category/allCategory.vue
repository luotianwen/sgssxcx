<template>
	<view>
		<div class="goodsClassify">
			<div class="goodsClassify-left"><span>户外</span><span class="active">体育</span><span class="">服装</span></div>
			<div class="goodsClassify-right"><img src="http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listpic.png">
				<div class="goodsClassify-rightTitle"><strong></strong> <span>户外分类</span></div>
				<div class="goodsClassify-rightCent clearfix">
					<a @click="goCategorySearch()"><span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp4.png), url();"></span>
						<p>篮球</p>
					</a>
					<a><span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp6.png), url();"></span>
						<p>鞋</p>
					</a>
					<a><span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp2.png), url();"></span>
						<p>足球</p>
					</a>
					<a><span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp1.png), url();"></span>
						<p>羽毛球</p>
					</a>
					<a><span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp5.png), url();"></span>
						<p>乒乓球</p>
					</a>
					<a><span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp3.png), url();"></span>
						<p>滑雪板</p>
					</a>
					<a><span style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/shop/hkShopCategory/2018/05/listp7.png), url();"></span>
						<p>台球</p>
					</a>
					</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					
					listData: [],
					 
				}
			},
			onLoad() {
// this.getList();
				 
			},
			onUnload() {
	
				this.listData = []
	
			},
	
			 
			methods: {
				getList() {
					 
				},
				 
				goCategorySearch: function(e) {
	  
					uni.navigateTo({
						url: "../category/csearch"
					})
				},
				 
			}
		}
	
</script>

<style>
	.goodsClassify {
		/* padding-top: 7vh;
		height: 93vh; */
	}

	.goodsClassify-left {
		float: left;
		padding-bottom: 2%;
		width: 1.7rem;
		height: 98%;
		overflow-y: auto;
		border-right: 1px solid #eee;
	}

	.goodsClassify-left span {
		margin-top: 0.35rem;
		display: block;
		width: 1.64rem;
		height: 0.36rem;
		line-height: 0.36rem;
		font-size: 0.28rem;
		color: #333333;
		text-align: center;
		border-left: 0.06rem solid #fff;
	}

	.goodsClassify-left .active {
		width: 1.64rem;
		border-left: 0.06rem solid #0092ff;
		color: #0092ff;
	}

	.goodsClassify-right {
		padding-left: 1.71rem;
		color: #333333;
	}

	.goodsClassify-right img {
		margin: 0.35rem auto 0;
		display: block;
		width: 5.2rem;
		height: 2rem;
	}

	.goodsClassify-rightTitle {
		position: relative;
		height: 1.06rem;
		line-height: 1rem;
		font-size: 0.23rem;
		text-align: center;
	}

	.goodsClassify-rightTitle strong {
		position: absolute;
		top: 45%;
		left: 50%;
		z-index: 100;
		margin-left: -1.33rem;
		display: block;
		width: 2.66rem;
		border-top: 1px solid #eee;
	}

	.goodsClassify-rightTitle span {
		position: relative;
		z-index: 101;
		padding: 0 0.25rem;
		background: #fff;
	}

	.goodsClassify-rightCent {
		font-size: 0;
	}

	.goodsClassify-rightCent a {
		margin-bottom: 0.4rem;
		float: left;
		width: 33%;
		text-align: center;
		font-size: 0.24rem;
		color: #333;
	}

	.goodsClassify-rightCent span {
		margin-bottom: 0.05rem;
		display: inline-block;
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 50%;
		background-size: 100%;
	}
</style>
