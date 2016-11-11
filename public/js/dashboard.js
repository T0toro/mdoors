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
/***/ function(module, exports) {

	'use strict';
	var _this = this;
	/**
	 * Link React with d.ts
	 */
	function renderAttributeList(settings, attribute, group, product) {
<<<<<<< Updated upstream
=======
	    if (settings === void 0) { settings = {}; }
	    if (attribute === void 0) { attribute = {}; }
	    if (group === void 0) { group = ''; }
>>>>>>> Stashed changes
	    if (attribute.group.indexOf(settings.groups[group]) !== -1 && attribute.product.indexOf(product) !== -1) {
	        return "<option value=\"" + attribute.name + "\">" + attribute.name + "</option>";
	    }
	    return '';
	}
	(function ($, document, window) {
	    var settings = {
	        product: '',
	        groups: {},
<<<<<<< Updated upstream
	        attributes: {},
	        formData: {}
=======
	        formData: {},
	        colorList: [{
	                name: 'Aoi'
	            }, {
	                name: 'Kuroi'
	            }, {
	                name: 'Akai'
	            }]
>>>>>>> Stashed changes
	    };
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
<<<<<<< Updated upstream
	        $.get('/dashboard/orders/info', function (data) {
	            var colorsList = '', glassesList = '';
	            settings.attributes = data.attributes;
	            data.attributeGroups.forEach(function (group) {
	                settings.groups[group.slug] = group._id;
	            });
	            data.attributes.forEach(function (attribute) {
	                colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
	                glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
	            });
	            $(colorsList).appendTo('#door-colors');
	            $(glassesList).appendTo('#door-glasses');
	        });
=======
	        // $.get('/dashboard/orders/info', (data: any) => {
	        //     var colorsList: string = '',
	        //         glassesList: string = '';
	        //     data.attributeGroups.forEach((group: any) => {
	        //         settings.groups[group.slug] = group._id;
	        //     });
	        //     data.attributes.forEach((attribute: any) => {
	        //         colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
	        //         glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
	        //     });
	        //     $(colorsList).appendTo('#door-colors');
	        //     $(glassesList).appendTo('#door-glasses');
	        // });
>>>>>>> Stashed changes
	        // Show calendar helper
	        $('.makdoors-datepicker').datepicker();
	        // Multiplu boxes
	        $('#attr-product').select2();
	        var ColorListItem = React.createClass({
	            render: function () {
	                return (React.createElement("option", {name: _this.props.item.name}, _this.props.item.name));
	            }
	        });
	        var ColorList = React.createClass({
	            getInitialState: function () {
	                return {
	                    items: []
	                };
	            },
	            render: function () {
	                return (React.createElement("select", {name: "doorColor", placeholder: "Зеленый", id: "door-colors", className: "form-control"}, alert('test')));
	            }
	        });
	        ReactDOM.render(React.createElement(ColorList, null), document.body);
	    });
	})($, document, window);


/***/ }
/******/ ]);
//# sourceMappingURL=dashboard.js.map