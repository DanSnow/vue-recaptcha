import y from"./TabsHeader.42a459e7.js";import g from"./ComponentPlaygroundProps.3369cb6b.js";import{_ as v}from"./ComponentPlaygroundSlots.vue.d9d9b544.js";import{_ as x}from"./ComponentPlaygroundTokens.vue.b9ef32b1.js";import{d as k,a0 as D,r as V,b as n,c as C,g as P,L as o,Y as m,Z as T,f as s,k as B}from"./entry.3dd61b29.js";import"./ProseH4.180b2039.js";import"./ProseCodeInline.f0cf95dc.js";import"./Badge.190f020f.js";import"./ProseP.03e9bbe4.js";const I={class:"component-playground-data"},j=k({__name:"ComponentPlaygroundData",props:{modelValue:{type:Object,required:!1,default:()=>({})},componentData:{type:Object,required:!1,default:()=>({})}},emits:["update:modelValue"],setup(t,{emit:p}){const a=D(t,"modelValue",p),e=V(0),r=[{label:"Props"},{label:"Slots"},{label:"Design Tokens"}],d=l=>e.value=l;return(l,c)=>{const u=y,_=g,i=v,f=x;return n(),C("div",I,[P(u,{"active-tab-index":o(e),tabs:r,"onUpdate:activeTabIndex":d},null,8,["active-tab-index"]),o(e)===0?(n(),m(_,{key:0,modelValue:o(a),"onUpdate:modelValue":c[0]||(c[0]=b=>T(a)?a.value=b:null),"component-data":t.componentData},null,8,["modelValue","component-data"])):s("",!0),o(e)===1?(n(),m(i,{key:1,"component-data":t.componentData},null,8,["component-data"])):s("",!0),o(e)===2?(n(),m(f,{key:2,"component-data":t.componentData},null,8,["component-data"])):s("",!0)])}}});const Y=B(j,[["__scopeId","data-v-8b4ea980"]]);export{Y as default};