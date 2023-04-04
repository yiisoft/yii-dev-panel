/*! For license information please see 2952.7762932c.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkyii_dev_panel=self.webpackChunkyii_dev_panel||[]).push([[2952,7462,5098,6582,1800],{61800:function(e,n,t){t.r(n),t.d(n,{ContextMenu:function(){return S},IconMenuItem:function(){return D},NestedDropdown:function(){return A},NestedMenuItem:function(){return R},nestedMenuItemsFromObject:function(){return N}});var r=t(37762),o=t(29439),u=t(1413),i=t(45987),l=t(80184),c=t(72677),a=t.n(c),s=t(52744),f=t(82626),d=t(4567),p=(0,t(23814).Z)(),v=t(66934),h=t(40558),m=t(5849),b=["leftIcon","rightIcon","label","MenuItemProps","className"],y=["parentMenuOpen","label","rightIcon","leftIcon","children","className","tabIndex","ContainerProps","MenuProps"],I=["ref"],O=["menuItemsData","onClick","ButtonProps","MenuProps"];function g(e,n){return Object.keys(n).forEach((function(t){"default"===t||"__esModule"===t||e.hasOwnProperty(t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})})),e}function j(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}var Z={},x={};j(x,"ContextMenu",(function(){return S}));var M={};j(M,"nestedMenuItemsFromObject",(function(){return N}));var P={};j(P,"NestedMenuItem",(function(){return R}));var w={};j(w,"IconMenuItem",(function(){return D}));var C=(0,v.ZP)(f.Z)({paddingLeft:"4px",paddingRight:"4px",display:"flex",justifyContent:"space-between"}),E=(0,v.ZP)(d.Z)({paddingLeft:"8px",paddingRight:"8px",textAlign:"left"}),_=(0,v.ZP)(p)({display:"flex"}),D=(0,c.forwardRef)((function(e,n){var t=e.leftIcon,r=e.rightIcon,o=e.label,c=e.MenuItemProps,a=e.className,s=(0,i.Z)(e,b);return(0,l.jsxs)(C,(0,u.Z)((0,u.Z)((0,u.Z)({},c),{},{ref:n,className:a},s),{},{children:[(0,l.jsxs)(_,{children:[t,(0,l.jsx)(E,{children:o})]}),r]}))}));D.displayName="IconMenuItem";var k=function(e){return(0,l.jsx)(h.Z,(0,u.Z)((0,u.Z)({},e),{},{children:(0,l.jsx)("path",{d:"M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"})}))},R=a().forwardRef((function(e,n){var t=e.parentMenuOpen,a=e.label,f=e.rightIcon,d=void 0===f?(0,l.jsx)(k,{}):f,p=e.leftIcon,v=void 0===p?null:p,h=e.children,m=e.className,b=e.tabIndex,O=e.ContainerProps,g=void 0===O?{}:O,j=e.MenuProps,Z=(0,i.Z)(e,y),x=g.ref,M=(0,i.Z)(g,I),P=(0,c.useRef)(null);(0,c.useImperativeHandle)(n,(function(){return P.current}));var w=(0,c.useRef)(null);(0,c.useImperativeHandle)(x,(function(){return w.current}));var C,E=(0,c.useRef)(null),_=(0,c.useState)(!1),R=(0,o.Z)(_,2),N=R[0],S=R[1],L=function(){var e,n,t,o=null!==(e=null===(n=w.current)||void 0===n?void 0:n.ownerDocument.activeElement)&&void 0!==e?e:null,u=(0,r.Z)(E.current.children);try{for(u.s();!(t=u.n()).done;){if(t.value===o)return!0}}catch(i){u.e(i)}finally{u.f()}return!1},F=N&&t;return e.disabled||(C=void 0!==b?b:-1),(0,l.jsxs)("div",(0,u.Z)((0,u.Z)({},M),{},{ref:w,onFocus:function(e){e.target===w.current&&S(!0),M.onFocus&&M.onFocus(e)},tabIndex:C,onMouseEnter:function(e){S(!0),M.onMouseEnter&&M.onMouseEnter(e)},onMouseLeave:function(e){S(!1),M.onMouseLeave&&M.onMouseLeave(e)},onKeyDown:function(e){var n,t;if("Escape"!==e.key){L()&&e.stopPropagation();var r=null===(n=w.current)||void 0===n?void 0:n.ownerDocument.activeElement;if("ArrowLeft"===e.key&&L()&&(null===(t=w.current)||void 0===t||t.focus()),"ArrowRight"===e.key&&e.target===w.current&&e.target===r){var o,u=null===(o=E.current)||void 0===o?void 0:o.children[0];null===u||void 0===u||u.focus()}}},children:[(0,l.jsx)(D,{MenuItemProps:Z,className:m,ref:P,leftIcon:v,rightIcon:d,label:a}),(0,l.jsx)(s.Z,(0,u.Z)((0,u.Z)({style:{pointerEvents:"none"},anchorEl:P.current,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},open:F,autoFocus:!1,disableAutoFocus:!0,disableEnforceFocus:!0,onClose:function(){S(!1)}},j),{},{children:(0,l.jsx)("div",{ref:E,style:{pointerEvents:"auto"},children:h})}))]}))}));function N(e){var n=e.menuItemsData,t=e.isOpen,r=e.handleClose;return n.map((function(e){var n=e.leftIcon,o=e.rightIcon,u=e.label,i=e.items,c=e.callback,a=e.sx,s=e.disabled;return i&&i.length>0?(0,l.jsx)(R,{leftIcon:n,rightIcon:o,label:u,parentMenuOpen:t,sx:a,disabled:s,children:N({menuItemsData:i,isOpen:t,handleClose:r})},u):(0,l.jsx)(D,{leftIcon:n,rightIcon:o,label:u,onClick:function(n){r(),c&&c(n,e)},sx:a,disabled:s},u)}))}R.displayName="NestedMenuItem";var S=(0,c.forwardRef)((function(e,n){var t=e.children,r=e.menuItems,u=e.menuItemsData,i=null!==n&&void 0!==n?n:(0,c.useRef)(null),a=(0,c.useState)(null),f=(0,o.Z)(a,2),d=f[0],p=f[1],v=(0,c.useState)(null),h=(0,o.Z)(v,2),m=h[0],b=h[1],y=null!==r&&void 0!==r?r:u&&N({menuItemsData:u,isOpen:!!d,handleClose:function(){return p(null)}});return(0,l.jsxs)("div",{ref:i,onContextMenu:function(e){return e.preventDefault()},onMouseDown:function(e){if(null!==d&&p(null),2===e.button){var n=i.current.getBoundingClientRect();e.clientX<n.left||e.clientX>n.right||e.clientY<n.top||e.clientY>n.bottom||b({top:e.clientY,left:e.clientX})}},onMouseUp:function(e){var n=e.clientY,t=e.clientX;null!==m&&m.top===n&&m.left===t&&p({top:e.clientY,left:e.clientX})},children:[d&&(0,l.jsx)(s.Z,{onContextMenu:function(e){return e.preventDefault()},open:!!d,onClose:function(){return p(null)},anchorReference:"anchorPosition",anchorPosition:d,children:y}),t]})}));S.displayName="ContextMenu";var L={};j(L,"NestedDropdown",(function(){return A}));var F=function(e){return(0,l.jsx)(h.Z,(0,u.Z)((0,u.Z)({},e),{},{children:(0,l.jsx)("path",{d:"M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7a.9959.9959 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"})}))},A=a().forwardRef((function(e,n){var t,r,c=a().useState(null),f=(0,o.Z)(c,2),d=f[0],p=f[1],v=Boolean(d),h=e.menuItemsData,b=e.onClick,y=e.ButtonProps,I=e.MenuProps,g=(0,i.Z)(e,O),j=function(){return p(null)},Z=N({menuItemsData:null!==(t=null===h||void 0===h?void 0:h.items)&&void 0!==t?t:[],isOpen:v,handleClose:j});return(0,l.jsxs)("div",(0,u.Z)((0,u.Z)({ref:n},g),{},{children:[(0,l.jsx)(m.Z,(0,u.Z)((0,u.Z)({onClick:function(e){p(e.currentTarget),b&&b(e)},endIcon:(0,l.jsx)(F,{})},y),{},{children:null!==(r=null===h||void 0===h?void 0:h.label)&&void 0!==r?r:"Menu"})),(0,l.jsx)(s.Z,(0,u.Z)((0,u.Z)({anchorEl:d,open:v,onClose:j},I),{},{children:Z}))]}))}));g(Z,x),g(Z,L),g(Z,w),g(Z,P),g(Z,M)},66374:function(e,n,t){var r=t(77082),o=Symbol.for("react.element"),u=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function a(e,n,t){var r,u={},a=null,s=null;for(r in void 0!==t&&(a=""+t),void 0!==n.key&&(a=""+n.key),void 0!==n.ref&&(s=n.ref),n)i.call(n,r)&&!c.hasOwnProperty(r)&&(u[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===u[r]&&(u[r]=n[r]);return{$$typeof:o,type:e,key:a,ref:s,props:u,_owner:l.current}}n.Fragment=u,n.jsx=a,n.jsxs=a},80184:function(e,n,t){e.exports=t(66374)},37762:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(40181);function o(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=(0,r.Z)(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var o=0,u=function(){};return{s:u,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:u}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,c=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return l=e.done,e},e:function(e){c=!0,i=e},f:function(){try{l||null==t.return||t.return()}finally{if(c)throw i}}}}},87462:function(e,n,t){function r(){return r=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},r.apply(this,arguments)}t.d(n,{Z:function(){return r}})},1413:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(4942);function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){(0,r.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}},45987:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(63366);function o(e,n){if(null==e)return{};var t,o,u=(0,r.Z)(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(u[t]=e[t])}return u}}}]);
//# sourceMappingURL=2952.7762932c.chunk.js.map