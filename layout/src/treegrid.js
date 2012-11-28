define(function(require, exports, modules) {
  var $ = require('$'),
    Tree = require('tree');

  var tree = new Tree({
    element: '#tree',
    headers: ['id','name'],
    url: 'data/tree.json'
  });
  tree.render();
});
