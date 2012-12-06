define(function(require, exports, module) {
  var $ = require('$'),
    Calendar = require('calendar');

  $(document).delegate('.btn', 'mousedown', function(e) {
    $(this).addClass('btn-is-pressed');
  }).delegate('.btn', 'mouseup', function(e) {
    $(this).removeClass('btn-is-pressed');
  });

  new Calendar({
    target: '#date'
  });

});
