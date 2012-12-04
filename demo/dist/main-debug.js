define("kj/demo/0.0.1/main-debug", ["$-debug", "kj/accordion/0.0.1/accordion-debug", "gallery/handlebars/1.0.0/handlebars-debug", "kj/tree/0.0.1/tree-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/switchable/0.9.11/switchable-debug", "arale/easing/1.0.0/easing-debug"], function(require, exports, module) {
  var $ = require('$-debug'),
    Accordion = require('kj/accordion/0.0.1/accordion-debug');

  var menu = new Accordion({
    element: '#menu',
    url: 'data/menu.json',
    height: 600-26
  });
  menu.on('itemclick',function(data){
    $('#main').attr('src', data.uri + '.html');
  });

});
