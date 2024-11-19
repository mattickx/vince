!function(){"use strict";var e,t,u=window.location,o=window.document,l=o.getElementById("plausible"),s=l.getAttribute("data-api")||(e=(e=l).src.split("/"),t=e[0],e=e[2],t+"//"+e+"/api/event");function n(e,t){try{if("true"===window.localStorage.plausible_ignore)return r=t,(n="localStorage flag")&&console.warn("Ignoring Event: "+n),void(r&&r.callback&&r.callback())}catch(e){}var n={},r=(n.n=e,n.u=t&&t.u?t.u:u.href,n.d=l.getAttribute("data-domain"),n.r=o.referrer||null,t&&t.meta&&(n.m=JSON.stringify(t.meta)),t&&t.props&&(n.p=t.props),t&&t.revenue&&(n.$=t.revenue),l.getAttributeNames().filter(function(e){return"event-"===e.substring(0,6)})),a=n.p||{},i=(r.forEach(function(e){var t=e.replace("event-",""),e=l.getAttribute(e);a[t]=a[t]||e}),n.p=a,n.h=1,new XMLHttpRequest);i.open("POST",s,!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(n)),i.onreadystatechange=function(){4===i.readyState&&t&&t.callback&&t.callback({status:i.status})}}var r=window.plausible&&window.plausible.q||[];window.plausible=n;for(var a=0;a<r.length;a++)n.apply(this,r[a]);function c(e){return e&&e.tagName&&"a"===e.tagName.toLowerCase()}var p=1;function i(e){"auxclick"===e.type&&e.button!==p||((e=function(e){for(;e&&(void 0===e.tagName||!c(e)||!e.href);)e=e.parentNode;return e}(e.target))&&e.href&&e.href.split("?")[0],function e(t,n){if(!t||d<n)return!1;if(g(t))return!0;return e(t.parentNode,n+1)}(e,0))}function f(e,t,n){var r,a=!1;function i(){a||(a=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?((r={props:n.props}).revenue=n.revenue,plausible(n.name,r)):((r={props:n.props,callback:i}).revenue=n.revenue,plausible(n.name,r),setTimeout(i,5e3),e.preventDefault())}function v(e){var e=g(e)?e:e&&e.parentNode,t={name:null,props:{},revenue:{}},n=e&&e.classList;if(n)for(var r=0;r<n.length;r++){var a,i,u=n.item(r),o=u.match(/plausible-event-(.+)(=|--)(.+)/),o=(o&&(a=o[1],i=o[3].replace(/\+/g," "),"name"==a.toLowerCase()?t.name=i:t.props[a]=i),u.match(/plausible-revenue-(.+)(=|--)(.+)/));o&&(a=o[1],i=o[3],t.revenue[a]=i)}return t}o.addEventListener("click",i),o.addEventListener("auxclick",i);var d=3;function m(e){if("auxclick"!==e.type||e.button===p){for(var t,n,r,a,i=e.target,u=0;u<=d&&i;u++){if((r=i)&&r.tagName&&"form"===r.tagName.toLowerCase())return;c(i)&&(t=i),g(i)&&(n=i),i=i.parentNode}n&&(a=v(n),t?(a.props.url=t.href,f(e,t,a)):((e={}).props=a.props,e.revenue=a.revenue,plausible(a.name,e)))}}function g(e){var t=e&&e.classList;if(t)for(var n=0;n<t.length;n++)if(t.item(n).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}o.addEventListener("submit",function(e){var t,n=e.target,r=v(n);function a(){t||(t=!0,n.submit())}r.name&&(e.preventDefault(),t=!1,setTimeout(a,5e3),(e={props:r.props,callback:a}).revenue=r.revenue,plausible(r.name,e))}),o.addEventListener("click",m),o.addEventListener("auxclick",m)}();