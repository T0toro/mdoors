'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='../interfaces.d.ts' />
/**
 * Ozp List
 * @description :: render ozp list
 */
/**
 * Vendor
 */
var React = require("react");
/**
 * My Components
 */
var Header_1 = require("../components/ozp/Header");
var Table_1 = require("../components/ozp/Table");
/**
 * Expo
 */
var OzpListContainer = function () {
    return (React.createElement("article", null,
        React.createElement(Header_1.default, null),
        React.createElement(Table_1.default, null)));
};
exports.default = OzpListContainer;
