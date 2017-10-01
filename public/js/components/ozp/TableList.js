'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../interfaces.d.ts" />
/**
 * Ozp List
 * @description component render ozp list
 */
/**
 * Vendor
 */
var React = require("react");
var moment = require("moment");
/**
 * Expo
 */
var OzpListItem = function (props) {
    return (React.createElement("tr", null,
        React.createElement("td", null, props.index),
        React.createElement("td", null, moment(props.date).locale('ru').format('L')),
        React.createElement("td", null, props.amount),
        React.createElement("td", null, props.payment),
        React.createElement("td", null, props.address),
        React.createElement("td", { className: "table-controls no-print" },
            React.createElement("a", { href: "/dashboard/ozp/edit/" + props._id, className: "btn btn-primary" },
                React.createElement("i", { className: "fa fa-pencil" })))));
};
var OzpList = function (props) {
    return (React.createElement("tbody", null, props.items.ozps.map(function (item, index) {
        return React.createElement(OzpListItem, __assign({ key: index, index: index }, item));
    })));
};
exports.default = OzpList;
