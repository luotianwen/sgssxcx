<template>
	<view class="">
		<div id="goodsDetails">
			<!-- <div class="goodsDetails-header clearfix"><span class="goodsDetails-gobk"></span> <span class="goodsDetails-more"></span>
				<span class="goodsDetails-cart"></span></div> -->
			<aside class="purchase-slider">
				<div class="swiper-container swiper-container-horizontal swiper-container-ios">
					<div class="swiper-wrapper">
						<div class="swiper-slide swiper-slide-active" style="width: 375px; margin-right: 30px;"><img src="http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/11/20181114091039.png"
							 class="lazy"></div>
					</div>
					<div class="swiper-pagination swiper-pagination-fraction"><span class="swiper-pagination-current">1</span> / <span
						 class="swiper-pagination-total">1</span></div><span class="swiper-notification" aria-live="assertive"
					 aria-atomic="true"></span>
				</div>
			</aside>
			<div class="goodsDetails-title">
				<h6>闹钟</h6>
				<div class="title-money clearfix"><span class="title-moneyNum"><span>¥</span>0.49</span><span class="title-moneyRight">月销55笔</span></div>
			</div>
			<!-- <div class="goodsDetails-comment" style="display: none;">
				<div class="goodsDetails-commentTitle"><b>商品评价</b>&nbsp;(5545)<span>95.8%好评</span><strong class="purchase-more2"></strong></div>
				<div class="comment-tab"><span>好评(555)</span> <span>中评(555)</span> <span>差评(555)</span></div>
				<div class="comment-cent">
					 
				</div>
			</div> -->
			<!-- <div class="goodsDetails-shops">
				<div class="shops-topHead clearfix"><strong style="background-image: url( http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/logo/2018/11/20181113184859.png ), url(  );"></strong>
					<h6>喵呜旺铺</h6>
					<p>商品数量6</p><a href="/purchase/shopIndex?shopId=c26e1f42115b4479b1c57decad2e5985">进店逛逛</a>
				</div>
			</div> -->
			<!---->
			<div class="goodsDetails-InfoCent">
				<div class="InfoCent-Img">
					<p>
						<span style="color: rgb(26, 26, 26); font-family:  Helvetica Neue , Helvetica, Arial,  Microsoft Yahei ,  Hiragino Sans GB ,  Heiti SC ,  WenQuanYi Micro Hei , sans-serif; font-size: 12px; white-space: normal;">&nbsp;
							&nbsp; 动态闹钟是指闹钟铃声背景音乐上叠加天气播报等内容；小睡和冥想、动态闹钟功能需要升级固件之后才能支持；翻译功能只支持中英互翻；查限行、路况，需要在米家APP
							中填写出行信息；查找手机，目前只支持查找小米手机；线性四麦设计，建议背靠 墙放置，在屏幕正面180°内互动，收音效果更好；不支持语音控制小米电视 / 盒子。</span></p>
				</div>
			</div>
			<!---->
			<div class="goodsDetails-butt"><a class="goodsDetails-buttBtn">加入购物车</a> <a class="goodsDetails-buttColor">立即购买</a></div>
			<div id="mask" style="display: none;"></div>
			<div class="goodsDetails-choice" style="display: none;"><span class="goodsDetails-choiceBtn">×</span>
				<div class="choice-top clearfix"><strong style="background-image: url( http://test2.img.hongkzh.com/userfiles/0557b352f43e46758db45dc0dabe2c71/images/shop/product/2018/11/20181114091039.png ), url(  );"></strong>
					<p class="choice-topmt">价格：<span class="purchase-mons">¥0.49</span></p>
					<p>已选：&nbsp;&nbsp;</p>
					<!---->
				</div>
				<div class="goodsDetails-choiceCent">
					<div class="choice-cent">
						<p>颜色</p><span class="">白</span>
					</div>
					<div class="choice-cent">
						<p>规格</p><span class="">17.9 x 46.9 x 12mm</span>
					</div>
					<div class="choice-butt">
						<p>购买数量</p>
						<div class="choice-buttDiv clearfix"><span class="choice-buttBtn1">－</span> <input type="number" name="num">
							<span class="choice-buttBtn2">＋</span></div>
					</div>
				</div>
			</div>
			 
		</div>
	</view>
