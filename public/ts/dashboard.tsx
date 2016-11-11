<<<<<<< Updated upstream
function renderAttributeList(settings: any, attribute: any, group: string, product: string) {
=======
'use strict';

/**
 * Link React with d.ts
 */

function renderAttributeList(settings: any = {}, attribute: any = {}, group: string = '', product: string) {
>>>>>>> Stashed changes
    if (attribute.group.indexOf(settings.groups[group]) !== -1 && attribute.product.indexOf(product) !== -1) {
        return `<option value="${attribute.name}">${attribute.name}</option>`;
    }

    return '';
}

(($, document, window) => {
    var settings: {
        product: string,
        groups: any,
<<<<<<< Updated upstream
        attributes: any,
        formData: any
    } = {
        product: '',
        groups: {},
        attributes: {},
        formData: {}
=======
        formData: any,
        colorList: any
    } = {
        product:  '',
        groups: {},
        formData: {},
        colorList: [{
                name: 'Aoi'
              }, {
                name: 'Kuroi'
              }, {
                name: 'Akai'
              }]
>>>>>>> Stashed changes
    };

    $(() => {
        const $product = $('#product');

        settings.product = $product.val();

        // Get product id, if is change
        $('#product').on('change', function() {
            let colorsList: string = '',
                glassesList: string = '';

            settings.product = $(this).val();

            settings.attributes.forEach((attribute: any) => {
                colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
                glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
            });

            $('#door-colors, #door-glasses').find('option').remove();

            $(colorsList).appendTo('#door-colors');
            $(glassesList).appendTo('#door-glasses');
        });

<<<<<<< Updated upstream
        $.get('/dashboard/orders/info', (data: any) => {
            let colorsList: string = '',
                glassesList: string = '';

            settings.attributes = data.attributes;

            data.attributeGroups.forEach((group: any) => {
                settings.groups[group.slug] = group._id;
            });
=======
        // $.get('/dashboard/orders/info', (data: any) => {
        //     var colorsList: string = '',
        //         glassesList: string = '';

        //     data.attributeGroups.forEach((group: any) => {
        //         settings.groups[group.slug] = group._id;
        //     });
>>>>>>> Stashed changes

        //     data.attributes.forEach((attribute: any) => {
        //         colorsList += renderAttributeList(settings, attribute, 'color', settings.product);
        //         glassesList += renderAttributeList(settings, attribute, 'glass', settings.product);
        //     });

        //     $(colorsList).appendTo('#door-colors');
        //     $(glassesList).appendTo('#door-glasses');

        // });

        // Show calendar helper
        $('.makdoors-datepicker').datepicker();

        // Multiplu boxes
        $('#attr-product').select2();

        var ColorListItem = React.createClass({
          render: () => {
            return (
              <option name={ this.props.item.name }>{ this.props.item.name }</option>
            );
          }
        });

        var ColorList = React.createClass({
          getInitialState: function() {
            return {
              items: []
            };
          },

          render: () => {
            return (
              <select name="doorColor" placeholder="Зеленый" id="door-colors" className="form-control">
              { alert('test') }
              </select>
            );
          }
        });

      ReactDOM.render(
        <ColorList />,
        document.body
      );
    });
})($, document, window);
