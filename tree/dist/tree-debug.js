define("kj/tree/0.0.1/tree-debug", ["$-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "gallery/handlebars/1.0.0/handlebars-debug"], function(require, exports, module) {
  var $ = require('$-debug'),
    Widget = require('arale/widget/1.0.2/widget-debug'),
    handlebars = require('gallery/handlebars/1.0.0/handlebars-debug');

  var rowTpl = '<tr class="grid-row" {{#if expanded}}data-status="expanded"{{/if}} {{#if leaf}}data-type="leaf"{{/if}}> <td class="grid-cell"> {{#each icons}}<i class="icon icon-tree-{{this}}"></i>{{/each}}{{name}} </td> {{#each grids}} <td class="grid-cell">{{this}}</td> {{/each}} </tr>';

  var Tree = Widget.extend({
    setup: function() {
      var that = this;

      var url = this.get('url');
      if (url){
        $.getJSON(url, function(data){
          var tpl = that._createTree(data);
          that.element.html(tpl);
        });
      } else {
        var data = this.get('data');
        if (data){
          var tpl = that._createTree(data);
          that.element.html(tpl);
        }
      }
    },

    events: {
      'click .grid-row': 'click'
    },

    click: function(e){
      var node = $(e.target);
      if (/minus|plus/.test(node.attr('class'))){
        this.toggle(node);
      } else {
        node.parents('tr').addClass('grid-row-is-selected')
          .siblings().removeClass('grid-row-is-selected');
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
    _treeTpl: '',

    _createTree: function(data){
      this._treeTpl = '<table class="grid tree unselectable" border="0" cellspacing="0" cellpadding="0"><tbody>';
      this._loopRow(data,[]);
      this._treeTpl += '</tbody></table>';
      return this._treeTpl;
    },

    _createRow: function(icons, data) {
      var headers = this.get('headers');
      var grids = headers? $.map(headers,function(header){
        return data[header];
      }):[];

      var row = handlebars.compile(rowTpl)({
        icons: icons,
        name: data.name,
        expanded: data.children.length !== 0? true:false,
        leaf: data.children.length === 0? true:false,
        grids: grids
      });
      this._treeTpl += row;
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
