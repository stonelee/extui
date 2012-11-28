define(function(require, exports, modules) {
  var $ = require('$'),
    Accordion = require('accordion');

  var menu = new Accordion({
    element: '#menu',
    url: 'data/menu.json',
    height: 274
  });
  menu.on('itemclick',function(data){
    $('#main').attr('src', data.uri + '.html');
  });

});
