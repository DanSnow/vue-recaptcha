import{u as g}from"./component-v2.805f74ce.js";import{d as x,ak as V,a8 as _,b as v,Y as w,w as C,ab as k,al as h,am as B,L as E,e as I,an as y}from"./entry.3dd61b29.js";const R=x({__name:"ChallengeV2",props:{as:{default:"div"},widgetId:{},badge:{default:"bottomright"},tabindex:{},autoExecute:{type:Boolean,default:!0},modelValue:{}},emits:["load","error","expired","success","update:widgetId","update:modelValue"],setup(s,{expose:r,emit:i}){const e=s,d=i,{root:n,reset:a,widgetID:l,state:u,execute:t,isError:c,isExpired:p,isVerified:m}=g({size:"invisible",badge:e.badge,tabindex:e.tabindex},V(e,"modelValue"),d),f=_({execute:t,widgetId:l,state:u,reset:a,isError:c,isExpired:p,isVerified:m});function b(){e.autoExecute&&t()}return r({execute:t,reset:a}),(o,z)=>(v(),w(y(o.as),{onClick:b},{default:C(()=>[k(o.$slots,"default",h(B(E(f)))),I("div",{ref_key:"root",ref:n},null,512)]),_:3}))}});export{R as _};