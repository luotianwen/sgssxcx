const httpUrl = "http://127.0.0.1:8081/v1/";
const debug=true
 
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
const removeAddreee=function(){
	return httpUrl + "user/removeAddreee";
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

const setUser = function (userInfo) {
    uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}
const removeUser = function (userInfo) {
    uni.removeStorageSync(USERS_KEY);
}
export default {
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
	removeAddreee
}
