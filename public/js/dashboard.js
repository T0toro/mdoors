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

	(function ($, document, window) {
	    var settings = {
	        groups: {}
	    };
	    $(function () {
	        $.get('/dashboard/orders/info', function (data) {
	            data.attributeGroups.forEach(function (group) {
	                settings.groups[group.slug] = group._id;
	            });
	            data.attributes.forEach(function (attribute) {
	                if (attribute.group.indexOf(settings.groups.color) !== -1) {
	                    $("<option value=\"" + attribute.name + "\">" + attribute.name + "</option>").appendTo('#door-colors');
	                }
	                if (attribute.group.indexOf(settings.groups.glass) !== -1) {
	                    console.info(attribute);
	                    $("<option value=\"" + attribute.name + "\">" + attribute.name + "</option>").appendTo('#door-glasses');
	                }
	            });
	        });
	        // Show calendar helper
	        $('.makdoors-datepicker').datepicker();
	        // Multiplu boxes
	        $('#attr-product').select2();
	    });
	})(jQuery, document, window);


/***/ }
/******/ ]);
//# sourceMappingURL=dashboard.js.map