import{_ as e}from"./preload-helper-910b4efd.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const t={backendUrl:"http://127.0.0.1:8080",buildVersion:"#5997e69",appEnv:"github"};var r;t.backendUrl="http://127.0.0.1:8080",t.appEnv="github",e((()=>import("./bootstrap-42a73a32.js")),["assets/bootstrap-42a73a32.js","assets/_virtual___federation_fn_import-d1f97fc6.js","assets/preload-helper-910b4efd.js","assets/__federation_shared_react.js","assets/index-976ea850.js","assets/redux-5ddf189d.js","assets/__federation_shared_react-dom.js","assets/bootstrap-7e1acb2b.css"]),r&&r instanceof Function&&e((()=>import("./web-vitals-cfb28182.js")),[]).then((({getCLS:e,getFID:t,getFCP:o,getLCP:n,getTTFB:i})=>{e(r),t(r),o(r),n(r),i(r)}));export{t as C};
