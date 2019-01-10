<template>

	<view class="page-section">
		<view class="uni-list" style="padding-top: 10upx;">
			<view class="uni-list-cell">
				<input class="uni-input" focus type="number" v-model="vphone" placeholder="输入手机号" />
			</view>
		</view>
		<view class="btn-area" id="buttonContainer">
			<button type="primary" @tap="onSave()">发送验证码</button>
		</view>
		
	<!-- 	<view class="uni-list" style="padding-top: 10upx;">
			<view class="uni-list-cell">
				<input class="uni-input"     v-model="verification" placeholder="输入验证码" />
			</view>
		</view> -->
	</view>


</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				phone: "",
				vphone: "",
				verification:""

			}
		},
		onLoad() {
			let _user = service.getUser();
			if (_user.hasLogin) {
				if (_user.phone != null) {
					this.phone = _user.phone;
				}
			}
		},
		methods: {
			onSave: function() {
				let _vphone = this.vphone;
				if (_vphone.length == 0) {
					uni.showToast({
						title: "手机号必填",
						icon: "none"
					});
					return;
				}
				if (_vphone == this.phone) {
					uni.showToast({
						title: "新手机号与原手机号一样",
						icon: "none"
					});
					return;
				}
			uni.showLoading({
				title:"验证码发送中..."
			}),
			uni.request({
				url: service.bindPhone(),
				data: { 
					tokenId: service.getUser().tokenId,
					phone: this.vphone 
				},
				success: (data) => {
					uni.hideLoading();
					
					if (data.statusCode == 200 && data.data.code == 0) {
						  	uni.showToast({
						  	icon:'none',
						  	title:"验证码发送成功",
						  	duration:3000,
						  	success(){
						  			uni.navigateTo({
						  			url:"../myself/verification?vphone="+_vphone
						  		})
						  	}
						  })
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
