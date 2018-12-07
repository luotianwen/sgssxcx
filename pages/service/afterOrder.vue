<template>
	<view class="">
		<div id="refundAfterSale">
			 
			<div class="confirmOrder-cent">
				<div class="confirmOrder-centList" @click="goDetail()">
					<div class="centList-title"> <span
						 class="titleState">同意退款</span></div>
					<div class="confirmOrder-listCent">
						<div class="centList-cent clearfix">
							<div class="centList-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/1/images/hkUserProductImg/2018/11/IMG_20181109_150828.jpg), url();">
								<!---->
								<!---->
								<!---->
							</div>
							<div class="centList-centRight">
								<h6 class="clearfix">键盘<span class="centRight-h6"><span>×</span>1</span></h6>
								<p>
									 哈尼族</p>
								<div class="happyi-mon">480</div>
							</div>
						</div>
					</div>
					<div class="centList-butt">
						<div class="buttState6 clearfix"><span class="buttState-btn">删除订单</span></div>
					</div>
				</div>
				<div class="confirmOrder-centList">
					<div class="centList-title"> <span class="titleState">取消退款</span></div>
					<div class="confirmOrder-listCent">
						<div class="centList-cent clearfix">
							<div class="centList-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/f6e2576d6bbc43ce975268af3fdd30e3/images/shop/product/2018/11/QQ%E5%9B%BE%E7%89%8720181103113831.jpg), url();">
								<!---->
								<!---->
								<!---->
							</div>
							<div class="centList-centRight">
								<h6 class="clearfix">顾家家居席梦思棕垫<span class="centRight-h6"><span>×</span>1</span></h6>
								<p>椰棕 1350mm*2000mm</p>
								<div class="happyi-mon">300</div>
							</div>
						</div>
					</div>
					<div class="centList-butt">
						<div class="buttState6 clearfix"><span class="buttState-btn">删除订单</span></div>
					</div>
				</div>
				<!---->
			</div>
			<div id="prompt-view">
				<!---->
			</div>
		</div>
	</view>
</template>

<script>
	
	export default {
		methods: {
			goDetail:function(){
				uni.navigateTo({
					url:"../service/afterOrderDetail"
				})
			} 
			}
		}
</script>

