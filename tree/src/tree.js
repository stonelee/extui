define(function(require, exports, module) {
  var $ = require('$'),
    Widget = require('widget');

  var Tree = Widget.extend({
    setup: function() {
      var that = this;

      var url = this.get('url');
      $.getJSON(url, function(data){
        var tpl = createTree(data);
        that.element.html(tpl);
      });
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

  var treeTpl = '';
  function createTree(data){
    treeTpl = '<table class="grid tree unselectable" border="0" cellspacing="0" cellpadding="0"><tbody>';
    loopLevel(data,[]);
    treeTpl += '</tbody></table>';
    return treeTpl;
  }
  function createRow(icons, data) {
    var expanded = '';
    var type = '';
    if (data.children.length !== 0){
      expanded = ' data-status="expanded"';
    } else {
      type = ' data-type="leaf"';
    }

    var tr = '<tr class="grid-row"' + expanded + type + '><td class="grid-cell">';
    for (var i = 0; i < icons.length; i++) {
      tr += '<i class="icon icon-tree-' + icons[i] + '"></i>';
    }
    tr += data.name?data.name:'';
    tr += '</td></tr>';

    treeTpl += tr;
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
          createRow(prefix.concat('elbow-minus','folder'), d);
        } else {
          createRow(prefix.concat('elbow-end-minus','folder'), d);
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
