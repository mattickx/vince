!function(){"use strict";var l=window.location,o=window.document,p=o.getElementById("plausible"),s=p.getAttribute("data-api")||(v=(v=p).src.split("/"),f=v[0],v=v[2],f+"//"+v+"/api/event");function u(e,t){e&&console.warn("Ignoring Event: "+e),t&&t.callback&&t.callback()}function e(e,t){try{if("true"===window.localStorage.plausible_ignore)return u("localStorage flag",t)}catch(e){}var a=p&&p.getAttribute("data-include"),i=p&&p.getAttribute("data-exclude");if("pageview"===e){a=!a||a.split(",").some(n),i=i&&i.split(",").some(n);if(!a||i)return u("exclusion rule",t)}function n(e){var t=l.pathname;return(t+=l.hash).match(new RegExp("^"+e.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var a={},r=(a.n=e,a.u=l.href,a.d=p.getAttribute("data-domain"),a.r=o.referrer||null,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=t.props),t&&t.revenue&&(a.$=t.revenue),a.h=1,new XMLHttpRequest);r.open("POST",s,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(JSON.stringify(a)),r.onreadystatechange=function(){4===r.readyState&&t&&t.callback&&t.callback({status:r.status})}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var a,i=0;i<t.length;i++)e.apply(this,t[i]);function n(){a=l.pathname,e("pageview")}window.addEventListener("hashchange",n),"prerender"===o.visibilityState?o.addEventListener("visibilitychange",function(){a||"visible"!==o.visibilityState||n()}):n();var r=1;function c(e){var t,a,i,n;if("auxclick"!==e.type||e.button===r)return t=function(e){for(;e&&(void 0===e.tagName||!(t=e)||!t.tagName||"a"!==t.tagName.toLowerCase()||!e.href);)e=e.parentNode;var t;return e}(e.target),a=t&&t.href&&t.href.split("?")[0],(i=t)&&i.href&&i.host&&i.host!==l.host?d(e,t,{name:"Outbound Link: Click",props:{url:t.href}}):(i=a)&&(n=i.split(".").pop(),m.some(function(e){return e===n}))?d(e,t,{name:"File Download",props:{url:a}}):void 0}function d(e,t,a){var i,n=!1;function r(){n||(n=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?((i={props:a.props}).revenue=a.revenue,plausible(a.name,i)):((i={props:a.props,callback:r}).revenue=a.revenue,plausible(a.name,i),setTimeout(r,5e3),e.preventDefault())}o.addEventListener("click",c),o.addEventListener("auxclick",c);var f=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma","dmg"],v=p.getAttribute("file-types"),g=p.getAttribute("add-file-types"),m=v&&v.split(",")||g&&g.split(",").concat(f)||f}();