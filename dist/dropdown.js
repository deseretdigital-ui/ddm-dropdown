(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "jQuery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("jQuery")) : factory(root["React"], root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	module.exports.Dropdown = __webpack_require__(3);
	module.exports.DropdownToggle = __webpack_require__(4);
	module.exports.DropdownBody = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/rahlstrom/Projects/ddm-dropdown/node_modules/css-loader/index.js!/Users/rahlstrom/Projects/ddm-dropdown/node_modules/autoprefixer-loader/index.js?{browsers:[\"last 2 version\", \"> 1%\", \"ie 8\"]}!/Users/rahlstrom/Projects/ddm-dropdown/node_modules/sass-loader/index.js!/Users/rahlstrom/Projects/ddm-dropdown/src/scss/dropdown.scss", function() {
			var newContent = require("!!/Users/rahlstrom/Projects/ddm-dropdown/node_modules/css-loader/index.js!/Users/rahlstrom/Projects/ddm-dropdown/node_modules/autoprefixer-loader/index.js?{browsers:[\"last 2 version\", \"> 1%\", \"ie 8\"]}!/Users/rahlstrom/Projects/ddm-dropdown/node_modules/sass-loader/index.js!/Users/rahlstrom/Projects/ddm-dropdown/src/scss/dropdown.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	exports.push([module.id, ".ddm-dropdown{position:relative;display:inline-block}.ddm-dropdown__toggle{position:relative;cursor:pointer;display:inline-block}.ddm-dropdown__toggle--with-arrow:before{position:relative;content:\"\";border-bottom:7px solid;border-left:7px solid transparent;border-right:7px solid transparent;position:absolute;bottom:0;left:50%;margin-left:-7px;display:none}.ddm-dropdown--open .ddm-dropdown__toggle--with-arrow:before{display:block;content:\"  \"}.ddm-dropdown__body{display:none}.ddm-dropdown--open .ddm-dropdown__body{display:block}.ddm-dropdown-is-open{cursor:pointer}", ""]);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var cx = React.addons.classSet;
	var $ = __webpack_require__(8);
	var DropdownToggle = __webpack_require__(4);
	var DropdownBody = __webpack_require__(5);

	var ddmDropdownId = 0;

	function getDdmDropdownId() {
	  return ddmDropdownId++;
	}

	var Dropdown = React.createClass({displayName: 'Dropdown',
	  propTypes: {
	    title: React.PropTypes.string,
	    className: React.PropTypes.string,
	    url: React.PropTypes.string,
	    arrow: React.PropTypes.bool,
	    hover: React.PropTypes.bool,
	    hoverDelay: React.PropTypes.number,
	    onOpen: React.PropTypes.func,
	    onClose: React.PropTypes.func,
	    links: React.PropTypes.array
	  },

	  getDefaultProps: function() {
	    return {
	      title: '',
	      className: '',
	      url: null,
	      arrow: true,
	      hover: true,
	      hoverDelay: 300,
	      onOpen: null,
	      onClose: null,
	      links: []
	    };
	  },

	  getInitialState: function() {
	    return {
	      ddmDropdownId: null,
	      open: false,
	      hoverTimeout: null,
	    };
	  },

	  toggleOpenState: function() {
	    if (this.state.open) {
	      this.close();
	    } else {
	      this.open();
	    }
	  },

	  open: function() {
	    this.addDocumentCloseHandlers();
	    this.setState({open: true});

	    if (this.props.onOpen) {
	      this.props.onOpen();
	    }

	    $(this.getDOMNode()).trigger('open.ddm.dropdown');
	  },

	  close: function() {
	    this.removeDocumentCloseHandlers();
	    this.setState({open: false});

	    if (this.props.onClose) {
	      this.props.onClose();
	    }

	    $(this.getDOMNode()).trigger('close.ddm.dropdown');
	  },

	  renderToggle: function() {
	    var toggle = null;

	    React.Children.forEach(this.props.children, function(child) {
	      if (child.type === DropdownToggle.type) {
	        toggle = React.addons.cloneWithProps(child, {
	          open: this.state.open,
	          onToggleClick: this.handleClick,
	          ref: 'dropdownToggle'
	        });
	      }
	    }.bind(this));

	    if (toggle === null) {
	      toggle = (
	        React.createElement(DropdownToggle, {
	          href: this.props.url, 
	          open: this.state.open, 
	          arrow: this.props.arrow, 
	          onToggleClick: this.handleClick, 
	          ref: "dropdownToggle"
	        }, 
	          this.props.title
	        )
	      );
	    }

	    return toggle;
	  },

	  renderBody: function() {
	    var body = null, displayChildren = [];

	    // Make sure we do not render a dropdownToggle inside of the body
	    React.Children.forEach(this.props.children, function(child) {
	      if (child.type !== DropdownToggle.type) {
	        displayChildren.push(child);
	      }
	    });

	    React.Children.forEach(displayChildren, function(child) {
	      if (child.type === DropdownBody.type) {
	        body = React.addons.cloneWithProps(child, {
	          ref: 'dropdownBody'
	        });
	      }
	    });

	    if (body === null) {
	      body = (
	        React.createElement(DropdownBody, {links: this.props.links, ref: "dropdownBody"}, 
	          displayChildren
	        )
	      );
	    }

	    return body;
	  },

	  render: function() {
	    var dropdownClasses = {
	      'ddm-dropdown': true,
	      'ddm-dropdown--open': this.state.open
	    };

	    this.props.className.split(' ').forEach(function(className) {
	      dropdownClasses[className] = true;
	    });

	    var toggle = this.renderToggle();
	    var body = this.renderBody();

	    return (
	      React.createElement("div", {
	        className: cx(dropdownClasses), 
	        onMouseEnter: this.handleMouseEnter, 
	        onMouseLeave: this.handleMouseLeave
	      }, 
	        toggle, 
	        body
	      )
	    );
	  },

	  componentDidUpdate: function(prevProps, prevState) {
	    if (this.state.open && !prevState.open) {
	      this.refs.dropdownBody.getDOMNode().scrollTop = 0;
	    }

	    if (this.state.open) {
	      $('body').addClass('ddm-dropdown-is-open');
	    } else {
	      $('body').removeClass('ddm-dropdown-is-open');
	    }
	  },

	  componentDidMount: function() {
	    this.setState({ddmDropdownId: getDdmDropdownId()});
	  },

	  componentWillUnmount: function() {
	    this.removeDocumentCloseHandlers();
	  },

	  addDocumentCloseHandlers: function() {
	    $(document).on('click.ddm.dropdown.' + this.state.ddmDropdownId, this.handleDocumentClick);
	    $(document).on('keyup.ddm.dropdown.' + this.state.ddmDropdownId, this.handleDocumentKeyUp);
	    $(document).on('open.ddm.dropdown.' + this.state.ddmDropdownId, this.handleDropdownOpen);
	  },

	  removeDocumentCloseHandlers: function() {
	    $(document).off('click.ddm.dropdown.' + this.state.ddmDropdownId);
	    $(document).off('keyup.ddm.dropdown.' + this.state.ddmDropdownId);
	    $(document).off('open.ddm.dropdown.' + this.state.ddmDropdownId);
	  },

	  handleClick: function() {
	    this.toggleOpenState();
	  },

	  handleMouseEnter: function() {
	    if (!this.props.hover) {
	      return;
	    }

	    clearTimeout(this.state.hoverTimeout);

	    var hoverTimeout = setTimeout(function() {
	      this.open();
	    }.bind(this), this.props.hoverDelay);

	    this.setState({hoverTimeout: hoverTimeout});
	  },

	  handleMouseLeave: function() {
	    if (!this.props.hover) {
	      return;
	    }

	    clearTimeout(this.state.hoverTimeout);

	    var hoverTimeout = setTimeout(function() {
	      this.close();
	    }.bind(this), this.props.hoverDelay);

	    this.setState({hoverTimeout: hoverTimeout});
	  },

	  handleDocumentClick: function(e) {
	    if (this.isNodeInComponent(e.target)) {
	      return;
	    }

	    this.close();
	  },

	  handleDocumentKeyUp: function(e) {
	    if (e.keyCode === 27) {
	      this.close();
	    }
	  },

	  handleDropdownOpen: function(e) {
	    if (this.isNodeInComponent(e.target)) {
	      return;
	    }

	    this.close();
	  },

	  isNodeInComponent: function(node) {
	    while (node) {
	      if (node === this.getDOMNode()) {
	        return true;
	      }
	      node = node.parentNode;
	    }

	    return false;
	  }
	});

	module.exports = Dropdown;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var cx = React.addons.classSet;

	var DropdownToggle = React.createClass({displayName: 'DropdownToggle',
	  propTypes: {
	    href: React.PropTypes.string,
	    arrow: React.PropTypes.bool,
	    open: React.PropTypes.bool,
	    onToggleClick: React.PropTypes.func
	  },

	  getDefaultProps: function() {
	    return {
	      href: null,
	      arrow: true,
	      open: false,
	      onToggleClick: null
	    };
	  },

	  render: function() {
	    var toggleClasses = {
	      'ddm-dropdown__toggle': true,
	      'ddm-dropdown__toggle--with-arrow': this.props.arrow
	    };

	    var href = this.props.href || '#';

	    return (
	      React.createElement("a", {href: href, className: cx(toggleClasses), onClick: this.handleClick}, 
	        this.props.children
	      )
	    );
	  },

	  handleClick: function(e) {
	    if (this.props.href && this.props.open) {
	      return;
	    }

	    if (this.props.onToggleClick) {
	      e.preventDefault();
	      this.props.onToggleClick();
	    }
	  }
	});

	module.exports = DropdownToggle;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);

	var DropdownBody = React.createClass({displayName: 'DropdownBody',
	  propTypes: {
	    links: React.PropTypes.array
	  },

	  getDefaultProps: function() {
	    return {
	      links: []
	    };
	  },

	  renderLinkList: function() {
	    var renderedLinks = null, renderedLinkList = null;

	    renderedLinks = this.props.links.map(function(link, i) {
	      return (
	        React.createElement("li", {className: "ddm-dropdown__menu-item", key: 'link' + i}, 
	          React.createElement("a", {
	            href: link.href, 
	            title: link.title, 
	            onClick: link.onClick, 
	            className: "ddm-dropdown__link"
	          }, 
	            link.link
	          )
	        )
	      );
	    });

	    if (renderedLinks.length > 0) {
	      renderedLinkList = (
	        React.createElement("ul", {className: "ddm-dropdown__menu"}, 
	          renderedLinks
	        )
	      );
	    }

	    return renderedLinkList;
	  },

	  render: function() {
	    var renderedLinkList = this.renderLinkList();

	    return (
	      React.createElement("div", {className: "ddm-dropdown__body"}, 
	        renderedLinkList, 
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = DropdownBody;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ])
});
