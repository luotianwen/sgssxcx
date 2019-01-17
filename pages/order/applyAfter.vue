<template>
	<view class="">
		<view id="applyRefund">

			<view class="applyRefund-top">
				<view class="applyRefund-topdiv">温馨提示：</view>
				<view class="applyRefund-topp">· 申请退货时，先和客服沟通。确认退货下条件。</view>
				<view class="applyRefund-topp">· 申请换货时，先和客服沟通。确认换后的货是否有库存。</view>
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
									uni.navigateBack({
											delta: 1
									});
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

		margin: 0.3rem;
		height: 1.4rem;
		font-size: 0.28rem;
		color: #333;
		background-color: #f5f5f5;
	}

	.applyRefund-topdiv {
		margin-bottom: 0.1rem;
	}

	.applyRefund-topp {
		margin-bottom: 0.08rem;
	}

	.deliverGoods-cent {
		margin-top: 0.2rem;
		background: #fff;
		border-top: 1px solid #e2e2e2;
	}

	.deliverGoods-centdiv {
		padding-left: 0.3rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	.deliverGoods-centstrong {
		float: left;
		margin-right: 0.2rem;
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
		padding-right: 0.5rem;
		height: 100%;
		width: 68%;
		color: #666;
		background: url(http://op.yoyound.com/static/images/hotmore.png) no-repeat right center;
		background-size: 0.6rem 0.6rem;
	}

	.deliverGoods-btn {
		position: fixed;
		left: 50%;
		bottom: 0.5rem;
		margin-left: -46%;
		display: block;
		width: 92%;
		height: 0.98rem;
		line-height: 0.98rem;
		text-align: center;
		background-color: #8f8f94;
		border-radius: 0.1rem;
		font-size: 0.32rem;
		color: #ffffff;
	}
</style>
