import * as React from "react";
import * as ReactDOM from "react-dom";

console.info('test');

(function($, document, window) {
    $(function() {
        $.get('/dashboard/orders/info', function(data: any) {
            console.info(data);
        });
        // Show calendar helper
        $('.makdoors-datepicker').datepicker();

        // Multiplu boxes
        $('#attr-product').select2();
    });
})(jQuery, document, window);