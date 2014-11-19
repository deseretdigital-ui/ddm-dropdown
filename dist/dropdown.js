!function(e,o){if("object"==typeof exports&&"object"==typeof module)module.exports=o(require("react/addons"),require("jquery"),require("react"));else if("function"==typeof define&&define.amd)define(["react/addons","jquery","react"],o);else{var t="object"==typeof exports?o(require("react/addons"),require("jquery"),require("react")):o(e.React,e.jQuery,e.React);for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(this,function(e,o,t){return function(e){function o(n){if(t[n])return t[n].exports;var r=t[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}var t={};return o.m=e,o.c=t,o.p="",o(0)}([function(e,o,t){t(1),e.exports.Dropdown=t(3),e.exports.DropdownToggle=t(4),e.exports.DropdownBody=t(5)},function(e,o,t){var n=t(2);"string"==typeof n&&(n=[[e.id,n,""]]);t(6)(n,{})},function(e,o,t){o=e.exports=t(10)(),o.push([e.id,'.ddm-dropdown,.ddm-dropdown__toggle{position:relative;display:inline-block}.ddm-dropdown__toggle{cursor:pointer}.ddm-dropdown__toggle--with-arrow:before{content:"";border-bottom:7px solid;border-left:7px solid transparent;border-right:7px solid transparent;position:absolute;bottom:0;left:50%;margin-left:-7px;display:none}.ddm-dropdown--open .ddm-dropdown__toggle--with-arrow:before{display:block;content:"  "}.ddm-dropdown__body{display:none}.ddm-dropdown--open .ddm-dropdown__body{display:block}.ddm-dropdown-is-open{cursor:pointer}',""])},function(e,o,t){function n(){return l++}var r=t(7),s=r.addons.classSet,d=t(8),i=t(4),p=t(5),l=0,a=r.createClass({displayName:"Dropdown",propTypes:{title:r.PropTypes.string,className:r.PropTypes.string,url:r.PropTypes.string,arrow:r.PropTypes.bool,hover:r.PropTypes.bool,hoverDelay:r.PropTypes.number,onOpen:r.PropTypes.func,onClose:r.PropTypes.func,links:r.PropTypes.array},getDefaultProps:function(){return{title:"",className:"",url:null,arrow:!0,hover:!0,hoverDelay:300,onOpen:null,onClose:null,links:[]}},getInitialState:function(){return{ddmDropdownId:null,open:!1,hoverTimeout:null}},toggleOpenState:function(){this.state.open?this.close():this.open()},open:function(){this.addDocumentCloseHandlers(),this.setState({open:!0}),this.props.onOpen&&this.props.onOpen(),d(this.getDOMNode()).trigger("open.ddm.dropdown")},close:function(){this.removeDocumentCloseHandlers(),this.setState({open:!1}),this.props.onClose&&this.props.onClose(),d(this.getDOMNode()).trigger("close.ddm.dropdown")},renderToggle:function(){var e=null;return r.Children.forEach(this.props.children,function(o){o.type===i.type&&(e=r.addons.cloneWithProps(o,{open:this.state.open,onToggleClick:this.handleClick,ref:"dropdownToggle"}))}.bind(this)),null===e&&(e=r.createElement(i,{href:this.props.url,open:this.state.open,arrow:this.props.arrow,onToggleClick:this.handleClick,ref:"dropdownToggle"},this.props.title)),e},renderBody:function(){var e=null,o=[];return r.Children.forEach(this.props.children,function(e){e.type!==i.type&&o.push(e)}),r.Children.forEach(o,function(o){o.type===p.type&&(e=r.addons.cloneWithProps(o,{ref:"dropdownBody"}))}),null===e&&(e=r.createElement(p,{links:this.props.links,ref:"dropdownBody"},o)),e},render:function(){var e={"ddm-dropdown":!0,"ddm-dropdown--open":this.state.open};this.props.className.split(" ").forEach(function(o){e[o]=!0});var o=this.renderToggle(),t=this.renderBody();return r.createElement("div",{className:s(e),onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},o,t)},componentDidUpdate:function(e,o){this.state.open&&!o.open&&(this.refs.dropdownBody.getDOMNode().scrollTop=0),this.state.open?d("body").addClass("ddm-dropdown-is-open"):d("body").removeClass("ddm-dropdown-is-open")},componentDidMount:function(){this.setState({ddmDropdownId:n()})},componentWillUnmount:function(){this.removeDocumentCloseHandlers()},addDocumentCloseHandlers:function(){d(document).on("click.ddm.dropdown."+this.state.ddmDropdownId,this.handleDocumentClick),d(document).on("keyup.ddm.dropdown."+this.state.ddmDropdownId,this.handleDocumentKeyUp),d(document).on("open.ddm.dropdown."+this.state.ddmDropdownId,this.handleDropdownOpen)},removeDocumentCloseHandlers:function(){d(document).off("click.ddm.dropdown."+this.state.ddmDropdownId),d(document).off("keyup.ddm.dropdown."+this.state.ddmDropdownId),d(document).off("open.ddm.dropdown."+this.state.ddmDropdownId)},handleClick:function(){this.toggleOpenState()},handleMouseEnter:function(){if(this.props.hover){clearTimeout(this.state.hoverTimeout);var e=setTimeout(function(){this.open()}.bind(this),this.props.hoverDelay);this.setState({hoverTimeout:e})}},handleMouseLeave:function(){if(this.props.hover){clearTimeout(this.state.hoverTimeout);var e=setTimeout(function(){this.close()}.bind(this),this.props.hoverDelay);this.setState({hoverTimeout:e})}},handleDocumentClick:function(e){this.isNodeInComponent(e.target)||this.close()},handleDocumentKeyUp:function(e){27===e.keyCode&&this.close()},handleDropdownOpen:function(e){this.isNodeInComponent(e.target)||this.close()},isNodeInComponent:function(e){for(;e;){if(e===this.getDOMNode())return!0;e=e.parentNode}return!1}});e.exports=a},function(e,o,t){var n=t(7),r=n.addons.classSet,s=n.createClass({displayName:"DropdownToggle",propTypes:{href:n.PropTypes.string,arrow:n.PropTypes.bool,open:n.PropTypes.bool,onToggleClick:n.PropTypes.func},getDefaultProps:function(){return{href:null,arrow:!0,open:!1,onToggleClick:null}},render:function(){var e={"ddm-dropdown__toggle":!0,"ddm-dropdown__toggle--with-arrow":this.props.arrow},o=this.props.href||"#";return n.createElement("a",{href:o,className:r(e),onClick:this.handleClick},this.props.children)},handleClick:function(e){this.props.href&&this.props.open||this.props.onToggleClick&&(e.preventDefault(),this.props.onToggleClick())}});e.exports=s},function(e,o,t){var n=t(9),r=n.createClass({displayName:"DropdownBody",propTypes:{links:n.PropTypes.array},getDefaultProps:function(){return{links:[]}},renderLinkList:function(){var e=null,o=null;return e=this.props.links.map(function(e,o){return n.createElement("li",{className:"ddm-dropdown__menu-item",key:"link"+o},n.createElement("a",{href:e.href,title:e.title,onClick:e.onClick,className:"ddm-dropdown__link"},e.link))}),e.length>0&&(o=n.createElement("ul",{className:"ddm-dropdown__menu"},e)),o},render:function(){var e=this.renderLinkList();return n.createElement("div",{className:"ddm-dropdown__body"},e,this.props.children)}});e.exports=r},function(e){function o(e,o){for(var t=0;t<e.length;t++){var n=e[t],s=p[n.id];if(s){s.refs++;for(var d=0;d<s.parts.length;d++)s.parts[d](n.parts[d]);for(;d<n.parts.length;d++)s.parts.push(r(n.parts[d],o))}else{for(var i=[],d=0;d<n.parts.length;d++)i.push(r(n.parts[d],o));p[n.id]={id:n.id,refs:1,parts:i}}}}function t(e){for(var o=[],t={},n=0;n<e.length;n++){var r=e[n],s=r[0],d=r[1],i=r[2],p=r[3],l={css:d,media:i,sourceMap:p};t[s]?t[s].parts.push(l):o.push(t[s]={id:s,parts:[l]})}return o}function n(){var e=document.createElement("style"),o=u();return e.type="text/css",o.appendChild(e),e}function r(e,o){var t,r,s;if(o.singleton){var p=h++;t=c||(c=n()),r=d.bind(null,t,p,!1),s=d.bind(null,t,p,!0)}else t=n(),r=i.bind(null,t),s=function(){t.parentNode.removeChild(t)};return r(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;r(e=o)}else s()}}function s(e,o,t){var n=["/** >>"+o+" **/","/** "+o+"<< **/"],r=e.lastIndexOf(n[0]),s=t?n[0]+t+n[1]:"";if(e.lastIndexOf(n[0])>=0){var d=e.lastIndexOf(n[1])+n[1].length;return e.slice(0,r)+s+e.slice(d)}return e+s}function d(e,o,t,n){var r=t?"":n.css;if(e.styleSheet)e.styleSheet.cssText=s(e.styleSheet.cssText,o,r);else{var d=document.createTextNode(r),i=e.childNodes;i[o]&&e.removeChild(i[o]),i.length?e.insertBefore(d,i[o]):e.appendChild(d)}}function i(e,o){var t=o.css,n=o.media,r=o.sourceMap;if(r&&"function"==typeof btoa)try{t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(JSON.stringify(r))+" */",t='@import url("data:stylesheet/css;base64,'+btoa(t)+'")'}catch(s){}if(n&&e.setAttribute("media",n),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var p={},l=function(e){var o;return function(){return"undefined"==typeof o&&(o=e.apply(this,arguments)),o}},a=l(function(){return/msie 9\b/.test(window.navigator.userAgent.toLowerCase())}),u=l(function(){return document.head||document.getElementsByTagName("head")[0]}),c=null,h=0;e.exports=function(e,n){n=n||{},"undefined"==typeof n.singleton&&(n.singleton=a());var r=t(e);return o(r,n),function(e){for(var s=[],d=0;d<r.length;d++){var i=r[d],l=p[i.id];l.refs--,s.push(l)}if(e){var a=t(e);o(a,n)}for(var d=0;d<s.length;d++){var l=s[d];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete p[l.id]}}}}},function(o){o.exports=e},function(e){e.exports=o},function(e){e.exports=t},function(e){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],o=0;o<this.length;o++){var t=this[o];e.push(t[2]?"@media "+t[2]+"{"+t[1]+"}":t[1])}return e.join("")},e}}])});