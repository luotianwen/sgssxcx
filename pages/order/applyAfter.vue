<template>
	<view class="">
		<view id="applyRefund">

			<view class="applyRefund-top">
				<view class="applyRefund-topdiv">温馨提示：</view>
				<view class="applyRefund-topp">· 申请退货/换货时，先和客服沟通。确认退换货条件和库存。</view> 
			</view>
			<!---->
			<view class="deliverGoods-cent">
				<view class="deliverGoods-centdiv">退款类型:<view class="deliverGoods-centspan" @click="showSinglePicker">{{pickerText}}</view>
				</view>
				<view class="deliverGoods-centdiv">退款原因:<view class="deliverGoods-centspan" @click="showResonPicker">{{pickerReson}}</view>
				</view>
			</view>

			<button class="deliverGoods-btn" type="primary" @tap="saveAfterOrder"> 提交</button>

		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvuePicker.vue';
	import service from '../../service.js';
	export default {
		components: {
			mpvuePicker
		},
		onLoad(d) {
			this.orderNumber = d.orderNumber;

		},

		data() {
			return {

				pickerSingleArray: [{
						label: '退货',
						value: 1
					},
					{
						label: '换货',
						value: 2
					}
				],
				pickerResonArray: [{
						label: '地址信息填写错误',
						value: 3
					},
					{
						label: '其他',
						value: 4
					},

					{
						label: '不想要了',
						value: 5
					},

					{
						label: '商品无货',
						value: 6
					},
					{
						label: '商品降价',
						value: 7
					},
					{
						label: '商品数量填写错误',
						value: 8
					},
					{
						label: '商品样式选择错误',
						value: 9
					}
				],
				orderNumber: '',
				themeColor: '#007AFF',
				pickerText: '请选择退款类型',
				pickerReson: '请选择原因',
				pickerId: 1,
				mode: '',
				deepLength: 1,
				pickerValueDefault: '',
				type: 1
			};
		},
		methods: {
			saveAfterOrder() {
        let _id=this.pickerText;
				 let _pickerReson=this.pickerReson;
				if(_id=='请选择退款类型'){
					uni.showToast({
						title:"请选择退款类型",
						icon:'none'
					})
					return ;
				}
				if(_pickerReson=='请选择原因'){
					uni.showToast({
						title:"请选择原因",
						icon:'none'
					})
					return ;
				}
					uni.showLoading({
						title:'数据提交中...'
					})

				uni.request({
					url: service.saveAfterOrder(),
					data: {
						tokenId: service.getUser().tokenId,
						orderNumber: this.orderNumber,
						type:this.pickerId,
						content:this.pickerReson
					},
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							 
							uni.showToast({
								title: '操作成功',
								success() {
									uni.navigateTo({
										url: "../service/afterOrder"
									})
								}
							})
						} else {
							uni.showToast({
								title: data.data.msg ,
								icon:'none'
								 
							})
						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			},
			onCancel(e) {
				console.log(e)
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
				this.type = 1;
			},
			// 单列
			showResonPicker() {
				this.pickerValueArray = this.pickerResonArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
				this.type = 2;
			},

			onConfirm(e) {
				console.log("this.pickerId" + this.pickerId);
				console.log("type" + this.type);
				console.log("e" + JSON.stringify(e));
				if (this.type == 1) {
					this.pickerText = e.label;
					this.pickerId = e.value[0];
				} else {
					this.pickerReson = e.label;
				}
			}
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

		}
	}
</script>

<style>
	.applyRefund-top {

		margin: 35upx;
		height: 163upx;
		font-size: 32upx;
		color: #333;
		background-color: #f5f5f5;
	}

	.applyRefund-topdiv {
		margin-bottom: 12upx;
	}

	.applyRefund-topp {
		margin-bottom: 9upx;
	}

	.deliverGoods-cent {
		margin-top: 24upx;
		background: #fff;
		border-top: 1px solid #e2e2e2;
	}

	.deliverGoods-centdiv {
		padding-left: 35upx;
		height: 117upx;
		line-height: 117upx;
		font-size: 35upx;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	.deliverGoods-centstrong {
		float: left;
		margin-right: 24upx;
		font-weight: inherit;
	}

	.deliverGoods-cent input {
		float: left;
		height: 96%;
		width: 70%;
		text-align: left;
		border: none;
		color: #333;
		background: transparent;
	}

	.deliverGoods-centspan {
		float: right;
		margin-right: 1%;
		padding-right: 58upx;
		height: 100%;
		width: 68%;
		color: #666;
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
