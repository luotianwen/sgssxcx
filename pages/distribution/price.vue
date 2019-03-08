<template>
	<div>
		<view class="uni-list-cell">
			<input class="uni-input" style="width: 60%; margin-left:5%;" focus v-model="articleno" placeholder="输入货号" />
			<button type="primary" @tap="query()">查询</button>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">品牌 &nbsp; &nbsp;&nbsp; &nbsp; 货号&nbsp; &nbsp;&nbsp; &nbsp; 市场价&nbsp; &nbsp;&nbsp;&nbsp; 折扣</text>
					</view>
					<view class="uni-triplex-right">
						<text class="uni-h5">价格</text>
					</view>
				</view>
			</view>
			<block v-for="(item,index) in lists" :key="index">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-triplex-row">
						<view class="uni-triplex-left">
							<text class="uni-title uni-ellipsis">{{item.brandName}} &nbsp; &nbsp;&nbsp;&nbsp; {{item.articleno}} &nbsp; &nbsp;&nbsp;&nbsp;{{item.marketprice}} &nbsp; &nbsp;&nbsp;&nbsp;{{item.discount}}</text>
						</view>
						<view class="uni-triplex-right">
							<text class="uni-h5">{{item.discount/10*item.marketprice}}元</text>
						</view>
					</view>
				</view>
			</block>
		</view>

	</div>

</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				articleno: "",
				lists: []
			}
		},

		methods: {
			query: function() {
				let _this = this;
				let articleno = this.articleno;
				if (articleno.length == 0) {

					uni.showModal({
						content: "货号必填",
						showCancel: false
					});
					return;
				}

				uni.showLoading({
						title: "查询中..."
					}),
					uni.request({
						url: service.getAgentStock(),
						data: {
							tokenId: service.getUser().tokenId,
							articleno: this.articleno,
						},
						success: (data) => {
							uni.hideLoading();
							if (data.statusCode == 200 && data.data.code == 0) {
								_this.lists = data.data.data;

							} else {
								uni.showToast({
									title: data.data.msg
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
