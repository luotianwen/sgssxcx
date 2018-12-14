<template>
	<view class="">
		<div id="confirmOrder">
			 
			<div class="confirmOrder-address">
				<div class="address-bg"></div>
				<div class="address-cent">
					<h6>请选择地址</h6><strong class="address-left"></strong>
				</div>
			</div>
			<div class="confirmOrder-cent">
				<div class="confirmOrder-centList">
					<!-- <div class="centList-title"><span>逍遥子</span></div> -->
					<div class="confirmOrder-listCent">
						<div class="centList-cent clearfix">
							<div class="centList-centCent">
								<div class="centList-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/1bd6e64da75c4014b385ae9bdf0a6798/images/shop/product/2018/12/20181201113734.jpg), url();">
								</div>
								<div class="centList-centRight">
									<h6 class="clearfix">童装<span class="centRight-h6"><span>×</span>1</span></h6>
									<p>灰色<i>&nbsp;</i>小号</p>
									<div class="happyi-mon"><span>¥</span>18</div>
								</div>
							</div>
							 
						 </div>
					</div>
					<div class="confirmOrder-listCent">
						<div class="centList-cent clearfix">
							<div class="centList-centCent">
								<div class="centList-centImg" style="background-image: url(http://test2.img.hongkzh.com/userfiles/1bd6e64da75c4014b385ae9bdf0a6798/images/shop/product/2018/12/20181201113734.jpg), url();">
								</div>
								<div class="centList-centRight">
									<h6 class="clearfix">童装<span class="centRight-h6"><span>×</span>1</span></h6>
									<p>灰色<i>&nbsp;</i>小号</p>
									<div class="happyi-mon"><span>¥</span>18</div>
								</div>
							</div>
							 
						</div>
					</div>
					<div class="centList-butt"  >
						<span class="centList-buttLeft"  @click="getPreorder(3,list)">优惠券</span>
						<span class="centList-buttCent">可用折扣券 张</span>
						<strong class="centList-buttRight" @click="getMyCouponsByProductId(list)"></strong>
					</div>
				</div>
			</div>
			<div class="confirmOrder-footer"><span class="footer-money">¥18.00</span>
				<div class="footer-money1">
					<p>总额：<span>¥18</span></p>
					<p>立减：<span>¥0.00</span></p>
				</div><strong class="footer-btn">提交订单</strong>
			</div>
			<div id="mask" class=""></div>
			 
			<div id="confirmPayment" class="">
				<h6 class="confirmPayment-title">确认付款<span></span></h6>
				<div class="confirmPayment-countegral"><span>¥</span></div>
				<div class="confirmPayment-user clearfix">支付用户<strong style="background-image: url(), url();"></strong><span></span></div>
				<!---->
				<div class="confirmPayment-btn1">支付</div>
			</div>
			<div id="colseInvalid" class="">
				<h6 class="colseInvalid-title">抱歉，恁本单购买的以下商品因付款超时已无法购买</h6>
				<div class="colseInvalid-cent"></div>
				<div class="colseInvalid-butt clearfix"><span>返回购物车</span> <span class="btn">移除无效商品</span></div>
			</div>
			<div id="leaveTips" class="">
				<h6>确认离开吗?</h6>
				<div class="clearfix"><span class="leaveTips-btn">确认离开</span> <span>我在想想</span></div>
			</div>
			<div id="voucher" class="">
				<h6 class="confirmPayment-title"><strong class="goods-totalRight"></strong> 优惠券<span></span></h6>
				<div class="voucher-cent"></div>
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
	#confirmOrder {
		padding: 0rem 0 1.5rem;
	}

	.confirmOrder-address {
		height: 1.6rem;
		width: 100%;
	}

	.address-bg {
		width: 100%;
		height: 0.1rem;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/address-icon.png) no-repeat left top;
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
		right: 0.25rem;
		margin-top: -0.24rem;
		width: 0.48rem;
		height: 0.48rem;
		background: url(https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-left.png) no-repeat center;
		background-size: 0.48rem 0.48rem;
	}

	.confirmOrder-centList {
		margin-top: 0.2rem;
		background: #fff;
	}

	/* .centList-title {
		padding-left: 0.3rem;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	.centList-title span {
		display: inline-block;
		padding-left: 0.6rem;
		min-width: 0.6rem;
		height: 100%;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-gwl.png) no-repeat left center;
		background-size: 0.58rem 0.56rem;
	}

	.centList-title strong {
		margin: 0 0.1rem 0 0.2rem;
		display: inline-block;
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 50%;
		vertical-align: middle;
		background-size: 100% 100%;
	} */

	.centList-cent {
		position: relative;
	}

	.centList-cent:first-child .centList-centCent {
		border-top: none;
	}

	.centList-centCent {
		margin-left: 0.3rem;
		padding: 0.2rem 0.3rem 0.2rem 0;
		border-top: 1px solid #e2e2e2;
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

	.centList-centImg .overtime {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 100%;
		height: 100%;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/overtime.png) no-repeat center;
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
		font-size: 0.3rem;
		color: #EF593C;
	}

	.centList-centRight .happyi-mon span {
		font-size: 0.24rem;
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

	.centList-data1 {
		bottom: 0.79rem;
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

	.goods-total,
	.freight-total,
	.centList-butt {
		margin-left: 0.3rem;
		padding-right: 0.3rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.24rem;
		color: #333;
		background: #fff;
	}

	.centList-butt {
		position: relative;
		border-bottom: 1px solid #e2e2e2;
	}

	.centList-butt .centList-buttCent {
		color: #EF593C;
	}

	.centList-butt .centList-buttRight {
		position: absolute;
		top: 50%;
		right: 0.25rem;
		margin-top: -0.24rem;
		width: 0.48rem;
		height: 0.48rem;
		background: url(https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-left.png) no-repeat center;
		background-size: 0.48rem 0.48rem;
	}

	.centList-buttLeft {
		display: inline-block;
		width: 0.9rem;
		padding-left: 0.5rem;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/confirmOrder-icon5.png) no-repeat left center;
		background-size: 0.4rem 0.4rem;
		color: #333;
	}

	.centList-buttLeft1 {
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/confirmOrder-icon6.png) no-repeat left center;
		background-size: 0.4rem 0.4rem;
	}

	 

	.confirmOrder-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 0.98rem;
		line-height: 0.98rem;
		border-top: 1px solid #fefefe;
		background: #fff;
		color: #333333;
		font-size: 0.28rem;
	}

	.confirmOrder-footer .footer-btn {
		float: right;
		width: 40%;
		height: 100%;
		text-align: center;
		background: #CDC8B1;
		font-size: 0.32rem;
		color: #ffffff;
	}

	.confirmOrder-footer .footer-money {
		position: absolute;
		top: 0;
		left: 0;
		width: 26%;
		text-align: center;
		border-right: 1px solid #e2e2e2;
	}

	.confirmOrder-footer .footer-money1 {
		position: absolute;
		top: 0;
		left: 25%;
		width: 30%;
		padding: 0.1rem 0 0 4%;
		line-height: 0.4rem;
	}

	.confirmOrder-footer span {
		font-size: 0.32rem;
		color: #EF593C;
	}

	div#mask {
		display: none;
	}

	 
	.maskShow {
		display: block !important;
	} 
	#confirmPayment,
	#voucher {
		display: none;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2000;
		width: 100%;
		background: #fff;
	}

	#confirmPayment {
		height: 7rem;
	}

	.confirmPayment-title {
		position: relative;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 0.34rem;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	.confirmPayment-title span {
		position: absolute;
		right: 0.3rem;
		top: 0;
		display: block;
		width: 0.6rem;
		height: 100%;
		background: url("https://cs.h5.hongkzh.com/imgs/friend/index/circleBar-close.png") no-repeat center;
		background-size: 0.6rem 0.6rem;
	}

	.confirmPayment-countegral {
		margin: 0.5rem 0 0.4rem;
		font-size: 0.5rem;
		color: #333;
		text-align: center;
	}

	.confirmPayment-countegral strong {
		display: inline-block;
		padding-left: 0.44rem;
		min-width: 0.4rem;
		height: 100%;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/goodsDetails/goodsDetails-icon.png) no-repeat left center;
		background-size: 0.35rem 0.35rem;
	}

	.confirmPayment-user,
	.confirmPayment-balance {
		padding-right: 0.3rem;
		margin-left: 0.32rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	.confirmPayment-user strong,
	.confirmPayment-balance strong,
	.confirmPayment-user span,
	.confirmPayment-balance span {
		float: right;
	}

	.confirmPayment-user span,
	.confirmPayment-balance span {
		margin-right: 0.2rem;
	}

	.confirmPayment-user span {
		font-size: 0.28rem;
		color: #666666;
	}

	.confirmPayment-user strong {
		margin-top: 0.15rem;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		background-size: 100% 100%;
	}

	.confirmPayment-balance strong,
	.confirmPayment-balance span {
		font-size: 0.28rem;
	}

	.confirmPayment-balance span {
		height: 100%;
		padding-left: 0.3rem;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-mons.png) no-repeat left 0.36rem;
		background-size: 0.25rem 0.25rem;
	}

	.confirmPayment-balance strong {
		color: #f44834;
	}

	.confirmPayment-btn,
	.confirmPayment-btn1 {
		margin: 0.9rem auto 0;
		width: 90%;
		height: 0.98rem;
		line-height: 0.98rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EF593C;
		border-radius: 0.1rem;
		border: 0.02rem solid #EF593C;
	}

	.confirmPayment-btn1 {
		background: #EF593C;
		border-color: #EF593C;
		color: #fff;
	}

	#colseInvalid {
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

	.colseInvalid-title {
		padding: 0.5rem 0.5rem 0;
		font-size: 0.3rem;
		color: #333333;
	}

	.colseInvalid-cent {
		padding: 0.3rem 0.5rem;
		height: 1.62rem;
		overflow-y: auto;
	}

	.colseInvalid-butt {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0.9rem;
		line-height: 0.9rem;
		text-align: center;
		border-top: 1px solid #e2e2e2;
	}

	.colseInvalid-butt span {
		float: left;
		width: 50%;
		height: 100%;
		font-size: 0.3rem;
		color: #666666;
	}

	.colseInvalid-butt .btn {
		color: #fff;
		background-color: #d45048;
	}

	#leaveTips {
		display: none;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -2.7rem;
		margin-top: -1.22rem;
		z-index: 2000;
		width: 5.4rem;
		height: 2.44rem;
		background-color: #ffffff;
		border-radius: 0.1rem;
		overflow: hidden;
		font-size: 0.3rem;
		text-align: center;
		font-weight: bold;
	}

	#leaveTips h6 {
		height: 1.44rem;
		line-height: 1.44rem;
		color: #333333;
		border-bottom: 1px solid #e2e2e2;
	}

	#leaveTips div {
		height: 1rem;
		line-height: 1rem;
	}

	#leaveTips span {
		float: left;
		width: 50%;
		color: #EF593C;
	}

	#leaveTips .leaveTips-btn {
		width: 49.5%;
		border-right: 1px solid #e2e2e2;
		color: #999999;
	}

	#voucher {
		height: 8rem;
		background: #F5F5F5;
	}

	#voucher .confirmPayment-title {
		background: #fff;
	}

	#voucher .goods-totalRight {
		left: 0.3rem;
	}

	.voucher-cent {
		padding: 0.12rem 0.3rem 0.3rem;
	}

	.coupon-list {
		position: relative;
		margin-top: 0.18rem;
		padding-top: 0.5rem;
		height: 1.9rem;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-bg.png) no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .slide-img {
		position: absolute;
		display: block;
		top: 0.5rem;
		left: 0.34rem;
		width: 1.4rem;
		height: 1.4rem;
		background: #eee;
		background-size: 100% 100%;
	}

	.coupon-list h6,
	.coupon-list .purchase-icon2,
	.coupon-list p {
		position: relative;
		z-index: 11;
		padding: 0 0.2rem 0 2.14rem;
	}

	.coupon-list h6 {
		margin-top: 0.04rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.3rem;
		color: #333333;
	}

	.coupon-list .purchase-icon2 {
		margin: 0.12rem 0 0.13rem;
		display: block;
		width: 0.76rem;
		height: 0.32rem;
		background: url("https://cs.h5.hongkzh.com/imgs/purchase/index/purchase-icon2.png") no-repeat 2.1rem center;
		background-size: 0.76rem 0.32rem;
	}

	.coupon-list p {
		font-size: 0.24rem;
		color: #666;
	}

	.coupon-list .list-butt {
		position: absolute;
		left: 0;
		bottom: 0.1rem;
		padding: 0 4.5%;
		width: 91%;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #666;
	}

	.coupon-list .list-buttMoney {
		margin-left: 0.05rem;
		padding-left: 0.4rem;
		font-size: 0.28rem;
		color: #EF593C;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/goodsDetails/goodsDetails-icon.png) no-repeat left center;
		background-size: 0.3rem 0.3rem;
		vertical-align: -0.01rem;
	}

	.coupon-list .list-btn,
	.coupon-list .list-btn1 {
		margin: 0.15rem 0 0 0.2rem;
		float: right;
		width: 1.3rem;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		border-radius: 0.05rem;
		font-size: 0.24rem;
	}

	.coupon-list .list-btn {
		color: #EF593C;
		border: 1px solid #EF593C;
	}

	.coupon-list .list-btn1 {
		color: #666666;
		border: 1px solid #CCCCCC;
	}

	.coupon-list .coupon-lableIcon,
	.coupon-list .coupon-txt {
		position: absolute;
		left: 0;
		display: block;
		width: 1.09rem;
		height: 1.09rem;
	}

	.coupon-list .coupon-lableIcon {
		top: 0;
		z-index: 10;
		background: url(https://cs.h5.hongkzh.com/imgs/purchase/coupon/coupon-lableIcon.png) no-repeat center;
		background-size: 100% 100%;
	}

	.coupon-list .coupon-txt {
		top: 0.02rem;
		z-index: 100;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		/* IE 9 */
		-moz-transform: rotate(-45deg);
		/* Firefox */
		-webkit-transform: rotate(-45deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(-45deg);
		/* Opera */
	}
</style>
