import{Q as S,T as z,aH as U,_ as p,g as j,s as q,a as K,b as Q,t as Z,q as J,l as F,c as X,F as Y,K as tt,a4 as et,e as at,z as rt,H as nt}from"./2N82RSF5.js";import{p as it}from"./BZzNXDsW.js";import{p as st}from"./By2IgiP2.js";import{d as I}from"./BtIPvFyn.js";import{o as lt}from"./CmKTTxBW.js";import"./DrbGMSxA.js";import"./CqkleIqs.js";import"./Cv4tUFWI.js";import"./DAZyNLfv.js";import"./Ce8H_p08.js";import"./Gi6I4Gst.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ct(t){return t}function ut(){var t=ct,a=ot,f=null,x=S(0),s=S(z),o=S(0);function l(e){var n,c=(e=U(e)).length,g,y,h=0,u=new Array(c),i=new Array(c),v=+x.apply(this,arguments),w=Math.min(z,Math.max(-z,s.apply(this,arguments)-v)),m,C=Math.min(Math.abs(w)/c,o.apply(this,arguments)),$=C*(w<0?-1:1),d;for(n=0;n<c;++n)(d=i[u[n]=n]=+t(e[n],n,e))>0&&(h+=d);for(a!=null?u.sort(function(A,D){return a(i[A],i[D])}):f!=null&&u.sort(function(A,D){return f(e[A],e[D])}),n=0,y=h?(w-c*$)/h:0;n<c;++n,v=m)g=u[n],d=i[g],m=v+(d>0?d*y:0)+$,i[g]={data:e[g],index:n,value:d,startAngle:v,endAngle:m,padAngle:C};return i}return l.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),l):t},l.sortValues=function(e){return arguments.length?(a=e,f=null,l):a},l.sort=function(e){return arguments.length?(f=e,a=null,l):f},l.startAngle=function(e){return arguments.length?(x=typeof e=="function"?e:S(+e),l):x},l.endAngle=function(e){return arguments.length?(s=typeof e=="function"?e:S(+e),l):s},l.padAngle=function(e){return arguments.length?(o=typeof e=="function"?e:S(+e),l):o},l}var pt=nt.pie,G={sections:new Map,showData:!1},T=G.sections,N=G.showData,gt=structuredClone(pt),dt=p(()=>structuredClone(gt),"getConfig"),ft=p(()=>{T=new Map,N=G.showData,rt()},"clear"),mt=p(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ht=p(()=>T,"getSections"),vt=p(t=>{N=t},"setShowData"),St=p(()=>N,"getShowData"),L={getConfig:dt,clear:ft,setDiagramTitle:J,getDiagramTitle:Z,setAccTitle:Q,getAccTitle:K,setAccDescription:q,getAccDescription:j,addSection:mt,getSections:ht,setShowData:vt,getShowData:St},xt=p((t,a)=>{it(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:p(async t=>{const a=await st("pie",t);F.debug(a),xt(a,L)},"parse")},wt=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
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
`,"getStyles"),At=wt,Dt=p(t=>{const a=[...t.values()].reduce((s,o)=>s+o,0),f=[...t.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return ut().value(s=>s.value)(f)},"createPieArcs"),Ct=p((t,a,f,x)=>{F.debug(`rendering pie chart
`+t);const s=x.db,o=X(),l=Y(s.getConfig(),o.pie),e=40,n=18,c=4,g=450,y=g,h=tt(a),u=h.append("g");u.attr("transform","translate("+y/2+","+g/2+")");const{themeVariables:i}=o;let[v]=et(i.pieOuterStrokeWidth);v??(v=2);const w=l.textPosition,m=Math.min(y,g)/2-e,C=I().innerRadius(0).outerRadius(m),$=I().innerRadius(m*w).outerRadius(m*w);u.append("circle").attr("cx",0).attr("cy",0).attr("r",m+v/2).attr("class","pieOuterCircle");const d=s.getSections(),A=Dt(d),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let b=0;d.forEach(r=>{b+=r});const W=A.filter(r=>(r.data.value/b*100).toFixed(0)!=="0"),E=lt(D);u.selectAll("mySlices").data(W).enter().append("path").attr("d",C).attr("fill",r=>E(r.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(W).enter().append("text").text(r=>(r.data.value/b*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const O=[...d.entries()].map(([r,M])=>({label:r,value:M})),k=u.selectAll(".legend").data(O).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const R=n+c,B=R*O.length/2,V=12*n,H=M*R-B;return"translate("+V+","+H+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",r=>E(r.label)).style("stroke",r=>E(r.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const _=Math.max(...k.selectAll("text").nodes().map(r=>(r==null?void 0:r.getBoundingClientRect().width)??0)),P=y+e+n+c+_;h.attr("viewBox",`0 0 ${P} ${g}`),at(h,g,P,l.useMaxWidth)},"draw"),$t={draw:Ct},Pt={parser:yt,db:L,renderer:$t,styles:At};export{Pt as diagram};
