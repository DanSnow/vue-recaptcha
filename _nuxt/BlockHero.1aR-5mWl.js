import m from"./ButtonLink.BoNUihr2.js";import f from"./Terminal.gmk9Rdck.js";import y from"./VideoPlayer.r6-obgG9.js";import{d as _,b as o,c as n,e as s,$ as a,f as r,F as h,Y as c,w as k,t as d,G as i,ad as v,k as $}from"./entry.25ciEW-Q.js";import"./NuxtImg.vue.J8oikd9a.js";const w={class:"block-hero"},B={class:"layout"},S={class:"content"},g={key:0,class:"announce"},q={class:"title"},H={class:"description"},V={key:1,class:"extra"},b={class:"actions"},A=["href"],C={class:"support"},N=_({__name:"BlockHero",props:{cta:{type:Array,required:!1,default:()=>[]},secondary:{type:Array,required:!1,default:()=>[]},video:{type:String,required:!1,default:""},snippet:{type:[Array,String],required:!1,default:""}},setup(e){return(t,T)=>{const l=m,u=f,p=y;return o(),n("section",w,[s("div",B,[s("div",S,[t.$slots.announce?(o(),n("p",g,[a(t.$slots,"announce",{unwrap:"p"},void 0,!0)])):r("",!0),s("h1",q,[a(t.$slots,"title",{unwrap:"p"},()=>[i(" Hero Title ")],!0)]),s("p",H,[a(t.$slots,"description",{unwrap:"p"},()=>[i(" Hero default description. ")],!0)]),t.$slots.extra?(o(),n("div",V,[a(t.$slots,"extra",{unwrap:"p"},void 0,!0)])):r("",!0),s("div",b,[t.$slots.actions?a(t.$slots,"actions",{key:0,unwrap:"p"},void 0,!0):(o(),n(h,{key:1},[e.cta?(o(),c(l,{key:0,class:"cta",bold:"",size:"medium",href:e.cta[1]},{default:k(()=>[i(d(e.cta[0]),1)]),_:1},8,["href"])):r("",!0),e.secondary?(o(),n("a",{key:1,href:e.secondary[1],class:"secondary"},d(e.secondary[0]),9,A)):r("",!0)],64))])]),s("div",C,[v(t.$slots,"support",{},()=>[e.snippet?(o(),c(u,{key:0,content:e.snippet},null,8,["content"])):e.video?(o(),c(p,{key:1,src:e.video},null,8,["src"])):r("",!0)],!0)])])])}}}),G=$(N,[["__scopeId","data-v-8013571d"]]);export{G as default};
