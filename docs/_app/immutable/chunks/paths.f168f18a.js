import{C as b,af as y,a6 as q,s as z,ab as k}from"./index.d7382762.js";const u=[];function A(e,a){return{subscribe:T(e,a).subscribe}}function T(e,a=b){let r;const n=new Set;function c(t){if(z(e,t)&&(e=t,r)){const i=!u.length;for(const s of n)s[1](),u.push(s,e);if(i){for(let s=0;s<u.length;s+=2)u[s][0](u[s+1]);u.length=0}}}function l(t){c(t(e))}function f(t,i=b){const s=[t,i];return n.add(s),n.size===1&&(r=a(c)||b),t(e),()=>{n.delete(s),n.size===0&&r&&(r(),r=null)}}return{set:c,update:l,subscribe:f}}function S(e,a,r){const n=!Array.isArray(e),c=n?[e]:e,l=a.length<2;return A(r,f=>{let t=!1;const i=[];let s=0,_=b;const p=()=>{if(s)return;_();const o=a(n?i[0]:i,f);l?f(o):_=k(o)?o:b},m=c.map((o,d)=>y(o,w=>{i[d]=w,s&=~(1<<d),t&&p()},()=>{s|=1<<d}));return t=!0,p(),function(){q(m),_(),t=!1}})}var g;const x=((g=globalThis.__sveltekit_15wfu1e)==null?void 0:g.base)??"/mazes";var h;const j=((h=globalThis.__sveltekit_15wfu1e)==null?void 0:h.assets)??x;export{j as a,x as b,S as d,A as r,T as w};