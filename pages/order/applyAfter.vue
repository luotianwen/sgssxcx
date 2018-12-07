<template>
	<view class="">
		<div id="applyRefund">
			 
			<div class="applyRefund-top">
				<div>温馨提示：</div>
				<p>· 限时特价、预约资格等购买优惠可能一并取消</p>
				<p>· 订单一旦取消，无法恢复</p>
			</div>
			<!---->
			<div class="deliverGoods-cent">
				<div>退款类型:<span>请选择退款类型</span></div>
				<div>退款原因:<span>请选择退款原因</span></div>
				<div><strong>退款联系人:</strong><input type="text" placeholder="请输入联系人"></div>
				<div><strong>联系方式:</strong><input type="tel" placeholder="请输入联系方式"></div>
			</div>
			<div class="deliverGoods-btn">提交</div>
			<div class="provingMode"></div>
			 
		</div>
	</view>
</template>

<script>
</script>

<style>
 
.applyRefund-top {
  
  margin: 0.3rem;
  height: 1.4rem;
  font-size: 0.28rem;
  color: #333;
  background-color: #f5f5f5;
}
.applyRefund-top div {
  margin-bottom: 0.1rem;
}
.applyRefund-top p {
  margin-bottom: 0.08rem;
}
.deliverGoods-cent {
  margin-top: 0.2rem;
  background: #fff;
  border-top: 1px solid #e2e2e2;
}
.deliverGoods-cent div {
  padding-left: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #333333;
  border-bottom: 1px solid #e2e2e2;
}
.deliverGoods-cent strong {
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
.deliverGoods-cent span {
  float: right;
  margin-right: 1%;
  padding-right: 0.5rem;
  height: 100%;
  width: 68%;
  color: #666;
  background: url(https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMedia-hotmore.png) no-repeat right center;
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
  background-color: #d45048;
  border-radius: 0.1rem;
  font-size: 0.32rem;
  color: #ffffff;
}
.maskShow {
  display: block !important;
}
div#mask {
  display: none;
}
#screen {
  display: none;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2000;
  width: 100%;
  height: 7.8rem;
  background: #fff;
}
#screen .screen-title {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.3rem;
  color: #333;
  border-bottom: 1px solid #eee;
}
#screen .salary-cent {
  height: 6.8rem;
  overflow-y: auto;
}
#screen .salary-cent span,
#screen .salary-cent strong {
  display: block;
  padding-left: 8%;
  width: 92%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.28rem;
  color: #333;
  border-bottom: 1px solid #f1f1f1;
}
#screen .salary-cent .active {
  color: #0092ff;
}
#modifyPrice .modifyPrice-more {
  float: right;
  margin-right: 0.3rem;
  padding-left: 0.3rem;
  font-weight: inherit;
  color: #f44834;
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-mons.png) no-repeat left center;
  background-size: 0.25rem 0.25rem;
}
#modifyPrice .seeIndex-setUp {
  position: absolute;
  top: 0;
  right: 0.2rem;
  height: 100%;
  font-weight: inherit;
  background: none;
  border: none;
  color: #4090f7;
}

</style>
