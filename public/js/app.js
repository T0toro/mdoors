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


  if( $('.page-order').length === 0 ) { return false; }

  new Vue({
    el: '.page-order',
    beforeMount: function() {
      var selectEl = this.$el.querySelector('#product');

      if (selectEl) {
        this.product         = selectEl.value;
        this.seller          = this.$el.querySelector('#seller').value;
        this.departament     = this.$el.querySelector('#departament').value;
        this.productName     = selectEl.options[ selectEl.selectedIndex ].dataset.name;
        this.manufactureDate = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
        this.deliveryDate    = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
      }
    },
    mounted: function() {
      var self = this;

      $.ajaxSetup({
        headers: {'X-CSRF-Token': $('meta[name="_csrf"]').attr('content')}
      });

      $.get('/dashboard/orders/info')
        .done(function(data) {
          data.attributes.forEach(function(attr) {
            if(attr.group.indexOf(data.attributeGroups[0]._id) !== -1) {
              self.colors.push(attr);
              if(attr.product.indexOf(self.product) !== -1) { self.colorsActive.push(attr); }
            }

            if(attr.group.indexOf(data.attributeGroups[1]._id) !== -1) {
              self.glasses.push(attr);
              if(attr.product.indexOf(self.product) !== -1) { self.glassesActive.push(attr); }
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
      colorsActive: [],
      glasses: [],
      glassesActive: [],
      furnitura: [],

      // Order data
      doors: [],
      pagonazsh: [],
      furnityra: [],

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

      changeProduct: function(e) {
        var self = this,
            selectEl = e.target;

        this.colorsActive    = [];
        this.glassesActive   = [];
        this.manufactureDate = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
        this.deliveryDate    = moment(selectEl.options[ selectEl.selectedIndex ].dataset.manufacture).locale('ru').format('L');
        this.productName     = selectEl.options[ selectEl.selectedIndex ].dataset.name;
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

$(function() {
  $.ajaxSetup({
    headers: {'X-CSRF-Token': $('meta[name="_csrf"]').attr('content')}
  });

  $('.btn-print').click(function() {
    window.print();

    return false;
  });

  $('.btn-ozp-send').click(function() {
    $('#form-ozp').submit();
  });

  $('.btn-odds-send').click(function() {
    $('#form-odds').submit();
  });

  $('.btn-odds-send').click(function() {
    $('#form-odds').submit();
  });

  $('.btn-send-password').click(function() {
    var _id = $(this).data('id');

    $.post('/dashboard/users/restore', {
      id: _id
    });
  });
});
