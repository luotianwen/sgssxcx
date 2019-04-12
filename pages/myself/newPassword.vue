<template>
	<view class="">


		<div class="setUpPwd-title">设置密码</div>
		<div class="setUpPwd-cent">
			<div><input type="password" placeholder="6-16位密码、数字+字母"></div>
			<div><input type="password" placeholder="再次输入密码"></div>
		</div>
		<view class="btn-area" id="buttonContainer">
			<button type="primary" @tap="onSave">保存</button>
		</view>

	</view>
</template>

<script>
</script>

<style>
	#setUp,
	#replaceTel {
		padding: 0.9rem 0 1rem;
	}

	.circleBar-top {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 0.89rem;
		line-height: 0.89rem;
		text-align: center;
		font-size: 0.34rem;
		color: #333;
		background: #fff;
		border-bottom: 1px solid #e2e2e2;
	}

	.circleBar-top span {
		position: absolute;
		top: 50%;
		display: block;
		margin-top: -35upx;
		width: 0.6rem;
		height: 0.6rem;
	}

	.circleBar-top .goback {
		left: 24upx;
		background: url(https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMediaPage-goback.png) no-repeat center;
		background-size: 0.6rem 0.6rem;
	}

	.circleBar-top .seeIndex-colse {
		right: 24upx;
		background: url(https://cs.h5.hongkzh.com/imgs/friend/index/myPost-colse.png) no-repeat center;
		background-size: 0.5rem 0.5rem;
	}

	.circleBar-top .txt-right {
		position: absolute;
		right: 35upx;
		font-size: 0.32rem;
		font-weight: inherit;
		color: #666;
	}

	.happyiIndex-list {
		margin-bottom: 24upx;
		background: #fff;
	}

	.happyiIndex-list .listCent {
		position: relative;
		padding: 0 35upx;
		height: 0.99rem;
		line-height: 0.99rem;
		font-size: 35upx;
		color: #333;
		border-bottom: 1px solid #e2e2e2;
	}

	.happyiIndex-list .listCent:last-child {
		border-bottom: none;
	}

	.happyiIndex-list .happyi-left {
		position: absolute;
		top: 0;
		right: 24upx;
		padding-right: 0.48rem;
		height: 100%;
		font-size: 32upx;
		color: #999;
		background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-left.png") no-repeat right center;
		background-size: 0.48rem 0.48rem;
	}

	.setUp-btn {
		height: 0.99rem;
		line-height: 0.99rem;
		text-align: center;
		font-size: 35upx;
		color: #EF593C;
		background: #fff;
	}

	#security,
	#setUpPwd {
		padding-top: 0.89rem;
	}

	#setUpPwd .circleBar-top {
		border-bottom: none;
	}

	#setUpPwd .happyiIndex-list {
		margin-top: 24upx;
	}

	input::-webkit-input-placeholder {
		color: #cacaca;
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #cacaca;
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #cacaca;
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #cacaca;
	}

	.setUpPwd-title {
		padding: 0 35upx;
		height: 0.8rem;
		line-height: 0.9rem;
		font-size: 0.26rem;
		color: #666;
	}

	.setUpPwd-cent {
		background: #fff;
	}

	.setUpPwd-cent div {
		padding: 0 35upx;
		height: 1rem;
		line-height: 1rem;
		font-size: 32upx;
		border-bottom: 1px solid #e2e2e2;
	}

	.setUpPwd-cent div:last-child {
		border-bottom: none;
	}

	.setUpPwd-cent input {
		width: 60%;
		color: #666;
		border: none;
		background: transparent;
	}

	.replaceTel-title {
		padding: 24upx 35upx;
		font-size: 0.26rem;
		color: #666666;
	}

	.replaceTel-tel {
		font-size: 32upx;
		color: #999;
	}

	.replaceTel-tel span {
		display: inline-block;
		width: 1.85rem;
		font-size: 35upx;
	}

	.replaceTel-tel1>span {
		display: inline-block;
		width: 1.8rem;
		font-size: 35upx;
	}

	.replaceTel-tel1>span span {
		font-family: "宋体";
		font-size: 30upx;
		color: #cacaca;
	}

	.loginIndex-btn1,
	.loginIndex-btn2 {
		margin: 0.8rem 0.6rem;
		height: 0.98rem;
		line-height: 0.98rem;
		text-align: center;
		border-radius: 0.14rem;
		font-weight: bold;
		font-size: 0.32rem;
		color: #ffffff;
	}

	.loginIndex-btn1 {
		margin-bottom: 0.4rem;
		background-color: #006cff;
	}

	.loginIndex-btn2 {
		background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(rgba(128, 128, 128, 0.4), rgba(128, 128, 128, 0.4));
		background-blend-mode: normal, normal;
	}

	#privacySetup,
	#blacklist,
	#authentication {
		padding-top: 1.1rem;
	}

	#privacySetup .happyiIndex-list {
		margin-bottom: 0;
	}

	.privacySetup-title {
		padding: 0 35upx;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.26rem;
		color: #999999;
	}

	#blacklist .swipeleft {
		transform: translateX(-20%);
		-webkit-transform: translateX(-20%);
		background: #fff;
	}

	.friendsList-list {
		position: relative;
		width: 100%;
		overflow: hidden;
		color: #333;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
	}

	.friendsList-list a {
		float: left;
		position: relative;
		z-index: 100;
		padding: 24upx 0.32rem 0.23rem 0.24rem;
		display: block;
		width: 92.5%;
		height: 0.96rem;
		line-height: 0.96rem;
		font-size: 0.32rem;
		background: #fff;
		-webkit-transition: all 0.3s linear;
		transition: all 0.3s linear;
	}

	.friendsList-list .friendsList-lyfiren,
	.friendsList-list .list-topImg {
		float: left;
		margin-right: 0.23rem;
		width: 0.96rem;
		height: 0.96rem;
		border-radius: 50%;
	}

	.friendsList-list .friendsList-lyfiren {
		background: url("https://cs.h5.hongkzh.com/imgs/friend/index/friendsList-lyfiren.png") no-repeat center;
		background-size: 100%;
	}

	.friendsList-list .friendsList-more {
		position: absolute;
		top: 0;
		right: 24upx;
		display: inline-block;
		width: 0.6rem;
		height: 100%;
		background: url(https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMedia-hotmore.png) no-repeat center;
		background-size: 0.6rem 0.6rem;
	}

	.friendsList-list .list-top {
		padding-left: 0.27rem;
		height: 0.32rem;
		line-height: 0.32rem;
		background: #f1f1f1;
		font-size: 0.24rem;
	}

	.friendsList-list .list-topImg {
		background-size: 100%;
	}

	.friendsList-list .list-topGrade {
		margin-left: 24upx;
		display: inline-block;
		padding: 0 12upx0 0.29rem;
		height: 0.25rem;
		line-height: 0.25rem;
		border-radius: 6px;
		font-size: 0.18rem;
		color: #fff;
	}

	.friendsList-list .friendsList-boy {
		/* background: #83c6ff url("https://cs.h5.hongkzh.com/imgs/friend/index/friendsList-boy.png") no-repeat 12upxcenter; */
		background-size: 0.18rem 0.18rem;
	}

	.friendsList-list .friendsList-girl {
		/* background: #ff8397 url("https://cs.h5.hongkzh.com/imgs/friend/index/friendsList-girl.png") no-repeat 12upxcenter; */
		background-size: 0.18rem 0.22rem;
	}

	.friendsList-list .sl-opts {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		height: 100%;
		line-height: 1.4rem;
		width: 20%;
		text-align: center;
		font-size: 32upx;
		color: #fff;
		background-color: #F95F61;
	}

	#authentication .listCent {
		margin-left: 35upx;
		padding-left: 0;
	}

	#authentication .list-text {
		padding-right: 0.15rem;
		height: 93%;
		width: 70%;
		color: #333;
		border: none;
		text-align: right;
		background: none;
	}

	.authentication {
		margin-bottom: 0;
	}

	.authentication .listCent {
		border-bottom: none;
	}

	.authentication-mirror {
		position: relative;
		margin: 0 35upx;
		height: 4rem;
		text-align: center;
		background: #f1f1f1;
		border: 1px dashed #ccc;
	}

	.authentication-mirror input {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 101;
	}

	.authentication-mirror img {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		z-index: 100;
		opacity: 1;
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
	}

	.authentication-mirror strong {
		display: inline-block;
		margin-top: 1.5rem;
		font-family: "宋体";
	}

	.authentication-mirror p {
		font-size: 30upx;
		color: #666;
	}

	.authentication-txt {
		margin-top: 0.5rem;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		font-size: 35upx;
		color: #333;
	}

	.authentication-txt a {
		margin-left: 12upx;
		color: #4090f7;
	}

	.provingMode .ios-select-widget-box .cover-area1,
	.provingMode .ios-select-widget-box .cover-area2 {
		border-top: none;
	}

	.provingMode .ios-select-widget-box header.iosselect-header a.close {
		color: #999999;
	}

	.provingMode .ios-select-widget-box header.iosselect-header a.sure {
		color: #0092ff;
	}

	.audit {
		padding: 3rem 35upx 1rem;
		text-align: center;
		background: #fff;
	}

	.audit h6 {
		margin: 35upx 0 24upx;
		font-size: 0.4rem;
		color: #333;
	}

	.audit p {
		font-size: 35upx;
		color: #666;
	}

	.audit .audit-icon,
	.audit .audit-icon1 {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}

	.audit .audit-icon {
		/* background: #eeeeee url("https://cs.h5.hongkzh.com/imgs/happyi/index/audit-icon.png") no-repeat center; */
		background-size: 1rem 1rem;
	}

	.audit .audit-icon1 {
		/* background: #eeeeee url("https://cs.h5.hongkzh.com/imgs/happyi/index/audit-icon1.png") no-repeat center; */
		background-size: 1rem 1rem;
	}

	.audit .audit-btn {
		margin-top: 2rem;
		height: 0.98rem;
		line-height: 0.98rem;
		border-radius: 0.14rem;
		font-weight: bold;
		font-size: 0.32rem;
		color: #ffffff;
		background-color: #d45048;
	}
</style>
