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
 * OzpTable
 * @description representation table in ozp page
 */
var React = require("react");
var react_redux_1 = require("react-redux");
var jquery_1 = require("jquery");
/**
 * MainComponents
 */
var TableList_1 = require("../ozp/TableList");
var TableTotal_1 = require("../ozp/TableTotal");
var TableFilter_1 = require("../ozp/TableFilter");
/**
 * Actions
 */
var ozp_1 = require("../../actions/ozp");
/**
 * Expos
 */
var OzpTable = /** @class */ (function (_super) {
    __extends(OzpTable, _super);
    function OzpTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OzpTable.prototype.componentDidMount = function () {
        var _this = this;
        jquery_1.ajax({
            url: '/dashboard/uozp.json'
        }).done(function (data) {
            if (data.code !== 200)
                return false;
            _this.props.ozpFetch(data);
        });
    };
    OzpTable.prototype.render = function () {
        return (React.createElement("table", { className: 'table table-bordered' },
            React.createElement("thead", null,
                React.createElement("tr", { className: 'no-print' },
                    React.createElement("th", { colSpan: 7 },
                        React.createElement(TableFilter_1.default, null))),
                React.createElement("tr", null,
                    React.createElement("th", null, "#"),
                    React.createElement("th", null, "\u0414\u0430\u0442\u0430"),
                    React.createElement("th", null, "\u0421\u0443\u043C\u043C\u0430 (\u0440.)"),
                    React.createElement("th", null, "\u041F\u0440\u0435\u0434\u043E\u043F\u043B\u0430\u0442\u0430 (\u0440.)"),
                    React.createElement("th", null, "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0438 \u0434\u0430\u0442\u0430 \u0437\u0430\u043A\u0430\u0437\u0430 \u043D\u0430 \u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437"),
                    React.createElement("th", { colSpan: 2 }))),
            React.createElement(TableList_1.default, { items: this.props.items }),
            React.createElement("tfoot", null,
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: 5 }),
                    React.createElement("td", { colSpan: 3 },
                        React.createElement(TableTotal_1.default, null))))));
    };
    return OzpTable;
}(React.Component));
;
exports.default = react_redux_1.connect(function (state) { return ({
    items: state.list
}); }, function (dispatch) { return ({
    ozpFetch: function (data) {
        dispatch({
            type: ozp_1.FETCH_OZP,
            data: {
                ozps: data.ozps,
                ozpShifts: data.ozpShifts
            }
        });
    }
}); })(OzpTable);
