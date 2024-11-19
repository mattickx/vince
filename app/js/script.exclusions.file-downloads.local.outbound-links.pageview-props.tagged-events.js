!function(){"use strict";var p=window.location,s=window.document,u=s.currentScript,l=u.getAttribute("data-api")||new URL(u.src).origin+"/api/event";function c(t,e){t&&console.warn("Ignoring Event: "+t),e&&e.callback&&e.callback()}function t(t,e){try{if("true"===window.localStorage.plausible_ignore)return c("localStorage flag",e)}catch(t){}var a=u&&u.getAttribute("data-include"),r=u&&u.getAttribute("data-exclude");if("pageview"===t){a=!a||a.split(",").some(n),r=r&&r.split(",").some(n);if(!a||r)return c("exclusion rule",e)}function n(t){return p.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var a={},r=(a.n=t,a.u=p.href,a.d=u.getAttribute("data-domain"),a.r=s.referrer||null,e&&e.meta&&(a.m=JSON.stringify(e.meta)),e&&e.props&&(a.p=e.props),u.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)})),i=a.p||{},o=(r.forEach(function(t){var e=t.replace("event-",""),t=u.getAttribute(t);i[e]=i[e]||t}),a.p=i,new XMLHttpRequest);o.open("POST",l,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(JSON.stringify(a)),o.onreadystatechange=function(){4===o.readyState&&e&&e.callback&&e.callback({status:o.status})}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var a,r=0;r<e.length;r++)t.apply(this,e[r]);function n(){a!==p.pathname&&(a=p.pathname,t("pageview"))}var i,o=window.history;function f(t){return t&&t.tagName&&"a"===t.tagName.toLowerCase()}o.pushState&&(i=o.pushState,o.pushState=function(){i.apply(this,arguments),n()},window.addEventListener("popstate",n)),"prerender"===s.visibilityState?s.addEventListener("visibilitychange",function(){a||"visible"!==s.visibilityState||n()}):n();var d=1;function m(t){if("auxclick"!==t.type||t.button===d){var e,a,r=function(t){for(;t&&(void 0===t.tagName||!f(t)||!t.href);)t=t.parentNode;return t}(t.target),n=r&&r.href&&r.href.split("?")[0];if(!function t(e,a){if(!e||y<a)return!1;if(L(e))return!0;return t(e.parentNode,a+1)}(r,0))return(e=r)&&e.href&&e.host&&e.host!==p.host?v(t,r,{name:"Outbound Link: Click",props:{url:r.href}}):(e=n)&&(a=e.split(".").pop(),h.some(function(t){return t===a}))?v(t,r,{name:"File Download",props:{url:n}}):void 0}}function v(t,e,a){var r,n=!1;function i(){n||(n=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented)return e=!e.target||e.target.match(/^_(self|parent|top)$/i),t=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type,e&&t}(t,e)?(r={props:a.props},plausible(a.name,r)):(r={props:a.props,callback:i},plausible(a.name,r),setTimeout(i,5e3),t.preventDefault())}s.addEventListener("click",m),s.addEventListener("auxclick",m);var o=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma","dmg"],g=u.getAttribute("file-types"),b=u.getAttribute("add-file-types"),h=g&&g.split(",")||b&&b.split(",").concat(o)||o;function w(t){var t=L(t)?t:t&&t.parentNode,e={name:null,props:{}},a=t&&t.classList;if(a)for(var r=0;r<a.length;r++){var n,i=a.item(r).match(/plausible-event-(.+)(=|--)(.+)/);i&&(n=i[1],i=i[3].replace(/\+/g," "),"name"==n.toLowerCase()?e.name=i:e.props[n]=i)}return e}var y=3;function k(t){if("auxclick"!==t.type||t.button===d){for(var e,a,r,n,i=t.target,o=0;o<=y&&i;o++){if((r=i)&&r.tagName&&"form"===r.tagName.toLowerCase())return;f(i)&&(e=i),L(i)&&(a=i),i=i.parentNode}a&&(n=w(a),e?(n.props.url=e.href,v(t,e,n)):((t={}).props=n.props,plausible(n.name,t)))}}function L(t){var e=t&&t.classList;if(e)for(var a=0;a<e.length;a++)if(e.item(a).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}s.addEventListener("submit",function(t){var e,a=t.target,r=w(a);function n(){e||(e=!0,a.submit())}r.name&&(t.preventDefault(),e=!1,setTimeout(n,5e3),t={props:r.props,callback:n},plausible(r.name,t))}),s.addEventListener("click",k),s.addEventListener("auxclick",k)}();