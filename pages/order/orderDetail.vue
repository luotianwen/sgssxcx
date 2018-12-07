<template>
	<view class="">
		<div id="myOrderInfo"> 
			 
			<div class="confirmOrder-address"> 
				<div class="address-bg"></div>
				<div class="address-cent">
					<h6>
						<!----> <span class="address-name">啦啦啦</span>13800000001</h6>
					<p>好了了了了</p><strong class="address-left"></strong>
				</div>
			</div>
			<div class="confirmOrder-cent">
				<div class="confirmOrder-centList">
					<div class="centList-title"><span class="headName">喵呜旺铺</span><span class="titleState state">等待付款</span></div>
					<div class="confirmOrder-listCent">
						<div class="centList-cent clearfix">
							<div class="centList-centImg" style="background-image: url( http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/11/20181117171703.png ), url(  );">
								<!---->
								<!---->
								<!---->
								<!---->
							</div>
							<div class="centList-centRight">
								<h6 class="clearfix">轨道火车<span class="centRight-h6"><span>×</span>1</span></h6>
								<p>彩色<i>&nbsp;</i>长 126.2mm X 宽 27mm X 高 60.8mm</p>
								<div class="happyi-mon"><span>¥</span>299</div>
							</div>
							<!---->
							<!---->
							<!---->
							<div class="centList-data">
								<!---->
								<!---->
							</div>
						</div>
						<div class="centList-cent clearfix">
							<div class="centList-centImg" style="background-image: url( http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/11/20181114091039.png ), url(  );">
								<!---->
								<!---->
								<!---->
								<!---->
							</div>
							<div class="centList-centRight">
								<h6 class="clearfix">闹钟<span class="centRight-h6"><span>×</span>1</span></h6>
								<p>白<i>&nbsp;</i>17.9 x 46.9 x 12mm</p>
								<div class="happyi-mon"><span>¥</span>0.49</div>
							</div>
							<!---->
							<!---->
							<!---->
							<div class="centList-data">
								<!---->
								<!---->
							</div>
						</div>
					</div>
				</div>
				<div class="myOrderInfo-info">
					<div class="myOrderInfo-infoTop">
						<p><strong>订单编号:</strong>11671731066</p>
						<p><strong>下单时间:</strong>2018-12-06 18:00:04</p>
					</div>
					<div class="myOrderInfo-infoCent">
						<p><strong>支付方式:</strong>组合支付</p>
						<!---->
						<!---->
						<!---->
						<p><strong>支付现金:</strong><span>¥146.62</span></p>
						<p><strong>商品合计:</strong><span>¥299.49</span></p>
						<p><strong>运费:</strong><span>¥0</span></p>
					</div>
					<div class="myOrderInfo-total"><strong>应付合计:</strong> <span>¥146.62</span></div>
				</div>
			</div>
			<div class="confirmOrder-footer">应付: <span class="money">¥146.62</span> <strong class="footer-btn">支付<span id="footerData">11:39:35</span></strong>
				<strong class="footer-btn1">取消订单</strong></div>
			<div id="mask" class=""></div>
			<div id="storageBox" class="">
				<h6 class="storageBox-title"><span>存入储物箱</span></h6>
				<div class="storageBox clearfix">
					<div class="storageBox-left"><strong style="background-image: url(  ), url(  );"></strong>
						<span><span>×</span></span></div>
					<div class="storageBox-cent"></div>
					<div class="storageBox-right"><strong class="storageBox-rightImg" style="background-image: url(  ), url(  );"></strong>
						<strong class="storageBox-rightbg"></strong> <span></span></div>
				</div>
				<div class="storageBox-Btn clearfix"><span>取消</span> <span class="btnOK">确定</span></div>
			</div>
			<div id="prompt-view">
				<!---->
			</div>
		</div>
	</view>
</template>

<script>
</script>

