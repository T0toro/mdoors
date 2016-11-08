(($, document, window) => {
    var settings = {
        groups: {}
    };

    $(() => {
        $.get('/dashboard/orders/info', (data: any) => {
            data.attributeGroups.forEach((group) => {
                settings.groups[group.slug] = group._id;
            });

            data.attributes.forEach((attribute) => {
                if (attribute.group.indexOf(settings.groups.color) !== -1) {
                    $(`<option value="${attribute.name}">${attribute.name}</option>`).appendTo('#door-colors');
                }

                if (attribute.group.indexOf(settings.groups.glass) !== -1) {
                    console.info(attribute);
                    $(`<option value="${attribute.name}">${attribute.name}</option>`).appendTo('#door-glasses');
                }
            });

        });

        // Show calendar helper
        $('.makdoors-datepicker').datepicker();

        // Multiplu boxes
        $('#attr-product').select2();
    });
})(jQuery, document, window);
