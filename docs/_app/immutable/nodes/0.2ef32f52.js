import{S as P,i as G,s as q,k as j,q as B,a as N,l as E,m as T,r as D,h as _,c as H,n as w,b as I,C as y,v as Y,d as O,f as Z,g as S,D as ee,E as F,y as V,z as X,A as J,B as K,F as te,G as ne,H as re,I as ie}from"../chunks/index.ee66cee5.js";import{c as A,g as se,a as oe,I as ae}from"../chunks/copy.b58e24f4.js";import{r as le}from"../chunks/index.e00b459f.js";const ce=!0,ue="always",Fe=Object.freeze(Object.defineProperty({__proto__:null,prerender:ce,trailingSlash:ue},Symbol.toStringTag,{value:"Module"}));var fe="Expected a function",R=0/0,de="[object Symbol]",me=/^\s+|\s+$/g,pe=/^[-+]0x[0-9a-f]+$/i,_e=/^0b[01]+$/i,he=/^0o[0-7]+$/i,be=parseInt,ve=typeof A=="object"&&A&&A.Object===Object&&A,ge=typeof self=="object"&&self&&self.Object===Object&&self,ye=ve||ge||Function("return this")(),$e=Object.prototype,je=$e.toString,Ee=Math.max,Te=Math.min,L=function(){return ye.Date.now()};function we(t,e,n){var i,s,a,o,r,l,h=0,d=!1,u=!1,v=!0;if(typeof t!="function")throw new TypeError(fe);e=W(e)||0,M(n)&&(d=!!n.leading,u="maxWait"in n,a=u?Ee(W(n.maxWait)||0,e):a,v="trailing"in n?!!n.trailing:v);function $(c){var g=i,k=s;return i=s=void 0,h=c,o=t.apply(k,g),o}function b(c){return h=c,r=setTimeout(m,e),d?$(c):o}function x(c){var g=c-l,k=c-h,U=e-g;return u?Te(U,a-k):U}function f(c){var g=c-l,k=c-h;return l===void 0||g>=e||g<0||u&&k>=a}function m(){var c=L();if(f(c))return p(c);r=setTimeout(m,x(c))}function p(c){return r=void 0,v&&i?$(c):(i=s=void 0,o)}function z(){r!==void 0&&clearTimeout(r),h=0,i=l=s=r=void 0}function Q(){return r===void 0?o:p(L())}function C(){var c=L(),g=f(c);if(i=arguments,s=this,l=c,g){if(r===void 0)return b(l);if(u)return r=setTimeout(m,e),$(l)}return r===void 0&&(r=setTimeout(m,e)),o}return C.cancel=z,C.flush=Q,C}function M(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function ke(t){return!!t&&typeof t=="object"}function Ie(t){return typeof t=="symbol"||ke(t)&&je.call(t)==de}function W(t){if(typeof t=="number")return t;if(Ie(t))return R;if(M(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=M(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=t.replace(me,"");var n=_e.test(t);return n||he.test(t)?be(t.slice(2),n?2:8):pe.test(t)?R:+t}var Oe=we;const Se=se(Oe),xe=le({width:0,height:0},t=>{const e=()=>t({width:window.innerWidth,height:window.innerHeight});return e(),window.addEventListener("resize",Se(e,250)),()=>{window.removeEventListener("resize",e)}});function ze(t){let e,n;return{c(){e=j("div"),n=B("ABOUT"),this.h()},l(i){e=E(i,"DIV",{class:!0});var s=T(e);n=D(s,"ABOUT"),s.forEach(_),this.h()},h(){w(e,"class","about svelte-zuw4rj")},m(i,s){I(i,e,s),y(e,n)},i:F,o:F,d(i){i&&_(e)}}}function Ae(t){let e,n,i;return n=new ae({props:{name:"menu"}}),{c(){e=j("button"),V(n.$$.fragment),this.h()},l(s){e=E(s,"BUTTON",{class:!0});var a=T(e);X(n.$$.fragment,a),a.forEach(_),this.h()},h(){w(e,"class","btn-open svelte-zuw4rj")},m(s,a){I(s,e,a),J(n,e,null),i=!0},i(s){i||(S(n.$$.fragment,s),i=!0)},o(s){O(n.$$.fragment,s),i=!1},d(s){s&&_(e),K(n)}}}function Ce(t){let e,n,i,s=t[1].split(" ").slice(0,2).join(" ").toUpperCase()+"",a,o,r=t[1].split(" ").slice(2).join(" ").toUpperCase()+"",l,h,d,u,v;const $=[Ae,ze],b=[];function x(f,m){return f[0]?0:1}return d=x(t),u=b[d]=$[d](t),{c(){e=j("header"),n=j("div"),i=j("span"),a=B(s),o=N(),l=B(r),h=N(),u.c(),this.h()},l(f){e=E(f,"HEADER",{class:!0});var m=T(e);n=E(m,"DIV",{class:!0});var p=T(n);i=E(p,"SPAN",{class:!0});var z=T(i);a=D(z,s),z.forEach(_),o=H(p),l=D(p,r),p.forEach(_),h=H(m),u.l(m),m.forEach(_),this.h()},h(){w(i,"class","svelte-zuw4rj"),w(n,"class","title svelte-zuw4rj"),w(e,"class","svelte-zuw4rj")},m(f,m){I(f,e,m),y(e,n),y(n,i),y(i,a),y(n,o),y(n,l),y(e,h),b[d].m(e,null),v=!0},p(f,[m]){let p=d;d=x(f),d!==p&&(Y(),O(b[p],1,1,()=>{b[p]=null}),Z(),u=b[d],u||(u=b[d]=$[d](f),u.c()),S(u,1),u.m(e,null))},i(f){v||(S(u),v=!0)},o(f){O(u),v=!1},d(f){f&&_(e),b[d].d()}}}function Le(t,e,n){let i,s;ee(t,xe,o=>n(2,s=o));const{title:a}=oe;return t.$$.update=()=>{t.$$.dirty&4&&n(0,i=s.width<600)},[i,a,s]}class Be extends P{constructor(e){super(),G(this,e,Le,Ce,q,{})}}function Ne(t){let e,n,i,s;e=new Be({});const a=t[1].default,o=te(a,t,t[0],null);return{c(){V(e.$$.fragment),n=N(),i=j("main"),o&&o.c(),this.h()},l(r){X(e.$$.fragment,r),n=H(r),i=E(r,"MAIN",{id:!0});var l=T(i);o&&o.l(l),l.forEach(_),this.h()},h(){w(i,"id","content")},m(r,l){J(e,r,l),I(r,n,l),I(r,i,l),o&&o.m(i,null),s=!0},p(r,[l]){o&&o.p&&(!s||l&1)&&ne(o,a,r,r[0],s?ie(a,r[0],l,null):re(r[0]),null)},i(r){s||(S(e.$$.fragment,r),S(o,r),s=!0)},o(r){O(e.$$.fragment,r),O(o,r),s=!1},d(r){K(e,r),r&&_(n),r&&_(i),o&&o.d(r)}}}function De(t,e,n){let{$$slots:i={},$$scope:s}=e;return t.$$set=a=>{"$$scope"in a&&n(0,s=a.$$scope)},[s,i]}class Re extends P{constructor(e){super(),G(this,e,De,Ne,q,{})}}export{Re as component,Fe as universal};
