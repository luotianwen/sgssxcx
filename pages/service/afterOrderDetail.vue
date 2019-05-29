<template>
	 
		<view id="refundInfo">
			 <div class="refundInfo-top">
				 <!-- 10申请中 20同意退货 30 同意换货 40拒绝退货 50拒绝换货 60 售后完成 -->
            <p><strong>订单编号:</strong>{{afterInfo.orderNumber}}</p>
            <p v-if="afterInfo.state==10"><strong>退款进度:</strong><span>申请{{type[""+afterInfo.type]}}</span></p>
            
            <p v-else><strong>退款进度:</strong><span>{{states[""+afterInfo.state]}}</span></p>
        </div>
        <div class="refundInfo">
            <div id="canvas"></div>
            <div class="refundInfo-cent">
                <div class="refundInfo-list" v-if="afterInfo.state==60&&afterInfo.type==1">
                    <div class="list-cent">
                        <h6><b class="listB"></b>售后退款成功</h6>
                        <p class="list-data">{{afterInfo.updateDate}}</p>
                        <p>退款金额共计:¥{{afterInfo.returnAmount}}元，已退款至买家账户</p>
                    </div>
                </div>
								<div class="refundInfo-list" v-if="afterInfo.state==60&&afterInfo.type==2">
								    <div class="list-cent">
								        <h6><b class="listB"></b>售后换货成功</h6>
								        <p class="list-data">{{afterInfo.updateDate}}</p>
								    </div>
								</div>
                <div class="refundInfo-list" v-if="afterInfo.exchangeExpressName!=null">
                    <div class="list-cent">
                        <h6><b class="listB"></b>同意换货，换货单号信息</h6>
                        <p class="list-data">{{afterInfo.exchangeTime}}</p>
                       <p>换货物流单号：{{afterInfo.exchangeInvoiceNo}}</p>
                       <p>物流公司：{{afterInfo.exchangeExpressName}}</p>
											 <p>换货运费：{{afterInfo.exchangeFreight}}</p>
                    </div>
										 <div class="list-btn clearfix" >
										    <span @tap="goLogistics(afterInfo.exchangeInvoiceNo,afterInfo.exchangeExpressName)">跟踪物流</span>
										</div>
                </div>
             
                <div class="refundInfo-list" v-if="afterInfo.state==40">
                    <div class="list-cent">
                        <h6><b class="listB"></b>商家拒绝退货，商品将原路寄回。</h6>
                        <p class="list-data">{{afterInfo.updateDate}}</p>
                        <p>拒绝原因：{{afterInfo.refuseContent}}</p>
                    </div>
                </div>
								<div class="refundInfo-list" v-if="afterInfo.state==50">
								    <div class="list-cent">
								        <h6><b class="listB"></b>商家拒绝换货，商品将原路寄回。</h6>
								        <p class="list-data">{{afterInfo.updateDate}}</p>
								        <p>拒绝原因：{{afterInfo.refuseContent}}</p>
								    </div>
								</div>
                <div class="refundInfo-list" v-if="afterInfo.returnExpressName!=null">
                    <div class="list-cent">
                        <h6><b class="listB"></b>买家提交退货物流，待商家处理。</h6>
                        <p class="list-data">{{afterInfo.returnTime}}</p>
                        <p>退货物流单号：{{afterInfo.returnInvoiceNo}}</p>
                        <p>物流公司：{{afterInfo.returnExpressName}}</p>
                    </div>
                    <div class="list-btn clearfix" >
                        <span @tap="goLogistics(afterInfo.returnInvoiceNo,afterInfo.returnExpressName)">跟踪物流</span>
                    </div>
                </div>
                <div class="refundInfo-list" v-if="afterInfo.returnConsignee!=null">
                    <div class="list-cent">
                        <h6><b class="listB"></b>请买家退回商品，并提交物流单号。</h6>
                        <p class="list-data">{{afterInfo.updateDate}}</p>
                        <p>收货人：{{afterInfo.returnConsignee}}</p>
                        <p>联系电话：{{afterInfo.returnPhone}}</p>
                        <p>退货地址：{{afterInfo.returnAddress}}</p>
                    </div>
                    <div class="list-btn clearfix" v-if="afterInfo.returnAddress!=null&&afterInfo.returnExpressName==null">
                        <span @tap="returnExpress(afterInfo)">填写物流</span>
                    </div>
                </div>
                
                
                <div class="refundInfo-list">
                    <div class="list-cent">
                        <h6><b class="listB"></b>买家申请<span>{{type[afterInfo.type]}}</span>，待平台处理</h6>
                        <p class="list-data">{{afterInfo.applyTime}}</p>
                        <p>退款类型：{{type[afterInfo.type]}}</p>
                        <p>退款原因：{{afterInfo.content}}</p>
                    </div>
                    
                        <div class="list-btn clearfix" v-if="afterInfo.type==2&&afterInfo.state==10">
                            <span @tap="goCancel(afterInfo)">取消换货</span>
                        </div>
                        <div class="list-btn clearfix" v-if="afterInfo.type==1&&afterInfo.state==10">
                            <span @tap="goCancel(afterInfo)">取消退货</span>
                        </div>
                    
                </div>
            </div>
        </div>
        <div class="confirmOrder-footer">
            <strong class="footer-btn1" @tap="goDetail()">订单详情</strong>
        </div>
	 
	</view>
