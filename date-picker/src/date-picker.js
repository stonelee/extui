define(function(require, exports, module) {
  var $ = require('$'),
    Calendar = require('calendar');

  var template = require('./date-picker.tpl');

  var DatePicker = Calendar.extend({
    attrs: {
      //output为target，trigger为target后面的元素
      target: null,

      template: template,

      trigger: {
        value: '',
        getter: function() {
          if (!this.$trigger){
            var target = $(this.get('target'));
            this.$trigger = $('<i class="form-trigger form-date-trigger"></i>').insertAfter(target);
          }
          return this.$trigger;
        }
      },
      output: {
        value: '',
        getter: function(val) {
          val = val ? val : this.get('target');
          return $(val);
        }
      },

      align: {
        getter: function() {
          var target = this.get('target');
          if (target) {
            return {
              selfXY: [0, 0],
              baseElement: target,
              baseXY: [0, $(target).height() + 5]
            };
          }
          return {
            selfXY: [0, 0],
            baseXY: [0, 0]
          };
        }
      }
    },

    setup: function() {
      DatePicker.superclass.setup.call(this);

      //减少input的宽度
      var output = $(this.get('output'));
      output.width(output.width() - 17);
    }

  });

  DatePicker.autoRender = function(config) {
    config.target = config.element;
    config.element = '';
    new DatePicker(config);
  };

  module.exports = DatePicker;

});
