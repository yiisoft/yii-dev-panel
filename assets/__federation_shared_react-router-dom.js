import{i as e}from"./_virtual___federation_fn_import-d1f97fc6.js";import{c as t,a as r,b as n,E as o,s as a,i,j as s}from"./__federation_shared_react-router.js";export{AbortedDeferredError,Await,MemoryRouter,Navigate,NavigationType,Outlet,Route,Router,RouterProvider,Routes,UNSAFE_DataRouterContext,UNSAFE_DataRouterStateContext,UNSAFE_LocationContext,UNSAFE_NavigationContext,UNSAFE_RouteContext,UNSAFE_useRouteId,createMemoryRouter,createPath,createRoutesFromChildren,createRoutesFromChildren as createRoutesFromElements,defer,generatePath,isRouteErrorResponse,json,matchPath,matchRoutes,parsePath,redirect,renderMatches,resolvePath,unstable_useBlocker,useActionData,useAsyncError,useAsyncValue,useHref,useInRouterContext,useLoaderData,useLocation,useMatch,useMatches,useNavigate,useNavigation,useNavigationType,useOutlet,useOutletContext,useParams,useResolvedPath,useRevalidator,useRouteError,useRouteLoaderData,useRoutes}from"./__federation_shared_react-router.js";
/**
 * React Router DOM v6.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const u=await e("react"),{UNSAFE_mapRouteProperties:l,Router:c,UNSAFE_NavigationContext:f,useHref:d,useResolvedPath:m,useLocation:h,UNSAFE_DataRouterStateContext:p,useNavigate:v,createPath:w,UNSAFE_useRouteId:g,UNSAFE_RouteContext:y,useMatches:R,useNavigation:b,unstable_useBlocker:S,UNSAFE_DataRouterContext:E}=await e("react-router");function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},C.apply(this,arguments)}function _(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}const A="get",L="application/x-www-form-urlencoded";function N(e){return null!=e&&"string"==typeof e.tagName}function x(e){return void 0===e&&(e=""),new URLSearchParams("string"==typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce(((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map((e=>[r,e])):[[r,n]])}),[]))}function F(e,t,r){let n,o,i,s=null;if(N(u=e)&&"form"===u.tagName.toLowerCase()){let u=t.submissionTrigger;if(t.action)s=t.action;else{let t=e.getAttribute("action");s=t?a(t,r):null}n=t.method||e.getAttribute("method")||A,o=t.encType||e.getAttribute("enctype")||L,i=new FormData(e),u&&u.name&&i.append(u.name,u.value)}else if(function(e){return N(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return N(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let u=e.form;if(null==u)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');if(t.action)s=t.action;else{let t=e.getAttribute("formaction")||u.getAttribute("action");s=t?a(t,r):null}n=t.method||e.getAttribute("formmethod")||u.getAttribute("method")||A,o=t.encType||e.getAttribute("formenctype")||u.getAttribute("enctype")||L,i=new FormData(u),e.name&&i.append(e.name,e.value)}else{if(N(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');if(n=t.method||A,s=t.action||null,o=t.encType||L,e instanceof FormData)i=e;else if(i=new FormData,e instanceof URLSearchParams)for(let[t,r]of e)i.append(t,r);else if(null!=e)for(let t of Object.keys(e))i.append(t,e[t])}var u;return{action:s,method:n.toLowerCase(),encType:o,formData:i}}const U=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"],D=["aria-current","caseSensitive","className","end","style","to","children"],P=["reloadDocument","replace","method","action","onSubmit","fetcherKey","routeId","relative","preventScrollReset"];function k(e,n){return t({basename:null==n?void 0:n.basename,future:C({},null==n?void 0:n.future,{v7_prependBasename:!0}),history:r({window:null==n?void 0:n.window}),hydrationData:(null==n?void 0:n.hydrationData)||I(),routes:e,mapRouteProperties:l}).initialize()}function T(e,r){return t({basename:null==r?void 0:r.basename,future:C({},null==r?void 0:r.future,{v7_prependBasename:!0}),history:n({window:null==r?void 0:r.window}),hydrationData:(null==r?void 0:r.hydrationData)||I(),routes:e,mapRouteProperties:l}).initialize()}function I(){var e;let t=null==(e=window)?void 0:e.__staticRouterHydrationData;return t&&t.errors&&(t=C({},t,{errors:O(t.errors)})),t}function O(e){if(!e)return null;let t=Object.entries(e),r={};for(let[n,a]of t)if(a&&"RouteErrorResponse"===a.__type)r[n]=new o(a.status,a.statusText,a.data,!0===a.internal);else if(a&&"Error"===a.__type){let e=new Error(a.message);e.stack="",r[n]=e}else r[n]=a;return r}function j(e){let{basename:t,children:n,window:o}=e,a=u.useRef();null==a.current&&(a.current=r({window:o,v5Compat:!0}));let i=a.current,[s,l]=u.useState({action:i.action,location:i.location});return u.useLayoutEffect((()=>i.listen(l)),[i]),u.createElement(c,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:i})}function K(e){let{basename:t,children:r,window:o}=e,a=u.useRef();null==a.current&&(a.current=n({window:o,v5Compat:!0}));let i=a.current,[s,l]=u.useState({action:i.action,location:i.location});return u.useLayoutEffect((()=>i.listen(l)),[i]),u.createElement(c,{basename:t,children:r,location:s.location,navigationType:s.action,navigator:i})}function M(e){let{basename:t,children:r,history:n}=e;const[o,a]=u.useState({action:n.action,location:n.location});return u.useLayoutEffect((()=>n.listen(a)),[n]),u.createElement(c,{basename:t,children:r,location:o.location,navigationType:o.action,navigator:n})}const B="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,z=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,H=u.forwardRef((function(e,t){let r,{onClick:n,relative:o,reloadDocument:i,replace:s,state:l,target:c,to:m,preventScrollReset:h}=e,p=_(e,U),{basename:v}=u.useContext(f),w=!1;if("string"==typeof m&&z.test(m)&&(r=m,B))try{let e=new URL(window.location.href),t=m.startsWith("//")?new URL(e.protocol+m):new URL(m),r=a(t.pathname,v);t.origin===e.origin&&null!=r?m=r+t.search+t.hash:w=!0}catch(R){}let g=d(m,{relative:o}),y=Z(m,{replace:s,state:l,target:c,preventScrollReset:h,relative:o});return u.createElement("a",C({},p,{href:r||g,onClick:w||i?n:function(e){n&&n(e),e.defaultPrevented||y(e)},ref:t,target:c}))})),W=u.forwardRef((function(e,t){let{"aria-current":r="page",caseSensitive:n=!1,className:o="",end:a=!1,style:i,to:s,children:l}=e,c=_(e,D),d=m(s,{relative:c.relative}),v=h(),w=u.useContext(p),{navigator:g}=u.useContext(f),y=g.encodeLocation?g.encodeLocation(d).pathname:d.pathname,R=v.pathname,b=w&&w.navigation&&w.navigation.location?w.navigation.location.pathname:null;n||(R=R.toLowerCase(),b=b?b.toLowerCase():null,y=y.toLowerCase());let S,E=R===y||!a&&R.startsWith(y)&&"/"===R.charAt(y.length),A=null!=b&&(b===y||!a&&b.startsWith(y)&&"/"===b.charAt(y.length)),L=E?r:void 0;S="function"==typeof o?o({isActive:E,isPending:A}):[o,E?"active":null,A?"pending":null].filter(Boolean).join(" ");let N="function"==typeof i?i({isActive:E,isPending:A}):i;return u.createElement(H,C({},c,{"aria-current":L,className:S,ref:t,style:N,to:s}),"function"==typeof l?l({isActive:E,isPending:A}):l)})),Y=u.forwardRef(((e,t)=>u.createElement(J,C({},e,{ref:t})))),J=u.forwardRef(((e,t)=>{let{reloadDocument:r,replace:n,method:o=A,action:a,onSubmit:i,fetcherKey:s,routeId:l,relative:c,preventScrollReset:f}=e,d=_(e,P),m=te(s,l),h="get"===o.toLowerCase()?"get":"post",p=re(a,{relative:c});return u.createElement("form",C({ref:t,method:h,action:p,onSubmit:r?i:e=>{if(i&&i(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,r=(null==t?void 0:t.getAttribute("formmethod"))||o;m(t||e.currentTarget,{method:r,replace:n,relative:c,preventScrollReset:f})}},d))}));function V(e){let{getKey:t,storageKey:r}=e;return ue({getKey:t,storageKey:r}),null}var q,G;function Q(e){let t=u.useContext(E);return t||i(!1),t}function X(e){let t=u.useContext(p);return t||i(!1),t}function Z(e,t){let{target:r,replace:n,state:o,preventScrollReset:a,relative:i}=void 0===t?{}:t,s=v(),l=h(),c=m(e,{relative:i});return u.useCallback((t=>{if(function(e,t){return!(0!==e.button||t&&"_self"!==t||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e))}(t,r)){t.preventDefault();let r=void 0!==n?n:w(l)===w(c);s(e,{replace:r,state:o,preventScrollReset:a,relative:i})}}),[l,s,c,n,o,r,e,a,i])}function $(e){let t=u.useRef(x(e)),r=u.useRef(!1),n=h(),o=u.useMemo((()=>function(e,t){let r=x(e);if(t)for(let n of t.keys())r.has(n)||t.getAll(n).forEach((e=>{r.append(n,e)}));return r}(n.search,r.current?null:t.current)),[n.search]),a=v(),i=u.useCallback(((e,t)=>{const n=x("function"==typeof e?e(o):e);r.current=!0,a("?"+n,t)}),[a,o]);return[o,i]}function ee(){return te()}function te(e,t){let{router:r}=Q(q.UseSubmitImpl),{basename:n}=u.useContext(f),o=g();return u.useCallback((function(a,s){if(void 0===s&&(s={}),"undefined"==typeof document)throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");let{action:u,method:l,encType:c,formData:f}=F(a,s,n),d={preventScrollReset:s.preventScrollReset,formData:f,formMethod:l,formEncType:c};e?(null==t&&i(!1),r.fetch(e,t,u,d)):r.navigate(u,C({},d,{replace:s.replace,fromRouteId:o}))}),[r,n,e,t,o])}function re(e,t){let{relative:r}=void 0===t?{}:t,{basename:n}=u.useContext(f),o=u.useContext(y);o||i(!1);let[a]=o.matches.slice(-1),l=C({},m(e||".",{relative:r})),c=h();if(null==e&&(l.search=c.search,l.hash=c.hash,a.route.index)){let e=new URLSearchParams(l.search);e.delete("index"),l.search=e.toString()?"?"+e.toString():""}return e&&"."!==e||!a.route.index||(l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index"),"/"!==n&&(l.pathname="/"===l.pathname?n:s([n,l.pathname])),w(l)}!function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"}(q||(q={})),function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(G||(G={}));let ne=0;function oe(){var e;let{router:t}=Q(q.UseFetcher),r=u.useContext(y);r||i(!1);let n=null==(e=r.matches[r.matches.length-1])?void 0:e.route.id;null==n&&i(!1);let[o]=u.useState((()=>String(++ne))),[a]=u.useState((()=>(n||i(!1),function(e,t){return u.forwardRef(((r,n)=>u.createElement(J,C({},r,{ref:n,fetcherKey:e,routeId:t}))))}(o,n)))),[s]=u.useState((()=>e=>{t||i(!1),n||i(!1),t.fetch(o,n,e)})),l=te(o,n),c=t.getFetcher(o),f=u.useMemo((()=>C({Form:a,submit:l,load:s},c)),[c,a,l,s]);return u.useEffect((()=>()=>{t?t.deleteFetcher(o):console.warn("No router available to clean up from useFetcher()")}),[t,o]),f}function ae(){return[...X(G.UseFetchers).fetchers.values()]}const ie="react-router-scroll-positions";let se={};function ue(e){let{getKey:t,storageKey:r}=void 0===e?{}:e,{router:n}=Q(q.UseScrollRestoration),{restoreScrollPosition:o,preventScrollReset:a}=X(G.UseScrollRestoration),i=h(),s=R(),l=b();u.useEffect((()=>(window.history.scrollRestoration="manual",()=>{window.history.scrollRestoration="auto"})),[]),function(e,t){let{capture:r}=t||{};u.useEffect((()=>{let t=null!=r?{capture:r}:void 0;return window.addEventListener("pagehide",e,t),()=>{window.removeEventListener("pagehide",e,t)}}),[e,r])}(u.useCallback((()=>{if("idle"===l.state){let e=(t?t(i,s):null)||i.key;se[e]=window.scrollY}sessionStorage.setItem(r||ie,JSON.stringify(se)),window.history.scrollRestoration="auto"}),[r,t,l.state,i,s])),"undefined"!=typeof document&&(u.useLayoutEffect((()=>{try{let e=sessionStorage.getItem(r||ie);e&&(se=JSON.parse(e))}catch(e){}}),[r]),u.useLayoutEffect((()=>{let e=null==n?void 0:n.enableScrollRestoration(se,(()=>window.scrollY),t);return()=>e&&e()}),[n,t]),u.useLayoutEffect((()=>{if(!1!==o)if("number"!=typeof o){if(i.hash){let e=document.getElementById(i.hash.slice(1));if(e)return void e.scrollIntoView()}!0!==a&&window.scrollTo(0,0)}else window.scrollTo(0,o)}),[i,o,a]))}function le(e,t){let{capture:r}=t||{};u.useEffect((()=>{let t=null!=r?{capture:r}:void 0;return window.addEventListener("beforeunload",e,t),()=>{window.removeEventListener("beforeunload",e,t)}}),[e,r])}function ce(e){let{when:t,message:r}=e,n=S(t);u.useEffect((()=>{"blocked"!==n.state||t||n.reset()}),[n,t]),u.useEffect((()=>{if("blocked"===n.state){window.confirm(r)?setTimeout(n.proceed,0):n.reset()}}),[n,r])}export{j as BrowserRouter,Y as Form,K as HashRouter,H as Link,W as NavLink,V as ScrollRestoration,ue as UNSAFE_useScrollRestoration,k as createBrowserRouter,T as createHashRouter,x as createSearchParams,M as unstable_HistoryRouter,ce as unstable_usePrompt,le as useBeforeUnload,oe as useFetcher,ae as useFetchers,re as useFormAction,Z as useLinkClickHandler,$ as useSearchParams,ee as useSubmit};