import{ak as s,u as i,x as p,a as c,ao as u,r as l,ah as e,j as d}from"./entry.c6fde4f1.js";import{u as f}from"./asyncData.3c8341d6.js";import y from"./Ellipsis.702181fa.js";import g from"./ComponentPlaygroundData.e6b45fea.js";/* empty css                                *//* empty css                     */import"./TabsHeader.253068c9.js";/* empty css                       */import"./ComponentPlaygroundProps.6273ece4.js";import"./ProseH4.3da49116.js";/* empty css                    */import"./ProseCodeInline.01febea4.js";/* empty css                            */import"./Badge.cd9cdf90.js";/* empty css                  */import"./ProseP.9a6c2ce1.js";/* empty css                   */import"./index.d6e5cf23.js";import"./index.2cbec315.js";/* empty css                                     */import"./ComponentPlaygroundSlots.vue.77ebc248.js";import"./ComponentPlaygroundTokens.vue.09fa9bfd.js";/* empty css                                    */async function h(o){s();const t=i(o);{const{data:n}=await f(`nuxt-component-meta${t?`-${t}`:""}`,()=>$fetch(`/api/component-meta${t?`/${t}`:""}`));return p(()=>n.value)}}const _=c({props:{component:{type:String,required:!0},props:{type:Object,required:!1,default:()=>({})}},async setup(o){const t=p(()=>u(o.component)),n=l({...o.props}),r=await h(o.component);return{as:t,formProps:n,componentData:r}},render(o){const t=Object.entries(this.$slots).reduce((n,[r,a])=>{if(r.startsWith("component-")){const m=r.replace("component-","");n[m]=a}return n},{});return e("div",{class:"component-playground"},[e("div",{class:"component-playground-wrapper"},[e(y,{class:"component-playground-ellipsis",blur:"5vw",height:"100%",width:"100%"}),e(o.as,{...o.formProps,class:"component-playground-component"},{...t})]),e(g,{modelValue:o.formProps,componentData:o.componentData,"onUpdate:modelValue":n=>o.formProps=n})])}}),B=d(_,[["__scopeId","data-v-b9c7bb0c"]]);export{B as default};