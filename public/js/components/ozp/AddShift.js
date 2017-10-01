"use strict";
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
var React = require("react");
var $ = require("jquery");
var moment = require("moment");
var AddShift = /** @class */ (function (_super) {
    __extends(AddShift, _super);
    function AddShift() {
        return _super.call(this) || this;
    }
    AddShift.prototype.componentDidMount = function () {
        this.csrf.value = $('meta[name="_csrf"]').attr('content');
    };
    AddShift.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: 'modalOzpShift', tabIndex: -1, role: 'dialog', "aria-labelledby": 'myModalLabel', className: 'modal fade' },
            React.createElement("div", { role: 'document', className: 'modal-dialog' },
                React.createElement("div", { className: 'modal-content' },
                    React.createElement("div", { className: 'modal-header' },
                        React.createElement("button", { type: 'button', "data-dismiss": 'modal', "aria-label": 'Close', className: 'close' },
                            React.createElement("span", { "aria-hidden": 'true' }, "\u00D7")),
                        React.createElement("h4", { id: 'myModalLabel', className: 'modal-title' }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C")),
                    React.createElement("div", { className: 'modal-body' },
                        React.createElement("form", { action: '/dashboard/ozp/setShift', name: 'ozp', id: 'form-ozpShift', method: 'POST', style: { margin: 0 } },
                            React.createElement("input", { type: 'hidden', name: '_csrf', ref: function (input) { _this.csrf = input; } }),
                            React.createElement("div", { className: 'form-group' },
                                React.createElement("label", { htmlFor: 'ozpShift-date' }, "\u0414\u0430\u0442\u0430:"),
                                React.createElement("input", { type: 'text', name: 'date', className: 'form-control makdoors-datepicker', defaultValue: moment().locale('ru').format('L') })),
                            React.createElement("div", { className: 'form-group' },
                                React.createElement("label", { htmlFor: 'ozpShift-amount' }, "\u0410\u0432\u0430\u043D\u0441 (\u0440.):"),
                                React.createElement("input", { type: 'text', name: 'amount', className: 'form-control' })),
                            React.createElement("div", { className: 'form-group' },
                                React.createElement("label", { htmlFor: 'ozpShift-payment' }, "\u041A\u043E\u043B - \u0432\u043E \u0441\u043C\u0435\u043D:"),
                                React.createElement("input", { type: 'text', name: 'count', className: 'form-control' })))),
                    React.createElement("div", { className: 'modal-footer' },
                        React.createElement("button", { type: 'button', "data-dismiss": 'modal', className: 'btn btn-default' }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"),
                        React.createElement("button", { form: 'ozp', className: 'btn btn-primary btn-ozpShift-send' }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043E\u0442\u0447\u0435\u0442"))))));
    };
    return AddShift;
}(React.Component));
exports.default = AddShift;
