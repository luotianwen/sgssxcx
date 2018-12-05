<template>
	<view class="">
		<div class="addAddress">
			<div class="circleBar-top"> <strong class="seeIndex-setUp">保存</strong></div>
			<div class="addAddress-top">
				<div class="addAddress-name"><span>收货人</span> <input type="text" placeholder="请输入收货人真实姓名"></div>
				<div class="addAddress-phone"><span>手机号</span> <input type="text" placeholder="请输入收货人手机号"></div>
			</div>
			<div class="addAddress-cent">
				<div class="addAddress-region"><span>所在地区</span>
					<div class="pc-box"><input type="hidden" name="contact_province_code" data-id="0001" id="contact_province_code"
						 data-province-name=""> <input type="hidden" name="contact_city_code" id="contact_city_code" data-city-name="">
						<span data-province-code="" data-city-code="" data-district-code="" id="show_contact">请选择地区</span>
						 
					</div>
				</div>
				<div class="addAddress-address"><span>详细地址</span> <input type="text" name="name" placeholder="请输入详细收货地址"></div>
			</div>
			<div class="addAddress-default"><span class="addAddress-icon1 addAddress-icon2">设为默认</span></div>
			<!---->
			<div id="prompt-view">
				<!---->
			</div>
		</div>
	</view>
</template>

<script>
</script>

<style>
	.circleBar-top {
		  position: fixed;
		  top: 0;
		  left: 0;
		  z-index: 1000;
		  width: 100%;
		  height: 0.89rem;
		  line-height: 0.89rem;
		  background: #fff;
		  text-align: center;
		  font-size: 0.34rem;
		  color: #333;
		  float: right;
		}
	 .circleBar-top .seeIndex-setUp {
	    position: absolute;
	    top: 0;
	    right: 0.2rem;
	    font-weight: inherit;
	}
 .addAddress {
  padding-top: 0.9rem;
  overflow: hidden;
}
.address1 {
  padding-bottom: 1rem;
}
.address-cent {
  margin-top: 0.2rem;
}
.address-cent .active .address-listLeft {
  background-color: #e5f4ff;
}
.address-list {
  position: relative;
  width: 100%;
  font-size: 0.3rem;
  color: #333;
  border-bottom: 1px solid #e2e2e2;
  overflow: hidden;
}
.address-list .address-listLeft {
  float: left;
  position: relative;
  padding: 0.35rem 0 0 0.3rem;
  height: 1.2rem;
  z-index: 100;
  width: 96%;
  background: #fff;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.address-list .address-modify {
  position: absolute;
  top: 50%;
  right: 0.35rem;
  display: block;
  margin-top: -0.3rem;
  width: 0.35rem;
  height: 0.45rem;
  background: url(https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMediaVd-wirt.png) no-repeat center;
  background-size: 0.35rem 0.45rem;
}
.address-listName {
  max-width: 48%;
  margin-right: 0.2rem;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address-default {
  margin-right: 0.2rem;
  display: inline-block;
  width: 0.7rem;
  height: 0.32rem;
  line-height: 0.32rem;
  text-align: center;
  background-color: #F95F61;
  border-radius: 0.04rem;
  font-size: 0.26rem;
  color: #fff;
  vertical-align: 0.02rem;
}
.address-listCent {
  padding-right: 0.8rem;
}
.address-listCent p {
  margin-top: 0.05rem;
  font-size: 0.26rem;
  color: #999;
}
.address-listCent h6 {
  position: relative;
  font-size: 0.3rem;
  color: #000;
}
.address-list:last-child {
  border-bottom: none;
}
.addAddress-top,
.addAddress-cent,
.addAddress-butt,
.addAddress-default {
  margin-top: 0.2rem;
  padding-left: 0.3rem;
  background: #fff;
  font-size: 0.3rem;
  color: #ccc;
}
.addAddress-top span,
.addAddress-cent span,
.addAddress-butt span,
.addAddress-default span {
  color: #333;
}
.addAddress-top div:first-child,
.addAddress-cent div:first-child {
  border-bottom: 1px solid #eee;
}
.addAddress-top input,
.addAddress-cent input {
  margin: 0 0.2rem 0;
  width: 80.5%;
  height: 0.6rem;
  background: transparent;
  border: none;
  font-size: 0.3rem;
  color: #999;
}
.addAddress-name,
.addAddress-phone,
.addAddress-data,
.addAddress-address,
.addAddress-default {
  height: 1rem;
  line-height: 1rem;
}
.addAddress-name input,
.addAddress-phone input {
  width: 50%;
}
.addAddress-data input,
.addAddress-address input {
  width: 50%;
}
.addAddress-region {
  padding: 0.3rem 0;
}
.addAddress-region > span {
  display: inline-block;
  vertical-align: top;
}
.addAddress-region .pc-box {
  margin: 0 0.25rem;
  display: inline-block;
  font-weight: inherit;
  width: 72%;
}
.addAddress-region .pc-box span {
  color: #999;
}
.addAddress-icon1 {
  display: inline-block;
  padding-left: 0.7rem;
  width: 1.5rem;
  height: 100%;
  background: url(https://cs.h5.hongkzh.com/imgs/see/userPage/addAddress-icon1.png) no-repeat left center;
  background-size: 0.6rem 0.6rem;
}
.addAddress-icon2 {
  background: url(https://cs.h5.hongkzh.com/imgs/see/userPage/addAddress-icon2.png) no-repeat left center;
  background-size: 0.6rem 0.6rem;
}
.addAddress-icon3 {
  background: url(https://cs.h5.hongkzh.com/imgs/purchase/shoppingCart/shoppingCart-icon.png) no-repeat left center;
  background-size: 0.6rem 0.6rem;
}
.sl-opts {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 1.56rem;
  line-height: 1.56rem;
  width: 15%;
  text-align: center;
}
.sl-opts span {
  display: block;
  height: 100%;
  width: 100%;
  background-color: #F95F61;
  color: #fff;
}
.swipeleft {
  transform: translateX(-15%);
  -webkit-transform: translateX(-15%);
}
.myCommodity-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  text-align: center;
  border-top: 1px solid #e2e2e2;
  font-size: 0.32rem;
  background: #fff;
}
.myCommodity-btn a {
  display: inline-block;
  padding-left: 0.42rem;
  color: #666;
  background: url(https://cs.h5.hongkzh.com/imgs/see/userPage/addGoods-icon2.png) no-repeat left 0.31rem;
  background-size: 0.35rem 0.35rem;
}
.address-cent1 .active .address-listLeft {
  background-color: #fffde5;
}
.address-cent1 .address-listLeft {
  height: 1.15rem;
}
.address-cent1 .address-listLeft h6 {
  margin-bottom: 0.08rem;
  font-size: 0.3rem;
}
.address-cent1 .returnAddress-default {
  margin-right: 0.1rem;
  display: inline-block;
  width: 0.7rem;
  height: 0.32rem;
  line-height: 0.32rem;
  text-align: center;
  background-color: #d45048;
  border-radius: 0.04rem;
  font-size: 0.22rem;
  color: #fff;
}
.address-cent1 .returnAddress-listName {
  margin-right: 0.1rem;
}
.address-cent1 .sl-opts {
  height: 1.5rem;
  line-height: 1.5rem;
}
#popup-frame {
  background: #fff;
  border-radius: 0.1rem;
}

</style>
