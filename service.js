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
const USERS_KEY = 'SGSS_USERS_KEY';

const getUser = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret =  "{\"hasLogin\":false}" ;
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
	preorder
}
