import{_ as y}from"./BuWVv9W7.js";import g from"./CIo33AQ0.js";import{d as k,c as l,e as n,f as o,a0 as S,a1 as C,H as a,X as d,t as p,h as f,i as _,w as B,g as N}from"./D-so36xg.js";import{u as w,c as E,a as v,b as x}from"./DU_m3m9U.js";import"./CCnjXEf4.js";import"./Cpj98o6Y.js";const M={key:0,class:"text-red"},$={key:0,class:"text-red"},H=k({__name:"VeeValidateCheckbox",setup(q){const{handleSubmit:V}=w({validationSchema:E({name:v().required(),recaptcha:v().required("Please verify you are human")})}),{value:r,errorMessage:u}=x("name"),{value:s,errorMessage:m}=x("recaptcha"),i=V(c=>{console.log(c)});return(c,e)=>{const b=y,h=g;return l(),n("form",{class:"flex flex-col gap-2",onSubmit:e[2]||(e[2]=(...t)=>a(i)&&a(i)(...t))},[o("div",null,[S(o("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>d(r)?r.value=t:null),class:"border border-blue p-1",type:"text",placeholder:"Your name"},null,512),[[C,a(r)]]),a(u)?(l(),n("div",M,p(a(u)),1)):f("",!0)]),o("div",null,[_(b,{modelValue:a(s),"onUpdate:modelValue":e[1]||(e[1]=t=>d(s)?s.value=t:null)},null,8,["modelValue"]),a(m)?(l(),n("div",$,p(a(m)),1)):f("",!0)]),o("div",null,[_(h,{type:"submit"},{default:B(()=>e[3]||(e[3]=[N(" Submit ")])),_:1})])],32)}}});export{H as default};
