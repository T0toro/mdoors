'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="interfaces.d.ts" />
/**
 * jquery plugins
 */
require("../js/vendor/datepicker.min");
require("select2");
/**
 * React
 */
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
/**
 * React Containers
 */
// Order
var orderListContainer_1 = require("./containers/orderListContainer");
// Ozps
var ozp_1 = require("./stores/ozp");
var ozpListContainer_1 = require("./containers/ozpListContainer");
/**
 * Expos
 */
$(function () {
    $.ajaxSetup({
        headers: { 'X-CSRF-Token': $('meta[name="_csrf"]').attr('content') }
    });
    // Show calendar helper
    !!$('.makdoors-datepicker').length && $('.makdoors-datepicker').datepicker();
    // Multiplu boxes
    !!$('#attr-product').length && $('#attr-product').select2();
    $('.btn-print').click(function () {
        window.print();
        return false;
    });
    !!$('.list-order').length && (function () {
        ReactDOM.render(React.createElement(orderListContainer_1.default, null), $('.list-order')[0]);
    })();
    !!$('.list-ozp').length && (function () {
        ReactDOM.render(React.createElement(react_redux_1.Provider, { store: ozp_1.default },
            React.createElement(ozpListContainer_1.default, null)), $('.list-ozp')[0]);
    })();
    $('.btn-ozp-send').click(function () {
        $('#form-ozp').submit();
    });
    $('.btn-odds-send').click(function () {
        $('#form-odds').submit();
    });
    $('.btn-oddsBalance-send').click(function () {
        $('#form-oddsBalance').submit();
    });
    $('.btn-ozpShift-send').click(function () {
        $('#form-ozpShift').submit();
    });
    $('.btn-send-password').click(function () {
        var _id = $(this).data('id');
        $.post('/dashboard/users/restore', {
            id: _id
        });
    });
});
