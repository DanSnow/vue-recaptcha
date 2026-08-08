import{b as p,aE as C,b1 as H,a4 as B,t as q,af as G,E as U,a$ as j,a5 as K}from"./uQZa9_9-.js";var A="",M="",O="",D=[],b=new Map,v=p(e=>j(e,K()),"sanitizeText"),y=p(e=>{switch(e.type){case"terminal":return{...e,value:v(e.value)};case"nonterminal":return{...e,name:v(e.name)};case"sequence":return{...e,elements:e.elements.map(y)};case"choice":return{...e,alternatives:e.alternatives.map(y)};case"optional":return{...e,element:y(e.element)};case"repetition":return{...e,element:y(e.element),separator:e.separator?y(e.separator):void 0};case"special":return{...e,text:v(e.text)}}},"sanitizeAstNode"),J=p(()=>{A="",M="",O="",D.length=0,b.clear(),q(),C.debug("[Railroad] Database cleared")},"clear"),Y=p(e=>{A=v(e),C.debug("[Railroad] Title set:",e)},"setTitle"),P=p(()=>A,"getTitle"),Q=p(e=>{const i={...e,name:v(e.name),definition:y(e.definition),comment:e.comment?v(e.comment):void 0};C.debug("[Railroad] Adding rule:",i.name),b.has(i.name)&&C.warn(`[Railroad] Rule '${i.name}' is already defined. Overwriting.`),D.push(i),b.set(i.name,i)},"addRule"),Z=p(()=>D,"getRules"),V=p(e=>b.get(e),"getRule"),ee=p(e=>{M=v(e).replace(/^\s+/g,""),C.debug("[Railroad] Accessibility title set:",e)},"setAccTitle"),te=p(()=>M,"getAccTitle"),re=p(e=>{O=v(e).replace(/\n\s+/g,`
`),C.debug("[Railroad] Accessibility description set:",e)},"setAccDescription"),ie=p(()=>O,"getAccDescription"),ae=Y,ne=P,oe={clear:J,setTitle:Y,getTitle:P,addRule:Q,getRules:Z,getRule:V,setAccTitle:ee,getAccTitle:te,setAccDescription:re,getAccDescription:ie,setDiagramTitle:ae,getDiagramTitle:ne},f={compactMode:!1,padding:10,verticalSeparation:8,horizontalSeparation:10,arcRadius:10,fontSize:14,fontFamily:"monospace",terminalFill:"#FFFFC0",terminalStroke:"#000000",terminalTextColor:"#000000",nonTerminalFill:"#FFFFFF",nonTerminalStroke:"#000000",nonTerminalTextColor:"#000000",lineColor:"#000000",strokeWidth:2,markerFill:"#000000",commentFill:"#E8E8E8",commentStroke:"#888888",commentTextColor:"#666666",specialFill:"#F0E0FF",specialStroke:"#8800CC",ruleNameColor:"#000066",showMarkers:!0,markerRadius:5},le=/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$|^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([\d\s%+,./-]+\)$|^[a-z]+$/i,se=/^[\w "',.-]+$/,de=new Set(["compactMode","padding","verticalSeparation","horizontalSeparation","arcRadius","fontSize","fontFamily","terminalFill","terminalStroke","terminalTextColor","nonTerminalFill","nonTerminalStroke","nonTerminalTextColor","lineColor","strokeWidth","markerFill","commentFill","commentStroke","commentTextColor","specialFill","specialStroke","ruleNameColor","showMarkers","markerRadius"]),L=p(e=>e?Object.keys(e).every(i=>i==="railroad"||de.has(i)):!1,"isRailroadStyleOptions"),ce=p(e=>e?"railroad"in e&&e.railroad?e.railroad:L(e)?e:{}:{},"extractRailroadOverrides"),me=p(e=>{if(!e||L(e))return{};const{railroad:i,svgId:n,theme:a,look:t,...r}=e;return r},"extractThemeOverrides"),m=p((e,i)=>{if(typeof e!="string")return i;const n=e.trim();return le.test(n)?n:i},"sanitizeColorValue"),I=p((e,i)=>{if(typeof e!="string")return i;const n=e.trim();return se.test(n)?n:i},"sanitizeFontFamilyValue"),F=p((e,i)=>{const n=typeof e=="number"?e:typeof e=="string"?Number.parseFloat(e):Number.NaN;return Number.isFinite(n)&&n>=0?n:i},"sanitizeNumberValue"),he=p(e=>{const i=typeof e=="number"?e:typeof e=="string"?Number.parseFloat(e):Number.NaN;return Number.isFinite(i)&&i>0?i:void 0},"parseThemeFontSize"),pe=p(e=>{const i=I(e.fontFamily,f.fontFamily),n=he(e.fontSize)??f.fontSize;return{...f,fontFamily:i,fontSize:n,terminalFill:m(e.secondBkg??e.secondaryColor,f.terminalFill),terminalStroke:m(e.secondaryBorderColor??e.lineColor,f.terminalStroke),terminalTextColor:m(e.secondaryTextColor??e.textColor,f.terminalTextColor),nonTerminalFill:m(e.mainBkg??e.background,f.nonTerminalFill),nonTerminalStroke:m(e.primaryBorderColor??e.lineColor,f.nonTerminalStroke),nonTerminalTextColor:m(e.primaryTextColor??e.textColor,f.nonTerminalTextColor),lineColor:m(e.lineColor,f.lineColor),markerFill:m(e.lineColor,f.markerFill),commentFill:m(e.labelBackground??e.tertiaryColor,f.commentFill),commentStroke:m(e.tertiaryBorderColor??e.lineColor,f.commentStroke),commentTextColor:m(e.tertiaryTextColor??e.textColor,f.commentTextColor),specialFill:m(e.tertiaryColor??e.secondaryColor,f.specialFill),specialStroke:m(e.tertiaryBorderColor??e.secondaryBorderColor,f.specialStroke),ruleNameColor:m(e.titleColor??e.textColor,f.ruleNameColor)}},"buildThemeDefaults"),E=p(e=>{const i=B(),n={...G(),...i.themeVariables??{},...me(e)},a=pe(n),t={...i.railroad??{},...ce(e)};return{compactMode:t.compactMode??a.compactMode,padding:F(t.padding,a.padding),verticalSeparation:F(t.verticalSeparation,a.verticalSeparation),horizontalSeparation:F(t.horizontalSeparation,a.horizontalSeparation),arcRadius:F(t.arcRadius,a.arcRadius),fontSize:F(t.fontSize,a.fontSize),fontFamily:I(t.fontFamily,a.fontFamily),terminalFill:m(t.terminalFill,a.terminalFill),terminalStroke:m(t.terminalStroke,a.terminalStroke),terminalTextColor:m(t.terminalTextColor,a.terminalTextColor),nonTerminalFill:m(t.nonTerminalFill,a.nonTerminalFill),nonTerminalStroke:m(t.nonTerminalStroke,a.nonTerminalStroke),nonTerminalTextColor:m(t.nonTerminalTextColor,a.nonTerminalTextColor),lineColor:m(t.lineColor,a.lineColor),strokeWidth:F(t.strokeWidth,a.strokeWidth),markerFill:m(t.markerFill,a.markerFill),commentFill:m(t.commentFill,a.commentFill),commentStroke:m(t.commentStroke,a.commentStroke),commentTextColor:m(t.commentTextColor,a.commentTextColor),specialFill:m(t.specialFill,a.specialFill),specialStroke:m(t.specialStroke,a.specialStroke),ruleNameColor:m(t.ruleNameColor,a.ruleNameColor),showMarkers:t.showMarkers??a.showMarkers,markerRadius:F(t.markerRadius,a.markerRadius)}},"buildRailroadStyleOptions"),Te=p(e=>{const{fontFamily:i,fontSize:n,terminalFill:a,terminalStroke:t,terminalTextColor:r,nonTerminalFill:o,nonTerminalStroke:g,nonTerminalTextColor:l,lineColor:s,strokeWidth:h,markerFill:u,commentFill:c,commentStroke:w,commentTextColor:d,specialFill:T,specialStroke:z,ruleNameColor:S}=E(e);return`
  .railroad-diagram {
    font-family: ${i};
    font-size: ${n}px;
  }

  .railroad-terminal rect {
    fill: ${a};
    stroke: ${t};
    stroke-width: ${h}px;
  }

  .railroad-terminal text {
    fill: ${r};
    font-family: ${i};
    font-size: ${n}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-nonterminal rect {
    fill: ${o};
    stroke: ${g};
    stroke-width: ${h}px;
  }

  .railroad-nonterminal text {
    fill: ${l};
    font-family: ${i};
    font-size: ${n}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-line {
    stroke: ${s};
    stroke-width: ${h}px;
    fill: none;
  }

  .railroad-start circle,
  .railroad-end circle {
    fill: ${u};
  }

  .railroad-comment ellipse {
    fill: ${c};
    stroke: ${w};
    stroke-width: ${h}px;
  }

  .railroad-comment text {
    fill: ${d};
    font-style: italic;
    font-family: ${i};
    font-size: ${n}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-special rect {
    fill: ${T};
    stroke: ${z};
    stroke-width: ${h}px;
    stroke-dasharray: 5,3;
  }

  .railroad-special text {
    fill: ${l};
    font-family: ${i};
    font-size: ${n}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-rule-name {
    font-weight: bold;
    fill: ${S};
    font-family: ${i};
    font-size: ${n}px;
  }

  .railroad-group {
    /* Grouping container, no specific styles */
  }
`},"getStyles"),R,x=(R=class{constructor(){this.d=""}moveTo(i,n){return this.d+=`M ${i} ${n} `,this}lineTo(i,n){return this.d+=`L ${i} ${n} `,this}horizontalTo(i){return this.d+=`H ${i} `,this}verticalTo(i){return this.d+=`V ${i} `,this}arcTo(i,n,a,t,r,o,g){return this.d+=`A ${i} ${n} ${a} ${t?1:0} ${r?1:0} ${o} ${g} `,this}build(){return this.d.trim()}},p(R,"PathBuilder"),R),$,ue=($=class{constructor(i,n=E()){this.textCache=new Map,this.svg=i,this.config=n}measureText(i){if(this.textCache.has(i))return this.textCache.get(i);const n=this.svg.append("text").attr("font-family",this.config.fontFamily).attr("font-size",this.config.fontSize).text(i),a=n.node().getBBox(),t={width:a.width,height:a.height};return n.remove(),this.textCache.set(i,t),t}renderTerminal(i,n){const a=this.measureText(n),t=a.width+this.config.padding*2,r=a.height+this.config.padding*2,o=i.append("g").attr("class","railroad-terminal");return o.append("rect").attr("x",0).attr("y",0).attr("width",t).attr("height",r).attr("rx",10).attr("ry",10),o.append("text").attr("x",t/2).attr("y",r/2).text(n),{element:o.node(),dimensions:{width:t,height:r,up:r/2,down:r/2}}}renderNonTerminal(i,n){const a=this.measureText(n),t=a.width+this.config.padding*2,r=a.height+this.config.padding*2,o=i.append("g").attr("class","railroad-nonterminal");return o.append("rect").attr("x",0).attr("y",0).attr("width",t).attr("height",r),o.append("text").attr("x",t/2).attr("y",r/2).text(n),{element:o.node(),dimensions:{width:t,height:r,up:r/2,down:r/2}}}renderSequence(i,n){const a=n.map(s=>this.renderExpression(i,s));let t=0,r=0,o=0;for(const s of a)t+=s.dimensions.width,r=Math.max(r,s.dimensions.up),o=Math.max(o,s.dimensions.down);t+=(a.length-1)*this.config.horizontalSeparation;const g=i.append("g").attr("class","railroad-sequence");let l=0;for(let s=0;s<a.length;s++){const h=a[s],u=r-h.dimensions.up;if(g.node().appendChild(h.element).setAttribute("transform",`translate(${l}, ${u})`),s<a.length-1){const w=l+h.dimensions.width,d=w+this.config.horizontalSeparation,T=r;g.append("path").attr("class","railroad-line").attr("d",new x().moveTo(w,T).lineTo(d,T).build())}l+=h.dimensions.width+this.config.horizontalSeparation}return{element:g.node(),dimensions:{width:t,height:r+o,up:r,down:o}}}renderChoice(i,n){const a=n.map(c=>this.renderExpression(i,c));let t=0,r=0;for(const c of a)t=Math.max(t,c.dimensions.width),r+=c.dimensions.height;r+=(a.length-1)*this.config.verticalSeparation;const o=this.config.arcRadius,g=o*4,l=t+g,s=i.append("g").attr("class","railroad-choice");let h=0;const u=r/2;for(const c of a){const w=h,d=w+c.dimensions.up,T=o*2+(t-c.dimensions.width)/2;s.node().appendChild(c.element).setAttribute("transform",`translate(${T}, ${w})`);const S=new x,k=d>u;d===u?S.moveTo(0,u).lineTo(T,d):S.moveTo(0,u).arcTo(o,o,0,!1,k,o,u+(k?o:-o)).lineTo(o,d-(k?o:-o)).arcTo(o,o,0,!1,!k,o*2,d).lineTo(T,d),s.append("path").attr("class","railroad-line").attr("d",S.build());const N=new x,W=T+c.dimensions.width,X=l-o*2;d===u?N.moveTo(W,d).lineTo(l,u):N.moveTo(W,d).lineTo(X,d).arcTo(o,o,0,!1,!k,l-o,d+(k?-o:o)).lineTo(l-o,u+(k?o:-o)).arcTo(o,o,0,!1,k,l,u),s.append("path").attr("class","railroad-line").attr("d",N.build()),h+=c.dimensions.height+this.config.verticalSeparation}return{element:s.node(),dimensions:{width:l,height:r,up:u,down:r-u}}}renderOptional(i,n){const a=this.renderExpression(i,n),t=this.config.arcRadius,r=t*2,o=a.dimensions.width+t*4,g=a.dimensions.height+r,l=i.append("g").attr("class","railroad-optional"),s=t*2,h=r;l.node().appendChild(a.element).setAttribute("transform",`translate(${s}, ${h})`);const c=h+a.dimensions.up,w=new x().moveTo(0,c).lineTo(t*2,c);l.append("path").attr("class","railroad-line").attr("d",w.build());const d=new x().moveTo(s+a.dimensions.width,c).lineTo(o,c);l.append("path").attr("class","railroad-line").attr("d",d.build());const T=new x().moveTo(0,c).arcTo(t,t,0,!1,!1,t,c-t).lineTo(t,t).arcTo(t,t,0,!1,!0,t*2,0).lineTo(o-t*2,0).arcTo(t,t,0,!1,!0,o-t,t).lineTo(o-t,c-t).arcTo(t,t,0,!1,!1,o,c);return l.append("path").attr("class","railroad-line").attr("d",T.build()),{element:l.node(),dimensions:{width:o,height:g,up:c,down:g-c}}}renderRepetition(i,n,a){const t=this.renderExpression(i,n),r=this.config.arcRadius,o=r*2,g=t.dimensions.width+r*4,l=a===0,s=t.dimensions.height+o+(l?o:0),h=i.append("g").attr("class","railroad-repetition"),u=r*2,c=l?o:0;h.node().appendChild(t.element).setAttribute("transform",`translate(${u}, ${c})`);const d=c+t.dimensions.up;h.append("path").attr("class","railroad-line").attr("d",new x().moveTo(0,d).lineTo(r*2,d).build()),h.append("path").attr("class","railroad-line").attr("d",new x().moveTo(u+t.dimensions.width,d).lineTo(g,d).build());const T=c+t.dimensions.height+r,z=new x().moveTo(u+t.dimensions.width,d).arcTo(r,r,0,!1,!0,u+t.dimensions.width+r,d+r).lineTo(u+t.dimensions.width+r,T).arcTo(r,r,0,!1,!0,u+t.dimensions.width,T+r).lineTo(r*2,T+r).arcTo(r,r,0,!1,!0,r,T).lineTo(r,d+r).arcTo(r,r,0,!1,!0,r*2,d);if(h.append("path").attr("class","railroad-line").attr("d",z.build()),l){const S=new x().moveTo(0,d).arcTo(r,r,0,!1,!1,r,d-r).lineTo(r,r).arcTo(r,r,0,!1,!0,r*2,0).lineTo(g-r*2,0).arcTo(r,r,0,!1,!0,g-r,r).lineTo(g-r,d-r).arcTo(r,r,0,!1,!1,g,d);h.append("path").attr("class","railroad-line").attr("d",S.build())}return{element:h.node(),dimensions:{width:g,height:s,up:d,down:s-d}}}renderSpecial(i,n){const a=this.measureText("? "+n+" ?"),t=a.width+this.config.padding*2,r=a.height+this.config.padding*2,o=i.append("g").attr("class","railroad-special");return o.append("rect").attr("x",0).attr("y",0).attr("width",t).attr("height",r),o.append("text").attr("x",t/2).attr("y",r/2).text("? "+n+" ?"),{element:o.node(),dimensions:{width:t,height:r,up:r/2,down:r/2}}}renderExpression(i,n){switch(n.type){case"terminal":return this.renderTerminal(i,n.value);case"nonterminal":return this.renderNonTerminal(i,n.name);case"sequence":return this.renderSequence(i,n.elements);case"choice":return this.renderChoice(i,n.alternatives);case"optional":return this.renderOptional(i,n.element);case"repetition":return this.renderRepetition(i,n.element,n.min);case"special":return this.renderSpecial(i,n.text);default:throw new Error(`Unknown node type: ${n.type}`)}}renderRule(i,n){const a=this.svg.append("g").attr("class","railroad-rule").attr("transform",`translate(0, ${n})`),t=i.name+" =",r=this.measureText(t).width+20,o=r+20,g=a.append("g"),l=this.renderExpression(g,i.definition),s=Math.max(20,l.dimensions.up),h=s-l.dimensions.up;return g.attr("transform",`translate(${o}, ${h})`),a.append("g").attr("class","railroad-rule-name-group").append("text").attr("class","railroad-rule-name").attr("x",0).attr("y",s).text(t),a.append("g").attr("class","railroad-start").append("circle").attr("cx",r).attr("cy",s).attr("r",this.config.markerRadius),a.append("g").attr("class","railroad-end").append("circle").attr("cx",o+l.dimensions.width+10).attr("cy",s).attr("r",this.config.markerRadius),a.append("path").attr("class","railroad-line").attr("d",new x().moveTo(r+this.config.markerRadius,s).lineTo(o,s).build()),a.append("path").attr("class","railroad-line").attr("d",new x().moveTo(o+l.dimensions.width,s).lineTo(o+l.dimensions.width+10-this.config.markerRadius,s).build()),{height:Math.max(40,h+l.dimensions.height+this.config.padding*2),width:o+l.dimensions.width+10+this.config.markerRadius}}renderDiagram(i){let n=this.config.padding,a=0;for(const t of i){const r=this.renderRule(t,n);n+=r.height+this.config.verticalSeparation,a=Math.max(a,r.width)}return{width:a+this.config.padding*2,height:n+this.config.padding}}},p($,"RailroadRenderer"),$),_=p((e,i,n)=>{U(e,i.height,i.width,n),e.attr("viewBox",`0 0 ${i.width} ${i.height}`)},"configureRailroadSvgSize"),ge=p((e,i,n)=>{C.debug(`[Railroad] Rendering diagram
`+e);try{const a=H(i);a.attr("class","railroad-diagram");const r=B().railroad?.useMaxWidth??!0,o=oe.getRules();if(C.debug(`[Railroad] Rendering ${o.length} rules`),o.length===0){C.warn("[Railroad] No rules to render"),_(a,{height:100,width:200},r);return}const l=new ue(a,E()).renderDiagram(o);_(a,l,r),C.debug("[Railroad] Render complete")}catch(a){throw C.error("[Railroad] Render error:",a),a}},"draw"),xe={draw:ge};export{oe as d,Te as g,xe as r};
