import{_ as y}from"./Checkbox.vue.fb955d17.js";import g from"./PrimaryButton.183ba0da.js";import{d as k,b as l,c as n,e as o,P as S,Q as C,I as e,L as d,t as p,f as _,g as f,w as B,D as N}from"./entry.132f2315.js";import{u as w,c as D,a as v,b as x}from"./index.esm.ce5e71f3.js";import"./component-v2.14145449.js";import"./index.033c5df0.js";import"./_commonjsHelpers.725317a4.js";const E={key:0,class:"text-red"},M={key:0,class:"text-red"},L=k({__name:"VeeValidateCheckbox",setup(P){const{handleSubmit:b}=w({validationSchema:D({name:v().required(),recaptcha:v().required("Please verify you are human")})}),{value:r,errorMessage:u}=x("name"),{value:s,errorMessage:m}=x("recaptcha"),i=b(c=>{console.log(c)});return(c,t)=>{const V=y,h=g;return l(),n("form",{class:"flex flex-col gap-2",onSubmit:t[2]||(t[2]=(...a)=>e(i)&&e(i)(...a))},[o("div",null,[S(o("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>d(r)?r.value=a:null),class:"border border-blue p-1",type:"text",placeholder:"Your name"},null,512),[[C,e(r)]]),e(u)?(l(),n("div",E,p(e(u)),1)):_("",!0)]),o("div",null,[f(V,{modelValue:e(s),"onUpdate:modelValue":t[1]||(t[1]=a=>d(s)?s.value=a:null)},null,8,["modelValue"]),e(m)?(l(),n("div",M,p(e(m)),1)):_("",!0)]),o("div",null,[f(h,{type:"submit"},{default:B(()=>[N("Submit")]),_:1})])],32)}}});export{L as default};