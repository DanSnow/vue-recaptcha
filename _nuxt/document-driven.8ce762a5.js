import L from"./DocumentDrivenEmpty.c1363dbb.js";import h from"./ContentRenderer.c9f2b3c3.js";import C from"./DocumentDrivenNotFound.077d037c.js";import{b as S,a as m,q as x,aI as k,P as R,u as o,aJ as d,aK as N,aL as i,X as g,T as w,ar as B,af as D,ay as E,i as T,m as l,w as p,o as c,c as _}from"./entry.e26d9a4e.js";import"./ContentRendererMarkdown.de02f640.js";import"./ButtonLink.f7c2434d.js";const j=m({name:"LayoutLoader",inheritAttrs:!1,props:{name:String},async setup(s,t){const n=await d[s.name]().then(e=>e.default||e);return()=>B(n,t.attrs,t.slots)}}),q=m({name:"NuxtLayout",inheritAttrs:!1,props:{name:{type:[String,Boolean,Object],default:null}},setup(s,t){const n=g("_route"),e=n===x()?k():n,a=R(()=>o(s.name)??e.meta.layout??"default");return()=>{const u=a.value&&a.value in d,r=e.meta.layoutTransition??N;return i(w,u&&r,{default:()=>i(j,u&&{key:a.value,name:a.value,...t.attrs},t.slots).default()}).default()}}}),A={class:"document-driven-page"},J=m({__name:"document-driven",setup(s){const{page:t,layout:n}=D();return t.value,E(t),(e,a)=>{const u=L,r=h,f=C,y=q;return c(),T("div",A,[l(y,{name:o(n)||"default"},{default:p(()=>[o(t)?(c(),_(r,{key:o(t)._id,value:o(t)},{empty:p(({value:v})=>[l(u,{value:v},null,8,["value"])]),_:1},8,["value"])):(c(),_(f,{key:1}))]),_:1},8,["name"])])}}});export{J as default};
