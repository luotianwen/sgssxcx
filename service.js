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
export default {
	getCategory,
	getSubCategory,
	getCategoryGoods,
	getGoodsByGooId,
	getHomeGoods,
	login
}
