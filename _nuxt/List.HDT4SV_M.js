import{aK as r,aL as l,d as u,af as p,K as m,Q as n,a1 as f,k as d}from"./entry.25ciEW-Q.js";import{_}from"./MDCSlot.hx3m7SWU.js";const y=()=>({unwrap:r,flatUnwrap:l}),h={primary:"heroicons-outline:check",info:"heroicons-outline:information-circle",success:"heroicons-outline:check-circle",warning:"heroicons-outline:exclamation",danger:"heroicons-outline:exclamation-circle"},w=u({props:{icon:{type:String,default:null},type:{type:String,default:"primary",validator:a=>["primary","info","success","warning","danger"].includes(a)}},setup(a){const o=p(),{flatUnwrap:s,unwrap:t}=y(),c=m(()=>a.icon||h[a.type]);return()=>{const i=s((o.default&&o.default())??[],["ul"]).map(e=>t(e,["li"]));return n("ul",i.map(e=>n("li",[n("span",{class:`list-icon ${a.type}`},n(f,{name:c.value,class:"icon"})),n("span",n(_,{use:()=>e}))])))}}}),k=d(w,[["__scopeId","data-v-40141052"]]);export{k as default};
