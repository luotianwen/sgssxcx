<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				    v-for="(item,index) in categoryList">
					{{item.name}}
				</view>
			</scroll-view>
			 
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				 <image lazy-load :src="logo" class="nav-right-pic"  ></image> 
				<view :id="index==0?'first':''" @click="goCategorySearch(item)" class="nav-right-item" v-for="item in subCategoryList" :key="item">
					<image lazy-load :src="item.logo" />
					<view>{{item.name}}</view>
				</view>
				 
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';

	export default {
		data() {
			return {
				categoryList: [],
				logo:"",
				subCategoryList: [],
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0  
				 
			}
		},
		methods: {
			goCategorySearch: function(e) {
					uni.navigateTo({
						url: "../category/search?title="+e.name+"&categoryId="+e.categoryId
					})
			},
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				this.logo=categroy.logo;
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
				uni.request({
					url: service.getSubCategory(),
					data:{categoryId:categroy.categoryId},
					success: (data) => {
						if (data.statusCode == 200&&data.data.code == 0) {
							this.subCategoryList = data.data.data;
							 
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			getCategory() {
				uni.request({
					url: service.getCategory(),
					success: (data) => {
						if (data.statusCode == 200&&data.data.code == 0) {
							this.categoryList = data.data.data;
							this.categoryClickMain(this.categoryList[0],0);
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
				 
			},
			 
		},
		onShareAppMessage() {
			return {
				title:  "悠氧商城",
				path: '/pages/index/index',
				imageUrl:'http://yoyound.com/themes/pc_paleng_moban/images/logo.gif'
			}
		},
		onLoad: function () {
			  uni.showShareMenu({
			       withShareTicket: true
			   });
			this.getCategory();
			this.height = uni.getSystemInfoSync().windowHeight ;
			 
		}
	}
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
	}
    .nav-right-pic{
		width: 520upx;
		height: 200upx;
		/* margin: 35upx auto 0; */
		display: block;
	}
	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100%;
		height: 100upx;
	}

	.active {
		color: #007AFF;
	}
</style>
