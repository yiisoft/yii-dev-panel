function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/bootstrap-CNvApE30.js","assets/_virtual___federation_fn_import-DD6RvBA-.js","assets/preload-helper-D0saE0b4.js","assets/index-Cxp9oPON.js","assets/index-Cu8_3Doc.js","bundle.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./assets/preload-helper-D0saE0b4.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const t={backendUrl:"http://127.0.0.1:8080",buildVersion:"#e63ac5a",appEnv:"github"};var r;t.backendUrl="http://127.0.0.1:8080",t.appEnv="github",e((()=>import("./assets/bootstrap-CNvApE30.js")),__vite__mapDeps([0,1,2,3,4,5])),r&&r instanceof Function&&e((()=>import("./assets/web-vitals-BDnzJRlM.js")),[]).then((({getCLS:e,getFID:t,getFCP:o,getLCP:s,getTTFB:n})=>{e(r),t(r),o(r),s(r),n(r)}));export{t as C};
