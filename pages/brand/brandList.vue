<template>
		<view class="apps-wrap">
			<view class="app-portal" v-for="(item, index) in listData" :key="index" @tap="search(item)"> 
			  <image class="app-portalimg" :src="item.logo" />  
				<view class="app-portalp">{{item.name}}</view>
			  </view>  

		</view>
</template>

<script>
	import service from '../../service.js';
	export default {
			data() {
				return {
					 
					listData: [] 
				}
			},
			onShow() {
	
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
				this.listData = [];
				setTimeout(() => {
					this.getList();
					uni.stopPullDownRefresh();
				}, 300);
			},
			methods: {
				 search:function(item){
					 	uni.navigateTo({
					 	url: "../brand/search?brandId="+item.brandId+"&title="+item.name
					 })
					 
				 },
				getList:function() {
					 
					uni.request({
						url: service.brandList(),
						success: (data) => {
							if (data.statusCode == 200) {
								 this.listData=data.data.data;
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
	* {
		tap-highlight-color: transparent;
		-webkit-tap-highlight-color: transparent;
		-ms-tap-highlight-color: transparent;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		border: 0
	}
 

	  
	body {
		background: #fff
	}

	 
 
	.apps-wrap {
		font-size: 0;
		padding: 0 12upx
	}

	 
	.app-portal {
		padding-top: 10px;
		width: 25%;
		height: 148rpx;
		text-align: center;
		display: inline-block
	}

	.app-portalimg {
		width: 120upx;  
		height:120upx
	}

	.app-portalp {
		font-size: 24upx;
		color: #333;
		text-align: center;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 15upx 0 23upx;

	}
</style>
