!function(){"use strict";var e,t,r=window.location,i=window.document,o=i.getElementById("plausible"),l=o.getAttribute("data-api")||(e=(e=o).src.split("/"),t=e[0],e=e[2],t+"//"+e+"/api/event");function s(e,t){e&&console.warn("Ignoring Event: "+e),t&&t.callback&&t.callback()}function n(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(r.hostname)||"file:"===r.protocol)return s("localhost",t);if((window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)&&!window.__plausible)return s(null,t);try{if("true"===window.localStorage.plausible_ignore)return s("localStorage flag",t)}catch(e){}var n={},a=(n.n=e,n.u=r.href,n.d=o.getAttribute("data-domain"),n.r=i.referrer||null,t&&t.meta&&(n.m=JSON.stringify(t.meta)),t&&t.props&&(n.p=t.props),n.h=1,new XMLHttpRequest);a.open("POST",l,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(n)),a.onreadystatechange=function(){4===a.readyState&&t&&t.callback&&t.callback({status:a.status})}}var a=window.plausible&&window.plausible.q||[];window.plausible=n;for(var u,p=0;p<a.length;p++)n.apply(this,a[p]);function c(){u=r.pathname,n("pageview")}function f(e){return e&&e.tagName&&"a"===e.tagName.toLowerCase()}window.addEventListener("hashchange",c),"prerender"===i.visibilityState?i.addEventListener("visibilitychange",function(){u||"visible"!==i.visibilityState||c()}):c();var d=1;function v(e){var t,n;if("auxclick"!==e.type||e.button===d)return(t=function(e){for(;e&&(void 0===e.tagName||!f(e)||!e.href);)e=e.parentNode;return e}(e.target))&&t.href&&t.href.split("?")[0],!function e(t,n){if(!t||h<n)return!1;if(b(t))return!0;return e(t.parentNode,n+1)}(t,0)&&(n=t)&&n.href&&n.host&&n.host!==r.host?m(e,t,{name:"Outbound Link: Click",props:{url:t.href}}):void 0}function m(e,t,n){var a,r=!1;function i(){r||(r=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?(a={props:n.props},plausible(n.name,a)):(a={props:n.props,callback:i},plausible(n.name,a),setTimeout(i,5e3),e.preventDefault())}function w(e){var e=b(e)?e:e&&e.parentNode,t={name:null,props:{}},n=e&&e.classList;if(n)for(var a=0;a<n.length;a++){var r,i=n.item(a).match(/plausible-event-(.+)(=|--)(.+)/);i&&(r=i[1],i=i[3].replace(/\+/g," "),"name"==r.toLowerCase()?t.name=i:t.props[r]=i)}return t}i.addEventListener("click",v),i.addEventListener("auxclick",v);var h=3;function g(e){if("auxclick"!==e.type||e.button===d){for(var t,n,a,r,i=e.target,o=0;o<=h&&i;o++){if((a=i)&&a.tagName&&"form"===a.tagName.toLowerCase())return;f(i)&&(t=i),b(i)&&(n=i),i=i.parentNode}n&&(r=w(n),t?(r.props.url=t.href,m(e,t,r)):((e={}).props=r.props,plausible(r.name,e)))}}function b(e){var t=e&&e.classList;if(t)for(var n=0;n<t.length;n++)if(t.item(n).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}i.addEventListener("submit",function(e){var t,n=e.target,a=w(n);function r(){t||(t=!0,n.submit())}a.name&&(e.preventDefault(),t=!1,setTimeout(r,5e3),e={props:a.props,callback:r},plausible(a.name,e))}),i.addEventListener("click",g),i.addEventListener("auxclick",g)}();