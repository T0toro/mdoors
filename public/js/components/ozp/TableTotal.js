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
/// <reference path="../../interfaces.d.ts" />
/**
 * Ozp Total
 * @description отображает итоговую сумму на основе кол-во смен и аванса
 */
/**
 * Vendor
 */
var React = require("react");
var react_redux_1 = require("react-redux");
/**
 * Expo
 */
var OzpTotal = /** @class */ (function (_super) {
    __extends(OzpTotal, _super);
    function OzpTotal() {
        return _super.call(this) || this;
    }
    // TODO: Refactor
    OzpTotal.prototype.render = function () {
        var shiftsCount = 0, shiftsAmount = 0, shifts = this.props.shifts;
        if (shifts && !!shifts.length) {
            shiftsCount = shifts[shifts.length - 1].count,
                shiftsAmount = shifts[shifts.length - 1].amount;
        }
        return (React.createElement("table", { className: 'table table-bordered' },
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "\u0418\u0442\u043E\u0433\u043E:"),
                    React.createElement("td", null,
                        this.props.ozpsSumm,
                        "\u0440.")),
                React.createElement("tr", null,
                    React.createElement("td", null, "\u0410\u0432\u0430\u043D\u0441:"),
                    React.createElement("td", null, shiftsAmount)),
                React.createElement("tr", null,
                    React.createElement("td", null, "\u041A\u043E\u043B-\u0432\u043E \u0441\u043C\u0435\u043D:"),
                    React.createElement("td", null, shiftsCount)))));
    };
    return OzpTotal;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return ({
    ozpsSumm: state.list.ozpsSumm,
    shifts: state.list.ozpShifts
}); })(OzpTotal);
