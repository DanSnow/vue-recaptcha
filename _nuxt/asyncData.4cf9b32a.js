import{a0 as g,b as D,r as h,a1 as P,a2 as w,h as m,R as x,u as b,a3 as C,U as O}from"./entry.526e64d8.js";const k=()=>null;function M(...s){const f=typeof s[s.length-1]=="string"?s.pop():void 0;typeof s[0]!="string"&&s.unshift(f);let[a,l,t={}]=s;if(typeof a!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof l!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");t.server=t.server??!0,t.default=t.default??k,t.lazy=t.lazy??!1,t.immediate=t.immediate??!0;const e=D(),u=()=>e.isHydrating?e.payload.data[a]:e.static.data[a],d=()=>u()!==void 0;e._asyncData[a]||(e._asyncData[a]={data:h(u()??t.default()),pending:h(!d()),error:P(e.payload._errors,a)});const r={...e._asyncData[a]};r.refresh=r.execute=(i={})=>{if(e._asyncDataPromises[a]){if(i.dedupe===!1)return e._asyncDataPromises[a];e._asyncDataPromises[a].cancelled=!0}if((i._initial||e.isHydrating&&i._initial!==!1)&&d())return u();r.pending.value=!0;const c=new Promise((n,o)=>{try{n(l(e))}catch(v){o(v)}}).then(n=>{if(c.cancelled)return e._asyncDataPromises[a];let o=n;t.transform&&(o=t.transform(n)),t.pick&&(o=B(o,t.pick)),r.data.value=o,r.error.value=null}).catch(n=>{if(c.cancelled)return e._asyncDataPromises[a];r.error.value=n,r.data.value=b(t.default())}).finally(()=>{c.cancelled||(r.pending.value=!1,e.payload.data[a]=r.data.value,r.error.value&&(e.payload._errors[a]=C(r.error.value)),delete e._asyncDataPromises[a])});return e._asyncDataPromises[a]=c,e._asyncDataPromises[a]};const y=()=>r.refresh({_initial:!0}),_=t.server!==!1&&e.payload.serverRendered;{const i=O();if(i&&!i._nuxtOnBeforeMountCbs){i._nuxtOnBeforeMountCbs=[];const n=i._nuxtOnBeforeMountCbs;i&&(w(()=>{n.forEach(o=>{o()}),n.splice(0,n.length)}),m(()=>n.splice(0,n.length)))}_&&e.isHydrating&&d()?r.pending.value=!1:i&&(e.payload.serverRendered&&e.isHydrating||t.lazy)&&t.immediate?i._nuxtOnBeforeMountCbs.push(y):t.immediate&&y(),t.watch&&x(t.watch,()=>r.refresh());const c=e.hook("app:data:refresh",n=>{if(!n||n.includes(a))return r.refresh()});i&&m(c)}const p=Promise.resolve(e._asyncDataPromises[a]).then(()=>r);return Object.assign(p,r),p}async function R(s){await new Promise(a=>g(a));const f=s?Array.isArray(s)?s:[s]:void 0;await D().hooks.callHookParallel("app:data:refresh",f)}function B(s,f){const a={};for(const l of f)a[l]=s[l];return a}export{R as r,M as u};
