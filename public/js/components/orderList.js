'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../interfaces.d.ts" />
/**
 * OrderList
 * @description render order index page
 */
var React = require("react");
var moment = require("moment");
/**
 * Components
 */
var remove_1 = require("./buttons/remove");
var show_1 = require("./buttons/show");
/**
 * Expos
 */
var OrderListItem = function (props) {
    var user = props.user, order = props.item, limit = 8, access = props.access, selected = props.pageSelected, start = selected === 0 ? 1 : selected * limit + 1;
    var removeButton = null, orderStatus;
    switch (order.status) {
        case 0:
            orderStatus = React.createElement("span", { style: { color: '#089de3' } }, "\u043E\u0436\u0438\u0434\u0430\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438");
            break;
        case 1:
            orderStatus = React.createElement("span", { style: { color: '#92CD00' } }, "\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E");
            break;
        case 2:
            orderStatus = React.createElement("span", { style: { color: '#CC0000' } }, "\u043E\u0448\u0438\u0431\u043A\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438");
            break;
        default:
            break;
    }
    if (access === 'accountant') {
        removeButton = React.createElement(remove_1.default, { url: "/dashboard/orders/destroy/" + order._id });
    }
    return (React.createElement("tr", null,
        React.createElement("td", null, start + props.index),
        React.createElement("td", null, moment(order.createdAt).locale('ru').format('L')),
        React.createElement("td", null, order.departament),
        React.createElement("td", null, user),
        React.createElement("td", null, order.product),
        React.createElement("td", null,
            order.address.slice(0, 20),
            "..."),
        React.createElement("td", null,
            order.telephone.slice(0, 15),
            "..."),
        React.createElement("td", { style: { textAlign: 'center' } }, orderStatus),
        React.createElement("td", { className: 'table-controls' },
            React.createElement(show_1.default, { url: "/dashboard/orders/show/" + order._id }),
            removeButton)));
};
var OrderList = function (props) {
    return (React.createElement("tbody", null, props.items.map(function (item, index) {
        return React.createElement(OrderListItem, { key: index, index: index, item: item, access: props.access, user: props.users[item.user], pageSelected: props.pageSelected });
    })));
};
exports.default = OrderList;
