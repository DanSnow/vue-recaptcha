import{a as d,r as l,o as p,i as m,k as a,m as o,j as c,u as r,N as f,ar as v,K as h,M as y,x as g}from"./entry.526e64d8.js";const C={class:"summary"},V={class:"content"},k=d({__name:"Callout",props:{type:{type:String,default:"info",validator(s){return["info","success","warning","danger","primary"].includes(s)}},modelValue:{required:!1,default:()=>l(!1)}},emits:["update:modelValue"],setup(s,{emit:u}){const e=l(s.modelValue),_=()=>{e.value=!e.value,u("update:modelValue",e.value)};return(t,x)=>{const n=h,i=y;return p(),m("div",{class:c(["callout",[s.type]])},[a("span",{class:"preview",onClick:_},[a("span",C,[o(n,{use:t.$slots.summary},null,8,["use"])]),o(i,{name:"heroicons-outline:chevron-right",class:c(["icon",[r(e)&&"rotate"]])},null,8,["class"])]),f(a("div",V,[o(n,{use:t.$slots.content},null,8,["use"])],512),[[v,r(e)]])],2)}}});const N=g(k,[["__scopeId","data-v-412cc65d"]]);export{N as default};
