<template>
	<view class="">
		<div id="address" class="">
			<div class="circleBar-top "> <span class="seeIndex-setUp" @click="addAddress()">新建</span></div>
			<div class="address-cent">
				<div class="address-list  ">
					<div class="address-listLeft">
						<div class="address-listCent">
							<h6>
								<!----><span class="address-listName">啦啦啦</span>13800000001</h6>
							<p>天津市天津市河东区好了了了了</p>
						</div><strong class="address-modify"></strong>
					</div>
					<div class="sl-opts"><span>删除</span></div>
				</div>
			</div>
			<!---->
			<!---->
			<div id="mask" style="display: none;">
				<div id="popup-frame">
					<h6>同意退货并提交该退货地址？</h6>
					<div class="frameBtn clearfix"><span>取消</span> <span>确定</span></div>
				</div>
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
			addAddress:function(){
				uni.navigateTo({
					url:"../address/addAddress"
				})
			}
			}
		}
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
  .address-cent {
  margin-top: 0.5rem;
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
address-cent1 .active .address-listLeft {
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
</style>
