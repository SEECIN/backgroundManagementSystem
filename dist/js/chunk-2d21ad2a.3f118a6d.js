(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ad2a"],{bcc6:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[n("MainContent",{attrs:{datas:t.orderListData}})],1)},o=[],i=n("27fd");i.Random.extend({phone:function(){var t=["130","134","189","177","180","156"];return this.pick(t)+i.mock(/\d{8}/)}});var r=i.mock({"logistics|10":[{id:"@natural",orderTime:"@datetime",addressee:"@cname",phone:"@phone",address:"@county(true)",remarks:"@csentence","positions|2-4":[{time:"@datetime",address:"@county(true)"}]}]}),s=n("8132"),d={name:"index",components:{MainContent:s["a"]},data:function(){return{orderListData:{}}},computed:{},created:function(){this.orderListData={tableContentData:r.logistics,needPagination:!0,contentHead:{assembly:["input"]}}}},c=d,u=n("2877"),m=Object(u["a"])(c,a,o,!1,null,"2154f8be",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d21ad2a.3f118a6d.js.map