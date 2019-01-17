<template>

	<view id="citySearch">
		<header class="recruitScreen-header">
			<div class="header-left">
				<input type="text" v-model="name" placeholder="请输入您要搜索的商品名称"> <strong class="recruitScreen-reset" @tap="clear()"></strong></div><span
			 class="header-right" @tap="searchContent()">搜索</span>
		</header>

		<div class="citySearch citySearch-hot">
			<h6 class="citySearch-title">热门搜索</h6>
			<div class="historyRecord clearfix"><span   @tap="searchContent(item.name)" v-for="(item, index) in listData" :key="index" >{{item.name}}</span> </div>
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
		onLoad() {

			this.getList();
		},
		onUnload() {

			this.listData = []

		},


		methods: {
			 clear:function(){
				 this.name="";
			 },
			getList() {
					uni.request({
					url: service.hotData(),
					 
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.listData =data.data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			searchContent: function(title) {
				let _title=title||this.name;
				  if(undefined==_title||_title.length==0){
					return;
				}  
				 uni.navigateTo({
				 	url: "../search/search?title="+_title
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
		padding: 0.18rem 1.2rem 0.14rem 0.3rem;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.28rem;
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
	}

	.header-left {
		position: relative;
		height: 0.6rem;
		line-height: 0.6rem;
		background: #EEEEEE url(http://op.yoyound.com/static/images/search.png) no-repeat 0.25rem center;
		background-size: 0.35rem 0.35rem;
		border-radius: 100px;
	}

	.header-left input {
		margin-left: 0.68rem;
		width: 75%;
		height: 0.5rem;
		background: transparent;
		border: none;
		font-size: 0.3rem;
		color: #666;
		vertical-align: middle;
	}

	.header-left input::-webkit-input-placeholder {
		font-size: 0.26rem;
		color: #999999;
	}

	.header-left input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		font-size: 0.26rem;
		color: #999999;
	}

	.header-left input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		font-size: 0.26rem;
		color: #999999;
	}

	.header-left input:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		font-size: 0.26rem;
		color: #999999;
	}

	.header-leftLeft {
		display: block;
		position: absolute;
		top: 0.27rem;
		left: 0.3rem;
		width: 1.35rem;
		height: 0.38rem;
		line-height: 0.38rem;
		text-align: center;
		color: #4090f7;
		border-right: 1px solid #eee;
	}

	.header-leftLeft span {
		margin-left: 0.05rem;
		color: #ccc;
	}

	.header-right {
		position: absolute;
		top: 0;
		right: 0.3rem;
		font-size: 0.32rem;
		line-height: 0.9rem;
		height: 100%;
		color: #999;
	}

	.recruitScreen-reset {
		position: absolute;
		top: 0;
		right: 0.15rem;
		width: 0.42rem;
		height: 100%;
		background: url("http://op.yoyound.com/static/images/clear.png") no-repeat center;
		background-size: 0.42rem 0.42rem;
	}

	#citySearch {
		padding-top: 0.9rem;
	}

	.citySearch {
		padding-bottom: 0.2rem;
	}

	.citySearch-title {
		padding: 0 0.3rem;
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.28rem;
		color: #333;
	}


	.historyRecord {
		padding: 0 0.3rem 0 0.1rem;
		font-size: 0;
		background:#fff;
	}

	.historyRecord span {
		float: left;
		margin: 0 0 0.2rem 0.2rem;
		padding: 0 0.25rem;
		height: 0.5rem;
		line-height: 0.5rem;
		color: #333;
		font-size: 0.24rem;
		background: #F5F5F5;
		border-radius: 0.25rem;
	}

	.citySearch-hot {
		border-top: 1px solid #e2e2e2;
		background:#fff;
	}

	.citySearch-hot .citySearch-title {
		color: #EF593C;
	}


	.historyList {
		
		position: fixed;
		top: 0.94rem;
		left: 0;
		z-index: 100;
		padding: 0 4%;
		width: 93%;
		height: 92.85vh;
		overflow-y: auto;
		background: #fff;
	}

	.historyList .record-list {
		height: 0.89rem;
		line-height: 0.89rem;
		color: #666666;
		font-size: 0.3rem;
		border-bottom: 1px solid #e2e2e2;
	}

	.historyList .record-list:last-child {
		border-bottom: none;
	}
</style>
