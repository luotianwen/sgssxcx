<template>
	<view class="shoppingCarttop">
		<view class="shoppingCart">
			<view class="shoppingCart-list shoppingCart-list1">
				<view class="shoppingCart-listCent">

					<view class="list-cent" v-for="item in data" :key="item" >
						<view class="list-centLeft">
							<input type="checkbox" id="checkbox00" class="shoppingCart-input Cart-icon" :value="item.cartId">
							<label for="checkbox00" class="shoppingCart-icon Cart-icon"></label>
							<view class="list-centRight ">
								<image  class="centRight-img" @click="goGoodDetail(item)" :src="item.logo" ></image>

							 
								<view class="centRight-cent">
									<view class="centRight-centh6">{{item.name}}</view>
									<view class="centRight-centp">{{item.spec1}} &nbsp; {{item.spec2}}</view>
									<view class="centRight-centdiv">应付:<span class="happyi-mon">¥{{item.price*item.number}}</span></view>
								</view>
							</view>
							<view class="list-centData">
								<view class="centData-num ">
									<view class="centData-numspan centData-reduce">－</view> <input type="number" v-model="item.number">
									<view class="centData-numspan centData-add">＋</view>
								</view>
								<!---->
							</view>
						</view>
						<view class="list-centClose">
							<view class="list-centClosespan">删除</view>
						</view>
					</view>


				</view>
			</view>

		</view>
		<view class="shoppingCart-footer ">
			<view class="shoppingCart-footerlabel" @click="getCheckedAll()" >全选</view>
			<view class="shoppingCart-footerlabelstrong footer-btn">结算</view>
			<view class="shoppingCart-footerspan">¥{{price}}</view>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {

				data: [],
        price:"",
			}
		},
		onLoad(d) {
			if (service.getUser().hasLogin) {
				this.cartlist();
			}
		},
		onPullDownRefresh() {
			 
			this.data = [];
			setTimeout(() => {
				this.cartlist();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			getCheckedAll:function(){
				
			},
			cartlist: function() {

				uni.request({
					url: service.cartList(),
					data: {
						tokenId: service.getUser().tokenId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							this.data = data.data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			goGoodDetail: function() {
				uni.navigateTo({
					url: "../goods/goodsDetail"
				})
			}
		}
	}
</script>

<style>
	.shoppingCarttop {
		padding: 20upx 10upx 10upx;
	}

	.shoppingCarttop .shoppingCart-select {
		background: url(http://127.0.0.1:8082/static/images/check.png) no-repeat left center;
		background-size: 0.5rem 0.5rem;
	}

	.shoppingCart {
		overflow: hidden;
	}

	.shoppingCart-list {
		margin-bottom: 0.2rem;
		background: #fff;
	}

	.shoppingCart-list .list-cent:first-child .list-centLeft {
		padding-top: 0;
	}

	.shoppingCart-list .Cart-icon {
		top: 40%;
	}

	.shoppingCart-list .list-cent1 .shoppingCart-icon,
	.shoppingCart-list .list-cent1 .shoppingCart-input {
		top: 31%;
	}

	.shoppingCart-list1 .list-cent {
		border-bottom: 1px solid #e2e2e2;
	}

	.shoppingCart-list1 .list-cent:last-child {
		border: none;
	}

	.shoppingCart-listTitle {
		padding-left: 0.5rem;
		margin-left: 0.09rem;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #333333;
		background: url(http://127.0.0.1:8082/static/images/nocheck.png) no-repeat left center;
		background-size: 0.5rem 0.5rem;
	}

	.shoppingCart-listTitle span {
		display: block;
		padding-left: 0.6rem;
		height: 100%;
		/* background: url(/imgs/purchase/shoppingCart/shoppingCart-gwl.png) no-repeat left center; */
		background-size: 0.58rem 0.56rem;
	}

	.shoppingCart-listTitle strong {
		margin: 0 0.1rem 0 0.2rem;
		display: inline-block;
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 50%;
		vertical-align: middle;
		background-size: 100% 100%;
	}

	.list-cent {
		position: relative;
		overflow: hidden;
	}

	.list-cent .shoppingCart-input {
		width: 0.55rem;
		z-index: 100;
		opacity: 0;
	}

	.list-cent .shoppingCart-input:checked+.shoppingCart-icon {
		/* background: url(/imgs/purchase/shoppingCart/shoppingCart-icon.png) no-repeat left center; */
		background-size: 0.5rem 0.5rem;
	}

	.list-cent1 .list-centClose {
		height: 2.8rem;
	}

	.list-cent2 .list-centClose {
		height: 2.5rem;
	}

	.list-centLeft {
		position: relative;
		padding: 0.3rem 0.5rem 0.3rem 0.7rem;
		z-index: 200;
		background: #fff;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
	}

	.list-centClose {
		position: absolute;
		top: 0;
		right: 0;
		display: table;
		min-height: 1.95rem;
		width: 15%;
		text-align: center;
		background-color: #F95F61;
		color: #fff;
		font-size: 0.3rem;
	}

	.list-centClosespan {
		display: table-cell;
		vertical-align: middle;
	}

	.swipeleft {
		transform: translateX(-15%);
		-webkit-transform: translateX(-15%);
	}

	.shoppingCart-icon,
	.shoppingCart-input,
	.addGoods-icon1 {
		position: absolute;
		left: 0.09rem;
		top: 50%;
		z-index: 100;
		display: block;
		margin-top: -0.3rem;
		padding-left: 0.5rem;
		height: 0.6rem;
	}

	.shoppingCart-icon {
		z-index: 100;
		background: url(http://127.0.0.1:8082/static/images/nocheck.png) no-repeat left center;
		background-size: 0.5rem 0.5rem;
	}

	.addGoods-icon1 {
		background: url(http://127.0.0.1:8082/static/images/check.png) no-repeat left center;
		background-size: 0.5rem 0.5rem;
	}

	.centRight-img {
		position: relative;
		float: left;
		width: 1.6rem;
		height: 1.6rem;
		background-size: 100% 100%;
		border: solid 1px #eeeeee;
	}

	.centRight-img span {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 0.62rem;
		height: 0.62rem;
	}

	.centRight-cent {
		position: relative;
		margin-left: 1.8rem;
		padding-right: 0.2rem;
		height: 1.6rem;
	}

	.centRight-centh6 {
		margin-bottom: 0.05rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.28rem;
		color: #333333;
	}

	.centRight-centp {
		font-size: 0.24rem;
	}

	.centRight-cent p span {
		display: inline-block;
		margin: 0 0.1rem;
		height: 0.25rem;
		border-left: 1px solid #ccc;
		vertical-align: -0.02rem;
	}

	.centRight-cent p strong {
		margin: 0 0.1rem;
		color: #f44834;
	}

	.centRight-centdiv {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 0.26rem;
		color: #333333;
	}

	.centRight-cent .happyi-mon {
		margin-left: 0.1rem;
		color: #EF593C;
	}

	.centRight-describe {
		margin-top: 0.2rem;
		width: 75%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.2rem;
		color: #999;
	}

	.list-centData {
		position: absolute;
		bottom: 0.3rem;
		right: 0.2rem;
		width: 1.9rem;
	}

	.list-centData p {
		margin-top: 0.2rem;
		width: 100%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.2rem;
		color: #999;
	}

	.list-centData1 {
		bottom: 0.89em;
	}

	.centData-num {
		height: 0.4rem;
		line-height: 0.4rem;
		border: solid 1px #cccccc;
		border-radius: 0.04rem;
		color: #666;
	}

	.centData-numspan {
		width: 0.5rem;
		height: 100%;
		font-size: 0.5rem;
	}

	.centData-num .centData-reduce {
		float: left;
		border-right: solid 1px #cccccc;
	}

	.centData-num .centData-add {
		float: right;
		border-left: solid 1px #cccccc;
	}

	.centData-num input {
		float: left;
		width: 0.6rem;
		height: 95%;
		background: none;
		border: none;
		font-size: 0.2rem;
		text-align: center;
	}

	.shoppingCart-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		padding-left: 3%;
		width: 97%;
		height: 0.98rem;
		line-height: 0.98rem;
		border-top: 1px solid #fefefe;
		background: #fff;
		font-size: 0;
	}

	.shoppingCart-footerlabel {
		display: inline-block;
		padding-left: 0.65rem;
		font-size: 0.26rem;
		color: #333333;
		background: url(http://127.0.0.1:8082/static/images/nocheck.png) no-repeat left center;
		background-size: 0.5rem 0.5rem;
	}

	.shoppingCart-footerlabelstrong {
		margin: 0 0.05rem;
	}

	.shoppingCart-footer .footer-btn {
		float: right;
		width: 2.2rem;
		height: 100%;
		text-align: center;
		background: #CDC8B1;
		font-size: 0.32rem;
		color: #ffffff;
	}

	.shoppingCart-footerspan {
		margin-right: 0.3rem;
		float: right;
		font-size: 0.26rem;
		color: #EF593C;
	}

	.shoppingCart-footer .footer-btn1 {
		margin: 0.2rem 0.3rem 0;
		float: right;
		width: 1.75rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		font-size: 0.24rem;
		color: #333333;
		border: 1px solid #CCCCCC;
		border-radius: 0.08rem;
	}
</style>
