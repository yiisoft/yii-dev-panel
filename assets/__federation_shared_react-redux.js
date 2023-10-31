import{_ as e,a as t,h as n,r,w as o,s as u}from"./index-976ea850.js";import{r as s}from"./__federation_shared_react-dom.js";import{i as a}from"./_virtual___federation_fn_import-d1f97fc6.js";let c=function(e){e()};const i=()=>c,p=await a("react"),l=Symbol.for("react-redux-context"),f="undefined"!=typeof globalThis?globalThis:{};function d(){var e;if(!p.createContext)return{};const t=null!=(e=f[l])?e:f[l]=new Map;let n=t.get(p.createContext);return n||(n=p.createContext(null),t.set(p.createContext,n)),n}const m=d(),{useContext:b}=await a("react");function h(e=m){return function(){return b(e)}}const S=h(),y=()=>{throw new Error("uSES not initialized!")},{useCallback:w,useDebugValue:g,useRef:P}=await a("react");let C=y;const v=(e,t)=>e===t;function x(e=m){const t=e===m?S:h(e);return function(e,n={}){const{equalityFn:r=v,stabilityCheck:o,noopCheck:u}="function"==typeof n?{equalityFn:n}:n,{store:s,subscription:a,getServerState:c,stabilityCheck:i,noopCheck:p}=t();P(!0);const l=w({[e.name]:t=>e(t)}[e.name],[e,i,o]),f=C(a.addNestedSub,s.getState,c||s.getState,l,r);return g(f),f}}const O=x(),E=["initMapStateToProps","initMapDispatchToProps","initMergeProps"];function M(e,t,n,r,{areStatesEqual:o,areOwnPropsEqual:u,areStatePropsEqual:s}){let a,c,i,p,l,f=!1;function d(f,d){const m=!u(d,c),b=!o(f,a,d,c);return a=f,c=d,m&&b?(i=e(a,c),t.dependsOnOwnProps&&(p=t(r,c)),l=n(i,p,c),l):m?(e.dependsOnOwnProps&&(i=e(a,c)),t.dependsOnOwnProps&&(p=t(r,c)),l=n(i,p,c),l):b?function(){const t=e(a,c),r=!s(t,i);return i=t,r&&(l=n(i,p,c)),l}():l}return function(o,u){return f?d(o,u):(a=o,c=u,i=e(a,c),p=t(r,c),l=n(i,p,c),f=!0,l)}}function N(e){return function(t){const n=e(t);function r(){return n}return r.dependsOnOwnProps=!1,r}}function R(e){return e.dependsOnOwnProps?Boolean(e.dependsOnOwnProps):1!==e.length}function T(e,t){return function(t,{displayName:n}){const r=function(e,t){return r.dependsOnOwnProps?r.mapToProps(e,t):r.mapToProps(e,void 0)};return r.dependsOnOwnProps=!0,r.mapToProps=function(t,n){r.mapToProps=e,r.dependsOnOwnProps=R(e);let o=r(t,n);return"function"==typeof o&&(r.mapToProps=o,r.dependsOnOwnProps=R(o),o=r(t,n)),o},r}}function k(e,t){return(n,r)=>{throw new Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${r.wrappedComponentName}.`)}}function q(e,n,r){return t({},r,e,n)}const _={notify(){},get:()=>[]};function j(e,t){let n,r=_;function o(){s.onStateChange&&s.onStateChange()}function u(){n||(n=t?t.addNestedSub(o):e.subscribe(o),r=function(){const e=i();let t=null,n=null;return{clear(){t=null,n=null},notify(){e((()=>{let e=t;for(;e;)e.callback(),e=e.next}))},get(){let e=[],n=t;for(;n;)e.push(n),n=n.next;return e},subscribe(e){let r=!0,o=n={callback:e,next:null,prev:n};return o.prev?o.prev.next=o:t=o,function(){r&&null!==t&&(r=!1,o.next?o.next.prev=o.prev:n=o.prev,o.prev?o.prev.next=o.next:t=o.next)}}}}())}const s={addNestedSub:function(e){return u(),r.subscribe(e)},notifyNestedSubs:function(){r.notify()},handleChangeWrapper:o,isSubscribed:function(){return Boolean(n)},trySubscribe:u,tryUnsubscribe:function(){n&&(n(),n=void 0,r.clear(),r=_)},getListeners:()=>r};return s}const B=await a("react"),D=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement)?B.useLayoutEffect:B.useEffect;function F(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}function U(e,t){if(F(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;const n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let o=0;o<n.length;o++)if(!Object.prototype.hasOwnProperty.call(t,n[o])||!F(e[n[o]],t[n[o]]))return!1;return!0}const W=["reactReduxForwardedRef"],$=await a("react");let L=y;const z=[null,null];function H(e,t,n,r,o,u){e.current=r,n.current=!1,o.current&&(o.current=null,u())}function I(e,t){return e===t}function V(o,u,s,{pure:a,areStatesEqual:c=I,areOwnPropsEqual:i=U,areStatePropsEqual:p=U,areMergedPropsEqual:l=U,forwardRef:f=!1,context:d=m}={}){const b=d,h=function(e){return e?"function"==typeof e?T(e):k(e,"mapStateToProps"):N((()=>({})))}(o),S=function(e){return e&&"object"==typeof e?N((t=>function(e,t){const n={};for(const r in e){const o=e[r];"function"==typeof o&&(n[r]=(...e)=>t(o(...e)))}return n}(e,t))):e?"function"==typeof e?T(e):k(e,"mapDispatchToProps"):N((e=>({dispatch:e})))}(u),y=function(e){return e?"function"==typeof e?function(e){return function(t,{displayName:n,areMergedPropsEqual:r}){let o,u=!1;return function(t,n,s){const a=e(t,n,s);return u?r(a,o)||(o=a):(u=!0,o=a),o}}}(e):k(e,"mergeProps"):()=>q}(s),w=Boolean(o);return o=>{const u=o.displayName||o.name||"Component",s=`Connect(${u})`,a={shouldHandleStateChanges:w,displayName:s,wrappedComponentName:u,WrappedComponent:o,initMapStateToProps:h,initMapDispatchToProps:S,initMergeProps:y,areStatesEqual:c,areStatePropsEqual:p,areOwnPropsEqual:i,areMergedPropsEqual:l};function d(n){const[u,s,c]=$.useMemo((()=>{const{reactReduxForwardedRef:t}=n,r=e(n,W);return[n.context,t,r]}),[n]),i=$.useMemo((()=>u&&u.Consumer&&r.isContextConsumer($.createElement(u.Consumer,null))?u:b),[u,b]),p=$.useContext(i),l=Boolean(n.store)&&Boolean(n.store.getState)&&Boolean(n.store.dispatch),f=Boolean(p)&&Boolean(p.store),d=l?n.store:p.store,m=f?p.getServerState:d.getState,h=$.useMemo((()=>function(t,n){let{initMapStateToProps:r,initMapDispatchToProps:o,initMergeProps:u}=n,s=e(n,E);return M(r(t,s),o(t,s),u(t,s),t,s)}(d.dispatch,a)),[d]),[S,y]=$.useMemo((()=>{if(!w)return z;const e=j(d,l?void 0:p.subscription),t=e.notifyNestedSubs.bind(e);return[e,t]}),[d,l,p]),g=$.useMemo((()=>l?p:t({},p,{subscription:S})),[l,p,S]),P=$.useRef(),C=$.useRef(c),v=$.useRef(),x=$.useRef(!1);$.useRef(!1);const O=$.useRef(!1),N=$.useRef();D((()=>(O.current=!0,()=>{O.current=!1})),[]);const R=$.useMemo((()=>()=>v.current&&c===C.current?v.current:h(d.getState(),c)),[d,c]),T=$.useMemo((()=>e=>S?function(e,t,n,r,o,u,s,a,c,i,p){if(!e)return()=>{};let l=!1,f=null;const d=()=>{if(l||!a.current)return;const e=t.getState();let n,d;try{n=r(e,o.current)}catch(m){d=m,f=m}d||(f=null),n===u.current?s.current||i():(u.current=n,c.current=n,s.current=!0,p())};return n.onStateChange=d,n.trySubscribe(),d(),()=>{if(l=!0,n.tryUnsubscribe(),n.onStateChange=null,f)throw f}}(w,d,S,h,C,P,x,O,v,y,e):()=>{}),[S]);var k,q,_;let B;k=H,q=[C,P,x,c,v,y],D((()=>k(...q)),_);try{B=L(T,R,m?()=>h(m(),c):R)}catch(U){throw N.current&&(U.message+=`\nThe error may be correlated with this previous error:\n${N.current.stack}\n\n`),U}D((()=>{N.current=void 0,v.current=void 0,P.current=B}));const F=$.useMemo((()=>$.createElement(o,t({},B,{ref:s}))),[s,o,B]);return $.useMemo((()=>w?$.createElement(i.Provider,{value:g},F):F),[i,F,g])}const m=$.memo(d);if(m.WrappedComponent=o,m.displayName=d.displayName=s,f){const e=$.forwardRef((function(e,n){return $.createElement(m,t({},e,{reactReduxForwardedRef:n}))}));return e.displayName=s,e.WrappedComponent=o,n(e,o)}return n(m,o)}}const A=await a("react");function G({store:e,context:t,children:n,serverState:r,stabilityCheck:o="once",noopCheck:u="once"}){const s=A.useMemo((()=>{const t=j(e);return{store:e,subscription:t,getServerState:r?()=>r:void 0,stabilityCheck:o,noopCheck:u}}),[e,r,o,u]),a=A.useMemo((()=>e.getState()),[e]);D((()=>{const{subscription:t}=s;return t.onStateChange=t.notifyNestedSubs,t.trySubscribe(),a!==e.getState()&&t.notifyNestedSubs(),()=>{t.tryUnsubscribe(),t.onStateChange=void 0}}),[s,a]);const c=t||m;return A.createElement(c.Provider,{value:s},n)}function J(e=m){const t=e===m?S:h(e);return function(){const{store:e}=t();return e}}const K=J();function Q(e=m){const t=e===m?K:J(e);return function(){return t().dispatch}}const X=Q();var Y,Z;Y=o.useSyncExternalStoreWithSelector,C=Y,(e=>{L=e})(u.useSyncExternalStore),Z=s.unstable_batchedUpdates,c=Z;const ee=s.unstable_batchedUpdates;export{G as Provider,m as ReactReduxContext,ee as batch,V as connect,Q as createDispatchHook,x as createSelectorHook,J as createStoreHook,U as shallowEqual,X as useDispatch,O as useSelector,K as useStore};
