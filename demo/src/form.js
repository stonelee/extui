define(function(require, exports, module) {
  var $ = require('$');

  $(document).delegate('.btn', 'mousedown', function(e) {
    $(this).addClass('btn-is-pressed');
  }).delegate('.btn', 'mouseup', function(e) {
    $(this).removeClass('btn-is-pressed');
  });

});
