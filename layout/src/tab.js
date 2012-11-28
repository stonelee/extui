define(function(require, exports, modules) {
  var $ = require('$'),
    Tab = require('tab');

  var tab = new Tab({
    element: '#tab',
    triggers: '.tab-nav li',
    panels: '.tab-content div'
  });
});
