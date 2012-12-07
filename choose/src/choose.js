define(function(require, exports, module) {
  var $ = require('$'),
    Overlay = require('overlay');

  var Choose = Overlay.extend({
  });

  Choose.autoRender = function(config) {
    console.log(config);
    new Choose(config);
  };
  module.exports = Choose;
});
