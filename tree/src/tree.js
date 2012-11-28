define(function(require, exports, module) {
  var $ = require('$'),
    Widget = require('widget'),
    handlebars = require('handlebars');

  var rowTpl = require('./row.tpl'),
    headerTpl = require('./header.tpl');

  var Tree = Widget.extend({
    setup: function() {
      var that = this;

      var url = this.get('url');
      if (url){
        $.getJSON(url, function(data){
          that.data = data;
          var tpl = that._createTree(data);
          that.element.html(tpl);
        });
      } else {
        //避免向服务端发送请求
        var data =this.get('data');
        if (data){
          this.data = data;
          var tpl = that._createTree(data);
          that.element.html(tpl);
        }
      }

      this.render();
    },

    events: {
      'click .grid-row': 'click'
    },

    click: function(e){
      var node = $(e.target);
      var data = node.parents('tr').data('data');

      //打开折叠
      if (/minus|plus/.test(node.attr('class'))){
        this.toggle(node);
      } else {
        //点击事件
        node.parents('tr').addClass('grid-row-is-selected')
          .siblings().removeClass('grid-row-is-selected');

        //参数为点击项对应数据，节点，整个tree数据
        this.trigger('click', data, node, this.data);
      }
    },

    toggle: function(node){
      var index = node.parent().children().index(node);
      var row = node.parents('tr');

      var cls = node.attr('class');
      if (/minus/.test(cls)){
        cls = cls.replace('minus', 'plus');

        toggle('hide', row, index);
        row.removeAttr('data-status');
      } else if (/plus/.test(cls)){
        cls = cls.replace('plus', 'minus');

        toggle('show', row, index);
        row.attr('data-status', 'expanded');
      } else {
        seajs.console('不合法的class');
      }
      node.attr('class', cls);
    },

    //生成tree
    _tree: null,

    _createTree: function(data){
      this._tree = $('<table>', {
        'class': 'grid tree unselectable',
        border: '0',
        cellspacing: '0',
        cellpadding: '0'
      }).append('<tbody>');

      this._createHeader();

      this._loopRow(data,[]);
      return this._tree;
    },

    _createHeader: function(){
      var headers = this.get('headers');
      var header = handlebars.compile(headerTpl)({
        headers: headers
      });
      this._tree.append(header);
    },

    _createRow: function(icons, data) {
      var fields = this.get('fields');
      var grids = fields? $.map(fields,function(field){
        return data[field];
      }):[];

      var row = handlebars.compile(rowTpl)({
        icons: icons,
        name: data.name,
        expanded: data.children.length !== 0? true:false,
        leaf: data.children.length === 0? true:false,
        grids: grids
      });
      row = $(row);
      row.data('data', data);
      this._tree.append(row);
    },

    _loopRow: function(data, prefix){
      for (var i = 0; i < data.children.length; i++) {
        var d = data.children[i];
        if (d.children.length === 0) {
          if (i != data.children.length-1){
            this._createRow(prefix.concat('elbow','leaf'), d);
          } else {
            this._createRow(prefix.concat('elbow-end','leaf'), d);
          }
        } else {
          if (i != data.children.length-1){
            this._createRow(prefix.concat('elbow-minus','folder'), d);
          } else {
            this._createRow(prefix.concat('elbow-end-minus','folder'), d);
          }
          if (i != data.children.length-1){
            this._loopRow(d, prefix.concat('elbow-line'));
          }
          else {
            this._loopRow(d, prefix.concat('elbow-empty'));
          }
        }
      }
    }

  });

  module.exports = Tree;

  function toggle(type, row, index){
    var nextRow = row.next();
    var nextNode = nextRow.children().eq(0).children().eq(index);
    if (nextNode.hasClass('icon-tree-elbow-line') || nextNode.hasClass('icon-tree-elbow-empty')){
      nextRow[type]();

      if (type == 'show'){
        if (nextRow.attr('data-type') == 'leaf'){
          toggle(type, nextRow, index);
        } else {
          if (nextRow.attr('data-status') == 'expanded'){
            toggle(type, nextRow, index);
          }
        }
      } else {
        toggle(type, nextRow, index);
      }
    }
  }

});
