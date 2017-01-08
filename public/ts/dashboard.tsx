'use strict';

/// <reference path="interfaces.d.ts" />


/**
 * jquery plugins
 */

import '../js/vendor/datepicker.min';
import 'select2';

/**
 * React
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * React Containers
 */

import OrderListContainer from './containers/orderListContainer';

/**
 * Expos
 */
$(function () {
  // Show calendar helper
  !!$('.makdoors-datepicker').length && $('.makdoors-datepicker').datepicker();

  // Multiplu boxes
  !!$('#attr-product').length && $('#attr-product').select2();

  $('.btn-print').click(function () {
    window.print();

    return false;
  });

  !!$('.order-list').length && (() => {
    ReactDOM.render(
      <OrderListContainer />,
      $('.order-list')[0]
    );
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