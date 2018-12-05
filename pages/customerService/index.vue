<template>
	<view class="about">
		<view class="content">
			<view class="qrcode">
				<image src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/app_download.png" @longtap="save"></image>
				<text>扫码添加客服</text>
			</view>
			 
			 
		</view>
		 
	</view>
</template>

<script>
	export default {
		data(){
			return {
				providerList:[],
				version:''
			}
		},
		onLoad() {
			 
		},
		methods:{
			save(){
				uni.showActionSheet({
					itemList:['保存图片到相册'],
					success: () => {
						plus.gallery.save('https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/app_download.png', function() {
							uni.showToast({
								title:'保存成功',
								icon:'none'
							})
						}, function() {
							uni.showToast({
								title:'保存失败，请重试！',
								icon:'none'
							})
						});
					}
				})
			} 
			 
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}
	image{
		width: 400upx;
		height: 400upx;
	}
	.about{
		flex-direction: column;
		flex: 1;
	}
	.content{
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		justify-content: center;
	}
	.qrcode{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.desc{
		margin-top: 30upx;
		display: block;
	}
	.code{
		color: #e96900;	
		background-color: #f8f8f8;
	}
	button{
		width: 100%;
		margin-top: 40upx;
	}
	.version{
		height: 80upx;
		line-height: 80upx;
		justify-content: center;
		color: #ccc;
	}
</style>
