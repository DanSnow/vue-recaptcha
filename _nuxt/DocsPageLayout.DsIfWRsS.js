import O from"./DocsAside.gk2PsRv5.js";import R from"./ProseCodeInline._yHq18Ym.js";import{d as U,W,ax as Y,s as q,K as m,r as V,m as J,o as Q,a8 as X,b as p,Y as A,w as h,L as t,c as g,g as r,f as x,e as _,ae as Z,G as k,t as ee,F as oe,n as y,aA as te,a2 as ne,aB as se,p as ae,i as ce,k as le}from"./entry.EFS4caZL.js";import re from"./DocsPageBottom.4C2aQiT4.js";import ie from"./DocsPrevNext.87wQ0gwQ.js";import ue from"./DocsToc.cHtvPSqX.js";import"./ProseA.tRBm2Xsn.js";import"./EditOnLink.vue.HJ32VKmB.js";import"./DocsTocLinks.0ubNfomB.js";const pe=d=>(ae("data-v-8438d291"),d=d(),ce(),d),_e={class:"page-body"},de={key:1,class:"toc"},me={class:"toc-wrapper"},fe=pe(()=>_("span",{class:"title"},"Table of Contents",-1)),ve=U({__name:"DocsPageLayout",setup(d){const{page:s}=W(),{config:f,tree:T}=Y(),F=q(),H=(e,o=!0)=>{var n;return typeof((n=s.value)==null?void 0:n[e])<"u"?s.value[e]:o},S=m(()=>{var e,o,n;return!s.value||((n=(o=(e=s.value)==null?void 0:e.body)==null?void 0:o.children)==null?void 0:n.length)>0}),b=m(()=>{var e,o,n,c,l;return((e=s.value)==null?void 0:e.toc)!==!1&&((l=(c=(n=(o=s.value)==null?void 0:o.body)==null?void 0:n.toc)==null?void 0:c.links)==null?void 0:l.length)>=2}),C=m(()=>{var e,o,n,c,l;return((e=s.value)==null?void 0:e.aside)!==!1&&(((o=T.value)==null?void 0:o.length)>1||((l=(c=(n=T.value)==null?void 0:n[0])==null?void 0:c.children)==null?void 0:l.length))}),L=m(()=>H("bottom",!0)),i=V(!1),a=V(null),v=()=>F.path.split("/").slice(0,2).join("/"),u=J("asideScroll",()=>{var e;return{parentPath:v(),scrollTop:((e=a.value)==null?void 0:e.scrollTop)||0}});function P(){a.value&&(a.value.scrollHeight===0&&setTimeout(P,0),a.value.scrollTop=u.value.scrollTop)}return Q(()=>{u.value.parentPath!==v()?(u.value.parentPath=v(),u.value.scrollTop=0):P()}),X(()=>{a.value&&(u.value.scrollTop=a.value.scrollTop)}),(e,o)=>{var B,w,D,N,I,$;const n=O,c=R,l=te,M=re,j=ie,z=ne,E=ue,G=se;return p(),A(G,{fluid:(w=(B=t(f))==null?void 0:B.main)==null?void 0:w.fluid,padded:(N=(D=t(f))==null?void 0:D.main)==null?void 0:N.padded,class:y(["docs-page-content",{fluid:($=(I=t(f))==null?void 0:I.main)==null?void 0:$.fluid,"has-toc":t(b),"has-aside":t(C)}])},{default:h(()=>[t(C)?(p(),g("aside",{key:0,ref_key:"asideNav",ref:a,class:"aside-nav"},[r(n,{class:"app-aside"})],512)):x("",!0),_("article",_e,[t(S)?Z(e.$slots,"default",{key:0},void 0,!0):(p(),A(l,{key:1,type:"info"},{default:h(()=>[k(" Start writing in "),r(c,null,{default:h(()=>[k("content/"+ee(t(s)._file),1)]),_:1}),k(" to see this page taking shape. ")]),_:1})),t(S)&&t(s)&&t(L)?(p(),g(oe,{key:2},[r(M),r(j)],64)):x("",!0)]),t(b)?(p(),g("div",de,[_("div",me,[_("button",{onClick:o[0]||(o[0]=K=>i.value=!t(i))},[fe,r(z,{name:"heroicons-outline:chevron-right",class:y(["icon",[t(i)&&"rotate"]])},null,8,["class"])]),_("div",{class:y(["docs-toc-wrapper",[t(i)&&"opened"]])},[r(E,{onMove:o[1]||(o[1]=K=>i.value=!1)})],2)])])):x("",!0)]),_:3},8,["fluid","padded","class"])}}}),Pe=le(ve,[["__scopeId","data-v-8438d291"]]);export{Pe as default};
