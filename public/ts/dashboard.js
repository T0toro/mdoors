'use strict';
var ColorList_1 = require("./components/ColorList");
function renderAttributeList(settings, attribute, group, product) {
    if (attribute.group.indexOf(settings.groups[group]) !== -1 && attribute.product.indexOf(product) !== -1) {
        return "<option value=\"" + attribute.name + "\">" + attribute.name + "</option>";
    }
    return '';
}
$.get('/dashboard/orders/info').done(function (data) {
    var settings = {
        product: '',
        groups: {},
        attributes: {},
        formData: {},
        colorList: [{
                name: 'Aoi'
            }, {
                name: 'Kuroi'
            }, {
                name: 'Akai'
            }]
    };
    var colorsList = '', glassesList = '';
    data.attributeGroups.forEach(function (group) {
        settings.groups[group.slug] = group._id;
    });
    data.attributes.forEach(function (attribute) {
        colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
        glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
    });
    $(colorsList).appendTo('#door-colors');
    $(glassesList).appendTo('#door-glasses');
    var ColorListItem = React.createClass({
        render: function () {
            return (React.createElement("option", { name: this.props.item.name }, this.props.item.name));
        }
    });
    if (document.querySelector('.door-colors')) {
        ReactDOM.render(React.createElement(ColorList_1.default, null), document.querySelector('.door-colors'));
    }
});
$(function () {
    var $product = $('#product');
    settings.product = $product.val();
    $('#product').on('change', function () {
        var colorsList = '', glassesList = '';
        settings.product = $(this).val();
        settings.attributes.forEach(function (attribute) {
            colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
            glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
        });
        $('#door-colors, #door-glasses').find('option').remove();
        $(colorsList).appendTo('#door-colors');
        $(glassesList).appendTo('#door-glasses');
    });
    $('.makdoors-datepicker').datepicker();
    $('#attr-product').select2();
});
;
//# sourceMappingURL=dashboard.js.map