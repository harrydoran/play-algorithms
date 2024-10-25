import{s as ue,e as pe,r as fe,n as le}from"../chunks/scheduler.B-KQ0TV-.js";import{S as he,i as de,m as j,n as P,o as R,k as B,l as O,p as A,s as N,f as I,g as E,d,q as oe,z as me,e as f,c as h,a as g,r as u,h as p,t as K,u as T,b as Q,v as L,A as ne,w as H,j as $e}from"../chunks/index.BVfQ5-ZG.js";import{E as ve,a as ae,b as z}from"../chunks/EtudeCard.CIRAnrgG.js";class ge{constructor(e){this.strip=e,this.strip=e.toLowerCase()}matches=new Set;noMatches=new Set;reversalMapMatch=new Map;reversalMapNoMatch=new Map;getStrip(){return this.strip}shouldReverseMatch(e){return this.reversalMapMatch.get(e)||!1}shouldReverseNoMatch(e){return this.reversalMapNoMatch.get(e)||!1}piecesDoNotMatch(e){return this.noMatches.has(e)}checkMatch(e){const a=e.strip.split("").reverse().join(""),r=this.strip===e.strip,n=this.strip===a;let t=!0,s=!0;for(let l=0;l<this.strip.length&&(this.strip[l]===e.strip[l]&&(t=!1),this.strip[l]===a[l]&&(s=!1),!(!t&&!s));l++);if((r||n)&&this.matches.add(e),t||s){const l=!t;this.reversalMapNoMatch.set(e,l),this.noMatches.add(e)}this.reversalMapMatch.set(e,this.shouldReverse(e))}shouldReverse(e){let a=0,r=0;const n=e.getStrip().split("").reverse().join("");for(let t=0;t<this.strip.length;t++)this.strip[t]===e.strip[t]&&a++,this.strip[t]===n[t]&&r++;return r>a}}function _e(o){const e=o.split("").reverse().join("");return o.localeCompare(e)<=0?o:e}function ie(o){let e=0;for(let a=0;a<o.length-1;a++){const r=o[a],n=o[a+1];for(let t=0;t<r.length;t++)r[t]===n[t]&&e++}return e}function ce(o){let e=0,a=0;for(let r=0;r<o.length-1;r++){const n=o[r],t=o[r+1];for(let s=0;s<n.length;s++)n[s]===t[s]?e++:a++}return Math.abs(e-a)}function be(o,e,a){const r=new Map,n=o.trim().split(`
`);for(const l of n){const i=_e(l.trim());r.set(i,(r.get(i)||0)+1)}const t=new Map;r.forEach((l,i)=>{const c=new ge(i);t.set(c,l)});for(const l of t.keys())for(const i of t.keys())l.checkMatch(i);let s=[];switch(a){case"-m":if(s=Me(t,e),s.length>0)return{carpet:s,score:ie(s)};break;case"-n":if(s=ke(t,e),s.length>0)return{carpet:s};break;case"-b":if(s=we(t,e),s.length>0)return{carpet:s,balance:ce(s)};break}return null}function Me(o,e){let a=0,r=[];function n(t,s){if(t.length===e){const l=ie(t);l>a&&(a=l,r=[...t]);return}s.forEach((l,i)=>{if(l>0){const c=new Map(s);c.set(i,l-1),t.push(i.getStrip()),n(t,c),t.pop();const _=i.getStrip().split("").reverse().join("");t.push(_),n(t,c),t.pop()}})}return n([],o),r}function ke(o,e){let a=[];function r(n,t){if(n.length===e)return a=[...n],!0;for(const[s,l]of t)if(l>0&&(n.length===0||!re(n[n.length-1],s.getStrip()))){const i=new Map(t);if(i.set(s,l-1),n.push(s.getStrip()),r(n,i))return!0;n.pop();const c=s.getStrip().split("").reverse().join("");if(!re(n[n.length-1],c)){if(n.push(c),r(n,i))return!0;n.pop()}}return!1}return r([],o),a}function we(o,e){let a=1/0,r=[];const n=3e3;for(let t=0;t<n;t++){const s=[],l=new Map(o);for(;s.length<e&&l.size>0;){const i=Array.from(l.entries()),[c,_]=i[Math.floor(Math.random()*i.length)];Math.random()<.5?s.push(c.getStrip()):s.push(c.getStrip().split("").reverse().join("")),_===1?l.delete(c):l.set(c,_-1)}if(s.length===e){const i=ce(s);i<a&&(a=i,r=[...s])}}return r}function re(o,e){for(let a=0;a<o.length;a++)if(o[a]===e[a])return!0;return!1}function Ce(o){let e,a,r,n,t,s="Parameters",l,i,c,_,m,S,M,U,$,k,W="Maximum matches",w,Y="No matches",C,Z="Best balance",q,D,x,ee="Generate Carpet",G,te;return{c(){e=f("div"),a=f("textarea"),r=N(),n=f("div"),t=f("h4"),t.textContent=s,l=N(),i=f("div"),c=f("label"),_=K(`Size:
								`),m=f("input"),S=N(),M=f("label"),U=K(`Mode:
								`),$=f("select"),k=f("option"),k.textContent=W,w=f("option"),w.textContent=Y,C=f("option"),C.textContent=Z,q=N(),D=f("div"),x=f("button"),x.textContent=ee,this.h()},l(b){e=h(b,"DIV",{class:!0});var v=g(e);a=h(v,"TEXTAREA",{class:!0,placeholder:!0,rows:!0,spellcheck:!0}),g(a).forEach(d),r=I(v),n=h(v,"DIV",{class:!0});var F=g(n);t=h(F,"H4",{class:!0,"data-svelte-h":!0}),T(t)!=="svelte-145mtvy"&&(t.textContent=s),l=I(F),i=h(F,"DIV",{class:!0});var V=g(i);c=h(V,"LABEL",{class:!0});var X=g(c);_=Q(X,`Size:
								`),m=h(X,"INPUT",{type:!0,min:!0,max:!0,class:!0}),X.forEach(d),S=I(V),M=h(V,"LABEL",{class:!0});var J=g(M);U=Q(J,`Mode:
								`),$=h(J,"SELECT",{class:!0});var y=g($);k=h(y,"OPTION",{"data-svelte-h":!0}),T(k)!=="svelte-1vt6xmh"&&(k.textContent=W),w=h(y,"OPTION",{"data-svelte-h":!0}),T(w)!=="svelte-17ydfqp"&&(w.textContent=Y),C=h(y,"OPTION",{"data-svelte-h":!0}),T(C)!=="svelte-1uki1t"&&(C.textContent=Z),y.forEach(d),J.forEach(d),V.forEach(d),F.forEach(d),q=I(v),D=h(v,"DIV",{class:!0});var se=g(D);x=h(se,"BUTTON",{class:!0,"data-svelte-h":!0}),T(x)!=="svelte-17tl0k4"&&(x.textContent=ee),se.forEach(d),v.forEach(d),this.h()},h(){u(a,"class","input-field svelte-1lkeh"),u(a,"placeholder","Enter carpet strips..."),u(a,"rows","10"),u(a,"spellcheck","false"),u(t,"class","svelte-1lkeh"),u(m,"type","number"),u(m,"min","1"),u(m,"max","20"),u(m,"class","input-small svelte-1lkeh"),u(c,"class","svelte-1lkeh"),k.__value="-m",L(k,k.__value),w.__value="-n",L(w,w.__value),C.__value="-b",L(C,C.__value),u($,"class","input-small svelte-1lkeh"),o[2]===void 0&&pe(()=>o[7].call($)),u(M,"class","svelte-1lkeh"),u(i,"class","param-inputs svelte-1lkeh"),u(n,"class","parameters svelte-1lkeh"),u(x,"class","game-button svelte-1lkeh"),u(D,"class","button-container svelte-1lkeh"),u(e,"class","control-section svelte-1lkeh")},m(b,v){E(b,e,v),p(e,a),L(a,o[0]),p(e,r),p(e,n),p(n,t),p(n,l),p(n,i),p(i,c),p(c,_),p(c,m),L(m,o[1]),p(i,S),p(i,M),p(M,U),p(M,$),p($,k),p($,w),p($,C),ne($,o[2],!0),p(e,q),p(e,D),p(D,x),G||(te=[H(a,"input",o[5]),H(m,"input",o[6]),H($,"change",o[7]),H(x,"click",o[4])],G=!0)},p(b,v){v&1&&L(a,b[0]),v&2&&oe(m.value)!==b[1]&&L(m,b[1]),v&4&&ne($,b[2])},d(b){b&&d(e),G=!1,fe(te)}}}function Ee(o){let e,a;return{c(){e=f("pre"),a=K(o[3]),this.h()},l(r){e=h(r,"PRE",{class:!0});var n=g(e);a=Q(n,o[3]),n.forEach(d),this.h()},h(){u(e,"class","etude-pre")},m(r,n){E(r,e,n),p(e,a)},p(r,n){n&8&&$e(a,r[3])},d(r){r&&d(e)}}}function Se(o){let e,a,r,n,t;return a=new z({props:{title:"Input",$$slots:{default:[Ce]},$$scope:{ctx:o}}}),n=new z({props:{title:"Output",$$slots:{default:[Ee]},$$scope:{ctx:o}}}),{c(){e=f("div"),j(a.$$.fragment),r=N(),j(n.$$.fragment),this.h()},l(s){e=h(s,"DIV",{class:!0});var l=g(e);P(a.$$.fragment,l),r=I(l),P(n.$$.fragment,l),l.forEach(d),this.h()},h(){u(e,"class","etude-grid")},m(s,l){E(s,e,l),R(a,e,null),p(e,r),R(n,e,null),t=!0},p(s,l){const i={};l&263&&(i.$$scope={dirty:l,ctx:s}),a.$set(i);const c={};l&264&&(c.$$scope={dirty:l,ctx:s}),n.$set(c)},i(s){t||(B(a.$$.fragment,s),B(n.$$.fragment,s),t=!0)},o(s){O(a.$$.fragment,s),O(n.$$.fragment,s),t=!1},d(s){s&&d(e),A(a),A(n)}}}function xe(o){let e,a=`rrr
bbb
rrr
rrr
bbb
rbr`,r,n,t="<li>Each line represents one carpet strip</li> <li>All strips must have the same length</li> <li>&#39;Size&#39; determines how many strips to use</li> <li>Characters represent colors (e.g., &#39;r&#39; for red)</li>";return{c(){e=f("pre"),e.textContent=a,r=N(),n=f("ul"),n.innerHTML=t,this.h()},l(s){e=h(s,"PRE",{class:!0,"data-svelte-h":!0}),T(e)!=="svelte-h3un90"&&(e.textContent=a),r=I(s),n=h(s,"UL",{class:!0,"data-svelte-h":!0}),T(n)!=="svelte-2ogyfs"&&(n.innerHTML=t),this.h()},h(){u(e,"class","etude-pre"),u(n,"class","etude-list")},m(s,l){E(s,e,l),E(s,r,l),E(s,n,l)},p:le,d(s){s&&(d(e),d(r),d(n))}}}function Te(o){let e,a=`<li><strong class="svelte-1lkeh">Maximum matches:</strong>
						Create a carpet with the most color matches between strips</li> <li><strong class="svelte-1lkeh">No matches:</strong>
						Ensure no colors match between adjacent strips</li> <li><strong class="svelte-1lkeh">Best balance:</strong>
						Find optimal balance between matches and non-matches</li>`;return{c(){e=f("ul"),e.innerHTML=a,this.h()},l(r){e=h(r,"UL",{class:!0,"data-svelte-h":!0}),T(e)!=="svelte-fgyn5y"&&(e.innerHTML=a),this.h()},h(){u(e,"class","etude-list")},m(r,n){E(r,e,n)},p:le,d(r){r&&d(e)}}}function Ne(o){let e,a,r,n,t;return a=new z({props:{title:"Input Format",$$slots:{default:[xe]},$$scope:{ctx:o}}}),n=new z({props:{title:"Matching Modes",$$slots:{default:[Te]},$$scope:{ctx:o}}}),{c(){e=f("div"),j(a.$$.fragment),r=N(),j(n.$$.fragment),this.h()},l(s){e=h(s,"DIV",{class:!0});var l=g(e);P(a.$$.fragment,l),r=I(l),P(n.$$.fragment,l),l.forEach(d),this.h()},h(){u(e,"class","etude-grid")},m(s,l){E(s,e,l),R(a,e,null),p(e,r),R(n,e,null),t=!0},p(s,l){const i={};l&256&&(i.$$scope={dirty:l,ctx:s}),a.$set(i);const c={};l&256&&(c.$$scope={dirty:l,ctx:s}),n.$set(c)},i(s){t||(B(a.$$.fragment,s),B(n.$$.fragment,s),t=!0)},o(s){O(a.$$.fragment,s),O(n.$$.fragment,s),t=!1},d(s){s&&d(e),A(a),A(n)}}}function Ie(o){let e,a,r,n;return e=new ae({props:{title:"Carpet Generator",$$slots:{default:[Se]},$$scope:{ctx:o}}}),r=new ae({props:{title:"Guide",$$slots:{default:[Ne]},$$scope:{ctx:o}}}),{c(){j(e.$$.fragment),a=N(),j(r.$$.fragment)},l(t){P(e.$$.fragment,t),a=I(t),P(r.$$.fragment,t)},m(t,s){R(e,t,s),E(t,a,s),R(r,t,s),n=!0},p(t,s){const l={};s&271&&(l.$$scope={dirty:s,ctx:t}),e.$set(l);const i={};s&256&&(i.$$scope={dirty:s,ctx:t}),r.$set(i)},i(t){n||(B(e.$$.fragment,t),B(r.$$.fragment,t),n=!0)},o(t){O(e.$$.fragment,t),O(r.$$.fragment,t),n=!1},d(t){t&&d(a),A(e,t),A(r,t)}}}function Le(o){let e,a;return e=new ve({props:{title:"Carpets",description:"Create optimal carpet designs by combining colored strips according to various aesthetic criteria specified by customers.",$$slots:{default:[Ie]},$$scope:{ctx:o}}}),{c(){j(e.$$.fragment)},l(r){P(e.$$.fragment,r)},m(r,n){R(e,r,n),a=!0},p(r,[n]){const t={};n&271&&(t.$$scope={dirty:n,ctx:r}),e.$set(t)},i(r){a||(B(e.$$.fragment,r),a=!0)},o(r){O(e.$$.fragment,r),a=!1},d(r){A(e,r)}}}function je(o,e,a){let r=`rrr
bbb
rrr
rrr
bbb
rbr`,n=3,t="-m",s="";function l(){const m=be(r,n,t);if(!m){a(3,s="Not Possible");return}const S=[];for(const M of m.carpet)S.push(M);t==="-m"&&m.score!==void 0?S.push(m.score.toString()):t==="-b"&&m.balance!==void 0&&S.push(m.balance.toString()),a(3,s=S.join(`
`))}function i(){r=this.value,a(0,r)}function c(){n=oe(this.value),a(1,n)}function _(){t=me(this),a(2,t)}return[r,n,t,s,l,i,c,_]}class Oe extends he{constructor(e){super(),de(this,e,je,Le,ue,{})}}export{Oe as component};
