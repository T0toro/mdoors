'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Month List
 * @description render simple dropDown list contains month
 */
/**
 * Vendor
 */
var React = require("react");
/**
 * Expo
 */
var MonthList = function () {
    return (React.createElement("div", { className: 'form-group' },
        React.createElement("label", { htmlFor: 'odds-month' }, "\u041C\u0435\u0441\u044F\u0446:"),
        React.createElement("select", { name: 'month', id: 'odds-month', className: 'form-control' },
            React.createElement("option", { value: '1' }, "\u042F\u043D\u0432\u0430\u0440\u044C"),
            React.createElement("option", { value: '2' }, "\u0424\u0435\u0432\u0440\u0430\u043B\u044C"),
            React.createElement("option", { value: '3' }, "\u041C\u0430\u0440\u0442"),
            React.createElement("option", { value: '4' }, "\u0410\u043F\u0440\u0435\u043B\u044C"),
            React.createElement("option", { value: '5' }, "\u041C\u0430\u0439"),
            React.createElement("option", { value: '6' }, "\u0418\u044E\u043D\u044C"),
            React.createElement("option", { value: '7' }, "\u0418\u044E\u043B\u044C"),
            React.createElement("option", { value: '8' }, "\u0410\u0432\u0433\u0443\u0441\u0442"),
            React.createElement("option", { value: '9' }, "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C"),
            React.createElement("option", { value: '10' }, "\u041E\u043A\u0442\u044F\u0431\u0440\u044C"),
            React.createElement("option", { value: '11' }, "\u041D\u043E\u044F\u0431\u0440\u044C"),
            React.createElement("option", { value: '12' }, "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"))));
};
exports.default = MonthList;
