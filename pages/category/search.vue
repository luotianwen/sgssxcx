<template>
	<view id="goodsList">
		<view class="goodsList-header">
			<view class="newProduct-screen  ">
				<view :class="['newProduct-screenspan',{'active':sortData==1}]" @click="getSelet(1)">销量</view>
				<view :class="['newProduct-screenspan',{'active':sortData==2}]" @click="getSelet(2)">时间</view>
				<view :class="['newProduct-screenspan',{'active':sortData==3||sortData==4}]" @click="getSelet(3)">价格
					<view class="collage-icon" v-if="sortValue=='asc'"></view>
					<view class="collage-icon1" v-else-if="sortValue=='desc'"></view>
					<view class="collage-icon2" v-else></view>

				</view>
			</view>
		</view>
		<view class="goodsList-cent  ">

			<view @click="goGoodDetail(item)" class="goodsList-list" v-for="item in listData" :key="item">
				<image class="follow-centImg" lazy-load :src="item.logo"></image>
				<view class="follow-centImgh6">{{item.name}}</view>
				<view class="goodsList-listp">销量： {{item.sales}}</view>
				<view class="goodsList-listp">售价：¥{{item.price}}</view>
			</view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
	</view>
</template>

<script>
	import loadMore from '../../components/load-more.vue'
	import service from '../../service.js';

	export default {

		components: {
			loadMore
		},
		data() {
			return {
				categoryId: "",
				listData: [],
				pageNumber: 1,
				sortData: 1,
				sortId: "create_date", //排序字段 综合create_date 价格 integral
				sortValue: "", //排序值 asc 升 desc 降
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad(data) {
			this.categoryId = data.categoryId;
			uni.setNavigationBarTitle({
				title: data.title
			})
			this.getList();
		},


		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			console.log('onReachBottom');
			this.loadingType = 1;
			setTimeout(() => {
				this.pageNumber++;
				this.getList();
			}, 300);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.listData = [];
			setTimeout(() => {
				this.pageNumber = 1;
				this.getList();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			goGoodDetail: function(e) {
				uni.navigateTo({
					url: "../goods/goodsDetail?goodsId=" + e.goodId + "&name=" + e.name
				})
			},
			getSelet: function(order) {
				this.sortData = order;
				if (this.sortData == 1) {
					this.sortId = "1";
					this.sortValue = "";
				} else if (this.sortData == 3) {
					this.sortId = "3";
					if (this.sortValue == "asc") {
						this.sortValue = "desc";
						this.sortId = "4";
					} else if (this.sortValue == "desc") {
						this.sortValue = "asc";
					} else {
						this.sortValue = "asc";
					}
				} else {
					this.sortId = "2";
					this.sortValue = "";
				}
				this.pageNumber = 1;
				this.listData = [];
				this.getList();
			},
			getList() {

				uni.request({
					url: service.getCategoryGoods(),
					data: {
						categoryId: this.categoryId,
						pageNumber: this.pageNumber,
						orderby: this.sortId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.listData = this.listData.length == 0 ? data.data.data.list : this.listData.concat(data.data.data.list);
							if (data.data.data.lastPage) {
								this.loadingType = 2;
								return;
							}
							this.loadingType = 0;
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
	.active {
		color: #558ef0;
	}

	#goodsList .goodsList-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		width: 100%;
		border-bottom: 1px solid #f1f1f1;
		background: #fefefe;
	}


	.discount-sears {
		right: 24upx;
	}

	.newProduct-screen {
		/* 	position:fixed; */
		/* margin-top: 104upx; */
		height: 76upx;
		line-height: 76upx;
		font-size: 32upx;
		color: #333333;
		text-align: center;
		overflow: hidden;
		background-color: #fff;
	}

	.newProduct-screenspan {
		float: left;
		width: 33%;
	}

	.newProduct-screen>span:nth-child(2) {
		width: 34%;
	}

	.newProduct-screenstrong {
		margin-left: 6upx;
		vertical-align: -24upx;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 5px 3px 0 3px;
		border-color: #AEAEAE transparent transparent transparent;
	}

	.newProduct-screen .collage-icon,
	.newProduct-screen .collage-icon1,
	.newProduct-screen .collage-icon2 {
		display: inline-block;
		width: 28upx;
		height: 28upx;
		vertical-align: -5upx;
	}

	.newProduct-screen .collage-icon {
		background: url("http://op.yoyound.com/static/images/collage-icon.png") no-repeat center;
		background-size: 28upx 28upx;
	}

	.newProduct-screen .collage-icon1 {
		background: url("http://op.yoyound.com/static/images/collage-icon1.png") no-repeat center;
		background-size: 28upx 28upx;
	}

	.newProduct-screen .collage-icon2 {
		background: url("http://op.yoyound.com/static/images/collage-icon2.png") no-repeat center;
		background-size: 28upx 28upx;
	}


	.goodsList-cent {
		margin-top: 76upx;
		padding: 35upx 0 24upx;
		background: #fff;
		font-size: 0;
	}

	.goodsList-list {
		display: block;
		position: relative;
		/* margin-bottom: 35upx; */
		padding: 0 35upx 0 35upx;
		height: 270upx;
		font-size: 0;
	}

	.goodsList-list .follow-centImg {
		position: absolute;
		top: 0;
		left: 35upx;
		width: 240upx;
		height: 240upx;
		background-position: center center;
		background-size: cover;
	}

	.follow-centImgh6 {
		padding-left: 250upx;
		padding-top: 5upx;
		font-size: 24upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		white-space: inherit;
	}


	.goodsList-listp {
		padding-left: 250upx;
		margin: 20upx 0;
		font-size: 24upx;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
