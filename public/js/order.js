$(function() {
  new Vue({
    el: '.page-order',
    beforeMount: function() {
      var selectEl = this.$el.querySelector('#product');

      if (selectEl) {
        this.product = selectEl.value;
        this.seller = this.$el.querySelector('#seller').value;
        this.departament = this.$el.querySelector('#departament').value;
      }


      if (Boolean(selectEl.options[selectEl.selectedIndex])) {
        this.productName = selectEl.options[selectEl.selectedIndex].dataset.name;
        this.manufactureDate = moment(selectEl.options[selectEl.selectedIndex].dataset.manufacture).locale('ru').format('L');
        this.deliveryDate = moment(selectEl.options[selectEl.selectedIndex].dataset.manufacture).locale('ru').format('L');
      }
    },
    mounted: function() {
      var self = this;

      $.ajaxSetup({
        headers: { 'X-CSRF-Token': $('meta[name="_csrf"]').attr('content') }
      });

      $.get('/dashboard/orders/info')
        .done(function(data) {
          data.attributes.forEach(function(attr) {
            if (data.attributeGroups[0] && attr.group.indexOf(data.attributeGroups[0]._id) !== -1) {
              self.colors.push(attr);
              if (attr.product.indexOf(self.product) !== -1) { self.colorsActive.push(attr); }
            }

            if (data.attributeGroups[0] && attr.group.indexOf(data.attributeGroups[0]._id) !== -1 && (data.products[5] && attr.product.indexOf(data.products[5]._id) !== -1)) {
              console.info('test', attr);
              self.arkaColors.push(attr);
            }


            if (data.attributeGroups[1] && attr.group.indexOf(data.attributeGroups[1]._id) !== -1) {
              self.glasses.push(attr);
              if (attr.product.indexOf(self.product) !== -1) { self.glassesActive.push(attr); }
            }

            if (data.attributeGroups[2] && attr.group.indexOf(data.attributeGroups[2]._id) !== -1) {
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
      comment: '',
      manufactureDate: '',
      deliveryDate: '',
      deliveryPrice: 350,

      // Form data
      departament: '',
      seller: '',
      productName: '',
      product: '',
      discount: 0,

      colors: [],
      arkaColors: [],
      colorsActive: [],
      glasses: [],
      glassesActive: [],
      furnitura: [],

      // Order data
      doors: [],
      pagonazsh: [],
      furnityra: [],
      arki: [],

      // Balance
      balance: 0,
      prepay: 0
    },
    computed: {
      doorsTotalPrice: function() {
        var totalPrice = 0;

        this.doors.forEach(function(door) {
          totalPrice += parseInt(door.count) * parseInt(door.price);
        });

        return totalPrice;
      },

      pagonTotalPrice: function() {
        var totalPrice = 0;

        this.pagonazsh.forEach(function(pagon) {
          totalPrice += parseInt(pagon.count) * parseInt(pagon.price);
        });

        return totalPrice;
      },

      furnTotalPrice: function() {
        var totalPrice = 0;

        this.furnityra.forEach(function(furn) {
          totalPrice += parseInt(furn.count) * parseInt(furn.price);
        });

        return totalPrice;
      },

      arkTotalPrice: function() {
        var totalPrice = 0;

        this.arki.forEach(function(arka) {
          totalPrice += parseInt(arka.count) * parseInt(arka.price);
        });

        return totalPrice;
      }
    },
    methods: {
      removeItem: function(collection, index) {
        this[collection].splice(index, 1);
      },
      createOrder: function(e) {
        e.preventDefault();

        var order = {
          // Seller info
          departament: this.departament,
          user: this.seller,
          product: this.productName,
          productID: this.product,
          discount: this.discount,
          deliveryPrice: this.deliveryPrice,

          // Bayer info
          fio: this.fio,
          address: this.address,
          telephone: this.telephone,
          manufactureDate: this.manufactureDate,
          deliveryDate: this.deliveryDate,
          comment: this.comment,

          // Order info
          doors: this.doors,
          pagonazsh: this.pagonazsh,
          furnityra: this.furnityra,
          arki: this.arki,

          // Balance
          balance: this.balance,
          prepay: this.prepay
        };

        $.ajax({
          url: '/dashboard/orders/store',
          dataType: 'json',
          method: 'POST',
          data: order
        }).done(function(data) {
          window.location = '/dashboard/orders';
        });
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


      addArk: function() {
        var formData = $('#form-arka').serializeArray(),
          orderData = {};

        if (Array.isArray(formData) && !!formData.length) {
          formData.forEach(function(attr) {
            orderData[attr.name] = attr.value;
          });

          this.arki.push(orderData);
        }
      },

      changeProduct: function(e) {
        var self = this,
          selectEl = e.target;

        this.colorsActive = [];
        this.glassesActive = [];
        this.manufactureDate = moment(selectEl.options[selectEl.selectedIndex].dataset.manufacture).locale('ru').format('L');
        this.deliveryDate = moment(selectEl.options[selectEl.selectedIndex].dataset.manufacture).locale('ru').format('L');
        this.productName = selectEl.options[selectEl.selectedIndex].dataset.name;
        this.product = selectEl.value;

        this.colors.forEach(function(color) {
          if (color.product.indexOf(self.product) !== -1) {
            self.colorsActive.push(color);
          }
        });

        this.glasses.forEach(function(glass) {
          if (glass.product.indexOf(self.product) !== -1) {
            self.glassesActive.push(glass);
          }
        });
      }
    }
  });
});