</template>

<script>
</script>

<style>
	#goodsDetails {
		position: relative;
		padding-bottom: 0.98rem;
	}

	.purchase-slider {
		height: 7.14rem;
	}

	.purchase-slider .swiper-container {
		width: 100%;
		height: 100%;
	}

	.purchase-slider .swiper-container img {
		width: 100%;
		height: 100%;
	}

	.purchase-slider .swiper-container .swiper-pagination {
		left: auto;
		right: 0.3rem;
		bottom: 0.3rem;
		width: 0.8rem;
		height: 0.42rem;
		line-height: 0.42rem;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 21px;
		text-align: center;
		font-size: 0.26rem;
		color: #fff;
	}

	.purchase-slider .swiper-container .swiper-pagination-current {
		font-size: 0.34rem;
	}

	.goodsDetails-header {
		position: absolute;
		top: 0.09rem;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 0.74rem;
	}

	.goodsDetails-header span {
		display: block;
		width: 0.74rem;
		height: 0.74rem;
	}

	.goodsDetails-header .goodsDetails-gobk {
		float: left;
		margin-left: 0.16rem;
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-gobk.png") no-repeat center;
		background-size: 100% 100%;
	}

	.goodsDetails-header .goodsDetails-cart {
		float: right;
		margin-right: 0.16rem;
		background: url(https://h5.hongkzh.cn/imgs/purchase/index/purchase-cart.png) no-repeat center;
		background-size: 100% 100%;
	}

	.goodsDetails-header .goodsDetails-more {
		float: right;
		margin-right: 0.16rem;
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-more.png") no-repeat center;
		background-size: 100% 100%;
	}

	.goodsDetails-title {
		padding: 0.2rem 0.3rem 0;
		background: #fff;
	}

	.goodsDetails-title h6 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		white-space: inherit;
		font-size: 0.36rem;
		color: #333333;
	}

	.goodsDetails-title strong {
		margin: 0 0.08rem;
		font-size: 0.45rem;
	}

	.goodsDetails-title .title-money {
		height: 1.1rem;
		line-height: 1.1rem;
		font-size: 0.28rem;
		color: #999;
	}

	.goodsDetails-title .title-moneyNum {
		font-size: 0.5rem;
		color: #EF593C;
	}

	.goodsDetails-title .title-moneyNum span {
		margin-right: 0.08rem;
		font-size: 0.3rem;
	}

	.goodsDetails-title .title-moneyNum1 {
		font-size: 0.32rem;
		color: #666666;
		padding-left: 0.4rem;
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-icon.png) no-repeat left center;
		background-size: 0.3rem 0.3rem;
		vertical-align: 0.03rem;
	}

	.goodsDetails-title .title-moneyRight {
		float: right;
	}

	.goodsDetails-top {
		padding-left: 0.3rem;
		background: #fff;
	}

	.purchase-more2 {
		position: absolute;
		top: 50%;
		right: 0.2rem;
		margin-top: -0.3rem;
		height: 0.6rem;
		width: 0.6rem;
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-mone.png) no-repeat center;
		background-size: 0.6rem 0.6rem;
	}

	.goodsDetails-topOther {
		position: relative;
		height: 0.99rem;
		line-height: 0.99rem;
		font-size: 0.28rem;
		color: #333;
		border-bottom: 1px solid #eee;
	}

	.goodsDetails-topOther .topOther-lable {
		display: inline-block;
		width: 1.2rem;
		color: #999;
	}

	.goodsDetails-topOther .goodsDetails-icon1,
	.goodsDetails-topOther .goodsDetails-icon2 {
		margin-right: 0.1rem;
		display: inline-block;
		width: 1rem;
		height: 100%;
		text-align: center;
		font-size: 0.24rem;
		color: #fff;
	}

	.goodsDetails-topOther .goodsDetails-icon1 {
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-icon1.png) no-repeat center;
		background-size: 100% 0.38rem;
	}

	.goodsDetails-topOther .goodsDetails-icon2 {
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-icon2.png) no-repeat center;
		background-size: 100% 0.38rem;
	}

	.goodsDetails-comment {
		margin-top: 0.2rem;
		background: #FFFFFF;
	}

	.goodsDetails-comment .comment-tab {
		padding: 0.4rem 0.3rem 0.1rem 0.15rem;
		font-size: 0;
	}

	.goodsDetails-comment .comment-tab span {
		margin-left: 0.15rem;
		display: inline-block;
		width: 1.6rem;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		font-size: 0.24rem;
		color: #666666;
		background: #FFF0ED;
		border-radius: 100px;
	}

	.goodsDetails-comment .comment-cent {
		padding-left: 0.3rem;
	}

	.goodsDetails-comment .comment-list {
		padding: 0.3rem 0 0.35rem;
		border-bottom: 1px solid #eee;
	}

	.goodsDetails-comment .comment-list h6 {
		padding: 0.3rem 0.3rem 0 0;
	}

	.goodsDetails-comment .comment-list>p {
		margin-top: 0.2rem;
	}

	.goodsDetails-comment .comment-list h6 {
		font-size: 0.28rem;
		font-weight: inherit;
		color: #333333;
	}

	.goodsDetails-comment .comment-list p {
		font-size: 0.24rem;
		color: #999;
	}

	.goodsDetails-comment .comment-list:last-child {
		border-bottom: none;
	}

	.goodsDetails-comment .comment-listTitle {
		height: 0.72rem;
		line-height: 0.72rem;
		font-size: 0.26rem;
		color: #333333;
	}

	.goodsDetails-comment .comment-headImg {
		float: left;
		margin-right: 0.2rem;
		width: 0.72rem;
		height: 0.72rem;
		background: #ccc;
		background-size: 100%;
		border-radius: 50%;
	}

	.goodsDetails-comment .comment-headName {
		margin-right: 0.1rem;
	}

	.goodsDetails-comment .comment-data {
		float: right;
		margin-right: 0.3rem;
		font-size: 0.24rem;
		color: #999;
	}

	.goodsDetails-comment .comment-listImg {
		margin-top: 0.3rem;
		height: 1.5rem;
	}

	.goodsDetails-comment .comment-listImg img {
		margin-right: 0.2rem;
		float: left;
		width: 1.5rem;
		height: 1.5rem;
	}

	.goodsDetails-sppls,
	.goodsDetails-sppls1 {
		display: inline-block;
		width: 0.22rem;
		height: 0.21rem;
	}

	.goodsDetails-sppls {
		position: relative;
		margin-right: 0.05rem;
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-sppls.png) no-repeat center;
		background-size: 100%;
	}

	.goodsDetails-sppls1 {
		position: absolute;
		top: 0;
		left: 0;
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-sppls1.png) no-repeat center;
		background-size: 100%;
	}

	.goodsDetails-commentTitle {
		padding-left: 0.3rem;
		position: relative;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #333;
		border-bottom: 1px solid #eee;
	}

	.goodsDetails-commentTitle span {
		margin-right: 0.7rem;
		float: right;
		color: #999;
	}

	.goodsDetails-shops {
		margin: 0.2rem 0;
		background: #FFFFFF;
		overflow: hidden;
	}

	.goodsDetails-shops .shops-topHead {
		position: relative;
		padding: 0.3rem;
		height: 0.8rem;
	}

	.goodsDetails-shops .shops-topHead strong {
		float: left;
		width: 0.8rem;
		height: 0.8rem;
		background-size: 100% 100%;
	}

	.goodsDetails-shops .shops-topHead h6,
	.goodsDetails-shops .shops-topHead p {
		padding: 0 1.7rem 0 1rem;
	}

	.goodsDetails-shops .shops-topHead h6 {
		margin-bottom: 0.05rem;
		font-size: 0.3rem;
		color: #333333;
	}

	.goodsDetails-shops .shops-topHead p {
		font-size: 0.2rem;
		color: #999;
	}

	.goodsDetails-shops .shops-topHead .topHead-num {
		margin-left: 0.3rem;
	}

	.goodsDetails-shops .shops-topHead a {
		position: absolute;
		top: 0.4rem;
		right: 0.3rem;
		display: block;
		width: 1.58rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		font-size: 0.28rem;
		color: #EF593C;
		border: 1px solid #EF593C;
		border-radius: 0.05rem;
	}

	.goodsDetails-shops .shops-cent {
		padding-left: 0.1rem;
	}

	.goodsDetails-shops .shops-cent li {
		margin-left: 0.17rem;
		float: left;
		width: 2.11rem;
		height: 3.8rem;
		font-size: 0.24rem;
	}

	.goodsDetails-shops .shops-cent strong {
		display: block;
		height: 2.1rem;
		width: 100%;
		background-size: 100% 100%;
	}

	.goodsDetails-shops .shops-cent h6 {
		margin: 0.2rem 0 0.15rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		white-space: inherit;
		color: #666666;
	}

	.goodsDetails-shops .shops-cent p {
		color: #EF593C;
	}

	.purchase-mons {
		display: inline-block;
		color: #EF593C;
	}

	.goodsDetails-Btn {
		margin-top: 0.2rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #666666;
		background: #fff;
		text-align: center;
	}

	.goodsDetails-Btn span {
		display: inline-block;
		padding-left: 0.3rem;
		height: 100%;
	}

	.goodsDetails-Btn .goodsDetails-up {
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-up.png") no-repeat left center;
		background-size: 0.24rem 0.12rem;
	}

	.goodsDetails-Btn .goodsDetails-down {
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-down.png") no-repeat left center;
		background-size: 0.24rem 0.12rem;
	}

	.goodsDetails-butt {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2000;
		height: 0.98rem;
		line-height: 0.98rem;
		width: 100%;
		background: #fff;
		text-align: right;
		border-top: 1px solid #eee;
		font-size: 0;
	}

	.goodsDetails-butt>span {
		position: absolute;
		top: 0;
		display: block;
		width: 1rem;
		height: 100%;
		border-right: 1px solid #e2e2e2;
	}

	.goodsDetails-butt a {
		float: right;
		font-size: 0.3rem;
		color: #fff;
		width: 50%;
		height: 100%;
		text-align: center;
	}

	.goodsDetails-butt .goodsDetails-buttBtn {
		background: #EF593C;
	}

	.goodsDetails-butt .goodsDetails-buttBtn1 {
		background: #2693e5;
	}

	.goodsDetails-butt .goodsDetails-buttColor {
		color: #333;
	}

	.goodsDetails-butt .goodsDetails-video {
		display: inline-block;
		margin-left: 0.12rem;
		vertical-align: middle;
		width: 0.39rem;
		height: 100%;
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-video.png") no-repeat center 0.3rem;
		background-size: 0.39rem 0.3rem;
	}

	.goodsDetails-butt .goodsDetails-kefu {
		left: 1rem;
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-kefu.png") no-repeat center;
		background-size: 0.65rem 0.62rem;
	}

	.goodsDetails-butt .goodsDetails-icon3 {
		left: 0;
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-icon3.png") no-repeat center;
		background-size: 0.45rem 0.41rem;
	}

	.goodsDetails-butt .goodsDetails-icon4 {
		left: 2rem;
		background: url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-icon4.png") no-repeat center;
		background-size: 0.43rem 0.41rem;
	}

	.goodsDetails-butt .goodsDetails-cuwux {
		left: 1rem;
		background: url(" https://h5.hongkzh.cn/imgs/purchase/shoppingCart/gwc-icon.png") no-repeat center;
		background-size: 0.55rem 0.55rem;
	}

	.goodsDetails-butt .goodsDetails-news {
		position: absolute;
		top: 0.18rem;
		left: 1.6rem;
		display: block;
		width: 0.26rem;
		height: 0.26rem;
		line-height: 0.26rem;
		text-align: center;
		background: #EF593C;
		border-radius: 0.13rem;
		color: #fff;
		font-size: 0.2rem;
	}

	.goodsDetails-InfoTitle {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		height: 0.89rem;
		line-height: 0.89rem;
		width: 100%;
		text-align: center;
		font-size: 0.26rem;
		color: #333;
		background: #fefefe;
		border-bottom: 1px solid #eee;
	}

	.goodsDetails-InfoTitle span {
		position: absolute;
		top: 50%;
		display: block;
		margin-top: -0.3rem;
		width: 0.6rem;
		height: 0.6rem;
	}

	.goodsDetails-InfoTitle strong {
		display: inline-block;
		height: 0.85rem;
		font-weight: inherit;
	}

	.goodsDetails-InfoTitle .ml3 {
		margin: 0 0.3rem;
	}

	.goodsDetails-InfoTitle .active {
		font-size: 0.3rem;
		color: #333;
		border-bottom: 0.04rem solid #0092ff;
	}

	.goodsDetails-InfoTitle .goback {
		left: 0.2rem;
		background: url(https://h5.hongkzh.cn/imgs/see/selfMedia/selfMediaPage-goback.png) no-repeat left center;
		background-size: 0.6rem 0.6rem;
	}

	.goodsDetails-InfoTitle .goodsDetails-cart {
		right: 0.8rem;
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-cart.png) no-repeat center;
		background-size: 0.45rem 0.45rem;
	}

	.goodsDetails-InfoTitle .goodsDetails-more1 {
		right: 0.2rem;
		background: url(https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-more1.png) no-repeat right center;
		background-size: 0.4rem 0.4rem;
	}

	.goodsDetails-Btn1 {
		margin-top: 0.89rem;
	}

	.goodsDetails-InfoCent {
		padding-bottom: 0.1rem;
		background: #fff;
	}

	.goodsDetails-InfoCent .InfoCent-text {
		margin: 0 0 0.2rem 0.3rem;
	}

	.goodsDetails-InfoCent .InfoCent-text li {
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 1px solid #eee;
		font-size: 0.228rem;
		color: #333333;
	}

	.goodsDetails-InfoCent .InfoCent-text span {
		display: inline-block;
		width: 2.03rem;
		color: #999;
	}

	.goodsDetails-InfoCent .InfoCent-Img {
		padding: 0.2rem;
		font-size: 0.3rem;
		color: #333;
	}

	.goodsDetails-InfoCent .InfoCent-Img img {
		display: block;
		width: 100% !important;
		min-height: 3rem;
		height: auto !important;
	}

	.goodsDetails-evaluateTop {
		margin: 0.89rem 0 0.2rem;
		padding-left: 0.3rem;
		background: #fff;
	}

	.evaluateTop {
		height: 1rem;
		line-height: 1rem;
		font-size: 0.3rem;
		color: #999999;
	}

	.evaluateTop .evaluateTop-left {
		margin-right: 0.1rem;
		color: #333;
	}

	.evaluateTop .evaluateTop-right {
		margin-left: 0.12rem;
	}

	.evaluate-classfiy {
		margin-left: -0.15rem;
		padding-bottom: 0.1rem;
		font-size: 0;
	}

	.evaluate-classfiy strong {
		display: inline-block;
		padding: 0 0.25rem;
		margin: 0 0 0.22rem 0.15rem;
		height: 0.54rem;
		line-height: 0.54rem;
		text-align: center;
		color: #666666;
		font-size: 0.26rem;
		font-weight: inherit;
		background-color: #e9f6ff;
		border-radius: 27px;
		border: solid 1px #e9f6ff;
	}

	.evaluate-classfiy strong span {
		font-weight: bold;
	}

	.evaluate-classfiy strong .goodsDetails-icon {
		display: inline-block;
		width: 0.2rem;
		height: 100%;
		text-align: center;
	}

	.evaluate-classfiy strong .active {
		background-color: #ffffff;
		border: solid 1px #0092ff;
	}

	.goodsDetails-evaluateList {
		padding-left: 0.3rem;
		margin-top: 0;
	}

	.goodsDetails-evaluateList .comment-list {
		padding-bottom: 0.3rem;
		border-bottom: 1px solid #eee;
	}

	.goodsDetails-evaluateList:last-child .comment-list {
		border-bottom: 0;
	}

	.evaluateList-butt {
		padding-top: 0.2rem;
		height: 1rem;
	}

	.evaluateList-butt p {
		margin-bottom: 0.05rem;
	}

	.evaluateList-reply {
		margin-right: 0.3rem;
		padding: 0.22rem 0.4rem 0.26rem 0.2rem;
		background-color: #f5f5f5;
		font-size: 0.25rem;
		color: #333333;
	}

	.goodsDetails-zkTop {
		margin-left: -0.3rem;
		padding-left: 0.3rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background-color: #363c40;
		color: #ffffff;
		font-size: 0.26rem;
	}

	.goodsDetails-zkTop strong {
		margin-right: 0.1rem;
		color: #f44834;
	}

	.goodsDetails-zkTop .zkTop-data {
		float: right;
		margin-right: 0.16rem;
	}

	.goodsDetails-zkTop .zkTop-data span {
		margin: 0 0.05rem;
		display: inline-block;
		width: 0.36rem;
		height: 0.36rem;
		line-height: 0.36rem;
		text-align: center;
		font-size: 10px;
		color: #fff;
		background: #566067;
		border-radius: 50%;
	}

	.goodsDetails-zkTop .zkTop-data span:first-child {
		margin-left: 0.1rem;
	}

	.goodsDetails-zkSpeed {
		margin-left: -0.3rem;
		background: #566067;
		height: 0.05em;
	}

	.goodsDetails-zkSpeed span {
		display: block;
		width: 50%;
		height: 100%;
		background: #f76654;
	}

	.goodsDetails-zkCent {
		margin-left: -0.3rem;
		height: 1.1rem;
		font-size: 0;
		background-color: #e5f4ff;
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

	.goodsDetails-zkCent li {
		position: relative;
		display: inline-block;
		padding-top: 0.2rem;
		width: 25%;
		height: 0.9rem;
		text-align: center;
		vertical-align: top;
	}

	.goodsDetails-zkCent li strong {
		display: block;
		color: #333;
		font-size: 0.3rem;
	}

	.goodsDetails-zkCent li span {
		font-size: 0.2rem;
		color: #f44834;
	}

	.goodsDetails-zkCent li i {
		position: absolute;
		top: 50%;
		right: -1px;
		margin-top: -0.35rem;
		display: block;
		height: 0.7rem;
		border-left: 1px solid #aacce3;
	}

	.goodsDetails-zkCent .original {
		background: #e9918c;
	}

	.goodsDetails-zkCent .original strong,
	.goodsDetails-zkCent .original span {
		color: rgba(255, 255, 255, 0.5);
	}

	.goodsDetails-zkCent .now {
		background: #d45048;
	}

	.goodsDetails-zkCent .now strong,
	.goodsDetails-zkCent .now span {
		color: #fff;
	}

	.goodsDetails-zkCent::-webkit-scrollbar {
		display: none;
	}

	.goodsDetails-zkMoney {
		height: 1.1rem;
		line-height: 1.1rem;
		font-size: 0;
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}

	.goodsDetails-zkMoney .zkMoney-left {
		margin-right: 0.15rem;
		font-size: 0.3rem;
		color: #333333;
	}

	.goodsDetails-zkMoney .topMeney-icon {
		margin-right: 0.05rem;
		font-size: 0.5rem;
	}

	.goodsDetails-zkMoney .zkMoney-right {
		font-size: 0.2rem;
		color: #999;
	}

	.goodsDetails-zkMoney .zkMoney-right i {
		margin: 0 0.2rem;
		display: inline-block;
		border-left: 1px solid #999;
		height: 0.25rem;
		vertical-align: -0.05rem;
	}

	.purchase-mong {
		margin-left: 0.05rem;
		display: inline-block;
		padding-left: 0.2rem;
		background: url(https://h5.hongkzh.cn/imgs/purchase/index/purchase-mong.png) no-repeat left center;
		background-size: 0.2rem 0.2rem;
	}

	#mask {
		background: rgba(0, 0, 0, 0.8);
	}

	.goodsDetails-choice {
		padding: 0.4rem 0;
		position: fixed;
		left: 0;
		bottom: 0.99rem;
		z-index: 2000;
		width: 100%;
		background: #fff;
	}

	.goodsDetails-choice>div {
		margin: 0 0.3rem;
		overflow: hidden;
	}

	.goodsDetails-choice .goodsDetails-choiceCent {
		height: 4.5rem;
		overflow-y: auto;
	}

	.goodsDetails-choice p {
		font-size: 0.3rem;
		color: #333333;
	}

	.goodsDetails-choice .goodsDetails-choiceBtn {
		position: absolute;
		top: 0.1rem;
		right: 0.3rem;
		font-size: 0.6rem;
	}

	.goodsDetails-choice .choice-top .choice-topmt {
		padding-top: 0.65rem;
	}

	.goodsDetails-choice .choice-top .stocks {
		color: #999;
	}

	.goodsDetails-choice .choice-top strong {
		float: left;
		width: 2rem;
		height: 2rem;
		background-size: 100% 100%;
	}

	.goodsDetails-choice .choice-top p {
		margin-top: 0.05rem;
		padding-left: 2.18rem;
	}

	.goodsDetails-choice .choice-cent,
	.goodsDetails-choice .choice-butt {
		font-size: 0;
	}

	.goodsDetails-choice .choice-cent {
		padding-bottom: 0.1rem;
		border-bottom: 1px solid #f1f1f1;
	}

	.goodsDetails-choice .choice-cent p {
		height: 0.8rem;
		line-height: 0.8rem;
	}

	.goodsDetails-choice .choice-cent span {
		display: inline-block;
		margin: 0 0.1rem 0.2rem 0;
		padding: 0 0.35rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background: #FFF0ED;
		border-radius: 100px;
		border: solid 1px #FFF0ED;
		color: #666;
		font-size: 0.28rem;
	}

	.goodsDetails-choice .choice-cent .active {
		background: #FFFFFF;
		border: 1px solid #EF593C;
		color: #EF593C;
	}

	.goodsDetails-choice .choice-butt {
		position: relative;
		margin-top: 0.2rem;
	}

	.goodsDetails-choice .choice-butt p {
		height: 0.68rem;
		line-height: 0.68rem;
	}

	.goodsDetails-choice .choice-butt .choice-buttDiv {
		position: absolute;
		top: 0;
		right: 0;
		width: 3rem;
		height: 0.64rem;
		line-height: 0.64rem;
		border: 1px solid #eee;
		text-align: center;
		color: #666;
		font-size: 0.28rem;
	}

	.goodsDetails-choice .choice-butt input {
		float: left;
		width: 1.2rem;
		height: 95%;
		background: none;
		border: none;
		font-size: 0.2rem;
		text-align: center;
	}

	.goodsDetails-choice .choice-butt span {
		display: inline-block;
		width: 0.75rem;
		height: 100%;
		font-size: 0.5rem;
	}

	.goodsDetails-choice .choice-butt .choice-buttBtn1 {
		float: left;
		border-right: 1px solid #eee;
	}

	.goodsDetails-choice .choice-butt .choice-buttBtn2 {
		float: right;
		border-left: 1px solid #eee;
	}

	.goodsDetails-MSTop {
		padding-left: 0;
	}

	.goodsDetails-MSTop strong {
		float: left;
		width: 4.1rem;
		height: 100%;
		background: #ff8f3d url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-ms.png") no-repeat 0.3rem center;
		background-size: 50%;
	}

	.goodsDetails-MScent {
		margin-left: -0.3rem;
	}

	.secondKill-snatch {
		position: relative;
		height: 1rem;
		line-height: 1rem;
		font-size: 0;
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}

	.secondKill-snatchLeft {
		position: relative;
		z-index: 101;
		float: left;
		padding: 0.2rem 0.1rem;
		width: 0.7rem;
		line-height: 0.3rem;
		text-align: center;
		color: #f44834;
		font-size: 0.18rem;
		background: #fefefe;
	}

	.secondKill-snatchCent {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		float: left;
		margin-left: 0.9rem;
		font-size: 0.24rem;
		color: #999;
		width: 87.5%;
	}

	.secondKill-snatchCent .swiper-container {
		width: 100%;
		height: 100%;
	}

	.secondKill-snatchCent .snatchCent-list {
		height: 1rem;
		line-height: 1rem;
		width: 1.3rem;
	}

	.secondKill-snatchCent .snatchCent-list strong {
		margin-right: 0.05rem;
		display: inline-block;
		width: 0.36rem;
		height: 100%;
		background: no-repeat left center;
		background-size: 0.36rem 0.36rem;
		border-radius: 50%;
		vertical-align: middle;
	}

	.goodsDetails-BKTop {
		padding-left: 0;
	}

	.goodsDetails-BKTop strong {
		float: left;
		width: 4.1rem;
		height: 100%;
		background: #f76654 url(" https://h5.hongkzh.cn/imgs/purchase/goodsDetails/goodsDetails-bk.png") no-repeat 0.3rem center;
		background-size: 50%;
	}
</style>
