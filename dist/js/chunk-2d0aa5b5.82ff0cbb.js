(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa5b5"],{1154:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{},[t.productsList.data?e("MainContent",{attrs:{datas:t.productsListData}}):t._e()],1)},s=[],c=e("c7eb"),i=e("1da1"),r=e("8132"),o={name:"index",components:{MainContent:r["a"]},data:function(){return{productsListData:{},productsList:{}}},created:function(){this.init()},methods:{init:function(){var t=this;return Object(i["a"])(Object(c["a"])().mark((function n(){return Object(c["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$axios("getProductList");case 2:t.productsList=n.sent,t.productsListData={tableContentData:t.productsList.data.result,needPagination:!0,contentHead:{modalType:"addProduct",keywords:"商品",assembly:["button","input"]}};case 4:case"end":return n.stop()}}),n)})))()}}},d=o,u=e("2877"),p=Object(u["a"])(d,a,s,!1,null,"279d7ead",null);n["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0aa5b5.82ff0cbb.js.map