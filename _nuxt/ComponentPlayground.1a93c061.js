import{aj as s,u as i,x as p,a as c,an as u,r as l,ag as e,j as d}from"./entry.d3da7ddf.js";import{u as f}from"./asyncData.f91ddc40.js";import y from"./Ellipsis.6b7d331a.js";import g from"./ComponentPlaygroundData.e0d22203.js";/* empty css                                *//* empty css                     */import"./TabsHeader.ab80843b.js";/* empty css                       */import"./ComponentPlaygroundProps.6a577977.js";import"./ProseH4.4682a6b1.js";/* empty css                    */import"./ProseCodeInline.82159b79.js";/* empty css                            */import"./Badge.7f12a6b2.js";/* empty css                  */import"./ProseP.450cb501.js";/* empty css                   */import"./index.45b07105.js";import"./index.c4c399ac.js";/* empty css                                     */import"./ComponentPlaygroundSlots.vue.bd8a9ac8.js";import"./ComponentPlaygroundTokens.vue.11b3f069.js";/* empty css                                    */async function h(o){s();const t=i(o);{const{data:n}=await f(`nuxt-component-meta${t?`-${t}`:""}`,()=>$fetch(`/api/component-meta${t?`/${t}`:""}`));return p(()=>n.value)}}const _=c({props:{component:{type:String,required:!0},props:{type:Object,required:!1,default:()=>({})}},async setup(o){const t=p(()=>u(o.component)),n=l({...o.props}),r=await h(o.component);return{as:t,formProps:n,componentData:r}},render(o){const t=Object.entries(this.$slots).reduce((n,[r,a])=>{if(r.startsWith("component-")){const m=r.replace("component-","");n[m]=a}return n},{});return e("div",{class:"component-playground"},[e("div",{class:"component-playground-wrapper"},[e(y,{class:"component-playground-ellipsis",blur:"5vw",height:"100%",width:"100%"}),e(o.as,{...o.formProps,class:"component-playground-component"},{...t})]),e(g,{modelValue:o.formProps,componentData:o.componentData,"onUpdate:modelValue":n=>o.formProps=n})])}}),F=d(_,[["__scopeId","data-v-b9c7bb0c"]]);export{F as default};