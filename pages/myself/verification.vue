<template>
	
	<view class="page-section">
		<view class="uni-list" style="padding-top: 10upx;">
			<view class="uni-list-cell">
				<input class="uni-input" focus   v-model="verification" placeholder="输入验证码" />
			</view>
		</view>
		<view class="btn-area" id="buttonContainer">
			<button type="primary" @tap="onSave()">确定绑定</button>
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
					uni.showToast({
						title: "验证码必填",
						icon: "none"
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
					uni.navigateBack({
						delta:2
					});
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
