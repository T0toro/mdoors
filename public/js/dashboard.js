/******/ (function(modules) { // webpackBootstrap
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

	'use strict';
	var ColorList_1 = __webpack_require__(1);
	function renderAttributeList(settings, attribute, group, product) {
	    if (attribute.group.indexOf(settings.groups[group]) !== -1 && attribute.product.indexOf(product) !== -1) {
	        return "<option value=\"" + attribute.name + "\">" + attribute.name + "</option>";
	    }
	    return '';
	}
	// Эпический костыль
	// ------------------------------------
	$.get('/dashboard/orders/info').done(function (data) {
	    var settings = {
	        product: '',
	        groups: {},
	        attributes: {},
	        formData: {},
	        colorList: [{
	                name: 'Aoi'
	            }, {
	                name: 'Kuroi'
	            }, {
	                name: 'Akai'
	            }]
	    };
	    var colorsList = '', glassesList = '';
	    data.attributeGroups.forEach(function (group) {
	        settings.groups[group.slug] = group._id;
	    });
	    data.attributes.forEach(function (attribute) {
	        colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
	        glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
	    });
	    $(colorsList).appendTo('#door-colors');
	    $(glassesList).appendTo('#door-glasses');
	    var ColorListItem = React.createClass({
	        render: function () {
	            return (React.createElement("option", {name: this.props.item.name}, this.props.item.name));
	        }
	    });
	    ReactDOM.render(React.createElement(ColorList_1.default, null), document.body);
	    $(function () {
	        var $product = $('#product');
	        settings.product = $product.val();
	        // Get product id, if is change
	        $('#product').on('change', function () {
	            var colorsList = '', glassesList = '';
	            settings.product = $(this).val();
	            settings.attributes.forEach(function (attribute) {
	                colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
	                glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
	            });
	            $('#door-colors, #door-glasses').find('option').remove();
	            $(colorsList).appendTo('#door-colors');
	            $(glassesList).appendTo('#door-glasses');
	        });
	        // Show calendar helper
	        $('.makdoors-datepicker').datepicker();
	        // Multiplu boxes
	        $('#attr-product').select2();
	    });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var ColorListItem_1 = __webpack_require__(4);
	var ColorList = (function (_super) {
	    __extends(ColorList, _super);
	    function ColorList(props) {
	        _super.call(this, props);
	        this.state = {
	            items: [{
	                    name: 'Aoi'
	                }, {
	                    name: 'Kuroi'
	                }, {
	                    name: 'Akai'
	                }]
	        };
	    }
	    ColorList.prototype.render = function () {
	        return (React.createElement("select", {name: "doorColor", placeholder: "Зеленый", id: "door-colors", className: "form-control"}, 
	            React.createElement("option", {value: "нет"}, "нет"), 
	            this.state.items.map(function (item) {
	                return (React.createElement(ColorListItem_1.default, {name: item.name}));
	            })));
	    };
	    return ColorList;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ColorList;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var ColorListItem = (function (_super) {
	    __extends(ColorListItem, _super);
	    function ColorListItem() {
	        _super.apply(this, arguments);
	    }
	    ColorListItem.prototype.render = function () {
	        return (React.createElement("option", {value: this.props.name}, this.props.name));
	    };
	    return ColorListItem;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ColorListItem;


/***/ }
/******/ ]);
//# sourceMappingURL=dashboard.js.map