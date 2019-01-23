<template>
	
	<view class="page-section">
		<view class="uni-list" style="padding-top: 20upx;">
			<view class="uni-list-cell">
				<input class="uni-input" style="width: 60%; margin-left:5%;" focus   v-model="verification" placeholder="输入验证码" />
				<button type="primary" @tap="onSave()">确定绑定</button>
			</view>
		</view>
		 
	</view>
	
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				vphone: "",
				verification:""
			}
		},
		onLoad(d) {
			 this.vphone=d.vphone;
		},
		methods: {
			onSave: function() {
				let verification = this.verification;
				if (verification.length == 0) {
					 
					uni.showModal({
						content: "验证码必填",
						showCancel: false
					});
					return;
				}
				 
			uni.showLoading({
				title:"验证中..."
			}),
			uni.request({
				url: service.verificationBind(),
				data: {
					tokenId: service.getUser().tokenId,
					phone: this.vphone,
					verification:this.verification
				},
				success: (data) => {
					uni.hideLoading();
					if (data.statusCode == 200 && data.data.code == 0) {
					 uni.showToast({
					 	title: "绑定成功",
					 	icon: "none",
						success() {
							uni.navigateBack({
								delta:2
							});
						}
					 });
					
					}
					else{
						uni.showToast({
							title:data.data.msg 
						})
					}
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
</style>
