'use strict';

$(function() {
  new Vue({
    el: '#page',
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

        this.colorsActive = [];

        this.colors.forEach(function(color) {
          if(color.product.indexOf(self.product) !== -1) {
            self.colorsActive.push(color);
          }
        });
      }
    }
  });
});
