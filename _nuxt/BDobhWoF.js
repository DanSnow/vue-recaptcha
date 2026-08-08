import{p as at}from"./2-Wl6YrD.js";import{F as b,bf as G,g as rt,a2 as nt,b2 as it,a3 as ot,b3 as st,a6 as lt,b5 as ct,b as g,aE as B,a5 as ut,s as dt,b1 as gt,aO as pt,E as ht,t as ft,S as mt}from"./uQZa9_9-.js";import{p as vt}from"./BS-5yRLF.js";import{d as q}from"./B3DCATGm.js";import{o as xt}from"./CmKTTxBW.js";import"./Bzwf0k7V.js";import"./CqkleIqs.js";import"./Gi6I4Gst.js";function St(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function yt(t){return t}function wt(){var t=yt,n=St,y=null,T=b(0),l=b(G),p=b(0);function i(e){var r,s=(e=rt(e)).length,h,w,$=0,f=new Array(s),o=new Array(s),D=+T.apply(this,arguments),z=Math.min(G,Math.max(-G,l.apply(this,arguments)-D)),k,F=Math.min(Math.abs(z)/s,p.apply(this,arguments)),u=F*(z<0?-1:1),A;for(r=0;r<s;++r)(A=o[f[r]=r]=+t(e[r],r,e))>0&&($+=A);for(n!=null?f.sort(function(M,m){return n(o[M],o[m])}):y!=null&&f.sort(function(M,m){return y(e[M],e[m])}),r=0,w=$?(z-s*u)/$:0;r<s;++r,D=k)h=f[r],A=o[h],k=D+(A>0?A*w:0)+u,o[h]={data:e[h],index:r,value:A,startAngle:D,endAngle:k,padAngle:F};return o}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:b(+e),i):t},i.sortValues=function(e){return arguments.length?(n=e,y=null,i):n},i.sort=function(e){return arguments.length?(y=e,n=null,i):y},i.startAngle=function(e){return arguments.length?(T=typeof e=="function"?e:b(+e),i):T},i.endAngle=function(e){return arguments.length?(l=typeof e=="function"?e:b(+e),i):l},i.padAngle=function(e){return arguments.length?(p=typeof e=="function"?e:b(+e),i):p},i}var At=mt.pie,I={sections:new Map,showData:!1},W=I.sections,V=I.showData,Ct=structuredClone(At),$t=g(()=>structuredClone(Ct),"getConfig"),Dt=g(()=>{W=new Map,V=I.showData,ft()},"clear"),bt=g(({label:t,value:n})=>{if(n<0)throw new Error(`"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);W.has(t)||(W.set(t,n),B.debug(`added new section: ${t}, with value: ${n}`))},"addSection"),Tt=g(()=>W,"getSections"),kt=g(t=>{V=t},"setShowData"),Et=g(()=>V,"getShowData"),J={getConfig:$t,clear:Dt,setDiagramTitle:ct,getDiagramTitle:lt,setAccTitle:st,getAccTitle:ot,setAccDescription:it,getAccDescription:nt,addSection:bt,getSections:Tt,setShowData:kt,getShowData:Et},zt=g((t,n)=>{at(t,n),n.setShowData(t.showData),t.sections.map(n.addSection)},"populateDb"),Mt={parse:g(async t=>{const n=await vt("pie",t);B.debug(n),zt(n,J)},"parse")},Rt=g(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),Ft=Rt,Lt=g(t=>{const n=[...t.values()].reduce((l,p)=>l+p,0),y=[...t.entries()].map(([l,p])=>({label:l,value:p})).filter(l=>l.value/n*100>=1);return wt().value(l=>l.value).sort(null)(y)},"createPieArcs"),Ot=g((t,n,y,T)=>{B.debug(`rendering pie chart
`+t);const l=T.db,p=ut(),i=dt(l.getConfig(),p.pie),e=40,r=18,s=4,h=450,w=h,$=gt(n),f=$.append("g");f.attr("transform","translate("+w/2+","+h/2+")");const{themeVariables:o}=p;let[D]=pt(o.pieOuterStrokeWidth);D??=2;const z=i.legendPosition,k=i.textPosition,F=i.donutHole>0&&i.donutHole<=.9?i.donutHole:0,u=Math.min(w,h)/2-e,A=q().innerRadius(F*u).outerRadius(u),M=q().innerRadius(u*k).outerRadius(u*k),m=f.append("g");m.append("circle").attr("cx",0).attr("cy",0).attr("r",u+D/2).attr("class","pieOuterCircle");const L=l.getSections(),K=Lt(L),Q=[o.pie1,o.pie2,o.pie3,o.pie4,o.pie5,o.pie6,o.pie7,o.pie8,o.pie9,o.pie10,o.pie11,o.pie12];let H=0;L.forEach(a=>{H+=a});const U=K.filter(a=>(a.data.value/H*100).toFixed(0)!=="0"),N=xt(Q).domain([...L.keys()]);m.selectAll("mySlices").data(U).enter().append("path").attr("d",A).attr("fill",a=>N(a.data.label)).attr("class",a=>{let c="pieCircle";return i.highlightSlice==="hover"?c+=" highlightedOnHover":i.highlightSlice===a.data.label&&(c+=" highlighted"),c}),m.selectAll("mySlices").data(U).enter().append("text").text(a=>(a.data.value/H*100).toFixed(0)+"%").attr("transform",a=>"translate("+M.centroid(a)+")").style("text-anchor","middle").attr("class","slice");const Y=f.append("text").text(l.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),R=[...L.entries()].map(([a,c])=>({label:a,value:c})),C=f.selectAll(".legend").data(R).enter().append("g").attr("class","legend");C.append("rect").attr("width",r).attr("height",r).style("fill",a=>N(a.label)).style("stroke",a=>N(a.label)),C.append("text").attr("x",r+s).attr("y",r-s).text(a=>l.getShowData()?`${a.label} [${a.value}]`:a.label);const E=Math.max(...C.selectAll("text").nodes().map(a=>a?.getBoundingClientRect().width??0));let O=h,P=w+e;const d=r+s,_=R.length*d;switch(z){case"center":C.attr("transform",(a,c)=>{const v=d*R.length/2,x=-E/2-(r+s),S=c*d-v;return"translate("+x+","+S+")"});break;case"top":O+=_,C.attr("transform",(a,c)=>{const v=u,x=-E/2-(r+s),S=c*d-v;return`translate(${x}, ${S})`}),m.attr("transform",()=>`translate(0, ${_+d})`);break;case"bottom":O+=_,C.attr("transform",(a,c)=>{const v=-u-d,x=-E/2-(r+s),S=c*d-v;return"translate("+x+","+S+")"});break;case"left":P+=r+s+E,C.attr("transform",(a,c)=>{const v=d*R.length/2,x=-u-(r+s),S=c*d-v;return"translate("+x+","+S+")"}),m.attr("transform",()=>`translate(${E+r+s}, 0)`);break;default:P+=r+s+E,C.attr("transform",(a,c)=>{const v=d*R.length/2,x=12*r,S=c*d-v;return"translate("+x+","+S+")"});break}const j=Y.node()?.getBoundingClientRect().width??0,tt=w/2-j/2,et=w/2+j/2,X=Math.min(0,tt),Z=Math.max(P,et)-X;$.attr("viewBox",`${X} 0 ${Z} ${O}`),ht($,O,Z,i.useMaxWidth)},"draw"),Wt={draw:Ot},jt={parser:Mt,db:J,renderer:Wt,styles:Ft};export{jt as diagram};
