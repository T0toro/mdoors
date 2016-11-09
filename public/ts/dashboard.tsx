function renderAttributeList(settings = {}, attribute = {}, group = '', product) {
    console.info(attribute, attribute.product.indexOf(product), product );
    if (attribute.group.indexOf(settings.groups[group]) !== -1 && attribute.product.indexOf(product) !== -1) {
        return `<option value="${attribute.name}">${attribute.name}</option>`;
    }

    return '';
}

(($, document, window) => {
    var settings: any = {
        product: '',
        groups: {},
        formData: {}
    };


    $(() => {
        const $product = $('#product');

        settings.product = $product.val();

        // Get product id, if is change
        $('#product').on('change', function() {
            settings.product = $(this).val();
        });

        $.get('/dashboard/orders/info', (data: any) => {
            var colorsList: string = '',
                glassesList: string = '';

            data.attributeGroups.forEach((group: any) => {
                settings.groups[group.slug] = group._id;
            });

            data.attributes.forEach((attribute: any) => {
                colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
                glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
            });

            $(colorsList).appendTo('#door-colors');
            $(glassesList).appendTo('#door-glasses');

        });

        // Show calendar helper
        $('.makdoors-datepicker').datepicker();

        // Multiplu boxes
        $('#attr-product').select2();
    });
})(jQuery, document, window);