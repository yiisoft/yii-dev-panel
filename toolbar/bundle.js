function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./assets/bootstrap-Vl10pLMB.js","./bundle.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const e={},t=function(t,r,n){let o=Promise.resolve();if(r&&r.length>0){const t=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");o=Promise.all(r.map((r=>{if(r=function(e,t){return new URL(e,t).href}(r,n),r in e)return;e[r]=!0;const o=r.endsWith(".css"),i=o?'[rel="stylesheet"]':"";if(!!n)for(let e=t.length-1;e>=0;e--){const n=t[e];if(n.href===r&&(!o||"stylesheet"===n.rel))return}else if(document.querySelector(`link[href="${r}"]${i}`))return;const l=document.createElement("link");return l.rel=o?"stylesheet":"modulepreload",o||(l.as="script",l.crossOrigin=""),l.href=r,s&&l.setAttribute("nonce",s),document.head.appendChild(l),o?new Promise(((e,t)=>{l.addEventListener("load",e),l.addEventListener("error",(()=>t(new Error(`Unable to preload CSS for ${r}`))))})):void 0})))}return o.then((()=>t())).catch((e=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}))};var r={VITE_ENV:"dev",VITE_BACKEND_URL:"http://127.0.0.1:8080",BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const n={buildVersion:r.VITE_BUILD_ID?"#"+r.VITE_BUILD_ID:"development",appEnv:"dev"};var o;n.appEnv="dev",t((()=>import("./assets/bootstrap-Vl10pLMB.js")),__vite__mapDeps([0,1]),import.meta.url),o&&o instanceof Function&&t((()=>import("./assets/web-vitals-BDnzJRlM.js")),[],import.meta.url).then((({getCLS:e,getFID:t,getFCP:r,getLCP:n,getTTFB:i})=>{e(o),t(o),r(o),n(o),i(o)}));export{n as C};
