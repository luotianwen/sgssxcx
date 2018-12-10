 
const httpUrl="http://127.0.0.1:8081/v1/";
const imghttp="http://127.0.0.1:8082/";
const getCategory = function () {
    return httpUrl+"shop/allCategory";
}
 const getSubCategory = function () {
     return httpUrl+"shop/subCategory";
 }
 const getCategoryGoods=function(){
	 return httpUrl+"shop/getCategoryGoods";
 }
 const getGoodsByGooId=function(){
 	return httpUrl+"shop/getGoodsByGooId";
 }
export default { 
      getCategory,
	  getSubCategory,
    getCategoryGoods,
		getGoodsByGooId
}
