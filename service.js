const httpUrl = "http://127.0.0.1:8081/v1/";
//const httpUrl = "https://xcx.api.yoyound.com/v1/";
const debug=false
 
const getCategory = function() {
	return httpUrl + "shop/allCategory";
}
const getSubCategory = function() {
	return httpUrl + "shop/subCategory";
}
const getCategoryGoods = function() {
	return httpUrl + "shop/getCategoryGoods";
}
const getGoodsByGooId = function() {
	return httpUrl + "shop/getGoodsByGooId";
}
const getHomeGoods = function() {
	return httpUrl + "shop/getHomeGoods";
}
const login = function() {
	return httpUrl + "user/weixinlogin";
}
const addCart=function(){
	return httpUrl + "shop/addCart";
}
const syncCart=function(){
	return httpUrl + "shop/syncCart";
}
const removeCart=function(){
	return httpUrl + "shop/removeCart";
}
const cartList=function(){
	return httpUrl + "shop/cartList";
}
const preorder=function(){
	return httpUrl + "shop/preorder";
}
const saveOrder=function(){
	return httpUrl + "shop/saveOrder";
}
const orderList=function(){
	return httpUrl + "shop/orderList";
}
const orderPay=function(){
	return httpUrl + "shop/weixinpay";
}
const orderDelete=function(){
	return httpUrl + "shop/orderDelete";
}
const logistics=function(){
	return httpUrl + "shop/logistics";
}
const saveAfterOrder=function(){
	return httpUrl + "shop/saveAfterOrder";
}
const orderOk=function(){
	return httpUrl + "shop/orderOk";
}
const orderDetail=function(){
	return httpUrl + "shop/orderDetail";
}
const cancelOrder=function(){
	return httpUrl + "shop/cancelOrder";
}
const afterOrderList=function(){
	return httpUrl + "shop/afterOrderList";
}
const afterOrderDetail=function(){
	return httpUrl + "shop/afterOrderDetail";
}

const cancelAfterOrder=function(){
	return httpUrl + "shop/cancelAfterOrder";
}
const getExpress=function(){
	return httpUrl + "shop/getExpress";
}
const returnExpress=function(){
	return httpUrl + "shop/returnExpress";
}
const addresslist=function(){
	return httpUrl + "user/addresslist";
}
const removeAddress=function(){
	return httpUrl + "user/deleteAddress";
}
const saveAddress=function(){
	return httpUrl + "user/saveAddress";
}
const gainCouponById=function(){
	return httpUrl + "user/gainCouponById";
}
const getCouponList=function(){
	return httpUrl + "user/getCouponList";
}
const removeCoupon=function(){
	return httpUrl + "user/removeCoupon";
}
const feedback=function(){
	return httpUrl + "user/feedback";
}

const bindPhone=function(){
	return httpUrl + "user/bindPhone";
}
const verificationBind=function(){
	return httpUrl + "user/verificationBind";
}
const getUserData=function(){
	return httpUrl+"user/getUserData";
}
const brandList=function(){
	return httpUrl+"shop/brandList";
}
const indexData=function(){
	return httpUrl+"shop/indexData";
}
const hotData=function(){
	return httpUrl+"shop/hotData";
}
const getSearchGoods=function(){
	return httpUrl+"shop/getSearchGoods";
}
const getAgentStock=function(){
	return httpUrl+"shop/getAgentStock";
}

const getCartData=function(){
	return httpUrl+"shop/getCartData";
}
const getUserAgentData=function(){
	return httpUrl+"user/getUserAgentData";
}
const saveUserAgentData=function(){
	return httpUrl+"user/saveUserAgentData";
}
const agentOrderList=function(){
	return httpUrl+"shop/agentOrderList";
}

const USERS_KEY = 'SGSS_USERS_KEY';
 
const getUser = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret =  "{ \"hasLogin\":false}" ;
    }
    return JSON.parse(ret);
}
const setAgent = function (agentId) {
    uni.setStorageSync('agentId',agentId);
}
const getAgent = function () {
	return uni.getStorageSync('agentId');
}
const setUser = function (userInfo) {
    uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}
const removeUser = function (userInfo) {
    uni.removeStorageSync(USERS_KEY);
}
 
export default {
	agentOrderList,
	setAgent,
	getAgent,
	getCategory,
	getSubCategory,
	getCategoryGoods,
	getGoodsByGooId,
	getHomeGoods,
	login,
	setUser,
	getUser,
	removeUser,
	addCart,
	cartList,
	syncCart,
	removeCart,
	preorder,
	saveOrder,
	orderList,
	orderPay,
	orderOk,
	logistics,
	orderDelete,
	saveAfterOrder,
	orderDetail,
	cancelOrder,
	afterOrderList,
	cancelAfterOrder,
	afterOrderDetail,
	getExpress,
	returnExpress,
	addresslist,
	removeAddress,
	saveAddress,
	getCouponList,
	removeCoupon,
	feedback,
	bindPhone,
	verificationBind,
	getUserData,
	brandList,
	indexData,
	hotData,
	getSearchGoods,
	getCartData,
	gainCouponById,
	getUserAgentData,
	saveUserAgentData,
	getAgentStock
}
