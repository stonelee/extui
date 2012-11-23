define(function(require, exports, module) {
  var $ = require('$'),
    Widget = require('widget'),
    Templatable = require('templatable');

  var cidCounter = 0

  function uniqueCid() {
    return 'widget-' + cidCounter++
  }

  var AsycWidget = Widget.extend({
    initialize: function(config) {
      this.cid = uniqueCid()

      // 初始化 attrs
      var dataAttrsConfig = this._parseDataAttrsConfig(config)
      this.initAttrs(config, dataAttrsConfig)

      // 初始化 props
      this.createElement(function(){
        this.parseElement()
        this.initProps()

        // 初始化 events
        this.delegateEvents()

        // 子类自定义的初始化
        this.setup()

        // 保存实例信息
        this._stamp()

        this.render()
      })
    }
  })

  var Tree = AsycWidget.extend({
    //Implements: Templatable,

    attrs: {
      //template: require('./tree.tpl'),
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

    createElement: function(callback) {
      var url = this.get('url');
      var that = this;
      $.getJSON(url, function(data){
        var tpl = createTree(data);
        that.element = tpl;

        callback.call(that);
      });
    },

    parseElement: function() {
      this.model = {
        title: this.get('title')
      };
      Tree.superclass.parseElement.call(this);
    }


  });

  module.exports = Tree;

  var tree='';
  function createTree(data){
    tree += '<table class="grid tree unselectable" border="0" cellspacing="0" cellpadding="0"><tbody>';
    loopLevel(data,[]);
    tree += '</tbody></table>';
    return tree;
  }
  function createRow(icons, data) {
    var tr = '<tr class="grid-row"><td class="grid-cell">';
    for (var i = 0; i < icons.length; i++) {
      tr += '<i class="icon icon-tree-' + icons[i] + '"></i>';
    }
    tr += data.name?data.name:'';
    tr += '</td></tr>';
    tree += tr;
  }
  function loopLevel(data,prefix){
    for (var i = 0; i < data.children.length; i++) {
      var d = data.children[i];
      if (d.children.length === 0) {
        if (i != data.children.length-1){
          createRow(prefix.concat('elbow','leaf'), d);
        } else {
          createRow(prefix.concat('elbow-end','leaf'), d);
        }
      } else {
        if (i != data.children.length-1){
          createRow(prefix.concat('elbow-plus','folder'), d);
        } else {
          createRow(prefix.concat('elbow-end-plus','folder'), d);
        }
        if (i != data.children.length-1){
          loopLevel(d, prefix.concat('elbow-line'));
        }
        else {
          loopLevel(d, prefix.concat('elbow-empty'));
        }
      }
    }
  }

});
