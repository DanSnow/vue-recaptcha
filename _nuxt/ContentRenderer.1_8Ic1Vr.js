import{_ as l}from"./ContentRendererMarkdown.vue.8Nn2YOG5.js";import{d as o,a6 as s,af as d,Q as c}from"./entry.uDfK3P27.js";const y=o({name:"ContentRenderer",props:{value:{type:Object,required:!1,default:()=>({})},excerpt:{type:Boolean,default:!1},tag:{type:String,default:"div"}},setup(t){s(()=>t.excerpt,n=>{var e,r,u;n&&!((e=t.value)!=null&&e.excerpt)&&(console.warn(`No excerpt found for document content/${(r=t==null?void 0:t.value)==null?void 0:r._path}.${(u=t==null?void 0:t.value)==null?void 0:u._extension}!`),console.warn("Make sure to use <!--more--> in your content if you want to use excerpt feature."))},{immediate:!0})},render(t){var i,f;const n=d(),{value:e,excerpt:r,tag:u}=t,a=r?e==null?void 0:e.excerpt:e==null?void 0:e.body;return!((i=a==null?void 0:a.children)!=null&&i.length)&&(n!=null&&n.empty)?n.empty({value:e,excerpt:r,tag:u,...this.$attrs}):n!=null&&n.default?n.default({value:e,excerpt:r,tag:u,...this.$attrs}):(a==null?void 0:a.type)==="root"&&((f=a==null?void 0:a.children)!=null&&f.length)?c(l,{value:e,excerpt:r,tag:u,...this.$attrs}):c("pre",null,JSON.stringify({message:"You should use slots with <ContentRenderer>",value:e,excerpt:r,tag:u},null,2))}});export{y as default};