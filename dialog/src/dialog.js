define(function(require, exports, module) {
  var $ = require('$'),
    ConfirmBox = require('confirm-box');


  var Dialog = ConfirmBox.extend({
    attrs: {
      template: require('./dialog.tpl')
    }

  });

  module.exports = Dialog;

});
