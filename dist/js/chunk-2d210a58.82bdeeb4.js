(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d210a58"],{b97b:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[t.roleList.data?n("MainContent",{attrs:{datas:t.roleListData}}):t._e()],1)},o=[],i=n("c7eb"),r=n("1da1"),s=n("8132"),c={name:"index",components:{MainContent:s["a"]},data:function(){return{roleList:{},roleListData:{}}},created:function(){this.init()},methods:{init:function(){var t=this;return Object(r["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios("getRoleList");case 3:t.roleList=e.sent,t.roleListData={tableContentData:t.roleList.data.roleList,needPagination:!0,contentHead:{modalType:"addRole",keywords:"角色",assembly:["input","button"]}},e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}}},l=c,u=n("2877"),d=Object(u["a"])(l,a,o,!1,null,"004ecc4d",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d210a58.82bdeeb4.js.map