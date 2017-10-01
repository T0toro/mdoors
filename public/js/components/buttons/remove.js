'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../interfaces.d.ts" />
/**
 * Remove button
 * @description simple remove btn blank
 */
var React = require("react");
var RemoveButton = function (props) {
    return (React.createElement("a", { href: props.url, className: 'btn btn-danger' },
        React.createElement("i", { className: 'fa fa-trash' })));
};
exports.default = RemoveButton;
