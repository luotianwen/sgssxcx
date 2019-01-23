<template>
	<view id="deliverGoods">

		<div class="deliverGoods-cent">
			<div>快递单号<input type="text" v-model="returnInvoiceNo" placeholder="请输入快递单号"></div>
			<div @tap="showSinglePicker()">快递公司<span>{{returnExpressName}}</span></div>
		</div>
		<div class="deliverGoods-btn" @tap="returnLogistics()">提交</div>

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mpvuePicker from '../../components/mpvuePicker.vue';
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				returnInvoiceNo: "",
				afterOrderId: "",
				returnExpressName: "",
				pickerValueArray: []
			}
		},

		onLoad(d) {
			this.afterOrderId = d.afterOrderId;
			this.getExpress();
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}

		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}

		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			// 单列
			showSinglePicker: function() {
				this.pickerValueArray = this.pickerValueArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.returnExpressName = e.label;
			},
			getExpress: function() {
				let _this = this;
				uni.request({
					url: service.getExpress(),
					data: {

					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							let _data = data.data.data;
							for (var x in _data) {
								_this.pickerValueArray.push({
									label: _data[x].name,
									value: _data[x].code
								});
							}


						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},

			returnLogistics: function() {
				uni.request({
					url: service.returnExpress(),
					data: {
						tokenId: service.getUser().tokenId,
						afterOrderId: this.afterOrderId,
						returnInvoiceNo: this.returnInvoiceNo,
						returnExpressName: this.returnExpressName
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.showToast({
								title: '操作成功',
								duration: 3000,
								success() {
									uni.navigateBack({
										delta: 1
									})
								}
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: data.data.msg,
								duration: 3000,

							})
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
	.deliverGoods-cent {
		margin-top: 24upx;
		padding-left: 35upx;
		background: #fff;
	}

	.deliverGoods-cent div {
		height: 117upx;
		line-height: 117upx;
		font-size: 35upx;
		color: #333333;
		border-top: 1px solid #e2e2e2;
	}

	.deliverGoods-cent div:first-child {
		border-top: none;
	}

	.deliverGoods-cent input {
		float: right;
		padding-right: 35upx;
		height: 96%;
		text-align: right;
		border: none;
		background: transparent;
	}

	.deliverGoods-cent span {
		float: right;
		padding-right: 58upx;
		height: 100%;
		background: url(http://op.yoyound.com/static/images/hotmore.png) no-repeat right center;
		background-size: 70upx 70upx;
	}

	.deliverGoods-btn {
		position: fixed;
		left: 50%;
		bottom: 58upx;
		margin-left: -46%;
		display: block;
		width: 92%;
		height: 114upx;
		line-height: 114upx;
		text-align: center;
		background-color: #8f8f94;
		border-radius: 12upx;
		font-size: 32upx;
		color: #ffffff;
	}
</style>
