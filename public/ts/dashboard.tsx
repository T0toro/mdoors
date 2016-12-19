'use strict';

/**
 * jquery plugins
 */

import '../js/vendor/datepicker.min';
import 'select2';

/**
 * Global
 */

window.$ = $;
window.jQuery = $;

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