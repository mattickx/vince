!function(){"use strict";var e,t,i=window.location,o=window.document,l=o.getElementById("plausible"),u=l.getAttribute("data-api")||(e=(e=l).src.split("/"),t=e[0],e=e[2],t+"//"+e+"/api/event");function a(e,t){try{if("true"===window.localStorage.plausible_ignore)return a=t,(r="localStorage flag")&&console.warn("Ignoring Event: "+r),void(a&&a.callback&&a.callback())}catch(e){}var a,r={},n=(r.n=e,r.u=t&&t.u?t.u:i.href,r.d=l.getAttribute("data-domain"),r.r=o.referrer||null,t&&t.meta&&(r.m=JSON.stringify(t.meta)),t&&t.props&&(r.p=t.props),new XMLHttpRequest);n.open("POST",u,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(r)),n.onreadystatechange=function(){4===n.readyState&&t&&t.callback&&t.callback({status:n.status})}}var r=window.plausible&&window.plausible.q||[];window.plausible=a;for(var n=0;n<r.length;n++)a.apply(this,r[n]);function s(e){return e&&e.tagName&&"a"===e.tagName.toLowerCase()}var p=1;function c(e){var t,a;if("auxclick"!==e.type||e.button===p)return(t=function(e){for(;e&&(void 0===e.tagName||!s(e)||!e.href);)e=e.parentNode;return e}(e.target))&&t.href&&t.href.split("?")[0],!function e(t,a){if(!t||m<a)return!1;if(g(t))return!0;return e(t.parentNode,a+1)}(t,0)&&(a=t)&&a.href&&a.host&&a.host!==i.host?f(e,t,{name:"Outbound Link: Click",props:{url:t.href}}):void 0}function f(e,t,a){var r,n=!1;function i(){n||(n=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?(r={props:a.props},plausible(a.name,r)):(r={props:a.props,callback:i},plausible(a.name,r),setTimeout(i,5e3),e.preventDefault())}function d(e){var e=g(e)?e:e&&e.parentNode,t={name:null,props:{}},a=e&&e.classList;if(a)for(var r=0;r<a.length;r++){var n,i=a.item(r).match(/plausible-event-(.+)(=|--)(.+)/);i&&(n=i[1],i=i[3].replace(/\+/g," "),"name"==n.toLowerCase()?t.name=i:t.props[n]=i)}return t}o.addEventListener("click",c),o.addEventListener("auxclick",c);var m=3;function v(e){if("auxclick"!==e.type||e.button===p){for(var t,a,r,n,i=e.target,o=0;o<=m&&i;o++){if((r=i)&&r.tagName&&"form"===r.tagName.toLowerCase())return;s(i)&&(t=i),g(i)&&(a=i),i=i.parentNode}a&&(n=d(a),t?(n.props.url=t.href,f(e,t,n)):((e={}).props=n.props,plausible(n.name,e)))}}function g(e){var t=e&&e.classList;if(t)for(var a=0;a<t.length;a++)if(t.item(a).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}o.addEventListener("submit",function(e){var t,a=e.target,r=d(a);function n(){t||(t=!0,a.submit())}r.name&&(e.preventDefault(),t=!1,setTimeout(n,5e3),e={props:r.props,callback:n},plausible(r.name,e))}),o.addEventListener("click",v),o.addEventListener("auxclick",v)}();