<style>
	.myOrder-tab {
  position: fixed;
 /* top: 0.89rem; */
  left: 0;
  width: 100%;
  z-index: 100;
  height: 0.82rem;
  line-height: 0.82rem;
  font-size: 0.28rem;
  color: #7c7c7c;
  border-bottom: 1px solid #e2e2e2;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  overflow-x: scroll;
  /* 1 */
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch;
  /* 2 */
  text-align: justify;
  /* 3 */
}
.myOrder-tab span {
  margin-left: 0.45rem;
  display: inline-block;
  height: 0.78rem;
  border-bottom: 0.04rem solid transparent;
}
.myOrder-tab .active {
  color: #000;
  border-bottom-color: #EF593C;
}
.myOrder-tab::-webkit-scrollbar {
  display: none;
}
.confirmOrder-centList {
  margin-top: 0.2rem;
  background: #fff;
}
.centList-title {
  padding-right: 0.3rem;
  margin-left: 0.3rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.26rem;
  color: #333333;
  border-bottom: 1px solid #e2e2e2;
}
.centList-title .headName {
  display: inline-block;
  padding-left: 0.6rem;
  min-width: 0.6rem;
  height: 100%;
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-gwl.png) no-repeat left center;
  background-size: 0.58rem 0.56rem;
}
.centList-title .headImg {
  margin: 0 0.1rem 0 0.2rem;
  display: inline-block;
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
  vertical-align: middle;
  background-size: 100% 100%;
}
.centList-title .titleState {
  float: right;
}
.centList-title .state {
  color: #d45048;
}
.centList-cent {
  position: relative;
  padding: 0.2rem 0.3rem;
  border-bottom: 1px solid #e2e2e2;
}
.centList-centImg {
  position: relative;
  float: left;
  width: 1.6rem;
  height: 1.6rem;
  background-size: 100% 100%;
  border: solid 1px #eeeeee;
}
.centList-centImg span {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 0.62rem;
  height: 0.62rem;
}
.centList-centImg .shoppingCart-icon1 {
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-icon1.png) no-repeat center;
  background-size: 100% 100%;
}
.centList-centImg .shoppingCart-icon2 {
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-icon2.png) no-repeat center;
  background-size: 100% 100%;
}
.centList-centImg .shoppingCart-icon3 {
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-icon3.png) no-repeat center;
  background-size: 100% 100%;
}
.centList-centRight {
  position: relative;
  margin-left: 1.8rem;
  height: 1.6rem;
}
.centList-centRight h6 {
  margin-bottom: 0.05rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.28rem;
  color: #333333;
}
.centList-centRight .centRight-h6 {
  float: right;
  font-size: 0.26rem;
  color: #666;
}
.centList-centRight .centRight-h6 span {
  margin-right: 0.05rem;
  vertical-align: -0.01rem;
}
.centList-centRight p {
  font-size: 0.24rem;
}
.centList-centRight .happyi-mon {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 0.26rem;
  color: #EF593C;
}
.centList-butt {
  padding: 0 0.3rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.26rem;
  color: #666;
}
.centList-butt strong {
  font-weight: inherit;
}
.centList-butt .happyi-mon {
  display: inline-block;
  height: 100%;
  color: #EF593C;
}
.centList-butt .buttState-btn {
  margin: 0.2rem 0 0 0.2rem;
  float: right;
  display: block;
  width: 1.75rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  border-radius: 0.08rem;
  border: 1px solid #cccccc;
}
.buttState1 .integral .happyi-mon {
  margin-left: 0.1rem;
}
.buttState1 .btn {
  float: right;
  margin-top: 0.2rem;
  width: 2.16rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  color: #ffffff;
  background-color: #d45048;
  border: 1px solid #d45048;
  border-radius: 0.08rem;
}
.buttState1 .btn strong {
  margin-left: 0.05rem;
}
.buttState1 .btn1 {
  background-color: #ccc;
  border: 1px solid #ccc;
}
.goods-total,
.freight-total {
  padding: 0 0.3rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #333;
  background: #fff;
}
.goods-total span,
.freight-total span {
  float: right;
  padding-left: 0.3rem;
  height: 100%;
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-mons.png) no-repeat left 0.33rem;
  background-size: 0.25rem 0.25rem;
}
.goods-total {
  margin-top: 0.2rem;
  border-bottom: 1px solid #e2e2e2;
}
.goods-total span {
  color: #f44834;
}
	#refundAfterSale {
  /* padding-top: 0.89rem;
  overflow: hidden; */
}
.confirmOrder-share {
  padding: 0 0.27rem;
}
.confirmOrder-share .centList-title {
  padding: 0 0.03rem;
  height: 0.86rem;
  line-height: 0.86rem;
  border-bottom: none;
}
.confirmOrder-share .coupon-list {
  position: relative;
  padding-top: 0.35rem;
  height: 3.05rem;
  background: url("https://cs.h5.hongkzh.com/imgs/purchase/coupon/coupon-bg1.png") no-repeat center;
  background-size: 100% 100%;
}
.confirmOrder-share .coupon-list .slide-img {
  position: absolute;
  display: block;
  top: 0.34rem;
  left: 0.34rem;
  width: 1.4rem;
  height: 1.4rem;
  background: #eee;
  background-size: 100% 100%;
}
.confirmOrder-share .coupon-list h6,
.confirmOrder-share .coupon-list .purchase-icon2,
.confirmOrder-share .coupon-list p {
  position: relative;
  z-index: 11;
  padding: 0 0.2rem 0 2.04rem;
}
.confirmOrder-share .coupon-list h6 {
  margin-top: 0.04rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.3rem;
  color: #333333;
}
.confirmOrder-share .coupon-list .purchase-icon2 {
  margin: 0.12rem 0 0.08rem;
  display: block;
  width: 0.76rem;
  height: 0.32rem;
  background: url("https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-icon2.png") no-repeat 2rem center;
  background-size: 0.76rem 0.32rem;
}
.confirmOrder-share .coupon-list p {
  font-size: 0.24rem;
  color: #666;
}
.confirmOrder-share .coupon-list .list-butt {
  position: absolute;
  left: 0;
  bottom: 0.1rem;
  padding: 0.2rem 4.5% 0;
  width: 91%;
  height: 1.2rem;
  font-size: 0.26rem;
  color: #666;
  text-align: right;
}
.confirmOrder-share .coupon-list .list-buttMoney {
  padding-left: 0.4rem;
  font-size: 0.28rem;
  color: #EF593C;
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/goodsDetails/goodsDetails-icon.png) no-repeat left center;
  background-size: 0.3rem 0.3rem;
  vertical-align: -0.01rem;
}
.confirmOrder-share .coupon-list .list-btn,
.confirmOrder-share .coupon-list .list-btn1 {
  margin: 0.15rem 0 0 0.2rem;
  float: right;
  width: 1.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  border-radius: 0.05rem;
  font-size: 0.24rem;
}
.confirmOrder-share .coupon-list .list-btn {
  color: #EF593C;
  border: 1px solid #EF593C;
}
.confirmOrder-share .coupon-list .list-btn1 {
  color: #666666;
  border: 1px solid #CCCCCC;
}
.confirmOrder-share .coupon-lableIcon,
.confirmOrder-share .coupon-txt {
  position: absolute;
  left: 0.04rem;
  display: block;
  width: 1.09rem;
  height: 1.09rem;
}
  

</style>
