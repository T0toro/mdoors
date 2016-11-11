'use strict';

import ColorList from './components/ColorList';

function renderAttributeList(settings: any, attribute: any, group: string, product: string) {
    if (attribute.group.indexOf(settings.groups[group]) !== -1 && attribute.product.indexOf(product) !== -1) {
        return `<option value="${attribute.name}">${attribute.name}</option>`;
    }

    return '';
}

// Эпический костыль
// ------------------------------------
$.get('/dashboard/orders/info').done(function(data: any) {
  const settings: {
      product: string,
      groups: any,
      attributes: any,
      formData: any,
      colorList: any
  } = {
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
  let colorsList: string = '',
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



  let ColorListItem = React.createClass({
    render: function() {
      return (
        <option name={ this.props.item.name }>{ this.props.item.name }</option>
      );
    }
  });

  ReactDOM.render(
    <ColorList />,
    document.body
  );

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

      // Show calendar helper
      $('.makdoors-datepicker').datepicker();

      // Multiplu boxes
      $('#attr-product').select2();

  });
});
