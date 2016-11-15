'use strict';

$(function() {

  // Tiny mce
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
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
  });

  new Vue({
    el: '.page.page-order',
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
      // Seller data
      user: '',
      departament: '',
      info: '',
      product: '',

      // Form data
      departaments: [],
      users: [],

      colors: [],
      colorsActive: [],
      glasses: [],
      glassesActive: [],
      furnitura: [],

      // Order data
      doors: [],
      pagonazsh: [],
      furnityra: [],
    },
    methods: {
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

      changeProduct: function() {
        var self = this;

        this.colorsActive  = [];
        this.glassesActive = [];

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
