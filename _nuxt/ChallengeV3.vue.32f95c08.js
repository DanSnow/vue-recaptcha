import{w as c}from"./index.033c5df0.js";import{am as l,ah as i,r as p,d,X as m,b as f,K as x,w as h,a0 as y,ad as v,ae as C,I as V,af as _}from"./entry.132f2315.js";function w(s){const o=l(),a=i(),e=p();return{response:e,async execute(){return e.value=await a.execute(o,{action:s})}}}const K=d({__name:"ChallengeV3",props:{action:{},as:{default:"div"},autoExecute:{type:Boolean,default:!0},modelValue:{}},emits:["update:modelValue"],setup(s,{emit:o}){const a=s,{response:e,execute:n}=w(a.action),r=m({response:e,execute:n});c(e,t=>{o("update:modelValue",t)});function u(){a.autoExecute&&n()}return(t,g)=>(f(),x(_(t.as),{onClick:u},{default:h(()=>[y(t.$slots,"default",v(C(V(r))))]),_:3}))}});export{K as _};