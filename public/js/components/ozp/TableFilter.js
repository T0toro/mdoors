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
 * TableFilter
 * @description TableFilter representation
 */
var React = require("react");
var react_redux_1 = require("react-redux");
var jquery_1 = require("jquery");
/**
 * Actions
 */
var ozp_1 = require("../../actions/ozp");
/**
 * Components
 */
var yearDDList_1 = require("../helpers/yearDDList");
var monthDDList_1 = require("../helpers/monthDDList");
/**
 * Expos
 */
var TableFilter = /** @class */ (function (_super) {
    __extends(TableFilter, _super);
    function TableFilter() {
        return _super.call(this) || this;
    }
    TableFilter.prototype.componentDidMount = function () {
        this.csrf.value = $('meta[name="_csrf"]').attr('content');
    };
    TableFilter.prototype._ozpFilter = function (e) {
        var _this = this;
        e.preventDefault();
        var data = $('#form-odds-filter').serialize();
        jquery_1.ajax({
            method: 'POST',
            url: '/dashboard/ozp/filter',
            data: data
        }).done(function (data) {
            if (data.code !== 200)
                return false;
            _this.props.ozpStoreUpdate(data);
        });
    };
    TableFilter.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", { action: "/dashboard/ozp/filter", name: 'odds', id: 'form-odds-filter', method: 'POST', className: 'form-inline form-clear' },
            React.createElement("input", { type: "hidden", name: "_csrf", ref: function (input) { _this.csrf = input; } }),
            React.createElement("fieldset", null,
                React.createElement(yearDDList_1.default, null),
                React.createElement(monthDDList_1.default, null),
                React.createElement("div", { className: 'form-group pull-right' },
                    React.createElement("input", { type: 'submit', name: 'submit', value: 'Показать', className: 'btn btn-primary btn-odds-filter', onClick: this._ozpFilter.bind(this) })))));
    };
    return TableFilter;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return ({
    items: state.list
}); }, function (dispatch) { return ({
    ozpStoreUpdate: function (data) {
        dispatch({
            type: ozp_1.FETCH_OZP,
            data: {
                ozps: data.ozps,
                ozpShifts: data.ozpShifts
            }
        });
    }
}); })(TableFilter);
