import{S as L,i as S,s as D,k as f,a as I,q as A,l as p,m,h as _,c as M,r as O,n as h,b as v,C as d,D as j,u as q,E as y,F as z,G as B,H as C,y as N,z as V,A as F,I as G,J,K,g as k,d as H,B as P}from"../chunks/index.d441e422.js";import{l as T,c as R}from"../chunks/misc.aabefca0.js";const U=!0,Q="always",se=Object.freeze(Object.defineProperty({__proto__:null,prerender:U,trailingSlash:Q},Symbol.toStringTag,{value:"Module"}));function W(o){let t,n,a=o[1][o[0]]+"",l,r,s,e=o[0]==="english"?"Español":"English",i,g,$;return{c(){t=f("header"),n=f("div"),l=I(),r=f("div"),s=f("button"),i=A(e),this.h()},l(u){t=p(u,"HEADER",{class:!0});var c=m(t);n=p(c,"DIV",{class:!0});var w=m(n);w.forEach(_),l=M(c),r=p(c,"DIV",{class:!0});var E=m(r);s=p(E,"BUTTON",{class:!0});var b=m(s);i=O(b,e),b.forEach(_),E.forEach(_),c.forEach(_),this.h()},h(){h(n,"class","title svelte-ndklxn"),h(s,"class","svelte-ndklxn"),h(r,"class","about svelte-ndklxn"),h(t,"class","svelte-ndklxn")},m(u,c){v(u,t,c),d(t,n),n.innerHTML=a,d(t,l),d(t,r),d(r,s),d(s,i),g||($=j(s,"click",o[2]),g=!0)},p(u,[c]){c&1&&a!==(a=u[1][u[0]]+"")&&(n.innerHTML=a),c&1&&e!==(e=u[0]==="english"?"Español":"English")&&q(i,e)},i:y,o:y,d(u){u&&_(t),g=!1,$()}}}function X(o,t,n){let a;z(o,T,s=>n(0,a=s));const{headerTitle:l}=R;return[a,l,()=>{B(T,a=a==="english"?"spanish":"english",a)}]}class Y extends L{constructor(t){super(),S(this,t,X,W,D,{})}}function Z(o){let t,n,a,l;t=new Y({});const r=o[1].default,s=C(r,o,o[0],null);return{c(){N(t.$$.fragment),n=I(),a=f("main"),s&&s.c(),this.h()},l(e){V(t.$$.fragment,e),n=M(e),a=p(e,"MAIN",{id:!0});var i=m(a);s&&s.l(i),i.forEach(_),this.h()},h(){h(a,"id","content")},m(e,i){F(t,e,i),v(e,n,i),v(e,a,i),s&&s.m(a,null),l=!0},p(e,[i]){s&&s.p&&(!l||i&1)&&G(s,r,e,e[0],l?K(r,e[0],i,null):J(e[0]),null)},i(e){l||(k(t.$$.fragment,e),k(s,e),l=!0)},o(e){H(t.$$.fragment,e),H(s,e),l=!1},d(e){P(t,e),e&&_(n),e&&_(a),s&&s.d(e)}}}function x(o,t,n){let{$$slots:a={},$$scope:l}=t;return o.$$set=r=>{"$$scope"in r&&n(0,l=r.$$scope)},[l,a]}class ae extends L{constructor(t){super(),S(this,t,x,Z,D,{})}}export{ae as component,se as universal};