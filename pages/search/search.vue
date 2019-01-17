<template>
		<view id="goodsList">
			<div class="goodsList-header">
				<div class="newProduct-screen clearfix"><span @tap="orderBy(1)" :class="orderby==1?'active':''">销量</span> <span
					 :class="orderby==2?'active':''" @tap="orderBy(2)">时间</span><span :class="orderby==3||orderby==4?'active':''" @tap="orderBy(0)">价格
						<span :class="type==0 ? 'collage-icon2' : type==1 ? 'collage-icon' : 'collage-icon1' "></span></span></div>
			</div>
			<div class="goodsList-cent clearfix">

				<view v-for="(value,key) in listData" :key="key" @click="goGoodDetail(value)" class="goodsList-list">
					<image class="follow-centImg" :src="value.logo"></image>

					<view class="goodsList-listh6">{{value.name}}</view>
					<view class="goodsList-listp">销量： {{value.sales}}</view>
					<view class="goodsList-listp">售价：¥{{value.price}}</view>
				</view>
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>

			</div>

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
				name: "",
				pageNumber: 1,

				listData: [],
				type: 0,
				orderby: 1,
				content: "",
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad(d) {
			this.content = d.title;
			uni.setNavigationBarTitle({
				title: d.title
			})
			this.getList();
		},
		onUnload() {

			this.listData = []

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
			orderBy: function(i) {
				if (i == 1) {
					this.orderby = 1;
					this.type = 0;
				} else if (i == 2) {
					this.orderby = 2;
					this.type = 0;
				} else if (i == 0) {
					let _type = this.type;
					if (_type == 0) {
						this.orderby = 3;
						this.type = 1;
					} else {
						this.orderby = 4;
						this.type = 2;
					}
				}
				this.listData = [];
				this.pageNumber = 1;
				this.getList();
			},
			goGoodDetail: function(e) {
				uni.navigateTo({
					url: "../goods/goodsDetail?goodsId=" + e.goodId + "&name=" + e.name
				})
			},
			getList() {

				uni.request({
					url: service.getSearchGoods(),
					data: {
						pageNumber: this.pageNumber,
						content: this.content,
						orderby: this.orderby
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
			},
			searchContent: function() {
				this.getList();
			},

		}
	}
</script>

<style>
	#goodsList .goodsList-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		width: 100%;
		border-bottom: 1px solid #f1f1f1;
		background: #fefefe;
	}

	.newProduct-screen {
		/* 	position:fixed; */
		/* margin-top: 0.89rem; */
		height: 0.82rem;
		line-height: 0.82rem;
		font-size: 0.28rem;
		color: #333333;
		text-align: center;
		overflow: hidden;
		background-color: #fff;
	}

	.newProduct-screen>span {
		float: left;
		width: 33%;
	}

	.newProduct-screen>span:nth-child(2) {
		width: 34%;
	}

	.newProduct-screen strong {
		margin-left: 0.05rem;
		vertical-align: -0.21rem;
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
		width: 0.24rem;
		height: 0.24rem;
		vertical-align: -0.04rem;
	}
.active {
		color: #558ef0;
	}
	.newProduct-screen .collage-icon {
		background: url("http://op.yoyound.com/static/images/collage-icon.png") no-repeat center;
		background-size: 0.24rem 0.24rem;
	}

	.newProduct-screen .collage-icon1 {
		background: url("http://op.yoyound.com/static/images/collage-icon1.png") no-repeat center;
		background-size: 0.24rem 0.24rem;
	}

	.newProduct-screen .collage-icon2 {
		background: url("http://op.yoyound.com/static/images/collage-icon2.png") no-repeat center;
		background-size: 0.24rem 0.24rem;
	}


	.goodsList-cent {
		margin-top: 0.75rem;
		padding: 0.3rem 0 0.2rem;
		background: #fff;
		font-size: 0;
	}

	.goodsList-list {
		display: block;
		position: relative;
		margin-bottom: 0.3rem;
		padding: 0 0.3rem 0 2.9rem;
		height: 2.4rem;
		font-size: 0;
	}

	.goodsList-list .follow-centImg {
		position: absolute;
		top: 0;
		left: 0.3rem;
		width: 240upx;
		height: 240upx;
		background-position: center center;
		background-size: cover;
	}

	.goodsList-listh6 {
		padding-top: 0.05rem;
		font-size: 0.3rem;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		white-space: inherit;
	}

	.goodsList-list span {
		display: inline-block;
		margin: 0.25rem 0;
		padding: 0 0.1rem;
		height: 0.3rem;
		line-height: 0.3rem;
		font-size: 0.2rem;
		/* color: #fff; */
		/* background: #FC8872; */
		border-radius: 100px;
	}

   .goodsList-listp {
		margin: 35upx 0;
		font-size: 24upx;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

 
</style>
