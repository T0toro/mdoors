'use strict';

$(function() {

  // Text editor
  tinymce.init({
    selector: '.editor',
    height: 300,
    theme: 'modern',
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools codesample'
    ],
    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview | forecolor backcolor emoticons | codesample',
  });

  // Show calendar helper
  $('.makdoors-datepicker').datepicker();

  // Multiplu boxes
  $('#attr-product').select2();


  new Vue({
    el: '.page-order',
    beforeMount: function() {
      var selectEl = this.$el.querySelector('#product');

      this.product         = selectEl.value;
      this.seller          = this.$el.querySelector('#seller').value;
      this.departament     = this.$el.querySelector('#departament').value;
      this.productName     = selectEl.options[ selectEl.selectedIndex ].dataset.name;
      this.manufactureDate = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
      this.deliveryDate    = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
    },
    mounted: function() {
      var self = this;

      $.get('/dashboard/orders/info')
        .done(function(data) {
          data.attributes.forEach(function(attr) {
            if(attr.group.indexOf(data.attributeGroups[0]._id) !== -1) {
              self.colors.push(attr);
            }

            if(attr.group.indexOf(data.attributeGroups[1]._id) !== -1) {
              self.glasses.push(attr);
            }

            if(attr.group.indexOf(data.attributeGroups[2]._id) !== -1) {
              self.furnitura.push(attr);
            }
          });
        });
    },
    data: {
      // Buyer info
      fio: '',
      address: '',
      telephone: '',
      info: '',
      manufactureDate: '',
      deliveryDate: '',
      deliveryPrice: 200,

      // Form data
      departament: '',
      saller: '',
      discount: 1,

      colors: [],
      colorsActive: [],
      glasses: [],
      glassesActive: [],
      furnitura: [],

      // Order data
      productName: '',
      doors: [],
      pagonazsh: [],
      furnityra: [],
    },
    methods: {
      createOrder: function() {
        var order = {

        };
      },

      addDoor: function() {
        var formData = $('#form-door').serializeArray(),
            orderData = {};

        if (Array.isArray(formData) && !!formData.length) {
          formData.forEach(function(attr) {
            orderData[attr.name] = attr.value;
          });

          this.doors.push(orderData);
        }
      },

      addPagon: function() {
        var formData = $('#form-pagonazh').serializeArray(),
            orderData = {};

        if (Array.isArray(formData) && !!formData.length) {
          formData.forEach(function(attr) {
            orderData[attr.name] = attr.value;
          });

          this.pagonazsh.push(orderData);
        }
      },

      addFurn: function() {
        var formData = $('#form-furnityra').serializeArray(),
            orderData = {};

        if (Array.isArray(formData) && !!formData.length) {
          formData.forEach(function(attr) {
            orderData[attr.name] = attr.value;
          });

          this.furnityra.push(orderData);
        }
      },

      changeProduct: function(e) {
        var self = this,
            selectEl = e.target;

        this.colorsActive    = [];
        this.glassesActive   = [];
        this.manufactureDate = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
        this.deliveryDate    = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
        this.product         = selectEl.value;

        this.colors.forEach(function(color) {
          if(color.product.indexOf(self.product) !== -1) {
            self.colorsActive.push(color);
          }
        });

        this.glasses.forEach(function(glass) {
          if(glass.product.indexOf(self.product) !== -1) {
            self.glassesActive.push(glass);
          }
        });
      }
    }
  });
});
