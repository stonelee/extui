define(function(require, exports, module) {
  var $ = require('$'),
    AraleCalendar = require('arale-calendar');

  var template = require('./calendar.tpl');

  var Calendar = AraleCalendar.extend({
    attrs: {
      template: template
    }

  });

  module.exports = Calendar;

});