<style>
/* 	#myOrderInfo {
  padding: 0.89rem 0 0.98rem;
} */
.confirmOrder-address {
  height: 1.6rem;
  width: 100%;
}
.address-bg {
  width: 100%;
  height: 0.1rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/address-icon.png) no-repeat left top;
  background-size: 100% 0.1rem;
}
.address-cent {
  position: relative;
  padding: 0.3rem 0 0 0.3rem;
  height: 1.2rem;
  background-color: #fffde5;
}
.address-cent h6 {
  margin-bottom: 0.1rem;
  font-size: 0.3rem;
  font-weight: inherit;
  color: #333;
}
.address-cent .default-icon {
  margin-right: 0.25rem;
  width: 0.7rem;
  height: 0.32rem;
  background-color: #d45048;
  border-radius: 0.04rem;
  color: #ffffff;
  font-size: 0.22rem;
}
.address-cent .address-name {
  margin-right: 0.25rem;
}
.address-cent p {
  font-size: 0.26rem;
  color: #999;
}
.address-cent .address-left {
  position: absolute;
  top: 50%;
  right: 0.2rem;
  margin-top: -0.3rem;
  width: 0.6rem;
  height: 0.6rem;
  background: url( https://cs.h5.hongkzh.com/imgs/friend/index/dynamicList-spsre.png) no-repeat center;
  background-size: 0.6rem 0.6rem;
}
.myOrderInfo-Becareful {
  margin-bottom: 0.2rem;
  padding: 0.18rem 0.2rem 0.18rem 0.6rem;
  font-size: 0.24rem;
  color: #d45048;
  background: #ffece9 url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/myOrderInfo-icon.png) no-repeat 0.3rem 0.25rem;
  background-size: 0.25rem 0.25rem;
}
.confirmOrder-describe {
  position: relative;
  padding: 0.3rem;
  margin-top: 0.2rem;
  background: #fff;
}
.confirmOrder-describe h6 {
  margin-bottom: 0.1rem;
  font-size: 0.3rem;
  font-weight: inherit;
  color: #333;
}
.confirmOrder-describe p {
  font-size: 0.26rem;
  color: #999;
}
.myOrderInfo-icon {
  position: absolute;
  top: 0;
  right: 0.1rem;
  display: block;
  padding-right: 0.6rem;
  min-width: 0.6rem;
  height: 100%;
  font-size: 0.28rem;
  color: #666;
  background: url( https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMedia-hotmore.png) no-repeat right center;
  background-size: 0.6rem 0.6rem;
}
.confirmOrder-centList {
  margin-top: 0.2rem;
  background: #fff;
}
.confirmOrder-listCent {
  padding-left: 0.3rem;
}
.confirmOrder-listCent .centList-cent:first-child {
  border-bottom: none;
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
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-gwl.png) no-repeat left center;
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
  padding: 0.2rem 0.3rem 0.2rem 0;
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
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-icon1.png) no-repeat center;
  background-size: 100% 100%;
}
.centList-centImg .shoppingCart-icon2 {
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-icon2.png) no-repeat center;
  background-size: 100% 100%;
}
.centList-centImg .shoppingCart-icon3 {
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-icon3.png) no-repeat center;
  background-size: 100% 100%;
}
.centList-centImg .overtime {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/overtime.png) no-repeat center;
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
.centList-describe {
  margin-top: 0.2rem;
  width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.2rem;
  color: #999;
}
.centList-data {
  position: absolute;
  bottom: 0.2rem;
  right: 0.3rem;
}
.centList-data p {
  margin-top: 0.2rem;
  text-align: center;
  font-size: 0.2rem;
  color: #333333;
}
.centList-Btn,
.centList-Btnactive {
  display: block;
  width: 1.88rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 0.08rem;
  font-size: 0.24rem;
  color: #666666;
}
.centList-Btn {
  border-color: #666;
}
.centList-Btnactive {
  border-color: #d45048;
  background: #d45048;
  color: #fff;
}
.centList-butt {
  padding-right: 0.3rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: right;
  font-size: 0.26rem;
  color: #666;
}
.centList-butt strong {
  font-weight: inherit;
}
.centList-butt span {
  margin-left: 0.1rem;
  padding-left: 0.3rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-mons.png) no-repeat left 0.02rem;
  background-size: 0.25rem 0.25rem;
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
  height: 100%;
}
.goods-total {
  margin-top: 0.2rem;
  border-bottom: 1px solid #e2e2e2;
}
.goods-total span {
  color: #EF593C;
}
.myOrderInfo-info {
  margin-top: 0.2rem;
  padding-left: 0.3rem;
  font-size: 0.26rem;
  background: #fff;
}
.myOrderInfo-info strong {
  display: inline-block;
  width: 1.6rem;
  color: #333;
}
.myOrderInfo-info span {
  display: inline-block;
}
.myOrderInfo-info .myOrderInfo-infoTop,
.myOrderInfo-info .myOrderInfo-infoCent {
  padding: 0.3rem 0;
  border-bottom: 1px solid #e2e2e2;
}
.myOrderInfo-info .myOrderInfo-infoTop p,
.myOrderInfo-info .myOrderInfo-infoCent p {
  margin-bottom: 0.15rem;
}
.myOrderInfo-info .myOrderInfo-infoTop p:last-child,
.myOrderInfo-info .myOrderInfo-infoCent p:last-child {
  margin-bottom: 0;
}
.myOrderInfo-info .myOrderInfo-infoCent .happyi-mon {
  padding-left: 0.3rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/goodsDetails/goodsDetails-icon.png) no-repeat left 0.02rem;
  background-size: 0.25rem 0.25rem;
}
.myOrderInfo-info .myOrderInfo-total {
  height: 1rem;
  line-height: 1rem;
}
.myOrderInfo-info .myOrderInfo-total span {
  height: 100%;
  color: #d45048;
  background-position: left 0.35rem;
}
.myOrderInfo-butt,
.myOrderInfo-butt1 {
  margin: 0.2rem 0;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #fff;
  font-size: 0.28rem;
  color: #333;
}
.butt-kefu {
  display: inline-block;
  padding-left: 0.7rem;
  height: 1rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/goodsDetails/goodsDetails-kefu.png) no-repeat left center;
  background-size: 0.7rem 0.7rem;
}
.butt-lxmj {
  display: inline-block;
  padding-left: 0.7rem;
  height: 1rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/goodsDetails/goodsDetails-kefu.png) no-repeat left center;
  background-size: 0.7rem 0.7rem;
}
.myOrderInfo-butt1 {
  position: relative;
  padding: 0 0.9rem;
}
.myOrderInfo-butt1 .butt-kefu {
  float: left;
}
.myOrderInfo-butt1 .butt-lxmj {
  float: right;
}
.myOrderInfo-butt1 strong {
  position: absolute;
  top: 0.3rem;
  left: 49.9%;
  display: inline-block;
  border-left: 1px solid #999;
  height: 0.4rem;
  vertical-align: -0.05rem;
}
.confirmOrder-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 500;
  padding: 0 4%;
  width: 92%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-top: 1px solid #ccc;
  background: #fff;
  color: #333333;
  font-size: 0.26rem;
}
.confirmOrder-footer strong {
  font-weight: inherit;
}
.confirmOrder-footer .footer-btn {
  margin: 0.2rem 0 0 0.2rem;
  float: right;
  width: 2.16rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  color: #ffffff;
  background-color: #d45048;
  border: 1px solid #d45048;
  border-radius: 0.08rem;
}
.confirmOrder-footer .footer-btn2 {
  background-color: #e2e2e2;
  border: 1px solid #e2e2e2;
}
.confirmOrder-footer .footer-btn1 {
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
.confirmOrder-footer .money {
  display: inline-block;
  color: #EF593C;
}
div#mask {
  display: none;
}
#storageBox {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -45%;
  margin-top: -2.25rem;
  z-index: 2000;
  width: 90%;
  height: 4.5rem;
  background-color: #ffffff;
  border-radius: 0.1rem;
  overflow: hidden;
}
.maskShow {
  display: block !important;
}
.storageBox-title {
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  font-size: 0.34rem;
  color: #333333;
  border-bottom: 1px solid #e2e2e2;
}
.storageBox-title span {
  display: inline-block;
  padding-right: 0.45rem;
  height: 100%;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/confirmOrder-icon.png) no-repeat right center;
  background-size: 0.3rem 0.3rem;
}
.storageBox-Btn {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.89rem;
  line-height: 0.89rem;
  border-top: 1px solid #e2e2e2;
  font-size: 0.3rem;
  text-align: center;
}
.storageBox-Btn span {
  float: left;
  width: 50%;
  height: 100%;
  color: #999999;
}
.storageBox-Btn .btnOK {
  color: #fff;
  background-color: #d45048;
}
.storageBox {
  padding: 0.4rem 0.35rem 0;
}
.storageBox-left {
  float: left;
  width: 1.6rem;
  font-size: 0;
}
.storageBox-left strong {
  display: block;
  width: 100%;
  height: 1.6rem;
  background-size: 100%;
  border: solid 1px #eeeeee;
}
.storageBox-left > span {
  margin-top: 0.02rem;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 0.26rem;
  color: #999999;
}
.storageBox-left > span span {
  margin-right: 0.05rem;
  vertical-align: -0.03rem;
}
.storageBox-cent {
  margin: 0 0.25rem;
  float: left;
  width: 2rem;
  height: 1.6rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/confirmOrder-icon4.png) no-repeat center;
  background-size: 100% 0.12rem;
}
.storageBox-right {
  position: relative;
  float: left;
  width: 1.61rem;
  height: 1.57rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/confirmOrder-icon1.png) no-repeat center;
  background-size: 100% 100%;
}
.storageBox-right span {
  position: absolute;
  top: 0.28rem;
  right: 0.38rem;
  z-index: 110;
  display: block;
  width: 0.26rem;
  height: 0.26rem;
  line-height: 0.26rem;
  text-align: center;
  background-color: #d45048;
  border-radius: 50%;
  font-size: 0.18rem;
  color: #ffffff;
}
.storageBox-rightImg {
  position: absolute;
  top: 0.39rem;
  left: 0.39rem;
  z-index: 108;
  display: block;
  width: 0.78rem;
  height: 0.78rem;
  background-size: 100% 100%;
}
.storageBox-rightbg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 109;
  display: block;
  width: 1.61rem;
  height: 1.57rem;
  background: url( https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/confirmOrder-icon2.png) no-repeat center;
  background-size: 100% 100%;
}
</style>
