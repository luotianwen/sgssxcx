<template>

	<view id="citySearch">
		<header class="recruitScreen-header">
			<div class="header-left">
				<input type="text" v-model="name" placeholder="请输入您要搜索的商品名称"> <strong class="recruitScreen-reset" @tap="clear()"></strong></div><span
			 class="header-right" @tap="searchContent()">搜索</span>
		</header>

		<div class="citySearch citySearch-hot">
			<h6 class="citySearch-title">热门搜索</h6>
			<div class="historyRecord clearfix"><span @tap="searchContent(item.name)" v-for="(item, index) in listData" :key="index">{{item.name}}</span>
			</div>
		</div>

	</view>





</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				listData: [],
				name: ""
			}
		},
		onShareAppMessage() {
			return {
				title:  "悠氧运动户外-综合网购首选-正品低价、品质保障、配送及时、轻松购物",
				path: '/pages/index/index',
				imageUrl:''//http://yoyound.com/images/logo5_4.jpg'
			}
		},
		onLoad() {

			this.getList();
		},
		onUnload() {

			this.listData = []

		},


		methods: {
			clear: function() {
				this.name = "";
			},
			getList() {
				uni.request({
					url: service.hotData(),

					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.listData = data.data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			searchContent: function(title) {
				let _title = title || this.name;
				if (undefined == _title || _title.length == 0) {
					return;
				}
				uni.navigateTo({
					url: "../search/search?title=" + _title
				})
			},


		}
	}
</script>

<style>
	page {
		background-color: #fff;

	}

	.recruitScreen-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 79.1%;
		padding: 21upx 140upx 16upx 35upx;
		height: 70upx;
		line-height: 70upx;
		font-size: 33upx;
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
	}

	.header-left {
		position: relative;
		height: 70upx;
		line-height: 70upx;
		background: #EEEEEE url(http://op.yoyound.com/static/images/search.png) no-repeat 29upx center;
		background-size: 40upx 40upx;
		border-radius: 100px;
	}

	.header-left input {
		margin-left: 79upx;
		width: 75%;
		height: 59upx;
		background: transparent;
		border: none;
		font-size: 30upx;
		color: #666;
		vertical-align: middle;
	}

	.header-left input::-webkit-input-placeholder {
		font-size: 24upx;
		color: #999999;
	}

	.header-left input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		font-size: 24upx;
		color: #999999;
	}

	.header-left input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		font-size: 24upx;
		color: #999999;
	}

	.header-left input:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		font-size: 24upx;
		color: #999999;
	}

	.header-leftLeft {
		display: block;
		position: absolute;
		top: 32upx;
		left: 35upx;
		width: 157upx;
		height: 44upx;
		line-height: 44upx;
		text-align: center;
		color: #4090f7;
		border-right: 1px solid #eee;
	}

	.header-leftLeft span {
		margin-left: 7upx;
		color: #ccc;
	}

	.header-right {
		position: absolute;
		top: 0;
		right: 35upx;
		font-size: 37upx;
		line-height: 105upx;
		height: 100%;
		color: #999;
	}

	.recruitScreen-reset {
		position: absolute;
		top: 0;
		right: 17upx;
		width: 49upx;
		height: 100%;
		background: url("http://op.yoyound.com/static/images/clear.png") no-repeat center;
		background-size: 49upx 49upx;
	}

	#citySearch {
		padding-top: 105upx;
	}

	.citySearch {
		padding-bottom: 24upx;
	}

	.citySearch-title {
		padding: 0 35upx;
		height: 105upx;
		line-height: 105upx;
		font-size: 33upx;
		color: #333;
	}


	.historyRecord {
		padding: 0 35upx 0 12upx;
		font-size: 0;
		background: #fff;
	}

	.historyRecord span {
		float: left;
		margin: 0 0 24upx 24upx;
		padding: 0 29upx;
		height: 59upx;
		line-height: 59upx;
		color: #333;
		font-size: 24upx;
		background: #F5F5F5;
		border-radius: 29upx;
	}

	.citySearch-hot {
		border-top: 1px solid #e2e2e2;
		background: #fff;
	}

	.citySearch-hot .citySearch-title {
		color: #EF593C;
	}


	.historyList {

		position: fixed;
		top: 110upx;
		left: 0;
		z-index: 100;
		padding: 0 4%;
		width: 93%;
		height: 92.85upx;
		overflow-y: auto;
		background: #fff;
	}

	.historyList .record-list {
		height: 104upx;
		line-height: 104upx;
		color: #666666;
		font-size: 35upx;
		border-bottom: 1px solid #e2e2e2;
	}

	.historyList .record-list:last-child {
		border-bottom: none;
	}
</style>
