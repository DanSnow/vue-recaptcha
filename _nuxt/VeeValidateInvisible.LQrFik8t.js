import b from"./PrimaryButton.PKD1gi2C.js";import{_ as v}from"./ChallengeV2.vue.sSj5mCru.js";import{d as x,r as g,a5 as y,b as i,c as u,e as n,a3 as S,a4 as h,L as a,$ as d,t as w,f as B,g as p,w as c,G as C}from"./entry.C3IxqZ53.js";import{u as N,c as $,a as k,b as D}from"./index.esm.xMvMGzpi.js";import"./component-v2.EDsZo1mB.js";import"./index._qR7O02-.js";import"./_commonjsHelpers.5-cIlDoe.js";const E={key:0,class:"text-red"},L=x({__name:"VeeValidateInvisible",setup(F){const{handleSubmit:f}=N({validationSchema:$({name:k().required()})}),{value:s,errorMessage:r}=D("name"),t=g(),l=f(async m=>{await y(t).changed(),console.log({...m,response:t.value})});return(m,e)=>{const _=b,V=v;return i(),u("form",{class:"flex flex-col gap-2",onSubmit:e[2]||(e[2]=(...o)=>a(l)&&a(l)(...o))},[n("div",null,[S(n("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>d(s)?s.value=o:null),class:"border border-blue p-1",type:"text",placeholder:"Your name"},null,512),[[h,a(s)]]),a(r)?(i(),u("div",E,w(a(r)),1)):B("",!0)]),n("div",null,[p(V,{modelValue:a(t),"onUpdate:modelValue":e[1]||(e[1]=o=>d(t)?t.value=o:null)},{default:c(()=>[p(_,{type:"submit"},{default:c(()=>[C(" Submit ")]),_:1})]),_:1},8,["modelValue"])])],32)}}});export{L as default};