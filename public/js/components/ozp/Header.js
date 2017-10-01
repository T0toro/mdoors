'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * OzpHeader
 * @description render ozp page header
 */
var React = require("react");
var react_redux_1 = require("react-redux");
var jquery_1 = require("jquery");
/**
 * Components
 */
var AddOzp_1 = require("./AddOzp");
var AddShift_1 = require("./AddShift");
/**
 * Expos
 */
var OzpHeader = /** @class */ (function (_super) {
    __extends(OzpHeader, _super);
    function OzpHeader() {
        return _super.call(this) || this;
    }
    OzpHeader.prototype.sendReport = function () {
        jquery_1.post('/dashboard/ozp/sendOrder', {
            data: this.props.ozps
        });
    };
    OzpHeader.prototype.render = function () {
        return (React.createElement("header", null,
            React.createElement("h2", null,
                "\u041E\u0442\u0447\u0435\u0442 \u043E \u0417\u041F",
                React.createElement("button", { type: 'button', "data-toggle": 'modal', "data-target": '#modalOzp', className: 'btn btn-primary pull-right' }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"),
                React.createElement("button", { type: 'button', "data-toggle": 'modal', "data-target": '#modalOzpShift', className: 'btn btn-primary pull-right', style: { marginRight: '15px' } }, "\u0410\u0432\u0430\u043D\u0441/\u0421\u043C\u0435\u043D\u044B"),
                React.createElement("button", { className: 'btn btn-primary pull-right', style: { marginRight: '15px' }, onClick: this.sendReport.bind(this) }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0447\u0435\u0442")),
            React.createElement(AddOzp_1.default, null),
            React.createElement(AddShift_1.default, null)));
    };
    return OzpHeader;
}(React.Component));
;
exports.default = react_redux_1.connect(function (state) { return ({
    ozps: state.list
}); })(OzpHeader);
