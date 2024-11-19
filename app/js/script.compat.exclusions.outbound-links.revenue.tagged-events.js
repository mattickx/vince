!function(){"use strict";var e,o=window.location,u=window.document,l=u.getElementById("plausible"),s=l.getAttribute("data-api")||(e=(e=l).src.split("/"),f=e[0],e=e[2],f+"//"+e+"/api/event");function p(e,t){e&&console.warn("Ignoring Event: "+e),t&&t.callback&&t.callback()}function t(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname)||"file:"===o.protocol)return p("localhost",t);if((window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)&&!window.__plausible)return p(null,t);try{if("true"===window.localStorage.plausible_ignore)return p("localStorage flag",t)}catch(e){}var n=l&&l.getAttribute("data-include"),a=l&&l.getAttribute("data-exclude");if("pageview"===e){n=!n||n.split(",").some(r),a=a&&a.split(",").some(r);if(!n||a)return p("exclusion rule",t)}function r(e){return o.pathname.match(new RegExp("^"+e.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var n={},i=(n.n=e,n.u=o.href,n.d=l.getAttribute("data-domain"),n.r=u.referrer||null,t&&t.meta&&(n.m=JSON.stringify(t.meta)),t&&t.props&&(n.p=t.props),t&&t.revenue&&(n.$=t.revenue),new XMLHttpRequest);i.open("POST",s,!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(n)),i.onreadystatechange=function(){4===i.readyState&&t&&t.callback&&t.callback({status:i.status})}}var n=window.plausible&&window.plausible.q||[];window.plausible=t;for(var a,r=0;r<n.length;r++)t.apply(this,n[r]);function i(){a!==o.pathname&&(a=o.pathname,t("pageview"))}var c,f=window.history;function v(e){return e&&e.tagName&&"a"===e.tagName.toLowerCase()}f.pushState&&(c=f.pushState,f.pushState=function(){c.apply(this,arguments),i()},window.addEventListener("popstate",i)),"prerender"===u.visibilityState?u.addEventListener("visibilitychange",function(){a||"visible"!==u.visibilityState||i()}):i();var d=1;function m(e){var t,n;if("auxclick"!==e.type||e.button===d)return(t=function(e){for(;e&&(void 0===e.tagName||!v(e)||!e.href);)e=e.parentNode;return e}(e.target))&&t.href&&t.href.split("?")[0],!function e(t,n){if(!t||g<n)return!1;if(y(t))return!0;return e(t.parentNode,n+1)}(t,0)&&(n=t)&&n.href&&n.host&&n.host!==o.host?h(e,t,{name:"Outbound Link: Click",props:{url:t.href}}):void 0}function h(e,t,n){var a,r=!1;function i(){r||(r=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?((a={props:n.props}).revenue=n.revenue,plausible(n.name,a)):((a={props:n.props,callback:i}).revenue=n.revenue,plausible(n.name,a),setTimeout(i,5e3),e.preventDefault())}function w(e){var e=y(e)?e:e&&e.parentNode,t={name:null,props:{},revenue:{}},n=e&&e.classList;if(n)for(var a=0;a<n.length;a++){var r,i,o=n.item(a),u=o.match(/plausible-event-(.+)(=|--)(.+)/),u=(u&&(r=u[1],i=u[3].replace(/\+/g," "),"name"==r.toLowerCase()?t.name=i:t.props[r]=i),o.match(/plausible-revenue-(.+)(=|--)(.+)/));u&&(r=u[1],i=u[3],t.revenue[r]=i)}return t}u.addEventListener("click",m),u.addEventListener("auxclick",m);var g=3;function b(e){if("auxclick"!==e.type||e.button===d){for(var t,n,a,r,i=e.target,o=0;o<=g&&i;o++){if((a=i)&&a.tagName&&"form"===a.tagName.toLowerCase())return;v(i)&&(t=i),y(i)&&(n=i),i=i.parentNode}n&&(r=w(n),t?(r.props.url=t.href,h(e,t,r)):((e={}).props=r.props,e.revenue=r.revenue,plausible(r.name,e)))}}function y(e){var t=e&&e.classList;if(t)for(var n=0;n<t.length;n++)if(t.item(n).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}u.addEventListener("submit",function(e){var t,n=e.target,a=w(n);function r(){t||(t=!0,n.submit())}a.name&&(e.preventDefault(),t=!1,setTimeout(r,5e3),(e={props:a.props,callback:r}).revenue=a.revenue,plausible(a.name,e))}),u.addEventListener("click",b),u.addEventListener("auxclick",b)}();