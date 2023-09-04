function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r(t)}function t(t){var n=function(t,n){if("object"!==r(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var o=e.call(t,n||"default");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===r(n)?n:String(n)}function n(r,n,e){return(n=t(n))in r?Object.defineProperty(r,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[n]=e,r}function e(r,t){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(r);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.push.apply(n,e)}return n}function o(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?e(Object(o),!0).forEach((function(t){n(r,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(o,t))}))}return r}function i(r){return"Minified Redux error #"+r+"; visit https://redux.js.org/Errors?code="+r+" for the full message or use the non-minified dev environment for full errors. "}var f="function"==typeof Symbol&&Symbol.observable||"@@observable",u=function(){return Math.random().toString(36).substring(7).split("").join(".")},c={INIT:"@@redux/INIT"+u(),REPLACE:"@@redux/REPLACE"+u(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+u()}};function a(r,t,n){var e;if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error(i(0));if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error(i(1));return n(a)(r,t)}if("function"!=typeof r)throw new Error(i(2));var o=r,u=t,p=[],y=p,l=!1;function s(){y===p&&(y=p.slice())}function b(){if(l)throw new Error(i(3));return u}function v(r){if("function"!=typeof r)throw new Error(i(4));if(l)throw new Error(i(5));var t=!0;return s(),y.push(r),function(){if(t){if(l)throw new Error(i(6));t=!1,s();var n=y.indexOf(r);y.splice(n,1),p=null}}}function w(r){if(!function(r){if("object"!=typeof r||null===r)return!1;for(var t=r;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(r)===t}(r))throw new Error(i(7));if(void 0===r.type)throw new Error(i(8));if(l)throw new Error(i(9));try{l=!0,u=o(u,r)}finally{l=!1}for(var t=p=y,n=0;n<t.length;n++){(0,t[n])()}return r}return w({type:c.INIT}),(e={dispatch:w,subscribe:v,getState:b,replaceReducer:function(r){if("function"!=typeof r)throw new Error(i(10));o=r,w({type:c.REPLACE})}})[f]=function(){var r,t=v;return(r={subscribe:function(r){if("object"!=typeof r||null===r)throw new Error(i(11));function n(){r.next&&r.next(b())}return n(),{unsubscribe:t(n)}}})[f]=function(){return this},r},e}function p(r){for(var t=Object.keys(r),n={},e=0;e<t.length;e++){var o=t[e];"function"==typeof r[o]&&(n[o]=r[o])}var f,u=Object.keys(n);try{!function(r){Object.keys(r).forEach((function(t){var n=r[t];if(void 0===n(void 0,{type:c.INIT}))throw new Error(i(12));if(void 0===n(void 0,{type:c.PROBE_UNKNOWN_ACTION()}))throw new Error(i(13))}))}(n)}catch(a){f=a}return function(r,t){if(void 0===r&&(r={}),f)throw f;for(var e=!1,o={},c=0;c<u.length;c++){var a=u[c],p=n[a],y=r[a],l=p(y,t);if(void 0===l)throw t&&t.type,new Error(i(14));o[a]=l,e=e||l!==y}return(e=e||u.length!==Object.keys(r).length)?o:r}}function y(r,t){return function(){return t(r.apply(this,arguments))}}function l(r,t){if("function"==typeof r)return y(r,t);if("object"!=typeof r||null===r)throw new Error(i(16));var n={};for(var e in r){var o=r[e];"function"==typeof o&&(n[e]=y(o,t))}return n}function s(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];return 0===t.length?function(r){return r}:1===t.length?t[0]:t.reduce((function(r,t){return function(){return r(t.apply(void 0,arguments))}}))}function b(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];return function(r){return function(){var n=r.apply(void 0,arguments),e=function(){throw new Error(i(15))},f={getState:n.getState,dispatch:function(){return e.apply(void 0,arguments)}},u=t.map((function(r){return r(f)}));return e=s.apply(void 0,u)(n.dispatch),o(o({},n),{},{dispatch:e})}}}export{t as _,a,b,p as c,s as d,n as e,r as f,l as g};