(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c78f5"],{"50ae":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[t.productsCategoryList.data?a("MainContent",{attrs:{datas:t.productsClassifyData}}):t._e()],1)},s=[],r=a("c7eb"),o=a("1da1"),c=a("8132"),i={name:"index",components:{MainContent:c["a"]},data:function(){return{productsClassifyData:{},productsCategoryList:{}}},created:function(){this.init()},methods:{init:function(){var t=this;return Object(o["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios("getProductsCategory");case 3:t.productsCategoryList=e.sent,t.productsClassifyData={tableContentData:t.productsCategoryList.data.result,needPagination:!0,contentHead:{modalType:"addProductsCategory",keywords:"商品分类",assembly:["button"]}},t.$bus.$emit("formatSelectOptions",t.productsCategoryList.data.result),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}},u=i,d=a("2877"),p=Object(d["a"])(u,n,s,!1,null,"4b3cec1f",null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0c78f5.2c50d0f1.js.map