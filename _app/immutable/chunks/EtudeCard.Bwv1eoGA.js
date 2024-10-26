import{s as C,a as V,y as H,u as q,g as A,b as B,z as $,A as P,c as oe}from"./scheduler.B-KQ0TV-.js";import{S as j,i as w,H as ne,D as T,I as ie,a as k,d as _,J as F,g as I,h as g,k as W,l as z,y as ae,m as L,n as Q,o as R,p as U,e as E,c as N,r as v,t as J,s as D,b as Z,f as M,j as G}from"./index.BVfQ5-ZG.js";import{b as x}from"./paths.CsT_NsQD.js";import{e as ee,g as X,a as re}from"./spread.DK-xpwbU.js";import{p as ue}from"./stores.Bzoodjk0.js";/**
 * @license lucide-svelte v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function le(i,e,n){const l=i.slice();return l[11]=e[n][0],l[12]=e[n][1],l}function K(i){let e,n=[i[12]],l={};for(let t=0;t<n.length;t+=1)l=H(l,n[t]);return{c(){e=ne(i[11]),this.h()},l(t){e=ie(t,i[11],{}),k(e).forEach(_),this.h()},h(){F(e,l)},m(t,s){I(t,e,s)},p(t,s){F(e,l=X(n,[s&32&&t[12]]))},d(t){t&&_(e)}}}function se(i){let e=i[11],n,l=i[11]&&K(i);return{c(){l&&l.c(),n=T()},l(t){l&&l.l(t),n=T()},m(t,s){l&&l.m(t,s),I(t,n,s)},p(t,s){t[11]?e?C(e,t[11])?(l.d(1),l=K(t),e=t[11],l.c(),l.m(n.parentNode,n)):l.p(t,s):(l=K(t),e=t[11],l.c(),l.m(n.parentNode,n)):e&&(l.d(1),l=null,e=t[11])},d(t){t&&_(n),l&&l.d(t)}}}function fe(i){let e,n,l,t,s,u=ee(i[5]),o=[];for(let a=0;a<u.length;a+=1)o[a]=se(le(i,u,a));const c=i[10].default,r=V(c,i,i[9],null);let m=[te,i[7],{width:i[2]},{height:i[2]},{stroke:i[1]},{"stroke-width":l=i[4]?Number(i[3])*24/Number(i[2]):i[3]},{class:t=i[6]("lucide-icon","lucide",i[0]?`lucide-${i[0]}`:"",i[8].class)}],p={};for(let a=0;a<m.length;a+=1)p=H(p,m[a]);return{c(){e=ne("svg");for(let a=0;a<o.length;a+=1)o[a].c();n=T(),r&&r.c(),this.h()},l(a){e=ie(a,"svg",{width:!0,height:!0,stroke:!0,"stroke-width":!0,class:!0});var d=k(e);for(let f=0;f<o.length;f+=1)o[f].l(d);n=T(),r&&r.l(d),d.forEach(_),this.h()},h(){F(e,p)},m(a,d){I(a,e,d);for(let f=0;f<o.length;f+=1)o[f]&&o[f].m(e,null);g(e,n),r&&r.m(e,null),s=!0},p(a,[d]){if(d&32){u=ee(a[5]);let f;for(f=0;f<u.length;f+=1){const h=le(a,u,f);o[f]?o[f].p(h,d):(o[f]=se(h),o[f].c(),o[f].m(e,n))}for(;f<o.length;f+=1)o[f].d(1);o.length=u.length}r&&r.p&&(!s||d&512)&&q(r,c,a,a[9],s?B(c,a[9],d,null):A(a[9]),null),F(e,p=X(m,[te,d&128&&a[7],(!s||d&4)&&{width:a[2]},(!s||d&4)&&{height:a[2]},(!s||d&2)&&{stroke:a[1]},(!s||d&28&&l!==(l=a[4]?Number(a[3])*24/Number(a[2]):a[3]))&&{"stroke-width":l},(!s||d&257&&t!==(t=a[6]("lucide-icon","lucide",a[0]?`lucide-${a[0]}`:"",a[8].class)))&&{class:t}]))},i(a){s||(W(r,a),s=!0)},o(a){z(r,a),s=!1},d(a){a&&_(e),ae(o,a),r&&r.d(a)}}}function ce(i,e,n){const l=["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"];let t=$(e,l),{$$slots:s={},$$scope:u}=e,{name:o=void 0}=e,{color:c="currentColor"}=e,{size:r=24}=e,{strokeWidth:m=2}=e,{absoluteStrokeWidth:p=!1}=e,{iconNode:a=[]}=e;const d=(...f)=>f.filter((h,b,S)=>!!h&&S.indexOf(h)===b).join(" ");return i.$$set=f=>{n(8,e=H(H({},e),P(f))),n(7,t=$(e,l)),"name"in f&&n(0,o=f.name),"color"in f&&n(1,c=f.color),"size"in f&&n(2,r=f.size),"strokeWidth"in f&&n(3,m=f.strokeWidth),"absoluteStrokeWidth"in f&&n(4,p=f.absoluteStrokeWidth),"iconNode"in f&&n(5,a=f.iconNode),"$$scope"in f&&n(9,u=f.$$scope)},e=P(e),[o,c,r,m,p,a,d,t,e,u,s]}class he extends j{constructor(e){super(),w(this,e,ce,fe,C,{name:0,color:1,size:2,strokeWidth:3,absoluteStrokeWidth:4,iconNode:5})}}function de(i){let e;const n=i[2].default,l=V(n,i,i[3],null);return{c(){l&&l.c()},l(t){l&&l.l(t)},m(t,s){l&&l.m(t,s),e=!0},p(t,s){l&&l.p&&(!e||s&8)&&q(l,n,t,t[3],e?B(n,t[3],s,null):A(t[3]),null)},i(t){e||(W(l,t),e=!0)},o(t){z(l,t),e=!1},d(t){l&&l.d(t)}}}function _e(i){let e,n;const l=[{name:"file-text"},i[1],{iconNode:i[0]}];let t={$$slots:{default:[de]},$$scope:{ctx:i}};for(let s=0;s<l.length;s+=1)t=H(t,l[s]);return e=new he({props:t}),{c(){L(e.$$.fragment)},l(s){Q(e.$$.fragment,s)},m(s,u){R(e,s,u),n=!0},p(s,[u]){const o=u&3?X(l,[l[0],u&2&&re(s[1]),u&1&&{iconNode:s[0]}]):{};u&8&&(o.$$scope={dirty:u,ctx:s}),e.$set(o)},i(s){n||(W(e.$$.fragment,s),n=!0)},o(s){z(e.$$.fragment,s),n=!1},d(s){U(e,s)}}}function me(i,e,n){let{$$slots:l={},$$scope:t}=e;const s=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];return i.$$set=u=>{n(1,e=H(H({},e),P(u))),"$$scope"in u&&n(3,t=u.$$scope)},e=P(e),[s,e,l,t]}class ge extends j{constructor(e){super(),w(this,e,me,_e,C,{})}}function ve(i){let e,n,l,t;return n=new ge({props:{size:20}}),{c(){e=E("a"),L(n.$$.fragment),this.h()},l(s){e=N(s,"A",{href:!0,target:!0,rel:!0,class:!0,title:!0});var u=k(e);Q(n.$$.fragment,u),u.forEach(_),this.h()},h(){v(e,"href",l=`${x}/etude-specs/${i[0]}.pdf`),v(e,"target","_blank"),v(e,"rel","noopener noreferrer"),v(e,"class","spec-link svelte-1pn1m9p"),v(e,"title","View Problem Specification")},m(s,u){I(s,e,u),R(n,e,null),t=!0},p(s,[u]){(!t||u&1&&l!==(l=`${x}/etude-specs/${s[0]}.pdf`))&&v(e,"href",l)},i(s){t||(W(n.$$.fragment,s),t=!0)},o(s){z(n.$$.fragment,s),t=!1},d(s){s&&_(e),U(n)}}}function be(i,e,n){let{slug:l}=e;return i.$$set=t=>{"slug"in t&&n(0,l=t.slug)},[l]}class ke extends j{constructor(e){super(),w(this,e,be,ve,C,{slug:0})}}function pe(i){let e,n,l,t,s,u,o,c,r,m,p,a;o=new ke({props:{slug:i[2]}});const d=i[5].default,f=V(d,i,i[4],null);return{c(){e=E("div"),n=E("section"),l=E("div"),t=E("h1"),s=J(i[0]),u=D(),L(o.$$.fragment),c=D(),r=E("p"),m=J(i[1]),p=D(),f&&f.c(),this.h()},l(h){e=N(h,"DIV",{class:!0});var b=k(e);n=N(b,"SECTION",{class:!0});var S=k(n);l=N(S,"DIV",{class:!0});var O=k(l);t=N(O,"H1",{class:!0});var Y=k(t);s=Z(Y,i[0]),Y.forEach(_),u=M(O),Q(o.$$.fragment,O),O.forEach(_),c=M(S),r=N(S,"P",{class:!0});var y=k(r);m=Z(y,i[1]),y.forEach(_),S.forEach(_),p=M(b),f&&f.l(b),b.forEach(_),this.h()},h(){v(t,"class","svelte-164hg88"),v(l,"class","title-row svelte-164hg88"),v(r,"class","description svelte-164hg88"),v(n,"class","intro svelte-164hg88"),v(e,"class","etude-doc svelte-164hg88")},m(h,b){I(h,e,b),g(e,n),g(n,l),g(l,t),g(t,s),g(l,u),R(o,l,null),g(n,c),g(n,r),g(r,m),g(e,p),f&&f.m(e,null),a=!0},p(h,[b]){(!a||b&1)&&G(s,h[0]);const S={};b&4&&(S.slug=h[2]),o.$set(S),(!a||b&2)&&G(m,h[1]),f&&f.p&&(!a||b&16)&&q(f,d,h,h[4],a?B(d,h[4],b,null):A(h[4]),null)},i(h){a||(W(o.$$.fragment,h),W(f,h),a=!0)},o(h){z(o.$$.fragment,h),z(f,h),a=!1},d(h){h&&_(e),U(o),f&&f.d(h)}}}function Ee(i,e,n){let l,t;oe(i,ue,r=>n(3,t=r));let{$$slots:s={},$$scope:u}=e,{title:o}=e,{description:c}=e;return i.$$set=r=>{"title"in r&&n(0,o=r.title),"description"in r&&n(1,c=r.description),"$$scope"in r&&n(4,u=r.$$scope)},i.$$.update=()=>{i.$$.dirty&8&&n(2,l=t.url.pathname.split("/").pop())},[o,c,l,t,u,s]}class De extends j{constructor(e){super(),w(this,e,Ee,pe,C,{title:0,description:1})}}function Ne(i){let e,n,l,t,s;const u=i[2].default,o=V(u,i,i[1],null);return{c(){e=E("section"),n=E("h2"),l=J(i[0]),t=D(),o&&o.c(),this.h()},l(c){e=N(c,"SECTION",{class:!0});var r=k(e);n=N(r,"H2",{class:!0});var m=k(n);l=Z(m,i[0]),m.forEach(_),t=M(r),o&&o.l(r),r.forEach(_),this.h()},h(){v(n,"class","svelte-j8di7w"),v(e,"class","svelte-j8di7w")},m(c,r){I(c,e,r),g(e,n),g(n,l),g(e,t),o&&o.m(e,null),s=!0},p(c,[r]){(!s||r&1)&&G(l,c[0]),o&&o.p&&(!s||r&2)&&q(o,u,c,c[1],s?B(u,c[1],r,null):A(c[1]),null)},i(c){s||(W(o,c),s=!0)},o(c){z(o,c),s=!1},d(c){c&&_(e),o&&o.d(c)}}}function Se(i,e,n){let{$$slots:l={},$$scope:t}=e,{title:s}=e;return i.$$set=u=>{"title"in u&&n(0,s=u.title),"$$scope"in u&&n(1,t=u.$$scope)},[s,t,l]}class Me extends j{constructor(e){super(),w(this,e,Se,Ne,C,{title:0})}}function We(i){let e,n,l,t,s;const u=i[2].default,o=V(u,i,i[1],null);return{c(){e=E("div"),n=E("h3"),l=J(i[0]),t=D(),o&&o.c(),this.h()},l(c){e=N(c,"DIV",{class:!0});var r=k(e);n=N(r,"H3",{class:!0});var m=k(n);l=Z(m,i[0]),m.forEach(_),t=M(r),o&&o.l(r),r.forEach(_),this.h()},h(){v(n,"class","svelte-tqzeb5"),v(e,"class","etude-card svelte-tqzeb5")},m(c,r){I(c,e,r),g(e,n),g(n,l),g(e,t),o&&o.m(e,null),s=!0},p(c,[r]){(!s||r&1)&&G(l,c[0]),o&&o.p&&(!s||r&2)&&q(o,u,c,c[1],s?B(u,c[1],r,null):A(c[1]),null)},i(c){s||(W(o,c),s=!0)},o(c){z(o,c),s=!1},d(c){c&&_(e),o&&o.d(c)}}}function ze(i,e,n){let{$$slots:l={},$$scope:t}=e,{title:s}=e;return i.$$set=u=>{"title"in u&&n(0,s=u.title),"$$scope"in u&&n(1,t=u.$$scope)},[s,t,l]}class Ve extends j{constructor(e){super(),w(this,e,ze,We,C,{title:0})}}export{De as E,Me as a,Ve as b};
