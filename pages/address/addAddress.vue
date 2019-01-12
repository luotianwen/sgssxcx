<template>
	<view class="addAddress">
		<view class="page-section">
			<view class="page-section-title">收货人</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<input class="uni-input" focus v-model="consignee" placeholder="请输入收货人真实姓名" />
				</view>
			</view>
		</view>
		<view class="page-section">
			<view class="page-section-title">手机号</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<input class="uni-input"   v-model="phone" type="number" placeholder="请输入收货人手机号" />
				</view>
			</view>
		</view>
		
			<view class="page-section">
			<view class="page-section-title">所在地区</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view   class="uni-input"   @tap="showMulLinkageThreePicker">{{area}}</view>
				</view>
			</view>
		</view>
		
			<view class="page-section">
			<view class="page-section-title">详细地址</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<input class="uni-input" focus v-model="address"   placeholder="请输入详细收货地址" />
				</view>
			</view>
		</view>
		<view class="page-section page-section-gap">
		 
			<label class="checkbox">
				<checkbox value="1"  :checked="state" @tap='checkedOne()'/>设为默认
			</label>
			 
		</view>
		<view class="btn-area" id="buttonContainer">
		 <button type="primary" @tap="onSave">保存</button>
		 	</view>
		 <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		  @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

	</view>
</template>

<script>
	import service from '../../service.js';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#007AFF',
			  consignee:"",
				phone:"",
				areaId:"",
				address:"",
				isDefault:"0",
				area:"请选择地区",
				addressId:"",
				state:false
			}
		},
		onLoad(d) {
			this.consignee=d.consignee;
			this.phone=d.phone;
			this.areaId=d.areaId;
			this.address=d.address;
			 
			
			let _isDefault=d.isDefault;
			if(_isDefault==1){
				this.isDefault='1';
				this.state=true;
			}
			if(d.addressId){
			   this.addressId=d.addressId;
			}
			if(d.provinceName){
			this.area=d.provinceName+"-"+d.cityName+"-"+d.areaName;
			}
			 
		},
		methods: {
			checkedOne:function(){
				this.isDefault='0';
				this.state=!this.state;
				if(this.state){
					this.isDefault='1';
				}
			},
			onSave:function(){
				let consignee=this.consignee;
				let phone=this.phone;
				let areaId=this.areaId;
				let address=this.address;
				if(consignee.length==0){
					 uni.showToast({
						 icon:'none',
					 	title: '收货人必填',
					 		duration:3000 
					 
					 })
					
					return;
				}
				if(phone.length==0){
					
					 uni.showToast({icon:'none',
						title: '手机号必填',
							duration:3000 
					
					})
					return;
				}
				if(areaId.length==0){
					 uni.showToast({icon:'none',
						title: '所在地区必填',
							duration:3000 
					
					})
					
					return;
				}
				if(address.length==0){
					
					 uni.showToast({icon:'none',
						title: '详细地址必填',
							duration:3000 
					
					})
					return;
				}
				uni.request({
					url: service.saveAddress(),
					data: {
						tokenId: service.getUser().tokenId,
						addressId:this.addressId,
						isDefault:this.isDefault,
						consignee:consignee,
						phone:phone,
						address:address,
						areaId:areaId
					},
					success: (data) => { 
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							  uni.showToast({
							  	title: '操作成功',
									duration:3000,
							  	success() {
							  	 uni.navigateBack({
							  	 	delta:1
							  	 })
							  	}
							  })
						}
						else{
							uni.showToast({
								title:data.data.msg 
							})
						}
						
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				}) 
			},
			onCancel(e) {
				console.log(e)
			},
			 
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.area=e.label;
				this.areaId=e.cityCode;
				console.log(e)
			}
		},
    onBackPress() {
      if (this.$refs.mpvueCityPicker.showPicker) {
      	this.$refs.mpvueCityPicker.pickerCancel();
        return true;
      }
    },
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	};
</script>

<style>
	.page-section {
		margin-bottom: 20upx;
	}
	
	.page-body {
		padding-bottom: 40upx;
	}
	
	.uni-list-cell {
		padding: 0 30upx;
	}
	
	.uni-input {
		flex: 1;
		 
	}
	
	.uni-icon {
		color: #999;
	}
	 

</style>
