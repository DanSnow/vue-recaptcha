import p from"./PrimaryButton.a8fc7e09.js";import{_ as c}from"./ChallengeV2.vue.e1f394a2.js";import{a as _,r as u,o as f,c as d,w as n,b as V,e as x,t as s,u as a,i as C}from"./entry.c6fde4f1.js";import{R as o}from"./component-v2.9ae63013.js";import"./index.2cbec315.js";const y=_({__name:"ChallengeV2Demo",setup(h){const l={[o.Init]:"Click to Challenge",[o.Verified]:"Verified",[o.Expired]:"Expired",[o.Error]:"Error"},e=u();return(g,r)=>{const i=p,m=c;return f(),d(m,{modelValue:a(e),"onUpdate:modelValue":r[0]||(r[0]=t=>C(e)?e.value=t:null)},{default:n(({state:t})=>[V(i,null,{default:n(()=>[x(s(l[t])+s(a(e)?` ${a(e).slice(0,6)}...`:""),1)]),_:2},1024)]),_:1},8,["modelValue"])}}});export{y as default};