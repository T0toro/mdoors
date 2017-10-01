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
/// <reference path="../interfaces.d.ts" />
/**
 * OrderListContainer
 * @description fetch data for OrderList and render
 */
/**
 * Vendor
 */
var jquery_1 = require("jquery");
var React = require("react");
var ReactPaginate = require("react-paginate");
/**
 * My code
 */
var orderList_1 = require("../components/orderList");
/**
 * Expos
 */
var OrderListContainer = /** @class */ (function (_super) {
    __extends(OrderListContainer, _super);
    function OrderListContainer() {
        var _this = _super.call(this) || this;
        _this.state = {
            orders: [],
            pages: 1,
            users: {},
            access: 'seller',
            pageSelected: 0
        };
        // Method binding
        _this.handlePageClick = _this._handlePageClick.bind(_this);
        return _this;
    }
    OrderListContainer.prototype.componentDidMount = function () {
        var _this = this;
        jquery_1.get('/dashboard/orders.json')
            .done(function (data) {
            _this.setState({
                orders: data.orders,
                users: data.users,
                pages: Math.ceil(data.records / 10),
                access: data.access
            });
        });
    };
    OrderListContainer.prototype._handlePageClick = function (page) {
        var _this = this;
        jquery_1.get('/dashboard/orders.json', {
            page: page.selected
        }).done(function (data) {
            _this.setState({
                orders: data.orders,
                pageSelected: page.selected
            });
        });
    };
    OrderListContainer.prototype.render = function () {
        var orders = this.state.orders, users = this.state.users;
        return (React.createElement("article", null,
            React.createElement("header", null,
                React.createElement("h1", null,
                    "\u0417\u0430\u043A\u0430\u0437\u044B",
                    React.createElement("a", { href: '/dashboard/orders/create', className: 'btn btn-primary pull-right' },
                        React.createElement("i", { className: 'fa fa-plus' }),
                        "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437"))),
            React.createElement("table", { className: 'table' },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "#"),
                        React.createElement("th", null, "\u0421\u043E\u0437\u0434\u0430\u043D"),
                        React.createElement("th", null, "\u041E\u0442\u0434\u0435\u043B"),
                        React.createElement("th", null, "\u041F\u0440\u043E\u0434\u0430\u0432\u0435\u0446"),
                        React.createElement("th", null, "\u041F\u0440\u043E\u0434\u0443\u043A\u0442"),
                        React.createElement("th", null, "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"),
                        React.createElement("th", null, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"),
                        React.createElement("th", null, "\u0421\u0442\u0430\u0442\u0443\u0441 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438"),
                        React.createElement("th", { colSpan: 2, style: { padding: '0 80px' } })),
                    React.createElement("tr", null,
                        React.createElement("th", { colSpan: "2" },
                            React.createElement("input", { type: "text" })),
                        React.createElement("th", null,
                            React.createElement("input", { type: "text" })),
                        React.createElement("th", null,
                            React.createElement("input", { type: "text" })),
                        React.createElement("th", null,
                            React.createElement("input", { type: "text" })),
                        React.createElement("th", null,
                            React.createElement("input", { type: "text" })),
                        React.createElement("th", null,
                            React.createElement("input", { type: "text" })))),
                React.createElement(orderList_1.default, { items: orders, users: users, pageSelected: this.state.pageSelected, access: this.state.access })),
            React.createElement("div", { className: 'pagination-wrap' },
                React.createElement(ReactPaginate, { previousLabel: '<', nextLabel: '>', breakLabel: React.createElement("a", { href: '' }, "..."), breakClassName: 'break-me', pageCount: this.state.pages, onPageChange: this.handlePageClick, marginPagesDisplayed: 2, pageRangeDisplayed: 5, containerClassName: 'pagination', activeClassName: 'active' }))));
    };
    return OrderListContainer;
}(React.Component));
exports.default = OrderListContainer;
