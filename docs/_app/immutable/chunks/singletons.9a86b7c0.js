import{w as c}from"./index.ea488992.js";var _;const h=((_=globalThis.__sveltekit_14bncvx)==null?void 0:_.base)??"/mazes";var b;const v=((b=globalThis.__sveltekit_14bncvx)==null?void 0:b.assets)??h,k="1728002072366",A="sveltekit:snapshot",R="sveltekit:scroll",S="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function T(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function x(){return{x:pageXOffset,y:pageYOffset}}function i(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function g(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function y(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=g(e)}}function I(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,l=!n||!!o||w(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),r=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:l,target:o,download:r}}function O(e){let t=null,n=null,o=null,l=null,r=null,a=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=i(s,"preload-code")),l===null&&(l=i(s,"preload-data")),t===null&&(t=i(s,"keepfocus")),n===null&&(n=i(s,"noscroll")),r===null&&(r=i(s,"reload")),a===null&&(a=i(s,"replacestate")),s=g(s);return{preload_code:d[o??"off"],preload_data:d[l??"off"],keep_focus:t==="off"?!1:t===""?!0:null,noscroll:n==="off"?!1:n===""?!0:null,reload:r==="off"?!1:r===""?!0:null,replace_state:a==="off"?!1:a===""?!0:null}}function p(e){const t=c(e);let n=!0;function o(){n=!0,t.update(a=>a)}function l(a){n=!1,t.set(a)}function r(a){let s;return t.subscribe(u=>{(s===void 0||n&&u!==s)&&a(s=u)})}return{notify:o,set:l,subscribe:r}}function m(){const{set:e,subscribe:t}=c(!1);let n;async function o(){clearTimeout(n);try{const l=await fetch(`${v}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!l.ok)return!1;const a=(await l.json()).version!==k;return a&&(e(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:t,check:o}}function w(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}function U(e){e.client}const L={url:p({}),page:p({}),navigating:c(null),updated:m()};export{S as I,f as P,R as S,A as a,I as b,O as c,x as d,h as e,y as f,T as g,U as h,w as i,L as s};
