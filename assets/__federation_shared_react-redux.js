import{_ as t,a as e,h as n,r,w as o,s as u}from"./index-976ea850.js";import{r as s}from"./__federation_shared_react-dom.js";import{i as a}from"./_virtual___federation_fn_import-d1f97fc6.js";let c=function(t){t()};const i=()=>c,{createContext:p}=await a("react"),l=p(null),{useContext:f}=await a("react");function d(){return f(l)}const m=()=>{throw new Error("uSES not initialized!")},{useContext:S,useDebugValue:b}=await a("react");let w=m;const h=(t,e)=>t===e;function y(t=l){const e=t===l?d:()=>S(t);return function(t,n=h){const{store:r,subscription:o,getServerState:u}=e(),s=w(o.addNestedSub,r.getState,u||r.getState,t,n);return b(s),s}}const P=y(),g=["initMapStateToProps","initMapDispatchToProps","initMergeProps"];function v(t,e,n,r,{areStatesEqual:o,areOwnPropsEqual:u,areStatePropsEqual:s}){let a,c,i,p,l,f=!1;function d(f,d){const m=!u(d,c),S=!o(f,a,d,c);return a=f,c=d,m&&S?(i=t(a,c),e.dependsOnOwnProps&&(p=e(r,c)),l=n(i,p,c),l):m?(t.dependsOnOwnProps&&(i=t(a,c)),e.dependsOnOwnProps&&(p=e(r,c)),l=n(i,p,c),l):S?function(){const e=t(a,c),r=!s(e,i);return i=e,r&&(l=n(i,p,c)),l}():l}return function(o,u){return f?d(o,u):(a=o,c=u,i=t(a,c),p=e(r,c),l=n(i,p,c),f=!0,l)}}function O(t){return function(e){const n=t(e);function r(){return n}return r.dependsOnOwnProps=!1,r}}function x(t){return t.dependsOnOwnProps?Boolean(t.dependsOnOwnProps):1!==t.length}function E(t,e){return function(e,{displayName:n}){const r=function(t,e){return r.dependsOnOwnProps?r.mapToProps(t,e):r.mapToProps(t,void 0)};return r.dependsOnOwnProps=!0,r.mapToProps=function(e,n){r.mapToProps=t,r.dependsOnOwnProps=x(t);let o=r(e,n);return"function"==typeof o&&(r.mapToProps=o,r.dependsOnOwnProps=x(o),o=r(e,n)),o},r}}function C(t,e){return(n,r)=>{throw new Error(`Invalid value of type ${typeof t} for ${e} argument when connecting component ${r.wrappedComponentName}.`)}}function N(t,n,r){return e({},r,t,n)}const M={notify(){},get:()=>[]};function T(t,e){let n,r=M;function o(){s.onStateChange&&s.onStateChange()}function u(){n||(n=e?e.addNestedSub(o):t.subscribe(o),r=function(){const t=i();let e=null,n=null;return{clear(){e=null,n=null},notify(){t((()=>{let t=e;for(;t;)t.callback(),t=t.next}))},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(t){let r=!0,o=n={callback:t,next:null,prev:n};return o.prev?o.prev.next=o:e=o,function(){r&&null!==e&&(r=!1,o.next?o.next.prev=o.prev:n=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}())}const s={addNestedSub:function(t){return u(),r.subscribe(t)},notifyNestedSubs:function(){r.notify()},handleChangeWrapper:o,isSubscribed:function(){return Boolean(n)},trySubscribe:u,tryUnsubscribe:function(){n&&(n(),n=void 0,r.clear(),r=M)},getListeners:()=>r};return s}const{useEffect:_,useLayoutEffect:q}=await a("react"),j=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement)?q:_;function R(t,e){return t===e?0!==t||0!==e||1/t==1/e:t!=t&&e!=e}function B(t,e){if(R(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;const n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(let o=0;o<n.length;o++)if(!Object.prototype.hasOwnProperty.call(e,n[o])||!R(t[n[o]],e[n[o]]))return!1;return!0}const k=["reactReduxForwardedRef"],D=await a("react"),{useContext:U,useMemo:W,useRef:$}=D;let F=m;const L=[null,null];function z(t,e,n,r,o,u){t.current=r,n.current=!1,o.current&&(o.current=null,u())}function H(t,e){return t===e}function I(o,u,s,{pure:a,areStatesEqual:c=H,areOwnPropsEqual:i=B,areStatePropsEqual:p=B,areMergedPropsEqual:f=B,forwardRef:d=!1,context:m=l}={}){const S=m,b=function(t){return t?"function"==typeof t?E(t):C(t,"mapStateToProps"):O((()=>({})))}(o),w=function(t){return t&&"object"==typeof t?O((e=>function(t,e){const n={};for(const r in t){const o=t[r];"function"==typeof o&&(n[r]=(...t)=>e(o(...t)))}return n}(t,e))):t?"function"==typeof t?E(t):C(t,"mapDispatchToProps"):O((t=>({dispatch:t})))}(u),h=function(t){return t?"function"==typeof t?function(t){return function(e,{displayName:n,areMergedPropsEqual:r}){let o,u=!1;return function(e,n,s){const a=t(e,n,s);return u?r(a,o)||(o=a):(u=!0,o=a),o}}}(t):C(t,"mergeProps"):()=>N}(s),y=Boolean(o);return o=>{const u=o.displayName||o.name||"Component",s=`Connect(${u})`,a={shouldHandleStateChanges:y,displayName:s,wrappedComponentName:u,WrappedComponent:o,initMapStateToProps:b,initMapDispatchToProps:w,initMergeProps:h,areStatesEqual:c,areStatePropsEqual:p,areOwnPropsEqual:i,areMergedPropsEqual:f};function l(n){const[u,s,c]=W((()=>{const{reactReduxForwardedRef:e}=n,r=t(n,k);return[n.context,e,r]}),[n]),i=W((()=>u&&u.Consumer&&r.isContextConsumer(D.createElement(u.Consumer,null))?u:S),[u,S]),p=U(i),l=Boolean(n.store)&&Boolean(n.store.getState)&&Boolean(n.store.dispatch),f=Boolean(p)&&Boolean(p.store),d=l?n.store:p.store,m=f?p.getServerState:d.getState,b=W((()=>function(e,n){let{initMapStateToProps:r,initMapDispatchToProps:o,initMergeProps:u}=n,s=t(n,g);return v(r(e,s),o(e,s),u(e,s),e,s)}(d.dispatch,a)),[d]),[w,h]=W((()=>{if(!y)return L;const t=T(d,l?void 0:p.subscription),e=t.notifyNestedSubs.bind(t);return[t,e]}),[d,l,p]),P=W((()=>l?p:e({},p,{subscription:w})),[l,p,w]),O=$(),x=$(c),E=$(),C=$(!1);$(!1);const N=$(!1),M=$();j((()=>(N.current=!0,()=>{N.current=!1})),[]);const _=W((()=>()=>E.current&&c===x.current?E.current:b(d.getState(),c)),[d,c]),q=W((()=>t=>w?function(t,e,n,r,o,u,s,a,c,i,p){if(!t)return()=>{};let l=!1,f=null;const d=()=>{if(l||!a.current)return;const t=e.getState();let n,d;try{n=r(t,o.current)}catch(m){d=m,f=m}d||(f=null),n===u.current?s.current||i():(u.current=n,c.current=n,s.current=!0,p())};return n.onStateChange=d,n.trySubscribe(),d(),()=>{if(l=!0,n.tryUnsubscribe(),n.onStateChange=null,f)throw f}}(y,d,w,b,x,O,C,N,E,h,t):()=>{}),[w]);var R,B,H;let I;R=z,B=[x,O,C,c,E,h],j((()=>R(...B)),H);try{I=F(q,_,m?()=>b(m(),c):_)}catch(A){throw M.current&&(A.message+=`\nThe error may be correlated with this previous error:\n${M.current.stack}\n\n`),A}j((()=>{M.current=void 0,E.current=void 0,O.current=I}));const V=W((()=>D.createElement(o,e({},I,{ref:s}))),[s,o,I]);return W((()=>y?D.createElement(i.Provider,{value:P},V):V),[i,V,P])}const m=D.memo(l);if(m.WrappedComponent=o,m.displayName=l.displayName=s,d){const t=D.forwardRef((function(t,n){return D.createElement(m,e({},t,{reactReduxForwardedRef:n}))}));return t.displayName=s,t.WrappedComponent=o,n(t,o)}return n(m,o)}}const V=await a("react"),{useMemo:A}=V;function G({store:t,context:e,children:n,serverState:r}){const o=A((()=>{const e=T(t);return{store:t,subscription:e,getServerState:r?()=>r:void 0}}),[t,r]),u=A((()=>t.getState()),[t]);j((()=>{const{subscription:e}=o;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),u!==t.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}}),[o,u]);const s=e||l;return V.createElement(s.Provider,{value:o},n)}const{useContext:J}=await a("react");function K(t=l){const e=t===l?d:()=>J(t);return function(){const{store:t}=e();return t}}const Q=K();function X(t=l){const e=t===l?Q:K(t);return function(){return e().dispatch}}const Y=X();var Z,tt;Z=o.useSyncExternalStoreWithSelector,w=Z,(t=>{F=t})(u.useSyncExternalStore),tt=s.unstable_batchedUpdates,c=tt;const et=s.unstable_batchedUpdates;export{G as Provider,l as ReactReduxContext,et as batch,I as connect,X as createDispatchHook,y as createSelectorHook,K as createStoreHook,B as shallowEqual,Y as useDispatch,P as useSelector,Q as useStore};