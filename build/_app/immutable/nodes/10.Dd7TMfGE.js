import{s as V,r as A,n as D}from"../chunks/scheduler.B-KQ0TV-.js";import{S as F,i as O,m as g,n as v,o as _,k as w,l as P,p as E,s as q,f as x,g as d,d as c,e as p,c as $,a as C,r as f,h as m,u as T,v as L,w as N,t as U,b as j,j as J}from"../chunks/index.BVfQ5-ZG.js";import{E as K,a as R,b as M}from"../chunks/EtudeCard.CIRAnrgG.js";function W(a,t){return a.length!==t.length?!1:a.every((e,n)=>e===t[n])}function B(a,t){if(a.length<1||t>=a.length)return[];const e=[...a];for(let s=t;s>=0;s--)e[s]-=1;e.push(t+1),e.sort((s,i)=>i-s);const n=e.findIndex(s=>s===0);return n===-1?e:e.slice(0,n)}function G(a){const t=[],e=[];for(let n=0;n<a.length-1;n++)e.push(a[n]-a[n+1]);e.push(a[a.length-1]);for(let n=0;n<e.length;n++)if(e[n]!==0){const s=B(a,n);t.push(s)}return t}function k(a){return a.reduce((t,e)=>t+e,0)}function X(a,t){const e=new Set,n=[{partition:a,moves:0,steps:[a]}];if(k(a)!==k(t))return null;for(;n.length>0;){const s=n.shift();if(W(s.partition,t))return{count:s.moves,steps:s.steps};const i=JSON.stringify(s.partition);if(e.has(i))continue;e.add(i);const r=G(s.partition);for(const l of r){const o=JSON.stringify(l);if(!e.has(o)){const u=[...s.steps,l];n.push({partition:l,moves:s.moves+1,steps:u})}}}return null}function Z(a){const t=[];let e=[];const n=a.split(`
`);for(const s of n){const i=s.trim();i===""||i.startsWith("#")||(i.startsWith("-")?(e.length===2&&t.push({basePartition:I(e[0]),targetPartition:I(e[1])}),e=[]):e.push(i))}return e.length===2&&t.push({basePartition:I(e[0]),targetPartition:I(e[1])}),t}function I(a){return a.trim().split(/\s+/).map(t=>parseInt(t,10)).filter(t=>!isNaN(t)).sort((t,e)=>e-t)}function S(a){return a.join(" ")}function z(a){let t,e,n,s,i,r="Find Path",l,o;return{c(){t=p("div"),e=p("textarea"),n=q(),s=p("div"),i=p("button"),i.textContent=r,this.h()},l(u){t=$(u,"DIV",{class:!0});var h=C(t);e=$(h,"TEXTAREA",{class:!0,placeholder:!0,rows:!0,spellcheck:!0}),C(e).forEach(c),n=x(h),s=$(h,"DIV",{class:!0});var b=C(s);i=$(b,"BUTTON",{class:!0,"data-svelte-h":!0}),T(i)!=="svelte-aptwe8"&&(i.textContent=r),b.forEach(c),h.forEach(c),this.h()},h(){f(e,"class","input-field svelte-wcnq6e"),f(e,"placeholder","Enter partitions..."),f(e,"rows","10"),f(e,"spellcheck","false"),f(i,"class","game-button svelte-wcnq6e"),f(s,"class","button-container svelte-wcnq6e"),f(t,"class","control-section svelte-wcnq6e")},m(u,h){d(u,t,h),m(t,e),L(e,a[0]),m(t,n),m(t,s),m(s,i),l||(o=[N(e,"input",a[3]),N(i,"click",a[2])],l=!0)},p(u,h){h&1&&L(e,u[0])},d(u){u&&c(t),l=!1,A(o)}}}function Q(a){let t,e;return{c(){t=p("pre"),e=U(a[1]),this.h()},l(n){t=$(n,"PRE",{class:!0});var s=C(t);e=j(s,a[1]),s.forEach(c),this.h()},h(){f(t,"class","etude-pre")},m(n,s){d(n,t,s),m(t,e)},p(n,s){s&2&&J(e,n[1])},d(n){n&&c(t)}}}function Y(a){let t,e,n,s,i;return e=new M({props:{title:"Input",$$slots:{default:[z]},$$scope:{ctx:a}}}),s=new M({props:{title:"Output",$$slots:{default:[Q]},$$scope:{ctx:a}}}),{c(){t=p("div"),g(e.$$.fragment),n=q(),g(s.$$.fragment),this.h()},l(r){t=$(r,"DIV",{class:!0});var l=C(t);v(e.$$.fragment,l),n=x(l),v(s.$$.fragment,l),l.forEach(c),this.h()},h(){f(t,"class","etude-grid")},m(r,l){d(r,t,l),_(e,t,null),m(t,n),_(s,t,null),i=!0},p(r,l){const o={};l&17&&(o.$$scope={dirty:l,ctx:r}),e.$set(o);const u={};l&18&&(u.$$scope={dirty:l,ctx:r}),s.$set(u)},i(r){i||(w(e.$$.fragment,r),w(s.$$.fragment,r),i=!0)},o(r){P(e.$$.fragment,r),P(s.$$.fragment,r),i=!1},d(r){r&&c(t),E(e),E(s)}}}function y(a){let t,e=`1 1 1
3
---
2 2
1 1 1 1`,n,s,i="<li>First line: Initial partition</li> <li>Second line: Target partition</li> <li>Use &quot;---&quot; to separate scenarios</li> <li>Numbers must be in descending order</li>";return{c(){t=p("pre"),t.textContent=e,n=q(),s=p("ul"),s.innerHTML=i,this.h()},l(r){t=$(r,"PRE",{class:!0,"data-svelte-h":!0}),T(t)!=="svelte-1bshk51"&&(t.textContent=e),n=x(r),s=$(r,"UL",{class:!0,"data-svelte-h":!0}),T(s)!=="svelte-1pg8mlu"&&(s.innerHTML=i),this.h()},h(){f(t,"class","etude-pre"),f(s,"class","etude-list")},m(r,l){d(r,t,l),d(r,n,l),d(r,s,l)},p:D,d(r){r&&(c(t),c(n),c(s))}}}function tt(a){let t,e="Valid Moves",n,s,i="<li>Select any column from the partition</li> <li>Remove the selected column</li> <li>Add a new row with the same length</li> <li>Partitions must sum to the same value</li> <li>All intermediate steps must be valid partitions</li>";return{c(){t=p("h4"),t.textContent=e,n=q(),s=p("ul"),s.innerHTML=i,this.h()},l(r){t=$(r,"H4",{class:!0,"data-svelte-h":!0}),T(t)!=="svelte-ip3l92"&&(t.textContent=e),n=x(r),s=$(r,"UL",{class:!0,"data-svelte-h":!0}),T(s)!=="svelte-1fw9q0f"&&(s.innerHTML=i),this.h()},h(){f(t,"class","svelte-wcnq6e"),f(s,"class","etude-list")},m(r,l){d(r,t,l),d(r,n,l),d(r,s,l)},p:D,d(r){r&&(c(t),c(n),c(s))}}}function et(a){let t,e,n,s,i;return e=new M({props:{title:"Input Format",$$slots:{default:[y]},$$scope:{ctx:a}}}),s=new M({props:{title:"Rules",$$slots:{default:[tt]},$$scope:{ctx:a}}}),{c(){t=p("div"),g(e.$$.fragment),n=q(),g(s.$$.fragment),this.h()},l(r){t=$(r,"DIV",{class:!0});var l=C(t);v(e.$$.fragment,l),n=x(l),v(s.$$.fragment,l),l.forEach(c),this.h()},h(){f(t,"class","etude-grid")},m(r,l){d(r,t,l),_(e,t,null),m(t,n),_(s,t,null),i=!0},p(r,l){const o={};l&16&&(o.$$scope={dirty:l,ctx:r}),e.$set(o);const u={};l&16&&(u.$$scope={dirty:l,ctx:r}),s.$set(u)},i(r){i||(w(e.$$.fragment,r),w(s.$$.fragment,r),i=!0)},o(r){P(e.$$.fragment,r),P(s.$$.fragment,r),i=!1},d(r){r&&c(t),E(e),E(s)}}}function st(a){let t,e,n,s;return t=new R({props:{title:"Partition Pathfinder",$$slots:{default:[Y]},$$scope:{ctx:a}}}),n=new R({props:{title:"Guide",$$slots:{default:[et]},$$scope:{ctx:a}}}),{c(){g(t.$$.fragment),e=q(),g(n.$$.fragment)},l(i){v(t.$$.fragment,i),e=x(i),v(n.$$.fragment,i)},m(i,r){_(t,i,r),d(i,e,r),_(n,i,r),s=!0},p(i,r){const l={};r&19&&(l.$$scope={dirty:r,ctx:i}),t.$set(l);const o={};r&16&&(o.$$scope={dirty:r,ctx:i}),n.$set(o)},i(i){s||(w(t.$$.fragment,i),w(n.$$.fragment,i),s=!0)},o(i){P(t.$$.fragment,i),P(n.$$.fragment,i),s=!1},d(i){i&&c(e),E(t,i),E(n,i)}}}function nt(a){let t,e;return t=new K({props:{title:"Pathfinding Partitions",description:"Find the shortest sequence of transformations to change one integer partition into another using column to row moves.",$$slots:{default:[st]},$$scope:{ctx:a}}}),{c(){g(t.$$.fragment)},l(n){v(t.$$.fragment,n)},m(n,s){_(t,n,s),e=!0},p(n,[s]){const i={};s&19&&(i.$$scope={dirty:s,ctx:n}),t.$set(i)},i(n){e||(w(t.$$.fragment,n),e=!0)},o(n){P(t.$$.fragment,n),e=!1},d(n){E(t,n)}}}function rt(a,t,e){let n=`1 1 1
3
---
2 2
1 1 1 1`,s="";function i(){const l=Z(n),o=[];l.forEach((u,h)=>{const b=X(u.basePartition,u.targetPartition);b?(o.push(`# Moves required: ${b.count}`),b.steps.forEach(H=>{o.push(S(H))})):(o.push("# No solution possible"),o.push(S(u.basePartition)),o.push(S(u.targetPartition))),h<l.length-1&&o.push("---")}),e(1,s=o.join(`
`))}function r(){n=this.value,e(0,n)}return[n,s,i,r]}class ot extends F{constructor(t){super(),O(this,t,rt,nt,V,{})}}export{ot as component};
