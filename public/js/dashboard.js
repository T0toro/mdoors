(function($, document, window) {
    $(function() {
        $.get('/dashboard/orders/info', function(data) {
            console.info(data);
        });
        // Show calendar helper
        $('.makdoors-datepicker').datepicker();

        // Multiplu boxes
        $('#attr-product').select2();
    });
})(jQuery, document, window);