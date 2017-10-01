'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Year List
 * @description draw simple select list contains year from 2016 to currentYear
 */
var React = require("react");
/**
 * Expo
 */
var currentYear = new Date().getFullYear();
var options = [];
for (var i = 2016; i <= currentYear; i++) {
    options.push(React.createElement("option", { key: i }, i));
}
var YearDDList = function () {
    return (React.createElement("div", { className: 'form-group' },
        React.createElement("label", { htmlFor: 'odds-year' }, "\u0413\u043E\u0434:"),
        React.createElement("select", { name: 'year', className: 'form-control' }, options)));
};
exports.default = YearDDList;
