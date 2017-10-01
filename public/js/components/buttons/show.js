'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../interfaces.d.ts" />
/**
 * Show button
 * @description simple show btn blank
 */
var React = require("react");
var ShowButton = function (props) {
    return (React.createElement("a", { href: props.url, className: 'btn btn-primary' },
        React.createElement("i", { className: 'fa fa-eye' })));
};
exports.default = ShowButton;
