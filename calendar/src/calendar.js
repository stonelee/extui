define(function(require, exports, module) {
  var $ = require('$'),
    AraleCalendar = require('arale-calendar');

  var template = require('./calendar.tpl');

  var Calendar = AraleCalendar.extend({
    attrs: {
      //output为target，trigger为target后面的元素
      target: null,

      template: template,

      trigger: {
        value: '',
        getter: function(val) {
          val = val ? val : $(this.get('target')).next();
          return $(val);
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
      Calendar.superclass.setup.call(this);
      //不知道点击其他地方时为什么无法自动关闭
      this._blurHide([this.get('trigger')]);
    }

  });

  module.exports = Calendar;

});
