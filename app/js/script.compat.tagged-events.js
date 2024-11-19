!function(){"use strict";var e,r=window.location,i=window.document,o=i.getElementById("plausible"),l=o.getAttribute("data-api")||(e=(e=o).src.split("/"),f=e[0],e=e[2],f+"//"+e+"/api/event");function s(e,t){e&&console.warn("Ignoring Event: "+e),t&&t.callback&&t.callback()}function t(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(r.hostname)||"file:"===r.protocol)return s("localhost",t);if((window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)&&!window.__plausible)return s(null,t);try{if("true"===window.localStorage.plausible_ignore)return s("localStorage flag",t)}catch(e){}var a={},n=(a.n=e,a.u=r.href,a.d=o.getAttribute("data-domain"),a.r=i.referrer||null,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=t.props),new XMLHttpRequest);n.open("POST",l,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(a)),n.onreadystatechange=function(){4===n.readyState&&t&&t.callback&&t.callback({status:n.status})}}var a=window.plausible&&window.plausible.q||[];window.plausible=t;for(var n,p=0;p<a.length;p++)t.apply(this,a[p]);function u(){n!==r.pathname&&(n=r.pathname,t("pageview"))}var c,f=window.history;function d(e){return e&&e.tagName&&"a"===e.tagName.toLowerCase()}f.pushState&&(c=f.pushState,f.pushState=function(){c.apply(this,arguments),u()},window.addEventListener("popstate",u)),"prerender"===i.visibilityState?i.addEventListener("visibilitychange",function(){n||"visible"!==i.visibilityState||u()}):u();var v=1;function m(e){"auxclick"===e.type&&e.button!==v||((e=function(e){for(;e&&(void 0===e.tagName||!d(e)||!e.href);)e=e.parentNode;return e}(e.target))&&e.href&&e.href.split("?")[0],function e(t,a){if(!t||b<a)return!1;if(y(t))return!0;return e(t.parentNode,a+1)}(e,0))}function w(e,t,a){var n,r=!1;function i(){r||(r=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?(n={props:a.props},plausible(a.name,n)):(n={props:a.props,callback:i},plausible(a.name,n),setTimeout(i,5e3),e.preventDefault())}function g(e){var e=y(e)?e:e&&e.parentNode,t={name:null,props:{}},a=e&&e.classList;if(a)for(var n=0;n<a.length;n++){var r,i=a.item(n).match(/plausible-event-(.+)(=|--)(.+)/);i&&(r=i[1],i=i[3].replace(/\+/g," "),"name"==r.toLowerCase()?t.name=i:t.props[r]=i)}return t}i.addEventListener("click",m),i.addEventListener("auxclick",m);var b=3;function h(e){if("auxclick"!==e.type||e.button===v){for(var t,a,n,r,i=e.target,o=0;o<=b&&i;o++){if((n=i)&&n.tagName&&"form"===n.tagName.toLowerCase())return;d(i)&&(t=i),y(i)&&(a=i),i=i.parentNode}a&&(r=g(a),t?(r.props.url=t.href,w(e,t,r)):((e={}).props=r.props,plausible(r.name,e)))}}function y(e){var t=e&&e.classList;if(t)for(var a=0;a<t.length;a++)if(t.item(a).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}i.addEventListener("submit",function(e){var t,a=e.target,n=g(a);function r(){t||(t=!0,a.submit())}n.name&&(e.preventDefault(),t=!1,setTimeout(r,5e3),e={props:n.props,callback:r},plausible(n.name,e))}),i.addEventListener("click",h),i.addEventListener("auxclick",h)}();