'use strict';

$(function() {
  new Vue({
    el: '#page',
    mounted: function() {
      var self = this;

      $.get('/dashboard/orders/info')
        .done(function(data) {
          data.attributes.forEach(function(attr) {
            console.info(attr);
            if(attr.group.indexOf(data.attributeGroups[0]._id) !== -1) {
              self.colors.push(attr);
            }

            if(attr.group.indexOf(data.attributeGroups[1]._id) !== -1) {
              self.glasses.push(attr);
            }

            if(attr.group.indexOf(data.attributeGroups[2]._id) !== -1) {
              self.glasses.push(attr);
            }
          });
        });
    },
    data: {
      colors: [],
      glasses: [],
      furnitura: []
    },
    methods: {
      addDoor: function() {
        alert('alarm');
      }
    }
  });
});
