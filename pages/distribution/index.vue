<template>
	<view style=" padding:20upx;">
		<view class="content">
			一 分销条件<br />
			&nbsp;&nbsp;1 并熟悉简单的网络操作 请在外网注册完会员后，将会员名以及自己网店的地址发给客服并申请代销表格 以便被本站收录为代理商。<br />
			&nbsp;&nbsp;2 对电子商务有一定了解，熟悉并支持本网所开展业务；<br />
			&nbsp;&nbsp;3 提供免费代发货业务，一件起代发，不收取任何手续费（所有商品均不含运费均为批发价）；<br />
			&nbsp;&nbsp;4 确保商品质量，发货前进行质量检查，承诺质量范围内的商品问题，提供无条件换货服务；<br />
			二 发货时间、快递费用、快递单号<br />
			1 发货后都会把快递单号填写在外网，分销商可登陆后自行查询订单及快递单号；<br />
			2 因距离不同，所以快递费也不同，具体快递费用，我们的外网会自动生成。<br />
			三 退换政策<br />
			1 退回商品需保证包装完好、附件不缺、吊牌未剪、未下水洗涤，退回的商品中务必放入售后服务卡或一张小纸条，内容注明退回的原因和客户的姓名、电话，以便我们收到货后能及时的作出处理。<br />
			2 由于买家原因，包括不喜欢等等主观原因产生的退换货， 在不影响二次销售情况下给予退货（来回运费分销商或买家承担）。<br />
			3 调换货：若因商品质量问题，除人为损坏外，可予以调换。（来回运费由分销商或我公司承担）；<br />
			4 我们不参与代理商与买家之间的交易过程，代理商按照以上原则直接告诉我们处理结果即可，不便之处，敬请见谅。（如有异议协商处理）<br />
			5 未提供图片证据进行审核，一律不进行7天退换服务。<br />
			四 分销流程 <br />
			1 打开分销-填写姓名和手机号-点击申请分销-后台运营审核<br />
			2 商品详情页-转发-用户登录-购买-7天无理由后可结算订单<br />
			3 查询商品分销价
		</view>
		<view style="width: 100%; " v-show="vshow==-1">
			<input class="uni-input" style="width: 60%; margin-left:5%;" focus   v-model="name" placeholder="输入姓名" />
			<input class="uni-input" style="width: 60%; margin-left:5%;"  type="number" v-model="vphone" placeholder="输入手机号" />
			<button type="primary" @tap="agent()"> 申请分销</button>
		</view>
		<view style="width: 100%;font-size: 50upx;color:#D45048 ;padding-left: 50upx;" v-show="vshow==2">
			审核中 (一般2-3个工作日)
		</view>
		<view style="width: 100%;font-size: 50upx;color:#007AFF ;padding-left: 50upx;" v-show="vshow==1">
			审核通过
		</view>
		<view style="width: 100%;font-size: 50upx;color:#D45048 ;padding-left: 50upx;" v-show="vshow==0">
			审核不通过
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				vshow: -1,
				vphone: "",
				name:"",
				login: false,
				uerInfo: {}
			}
		},
		onShareAppMessage() {
			return {
				title: "悠氧商城",
				path: '/pages/index/index',
				imageUrl: 'http://yoyound.com/images/logo5_4.jpg'
			}
		},

		onLoad() {
			uni.showShareMenu({
				withShareTicket: true
			});

		},
		onShow() {
			if (service.getUser().hasLogin) {
				this.login = true;
				this.uerInfo = service.getUser();
				this.getData();
			}
/* console.log(JSON.stringify(service.getUser())); */
		},
		methods: {
			agent:function(){
				let _this = this;
				if(!this.login){
					uni.showModal({
						content: "请登录",
						showCancel: false
					});
					return;
				}
				
				if(_this.name==""){
					uni.showModal({
						content: "请填写姓名",
						showCancel: false
					});
					return;
				}
				if(_this.vphone==""){
					uni.showModal({
						content: "请填写手机号",
						showCancel: false
					});
					return;
				}
				 uni.request({ 
				 	url: service.saveUserAgentData(),
				 	data: {
				 		tokenId: service.getUser().tokenId,
						mobile: _this.vphone,
						name:_this.name
				 	},
				 	success: (data) => { 
				 		if (data.statusCode == 200 && data.data.code == 0) {
				 			_this.vshow=2;
				 		}
						else{
							uni.showModal({
								content: data.data.msg,
								showCancel: false
							});
						}
				 	},
				 	fail: (data, code) => {
				 		console.log('fail' + JSON.stringify(data));
				 
				 	}
				 })
			},
			getData: function() {
				let _this = this;
				uni.request({
					url: service.getUserAgentData(),
					data: {
						tokenId: service.getUser().tokenId
					},
					success: (data) => {
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.vshow = data.data.data.vshow;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},
		}
	}
</script>

<style>
	/* 
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}
	 */

	.content {
		flex: 1;
		width: 100%;
		/* padding:0 30upx 430upx 30upx; */
		/* flex-direction: column;
		justify-content: center;  */
	}

	button {
		width: 100%;
		margin-top: 40upx;
	}
</style>
