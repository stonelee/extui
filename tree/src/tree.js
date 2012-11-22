define(function(require, exports, module) {
  var $ = require('$'),
    Widget = require('widget'),
    Templatable = require('templatable');

  var Tree = Widget.extend({
    Implements: Templatable,

    attrs: {
      template: require('./tree.tpl'),
      title: 'title'
    },

    events: {
      'click [data-type]=toggle': 'toggle',
      'click .tree-cell': 'click'
    },

    toggle: function(e){
      var node = $(e.target);

      var cls = node.attr('class');
      if (/minus/.test(cls)){
        cls = cls.replace('minus', 'plus');
      } else if (/plus/.test(cls)){
        cls = cls.replace('plus', 'minus');
      } else {
        seajs.console('不合法的class');
      }
      node.attr('class', cls);

      //$(this).parent().next().slideToggle();

    },

    click: function(e){
      var node = $(e.target);
      console.log(node);

    },

    parseElement: function() {
      var url = this.get('url');
      $.getJSON(url, function(data){
        console.log(data);
      });
      this.model = {
        title: this.get('title')
      };
      Tree.superclass.parseElement.call(this);
    }


  });

  module.exports = Tree;
});
