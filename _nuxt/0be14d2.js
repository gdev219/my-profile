(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{409:function(e,t,r){"use strict";r.r(t);r(8),r(51);var o={data:function(){return{history:{year:2019,month:2,day:0,title:"",type:"etc",detail:!1}}},methods:{onSubmit:function(data){var e=data.year+"-"+(data.month>9?data.month:"0"+data.month.toString())+"-"+data.day;this.$fire.firestore.collection("History").doc(e).set(data).then((function(){alert(e+"업로드 완료")}))}}},n=r(37),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(e.history)}}},[r("label",[e._v("year:")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.year,expression:"history.year"}],attrs:{type:"number",name:"year",id:"year"},domProps:{value:e.history.year},on:{input:function(t){t.target.composing||e.$set(e.history,"year",t.target.value)}}}),e._v(" "),r("br"),e._v(" "),r("label",[e._v("month:")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.month,expression:"history.month"}],attrs:{type:"number",name:"month",id:"month"},domProps:{value:e.history.month},on:{input:function(t){t.target.composing||e.$set(e.history,"month",t.target.value)}}}),e._v(" "),r("br"),e._v(" "),r("label",[e._v("day:")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.day,expression:"history.day"}],attrs:{type:"number",name:"day",id:"day"},domProps:{value:e.history.day},on:{input:function(t){t.target.composing||e.$set(e.history,"day",t.target.value)}}}),e._v(" "),r("br"),e._v(" "),r("label",[e._v("title:")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.title,expression:"history.title"}],attrs:{type:"text",name:"title",id:"title"},domProps:{value:e.history.title},on:{input:function(t){t.target.composing||e.$set(e.history,"title",t.target.value)}}}),e._v(" "),r("br"),e._v(" "),r("label",[e._v("detail:")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.detail,expression:"history.detail"}],attrs:{type:"checkbox",name:"title",id:"title"},domProps:{checked:Array.isArray(e.history.detail)?e._i(e.history.detail,null)>-1:e.history.detail},on:{change:function(t){var r=e.history.detail,o=t.target,n=!!o.checked;if(Array.isArray(r)){var l=e._i(r,null);o.checked?l<0&&e.$set(e.history,"detail",r.concat([null])):l>-1&&e.$set(e.history,"detail",r.slice(0,l).concat(r.slice(l+1)))}else e.$set(e.history,"detail",n)}}}),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.type,expression:"history.type"}],attrs:{type:"radio",id:"bio",value:"bio"},domProps:{checked:e._q(e.history.type,"bio")},on:{change:function(t){return e.$set(e.history,"type","bio")}}}),e._v(" "),r("label",{attrs:{for:"bio"}},[e._v("bio")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.type,expression:"history.type"}],attrs:{type:"radio",id:"edu",value:"edu"},domProps:{checked:e._q(e.history.type,"edu")},on:{change:function(t){return e.$set(e.history,"type","edu")}}}),e._v(" "),r("label",{attrs:{for:"two"}},[e._v("edu")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.type,expression:"history.type"}],attrs:{type:"radio",id:"pro",value:"pro"},domProps:{checked:e._q(e.history.type,"pro")},on:{change:function(t){return e.$set(e.history,"type","pro")}}}),e._v(" "),r("label",{attrs:{for:"pro"}},[e._v("work(pro)")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.type,expression:"history.type"}],attrs:{type:"radio",id:"alba",value:"alba"},domProps:{checked:e._q(e.history.type,"alba")},on:{change:function(t){return e.$set(e.history,"type","alba")}}}),e._v(" "),r("label",{attrs:{for:"pro"}},[e._v("work(alba)")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.history.type,expression:"history.type"}],attrs:{type:"radio",id:"etc",value:"etc"},domProps:{checked:e._q(e.history.type,"etc")},on:{change:function(t){return e.$set(e.history,"type","etc")}}}),e._v(" "),r("label",{attrs:{for:"etc"}},[e._v("etc")]),e._v(" "),r("br"),e._v(" "),r("input",{attrs:{type:"submit",value:"전송"}})])}),[],!1,null,null,null);t.default=component.exports}}]);