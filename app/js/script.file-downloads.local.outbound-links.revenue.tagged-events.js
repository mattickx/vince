!function(){"use strict";var i=window.location,o=window.document,p=o.currentScript,u=p.getAttribute("data-api")||new URL(p.src).origin+"/api/event";function e(e,t){try{if("true"===window.localStorage.plausible_ignore)return n=t,(r="localStorage flag")&&console.warn("Ignoring Event: "+r),void(n&&n.callback&&n.callback())}catch(e){}var n,r={},a=(r.n=e,r.u=i.href,r.d=p.getAttribute("data-domain"),r.r=o.referrer||null,t&&t.meta&&(r.m=JSON.stringify(t.meta)),t&&t.props&&(r.p=t.props),t&&t.revenue&&(r.$=t.revenue),new XMLHttpRequest);a.open("POST",u,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(r)),a.onreadystatechange=function(){4===a.readyState&&t&&t.callback&&t.callback({status:a.status})}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var n,r=0;r<t.length;r++)e.apply(this,t[r]);function a(){n!==i.pathname&&(n=i.pathname,e("pageview"))}var s,l=window.history;function c(e){return e&&e.tagName&&"a"===e.tagName.toLowerCase()}l.pushState&&(s=l.pushState,l.pushState=function(){s.apply(this,arguments),a()},window.addEventListener("popstate",a)),"prerender"===o.visibilityState?o.addEventListener("visibilitychange",function(){n||"visible"!==o.visibilityState||a()}):a();var f=1;function v(e){if("auxclick"!==e.type||e.button===f){var t,n,r=function(e){for(;e&&(void 0===e.tagName||!c(e)||!e.href);)e=e.parentNode;return e}(e.target),a=r&&r.href&&r.href.split("?")[0];if(!function e(t,n){if(!t||w<n)return!1;if(k(t))return!0;return e(t.parentNode,n+1)}(r,0))return(t=r)&&t.href&&t.host&&t.host!==i.host?d(e,r,{name:"Outbound Link: Click",props:{url:r.href}}):(t=a)&&(n=t.split(".").pop(),b.some(function(e){return e===n}))?d(e,r,{name:"File Download",props:{url:a}}):void 0}}function d(e,t,n){var r,a=!1;function i(){a||(a=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?((r={props:n.props}).revenue=n.revenue,plausible(n.name,r)):((r={props:n.props,callback:i}).revenue=n.revenue,plausible(n.name,r),setTimeout(i,5e3),e.preventDefault())}o.addEventListener("click",v),o.addEventListener("auxclick",v);var l=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma","dmg"],m=p.getAttribute("file-types"),g=p.getAttribute("add-file-types"),b=m&&m.split(",")||g&&g.split(",").concat(l)||l;function h(e){var e=k(e)?e:e&&e.parentNode,t={name:null,props:{},revenue:{}},n=e&&e.classList;if(n)for(var r=0;r<n.length;r++){var a,i,o=n.item(r),p=o.match(/plausible-event-(.+)(=|--)(.+)/),p=(p&&(a=p[1],i=p[3].replace(/\+/g," "),"name"==a.toLowerCase()?t.name=i:t.props[a]=i),o.match(/plausible-revenue-(.+)(=|--)(.+)/));p&&(a=p[1],i=p[3],t.revenue[a]=i)}return t}var w=3;function y(e){if("auxclick"!==e.type||e.button===f){for(var t,n,r,a,i=e.target,o=0;o<=w&&i;o++){if((r=i)&&r.tagName&&"form"===r.tagName.toLowerCase())return;c(i)&&(t=i),k(i)&&(n=i),i=i.parentNode}n&&(a=h(n),t?(a.props.url=t.href,d(e,t,a)):((e={}).props=a.props,e.revenue=a.revenue,plausible(a.name,e)))}}function k(e){var t=e&&e.classList;if(t)for(var n=0;n<t.length;n++)if(t.item(n).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}o.addEventListener("submit",function(e){var t,n=e.target,r=h(n);function a(){t||(t=!0,n.submit())}r.name&&(e.preventDefault(),t=!1,setTimeout(a,5e3),(e={props:r.props,callback:a}).revenue=r.revenue,plausible(r.name,e))}),o.addEventListener("click",y),o.addEventListener("auxclick",y)}();