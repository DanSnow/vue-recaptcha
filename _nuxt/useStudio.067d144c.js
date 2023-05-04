import{a as Q,b as H,e as V,r as T,f as X,_ as Y,h as ee,o as $,i as q,j as te,F as ne,k as f,l as N,m as F,w as O,T as J,t as oe,p as ie,q as E,s as se,v as ae,x as re,y as de,z as B,A as ce,B as K,C as W,D as z,E as le,G as pe,H as U}from"./entry.e26d9a4e.js";import{r as ue}from"./asyncData.aa2ec2d2.js";const R=i=>(se("data-v-8d3c8fe0"),i=i(),ae(),i),ve=R(()=>f("svg",{viewBox:"0 0 90 90",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[f("path",{d:"M50.0016 71.0999h29.2561c.9293.0001 1.8422-.241 2.6469-.6992.8047-.4582 1.4729-1.1173 1.9373-1.9109.4645-.7936.7088-1.6939.7083-2.6102-.0004-.9162-.2455-1.8163-.7106-2.6095L64.192 29.713c-.4644-.7934-1.1325-1.4523-1.937-1.9105-.8046-.4581-1.7173-.6993-2.6463-.6993-.9291 0-1.8418.2412-2.6463.6993-.8046.4582-1.4726 1.1171-1.937 1.9105l-5.0238 8.5861-9.8224-16.7898c-.4648-.7934-1.1332-1.4522-1.938-1.9102-.8047-.4581-1.7176-.6992-2.6468-.6992-.9292 0-1.842.2411-2.6468.6992-.8048.458-1.4731 1.1168-1.9379 1.9102L6.56062 63.2701c-.46512.7932-.71021 1.6933-.71061 2.6095-.00041.9163.24389 1.8166.70831 2.6102.46443.7936 1.1326 1.4527 1.93732 1.9109.80473.4582 1.71766.6993 2.64686.6992h18.3646c7.2763 0 12.6422-3.1516 16.3345-9.3002l8.9642-15.3081 4.8015-8.1925 14.4099 24.6083H54.8058l-4.8042 8.1925ZM29.2077 62.899l-12.8161-.0028L35.603 30.0869l9.5857 16.4047-6.418 10.9645c-2.4521 3.9894-5.2377 5.4429-9.563 5.4429Z",fill:"currentColor"})],-1)),fe=R(()=>f("span",null,"Preview mode enabled",-1)),we={key:0},he=R(()=>f("div",{id:"__preview_background"},null,-1)),_e=R(()=>f("svg",{id:"__preview_loading_icon",width:"32",height:"32",viewBox:"0 0 24 24"},[f("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"})],-1)),ye=R(()=>f("p",null,"Initializing the preview...",-1)),me={key:0},ge=R(()=>f("div",{id:"__preview_background"},null,-1)),ke={id:"__preview_loader"},Ce=Q({__name:"ContentPreviewMode",props:{previewToken:{type:String,required:!0},apiURL:{type:String,required:!0},syncPreview:{type:Function,required:!0},requestPreviewSyncAPI:{type:Function,required:!0}},setup(i){const s=i,d=["__nuxt_preview","__preview_enabled"],v=H(),m=V(),r=T(!0),g=T(!1),n=T(!1),p=T("");let a;const _=()=>{ie("previewToken").value="",E().query.preview="",window.sessionStorage.removeItem("previewToken"),window.location.reload()},b=async S=>{const h=await s.syncPreview(S);if(n.value!==!0){if(!h){setTimeout(()=>b(S),1e3);return}n.value=!0,v.callHook("nuxt-studio:preview:ready"),m.replace({query:{}}),window.parent&&window.self!==window.parent&&a.disconnect()}};return X(async()=>{a=(await Y(()=>import("./index.9fea434a.js"),[],import.meta.url)).connect(`${s.apiURL}/preview`,{transports:["websocket","polling"],auth:{token:s.previewToken}});let h;a.on("connect",()=>{h=setTimeout(()=>{n.value||(h=setTimeout(()=>{p.value="Preview sync timed out",n.value=!1},3e4),a.emit("draft:requestSync"))},3e4)});const C=()=>{h&&(clearTimeout(h),h=null)};a.on("draft:sync",async P=>{if(C(),!P){try{a.once("draft:ready",()=>{a.emit("draft:requestSync")}),await s.requestPreviewSyncAPI()}catch(A){switch(C(),A.response.status){case 404:p.value="Preview draft not found",n.value=!1;break;default:p.value="An error occurred while syncing preview",n.value=!1}}return}b(P)}),a.on("draft:unauthorized",()=>{C(),p.value="Unauthorized preview token",n.value=!1}),a.on("disconnect",()=>{C()}),document.body.classList.add(...d),a.on("draft:update",P=>{g.value=!0,s.syncPreview(P),g.value=!1})}),ee(()=>{document.body.classList.remove(...d)}),(S,h)=>($(),q("div",null,[r.value?($(),q("div",{key:0,id:"__nuxt_preview",class:te({__preview_ready:n.value,__preview_refreshing:g.value})},[n.value?($(),q(ne,{key:0},[ve,fe,f("button",{onClick:_}," Close ")],64)):N("",!0)],2)):N("",!0),F(J,{name:"preview-loading"},{default:O(()=>[r.value&&!n.value&&!p.value?($(),q("div",we,[he,f("div",{id:"__preview_loader"},[_e,ye,f("button",{onClick:_}," Cancel ")])])):N("",!0)]),_:1}),F(J,{name:"preview-loading"},{default:O(()=>[p.value?($(),q("div",me,[ge,f("div",ke,[f("p",null,oe(p.value),1),f("button",{onClick:_}," Exit preview ")])])):N("",!0)]),_:1})]))}});const Pe=re(Ce,[["__scopeId","data-v-8d3c8fe0"]]),Ie=(i=[],s,d)=>{const v=[...s||[]],m=[...d||[]],r=JSON.parse(JSON.stringify(i));for(const n of v)if(n.oldPath)if(m.splice(m.findIndex(a=>a.path===n.oldPath),1),v.find(a=>a.path===n.oldPath))r.push({path:n.path,parsed:n.parsed});else{const a=r.find(_=>_.path===n.oldPath);a&&(a.path=n.path,n.parsed?a.parsed=n.parsed:n.pathMeta&&["_file","_path","_id","_locale"].forEach(_=>{a.parsed[_]=n.pathMeta[_]}))}else if(n.new)r.push({path:n.path,parsed:n.parsed});else{const p=r.find(a=>a.path===n.path);p&&Object.assign(p,{path:n.path,parsed:n.parsed})}for(const n of m)r.splice(r.findIndex(p=>p.path===n.path),1);const g=new Intl.Collator(void 0,{numeric:!0});return r.sort((n,p)=>g.compare(n.path,p.path)),r},D=".studio",x={appConfig:`${D}/app.config.json`,tokensConfig:`${D}/tokens.config.json`},Se=i=>{let s;return(...d)=>(s||(s=i()),s)};function Z(i,s){for(const d in i){const v=s[d];d in s||delete i[d],v!==null&&typeof v=="object"&&Z(i[d],s[d])}}function G(i,s){for(const d in s){const v=s[d];v!==null&&typeof v=="object"?(i[d]=i[d]||{},G(i[d],v)):i[d]=v}}const xe=Se(()=>JSON.parse(JSON.stringify(W()))),$e=()=>{const i=H(),{studio:s,content:d}=de().public;E();const v=xe();let m;const r=B("studio-client-db",()=>null),g=B("studio-preview-db-files",()=>[]);r.value||(i.hook("content:storage",e=>{r.value=e}),ce("/non-existing-path").findOne());const n=async(e,t,c=!0)=>{const u=window.sessionStorage.getItem("previewToken"),o=await e.getKeys(`${u}:`);await Promise.all(o.map(w=>e.removeItem(w)));const l=new Set(t.map(w=>w.parsed._id.split(":").shift()));await e.setItem(`${u}$`,JSON.stringify({ignoreSources:Array.from(l)})),await Promise.all(t.map(w=>e.setItem(`${u}:${w.parsed._id}`,JSON.stringify(w.parsed))))},p=e=>{const t=K(i,W);G(t,z(e,v)),e||Z(t,v)},a=e=>{var c,u,o,l;const t=(l=(o=(u=(c=i==null?void 0:i.vueApp)==null?void 0:c._context)==null?void 0:u.config)==null?void 0:o.globalProperties)==null?void 0:l.$pinceauTheme;!t||!(t!=null&&t.updateTheme)||(m||(m=JSON.parse(JSON.stringify((t==null?void 0:t.theme.value)||{}))),K(i,t.updateTheme,[z(e,m)]))},_=async e=>{if(g.value=e.files=e.files||g.value||[],!r.value)return!1;const t=Ie(e.files,e.additions,e.deletions),c=t.filter(l=>!l.path.startsWith(D));await n(r.value,c,(e.files||[]).length!==0);const u=t.find(l=>l.path===x.appConfig);p(u==null?void 0:u.parsed);const o=t.find(l=>l.path===x.tokensConfig);return a(o==null?void 0:o.parsed),A(),!0},b=async()=>{const e=window.sessionStorage.getItem("previewToken");await $fetch("api/projects/preview/sync",{baseURL:s==null?void 0:s.apiURL,method:"POST",params:{token:e}})},S=()=>{const e=window.sessionStorage.getItem("previewToken"),t=document.createElement("div");t.id="__nuxt_preview_wrapper",document.body.appendChild(t),le(Pe,{previewToken:e,apiURL:s==null?void 0:s.apiURL,syncPreview:_,requestPreviewSyncAPI:b}).mount(t)},h=async e=>{var u,o,l;const t=window.sessionStorage.getItem("previewToken");if(!e)return null;e=e.replace(/\/$/,"");let c=await((u=r.value)==null?void 0:u.getItem(`${t}:${e}`));return c||(c=await((o=r.value)==null?void 0:o.getItem(`cached:${e}`))),c||(c=c=await((l=r.value)==null?void 0:l.getItem(e))),c},C=e=>{var c;const t=window.sessionStorage.getItem("previewToken");r.value&&r.value.setItem(`${t}:${(c=e.parsed)==null?void 0:c._id}`,JSON.stringify(e.parsed))},P=async e=>{var c;const t=window.sessionStorage.getItem("previewToken");await((c=r.value)==null?void 0:c.removeItem(`${t}:${e}`))},A=async()=>{if(d!=null&&d.documentDriven){const{pages:e}=K(i,pe);for(const t in e.value)e.value[t]&&(e.value[t]=await h(e.value[t]._id))}K(i,ue)};return{apiURL:s==null?void 0:s.apiURL,contentStorage:r,syncPreviewFiles:n,syncPreviewAppConfig:p,syncPreviewTokensConfig:a,requestPreviewSynchronization:b,findContentWithId:h,updateContent:C,removeContentWithId:P,requestRerender:A,mountPreviewUI:S,initiateIframeCommunication:j};function j(){if(!window.parent||window.self===window.parent)return;const e=V(),t=T(""),c=T(!0),u=o=>({path:o.path,query:U(o.query),params:U(o.params),fullPath:o.fullPath,meta:U(o.meta)});window.addEventListener("keydown",o=>{(o.metaKey||o.ctrlKey||o.altKey||o.shiftKey)&&window.parent.postMessage({type:"nuxt-studio:preview:keydown",payload:{key:o.key,metaKey:o.metaKey,ctrlKey:o.ctrlKey,shiftKey:o.shiftKey,altKey:o.altKey}},"*")}),window.addEventListener("message",async o=>{const{type:l,payload:w={}}=o.data||{};switch(l){case"nuxt-studio:editor:file-selected":{const y=await h(w.path);y&&(y._partial||y._path!==E().path&&(t.value=y._path,e.push(y._path)));break}case"nuxt-studio:editor:file-changed":{const{additions:y=[],deletions:L=[]}=w;for(const k of y)await C(k);for(const k of L)await P(k.path);A();break}case"nuxt-studio:preview:sync":{_(w);break}case"nuxt-studio:config:file-changed":{const{additions:y=[],deletions:L=[]}=w,k=y.find(I=>I.path===x.appConfig);k&&p(k==null?void 0:k.parsed),L.find(I=>I.path===x.appConfig)&&p(void 0);const M=y.find(I=>I.path===x.tokensConfig);M&&a(M==null?void 0:M.parsed),L.find(I=>I.path===x.tokensConfig)&&a(void 0);break}}}),i.hook("content:document-driven:finish",({route:o,page:l,dedup:w})=>{if(w||c.value){c.value=!1;return}if(l&&t.value===l._path){t.value="";return}window.parent.postMessage({type:"nuxt-studio:preview:document-driven:finish",payload:{...u(o),contentId:l==null?void 0:l._id}},"*")}),i.hook("nuxt-studio:preview:ready",()=>{window.parent.postMessage({type:"nuxt-studio:preview:ready",payload:u(E())},"*"),e==null||e.afterEach(o=>{window.parent.postMessage({type:"nuxt-studio:preview:route-changed",payload:u(o)},"*")})})}};export{$e as useStudio};
