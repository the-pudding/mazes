function k(){}const lt=t=>t;function At(t,e){for(const n in e)t[n]=e[n];return t}function at(t){return t()}function it(){return Object.create(null)}function T(t){t.forEach(at)}function P(t){return typeof t=="function"}function re(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let R;function oe(t,e){return R||(R=document.createElement("a")),R.href=e,t===R.href}function Mt(t){return Object.keys(t).length===0}function ut(t,...e){if(t==null)return k;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ce(t){let e;return ut(t,n=>e=n)(),e}function le(t,e,n){t.$$.on_destroy.push(ut(e,n))}function ae(t,e,n,i){if(t){const s=ft(t,e,n,i);return t[0](s)}}function ft(t,e,n,i){return t[1]&&i?At(n.ctx.slice(),t[1](i(e))):n.ctx}function ue(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)c[o]=e.dirty[o]|s[o];return c}return e.dirty|s}return e.dirty}function fe(t,e,n,i,s,c){if(s){const r=ft(e,n,i,c);t.p(r,s)}}function de(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function _e(t){return t??""}function he(t,e,n){return t.set(n),e}function me(t){return t&&P(t.destroy)?t.destroy:k}const dt=typeof window<"u";let _t=dt?()=>window.performance.now():()=>Date.now(),tt=dt?t=>requestAnimationFrame(t):k;const M=new Set;function ht(t){M.forEach(e=>{e.c(t)||(M.delete(e),e.f())}),M.size!==0&&tt(ht)}function mt(t){let e;return M.size===0&&tt(ht),{promise:new Promise(n=>{M.add(e={c:t,f:n})}),abort(){M.delete(e)}}}const St=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;"WeakMap"in St;let I=!1;function Ct(){I=!0}function jt(){I=!1}function Lt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function Ot(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let a=0;a<e.length;a++){const d=e[a];d.claim_order!==void 0&&l.push(d)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let l=0;l<e.length;l++){const a=e[l].claim_order,d=(s>0&&e[n[s]].claim_order<=a?s+1:Lt(1,s,h=>e[n[h]].claim_order,a))-1;i[l]=n[d]+1;const f=d+1;n[f]=l,s=Math.max(f,s)}const c=[],r=[];let o=e.length-1;for(let l=n[s]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);c.reverse(),r.sort((l,a)=>l.claim_order-a.claim_order);for(let l=0,a=0;l<r.length;l++){for(;a<c.length&&r[l].claim_order>=c[a].claim_order;)a++;const d=a<c.length?c[a]:null;t.insertBefore(r[l],d)}}function pt(t,e){t.appendChild(e)}function yt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Dt(t){const e=J("style");return Ht(yt(t),e),e.sheet}function Ht(t,e){return pt(t.head||t,e),e.sheet}function Pt(t,e){if(I){for(Ot(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function qt(t,e,n){t.insertBefore(e,n||null)}function zt(t,e,n){I&&!n?Pt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function C(t){t.parentNode&&t.parentNode.removeChild(t)}function pe(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function J(t){return document.createElement(t)}function gt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function et(t){return document.createTextNode(t)}function ye(){return et(" ")}function ge(){return et("")}function st(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function nt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const Rt=["width","height"];function Wt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&Rt.indexOf(i)===-1?t[i]=e[i]:nt(t,i,e[i])}function we(t,e){for(const n in e)nt(t,n,e[n])}function Bt(t,e){Object.keys(e).forEach(n=>{Ft(t,n,e[n])})}function Ft(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:nt(t,e,n)}function be(t){return/-/.test(t)?Bt:Wt}function Gt(t){return Array.from(t.childNodes)}function wt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function bt(t,e,n,i,s=!1){wt(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const l=n(o);return l===void 0?t.splice(r,1):t[r]=l,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const l=n(o);return l===void 0?t.splice(r,1):t[r]=l,s?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function xt(t,e,n,i){return bt(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||c.push(o.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function xe(t,e,n){return xt(t,e,n,J)}function $e(t,e,n){return xt(t,e,n,gt)}function It(t,e){return bt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>et(e),!0)}function ve(t){return It(t," ")}function rt(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function Ee(t,e){const n=rt(t,"HTML_TAG_START",0),i=rt(t,"HTML_TAG_END",n);if(n===i)return new ot(void 0,e);wt(t);const s=t.splice(n,i-n+1);C(s[0]),C(s[s.length-1]);const c=s.slice(1,s.length-1);for(const r of c)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new ot(c,e)}function ke(t,e){e=""+e,t.data!==e&&(t.data=e)}function Te(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ne(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Ae(t){const e=t.querySelector(":checked");return e&&e.__value}let W;function Jt(){if(W===void 0){W=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{W=!0}}return W}function Me(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=J("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=Jt();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=st(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=st(i.contentWindow,"resize",e),e()}),pt(t,i),()=>{(s||c&&i.contentWindow)&&c(),C(i)}}function Se(t,e,n){t.classList[n?"add":"remove"](e)}function Kt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function Ce(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(s)):c===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class Qt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=gt(n.nodeName):this.e=J(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)qt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(C)}}class ot extends Qt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)zt(this.t,this.n[n],e)}}function je(t,e){return new t(e)}const F=new Map;let G=0;function Ut(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Vt(t,e){const n={stylesheet:Dt(e),rules:{}};return F.set(t,n),n}function V(t,e,n,i,s,c,r,o=0){const l=16.666/i;let a=`{
`;for(let y=0;y<=1;y+=l){const g=e+(n-e)*c(y);a+=y*100+`%{${r(g,1-g)}}
`}const d=a+`100% {${r(n,1-n)}}
}`,f=`__svelte_${Ut(d)}_${o}`,h=yt(t),{stylesheet:u,rules:_}=F.get(h)||Vt(h,t);_[f]||(_[f]=!0,u.insertRule(`@keyframes ${f} ${d}`,u.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${f} ${i}ms linear ${s}ms 1 both`,G+=1,f}function X(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),G-=s,G||Xt())}function Xt(){tt(()=>{G||(F.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&C(e)}),F.clear())})}let D;function L(t){D=t}function K(){if(!D)throw new Error("Function called outside component initialization");return D}function Le(t){K().$$.on_mount.push(t)}function Oe(t){K().$$.after_update.push(t)}function De(t,e){return K().$$.context.set(t,e),e}function He(t){return K().$$.context.get(t)}const A=[],ct=[];let S=[];const Y=[],$t=Promise.resolve();let Z=!1;function vt(){Z||(Z=!0,$t.then(Et))}function Pe(){return vt(),$t}function H(t){S.push(t)}function qe(t){Y.push(t)}const U=new Set;let N=0;function Et(){if(N!==0)return;const t=D;do{try{for(;N<A.length;){const e=A[N];N++,L(e),Yt(e.$$)}}catch(e){throw A.length=0,N=0,e}for(L(null),A.length=0,N=0;ct.length;)ct.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];U.has(n)||(U.add(n),n())}S.length=0}while(A.length);for(;Y.length;)Y.pop()();Z=!1,U.clear(),L(t)}function Yt(t){if(t.fragment!==null){t.update(),T(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}function Zt(t){const e=[],n=[];S.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),S=e}let j;function kt(){return j||(j=Promise.resolve(),j.then(()=>{j=null})),j}function O(t,e,n){t.dispatchEvent(Kt(`${e?"intro":"outro"}${n}`))}const B=new Set;let E;function ze(){E={r:0,c:[],p:E}}function Re(){E.r||T(E.c),E=E.p}function Tt(t,e){t&&t.i&&(B.delete(t),t.i(e))}function te(t,e,n,i){if(t&&t.o){if(B.has(t))return;B.add(t),E.c.push(()=>{B.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Nt={duration:0};function We(t,e,n){const i={direction:"in"};let s=e(t,n,i),c=!1,r,o,l=0;function a(){r&&X(t,r)}function d(){const{delay:h=0,duration:u=300,easing:_=lt,tick:p=k,css:y}=s||Nt;y&&(r=V(t,0,1,u,h,_,y,l++)),p(0,1);const g=_t()+h,v=g+u;o&&o.abort(),c=!0,H(()=>O(t,!0,"start")),o=mt(w=>{if(c){if(w>=v)return p(1,0),O(t,!0,"end"),a(),c=!1;if(w>=g){const b=_((w-g)/u);p(b,1-b)}}return c})}let f=!1;return{start(){f||(f=!0,X(t),P(s)?(s=s(i),kt().then(d)):d())},invalidate(){f=!1},end(){c&&(a(),c=!1)}}}function Be(t,e,n,i){const s={direction:"both"};let c=e(t,n,s),r=i?0:1,o=null,l=null,a=null;function d(){a&&X(t,a)}function f(u,_){const p=u.b-r;return _*=Math.abs(p),{a:r,b:u.b,d:p,duration:_,start:u.start,end:u.start+_,group:u.group}}function h(u){const{delay:_=0,duration:p=300,easing:y=lt,tick:g=k,css:v}=c||Nt,w={start:_t()+_,b:u};u||(w.group=E,E.r+=1),o||l?l=w:(v&&(d(),a=V(t,r,u,p,_,y,v)),u&&g(0,1),o=f(w,p),H(()=>O(t,u,"start")),mt(b=>{if(l&&b>l.start&&(o=f(l,p),l=null,O(t,o.b,"start"),v&&(d(),a=V(t,r,o.b,o.duration,0,y,c.css))),o){if(b>=o.end)g(r=o.b,1-r),O(t,o.b,"end"),l||(o.b?d():--o.group.r||T(o.group.c)),o=null;else if(b>=o.start){const q=b-o.start;r=o.a+o.d*y(q/o.duration),g(r,1-r)}}return!!(o||l)}))}return{run(u){P(c)?kt().then(()=>{c=c(s),h(u)}):h(u)},end(){d(),o=l=null}}}function Fe(t,e){te(t,1,1,()=>{e.delete(t.key)})}function Ge(t,e,n,i,s,c,r,o,l,a,d,f){let h=t.length,u=c.length,_=h;const p={};for(;_--;)p[t[_].key]=_;const y=[],g=new Map,v=new Map,w=[];for(_=u;_--;){const m=f(s,c,_),x=n(m);let $=r.get(x);$?i&&w.push(()=>$.p(m,e)):($=a(x,m),$.c()),g.set(x,y[_]=$),x in p&&v.set(x,Math.abs(_-p[x]))}const b=new Set,q=new Set;function Q(m){Tt(m,1),m.m(o,d),r.set(m.key,m),d=m.first,u--}for(;h&&u;){const m=y[u-1],x=t[h-1],$=m.key,z=x.key;m===x?(d=m.first,h--,u--):g.has(z)?!r.has($)||b.has($)?Q(m):q.has(z)?h--:v.get($)>v.get(z)?(q.add($),Q(m)):(b.add(z),h--):(l(x,r),h--)}for(;h--;){const m=t[h];g.has(m.key)||l(m,r)}for(;u;)Q(y[u-1]);return T(w),y}function Ie(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],o=e[c];if(o){for(const l in r)l in o||(i[l]=1);for(const l in o)s[l]||(n[l]=o[l],s[l]=1);t[c]=o}else for(const l in r)s[l]=1}for(const r in i)r in n||(n[r]=void 0);return n}const ee=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...ee];function Je(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Ke(t){t&&t.c()}function Qe(t,e){t&&t.l(e)}function ne(t,e,n,i){const{fragment:s,after_update:c}=t.$$;s&&s.m(e,n),i||H(()=>{const r=t.$$.on_mount.map(at).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...r):T(r),t.$$.on_mount=[]}),c.forEach(H)}function ie(t,e){const n=t.$$;n.fragment!==null&&(Zt(n.after_update),T(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function se(t,e){t.$$.dirty[0]===-1&&(A.push(t),vt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ue(t,e,n,i,s,c,r,o=[-1]){const l=D;L(t);const a=t.$$={fragment:null,ctx:[],props:c,update:k,not_equal:s,bound:it(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:it(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};r&&r(a.root);let d=!1;if(a.ctx=n?n(t,e.props||{},(f,h,...u)=>{const _=u.length?u[0]:h;return a.ctx&&s(a.ctx[f],a.ctx[f]=_)&&(!a.skip_bound&&a.bound[f]&&a.bound[f](_),d&&se(t,f)),h}):[],a.update(),d=!0,T(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){Ct();const f=Gt(e.target);a.fragment&&a.fragment.l(f),f.forEach(C)}else a.fragment&&a.fragment.c();e.intro&&Tt(t.$$.fragment),ne(t,e.target,e.anchor,e.customElement),jt(),Et()}L(l)}class Ve{$destroy(){ie(this,1),this.$destroy=k}$on(e,n){if(!P(n))return k;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!Mt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Me as $,ne as A,ie as B,Pt as C,le as D,k as E,ae as F,fe as G,de as H,ue as I,Ce as J,pe as K,gt as L,$e as M,Se as N,lt as O,He as P,H as Q,Be as R,Ve as S,At as T,_t as U,mt as V,st as W,he as X,We as Y,_e as Z,P as _,ye as a,De as a0,ce as a1,Je as a2,oe as a3,qe as a4,me as a5,T as a6,be as a7,Ne as a8,Ae as a9,ot as aa,Ee as ab,Ge as ac,Fe as ad,we as ae,Ie as af,ut as ag,zt as b,ve as c,te as d,ge as e,Re as f,Tt as g,C as h,Ue as i,Oe as j,J as k,xe as l,Gt as m,nt as n,Le as o,Te as p,et as q,It as r,re as s,Pe as t,ke as u,ze as v,ct as w,je as x,Ke as y,Qe as z};
