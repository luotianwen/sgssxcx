<template>
	<view>
			 
			<div class="happyiIndex-list">
				<div class="listCent" @click="goNewPhone()">手机号 <a class="happyi-left">{{vphone}}</a></div>
				<!-- <div class="listCent"  @click="goNewPassword()">登录密码 <a  class="happyi-left"> 设置密码</a></div> -->
			</div>
			 
	</view> 
</template>

<script>
	import service from '../../service.js';
	export default {
		data(){
			return{
				phone:"",
				vphone:"绑定手机"
			}
		},
		onShow(){
			let _user=service.getUser();
			console.log(JSON.stringify(_user));
			if(_user.hasLogin){
				if(_user.phone!=null){
				this.vphone="更改手机号";
				}
			}
		},
		methods: {
			goNewPhone:function(){
				uni.navigateTo({
					url:"../myself/newPhone" 
				})
			},
			 goNewPassword:function(){
			 	uni.navigateTo({
			 		url:"../myself/newPassword"
			 	})
			 } 
			
			
			}
		}
</script>

<style>
	#setUp,
#replaceTel {
  padding: 105upx 0 117upx;
} 
.happyiIndex-list {
  margin-bottom: 24upx;
  background: #fff;
}
.happyiIndex-list .listCent {
  position: relative;
  padding: 0 35upx;
  height: 115upx;
  line-height: 115upx;
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
  padding-right: 56upx;
  height: 100%;
  font-size: 32upx; 
	 color: #999;
  background: url("https://cs.h5.hongkzh.com/imgs/happyi/index/happyi-left.png") no-repeat right center;
  background-size: 56upx 56upx;
}
 

</style>
