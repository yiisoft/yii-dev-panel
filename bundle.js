import{_ as e}from"./assets/preload-helper-ab0fe149.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const t={backendUrl:"http://127.0.0.1:8080",buildVersion:"#6ff386f",appEnv:"github"};var r;t.backendUrl="http://127.0.0.1:8080",t.appEnv="github",e((()=>import("./assets/bootstrap-ca3fe868.js")),["assets/bootstrap-ca3fe868.js","assets/_virtual___federation_fn_import-d51812b7.js","assets/preload-helper-ab0fe149.js","assets/__federation_shared_react-d09a03c4.js","assets/index-ad279549.js","assets/redux-5ddf189d.js","assets/__federation_shared_react-dom-c2502206.js","bundle.css"]),r&&r instanceof Function&&e((()=>import("./assets/web-vitals-6fff5328.js")),[]).then((({getCLS:e,getFID:t,getFCP:o,getLCP:s,getTTFB:n})=>{e(r),t(r),o(r),s(r),n(r)}));export{t as C};
