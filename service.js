const httpUrl = "http://127.0.0.1:8081/v1/";
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

const cartList=function(){
	return httpUrl + "shop/cartList";
}
const USERS_KEY = 'SGSS_USERS_KEY';

const getUser = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret =  "{\"hasLogin\":true}" ;
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
	cartList
}