</template>

<script>
	import service from '../../service.js';
	 
	export default {
		 
		data() {
			return {
				type: {
					"1": "申请退货",					
					"2": "换货"		
				},
				states: {
					"10": "申请退货",
					"12": "申请换货",
					"20": "同意退货",
					"30": "同意换货",
					"50": "拒绝换货",
					"60": "售后完成",
					"40": "拒绝退货"
				},
				afterOrderId:"",
				afterInfo: {}
			}
		},
		onShow() {
			this.afterOrderList();
		},
		onLoad(d) {
			this.afterOrderId=d.afterOrderId;
			//this.afterOrderList();
		},
		  
		methods: {
			goLogistics: function(returnInvoiceNo,returnExpressName) {
				uni.navigateTo({
					url: "../order/logistics?expressName="+returnExpressName+"&invoiceNo="+returnInvoiceNo
				})
			},
			goCancel:function(newsitems){
				
						let _this=this;
					uni.showModal({
						content: '确认要取消？',
						success: (res) => {
							if (res.confirm) {
								uni.request({
									url: service.cancelAfterOrder(),
									data: {
										tokenId: service.getUser().tokenId,
										afterOrderId:newsitems.afterOrderId
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
							}
						}
					})
			},
			afterOrderList:function(){
				let _this=this;
				uni.request({
					url: service.afterOrderDetail(),
					data: {
						tokenId: service.getUser().tokenId,
						afterOrderId: this.afterOrderId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							 _this.afterInfo=data.data.data
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			returnExpress:function(newsitems){
				 uni.navigateTo({
				 	url:"../service/deliverGoods?afterOrderId="+newsitems.afterOrderId
				 })
			  
			},
			goDetail:function(){
				uni.navigateTo({
					url: "../order/orderDetail?orderNumber="+this.afterInfo.orderNumber
				})
			} 
			}
		}
</script>

<style>
 
.refundInfo-top {
  padding: 47upx 0 24upx 35upx;
  font-size: 30upx;
  color: #333333;
  background: #fff;
}
.refundInfo-top p {
  position: relative;
  padding: 0 24upx 0 152upx;
  margin-bottom: 6upx;
}
.refundInfo-top strong {
  position: absolute;
  top: 0;
  left: 0;
  margin-right: 12upx;
}
.refundInfo-top span {
  margin-right: 12upx;
  color: #d45048;
}
.refundInfo {
  position: relative;
  margin-top: 24upx;
  padding-left: 70upx;
  overflow: hidden;
  background: #fff;
}
#canvas {
  position: absolute;
  top: 64upx;
  left: 40upx;
  width: 10%;
  height: 80%;
  border-left: 1px solid #e2e2e2;
}
.refundInfo-list {
  padding-top: 47upx;
  border-top: 1px solid #e2e2e2;
}
.refundInfo-list h6 {
  position: relative;
  font-size: 32upx;
		color: #333;
}
.refundInfo-list b {
  position: absolute;
  top: 18upx;
  left: -32upx ;
	 display: block;
  width: 10upx;
  height: 10upx;
  background-color: #999999;
}
.refundInfo-list p {
  margin-bottom: 9upx;
  font-size: 30upx;
  color: #999;
}
.refundInfo-list .list-cent {
  padding: 0 35upx 47upx 0;
}
.refundInfo-list .list-centImg {
  font-size: 0;
  white-space: nowrap;
  overflow: hidden;
  overflow-x: scroll;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch;
  text-align: justify;
}
.refundInfo-list .list-centImg strong {
  display: inline-block;
  margin-right: 9upx;
  width: 121upx;
  height: 121upx;
  background-size: 100% 100%;
}
.refundInfo-list .list-centImg::-webkit-scrollbar {
  display: none;
}
.refundInfo-list .list-data {
  margin: 9upx 0 24upx;
}
.refundInfo-list .list-btn {
  padding: 24upx 35upx 24upx 0;
  text-align: right;
  font-size: 0;
  border-top: 1px solid #e2e2e2;
}
.refundInfo-list .list-btn span {
  margin-left: 24upx;
  display: inline-block;
  width: 204upx;
  height: 63upx;
  line-height: 63upx;
  text-align: center;
  font-size: 30upx;
  color: #333;
  border-radius: 9upx;
  border: 1px solid #cccccc;
}
.refundInfo-list .list-btn .spanBtn {
  width: 269upx;
}
.refundInfo-list:first-child {
  border-top: none;
}
.refundInfo-list:first-child b {
  top: 18upx;
  left: -35upx;
  width: 13upx;
  height: 13upx;
  background-color: #f76654;
}
.confirmOrder-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 500;
  padding: 0 4%;
  width: 92%;
  height: 114upx;
  line-height: 114upx;
  border-top: 1px solid #eee;
  background: #fff;
  color: #333333;
  font-size: 30upx;
}
.confirmOrder-footer strong {
  font-weight: inherit;
}
.confirmOrder-footer .footer-btn {
  margin: 24upx 0 0 24upx;
  float: right;
  width: 252upx;
  height: 63upx;
  line-height: 63upx;
  text-align: center;
  color: #ffffff;
  background-color: #d45048;
  border: 1px solid #d45048;
  border-radius: 9upx;
}
.confirmOrder-footer .footer-btn2 {
  background-color: #e2e2e2;
  border: 1px solid #eee;
}
.confirmOrder-footer .footer-btn1 {
  margin: 24upx 0 0 24upx;
  float: right;
  display: block;
  width: 204upx;
  height: 63upx;
  line-height: 63upx;
  text-align: center;
  border-radius: 9upx;
  border: 1px solid #cccccc;
}
.confirmOrder-footer .money {
  display: inline-block;
  padding-left: 35upx;
  color: #f44834;
  background-size: 32upx 32upx
	}
	#refuseRefund {
  padding-top: 127upx;
}
.refuseRefund-cent {
  padding: 35upx;
  background: #fff;
  font-size: 0;
}
.refuseRefund-cent textarea {
  height: 643upx;
  width: 100%;
  resize: none;
  border: none;
  font-size: 35upx;
  color: #333333;
}
.refuseRefund-butt {
  padding: 0 35upx 35upx;
  margin-top: 24upx;
  background: #fff;
}
.refuseRefund-butt p {
  margin-bottom: 6upx;
  font-size: 30upx;
  color: #cccccc;
}
.refuseRefund-title {
  height: 117upx;
  line-height: 117upx;
  font-size: 35upx;
  color: #333;
}
.refuseRefund-img {
  margin-bottom: 29upx;
  height: 163upx;
  font-size: 0;
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
.refuseRefund-img span {
  margin-right: 24upx;
  position: relative;
  display: inline-block;
  width: 163upx;
  height: 163upx;
  background: url(" https://cs.h5.hongkzh.com/imgs/see/userPage/addGoods-icon.png") no-repeat;
  background-size: 100%;
}
.refuseRefund-img input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 102;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.refuseRefund-img img {
  position: relative;
  z-index: 100;
  display: block;
  max-width: 100%;
  height: 100%;
}
.refuseRefund-img::-webkit-scrollbar {
  display: none;
}
.refuseRefund-btn {
  margin: 47upx auto;
  display: block;
  width: 92%;
  height: 114upx;
  line-height: 114upx;
  text-align: center;
  background-color: #e2e2e2;
  border-radius: 12upx;
  font-size: 32upx;
  color: #ffffff;
}
.refuseRefund-btn1 {
  background-color: #d45048;
}
#popup-frame {
  background: #fff;
  border-radius: 12upx;
}
.complaint {
  margin-bottom: 24upx;
  padding: 0 12upx0 35upx;
  height: 117upx;
  line-height: 117upx;
  font-size: 35upx;
  color: #333333;
  background: #fff;
}
.complaint span {
  float: right;
  padding-right: 58upx;
  height: 100%;
  background: url("https://cs.h5.hongkzh.com/imgs/see/selfMedia/selfMedia-hotmore.png") no-repeat right center;
  background-size: 70upx 70upx;
}
.ios-select-widget-box ul li.at {
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
}
.logistics .list-data {
  margin: 9upx 0 0;
}

</style>
