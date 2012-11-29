define(function(require, exports, module) {
  var $ = require('$'),
    _ = require('underscore'),
    handlebars = require('handlebars'),
    Widget = require('widget');

  var tpl = require('./grid.tpl');

  var Grid = Widget.extend({
    events: {
      'click .grid-row': 'click'
    },

    click: function(e){
      var cell = $(e.target);
      var row = cell.parents('tr');

      var id = row.attr('data-id');
      var data = _.find(this.data.data.result, function(record){
        return record.id = id;
      });
      this.trigger('click', data, cell, row);
    },

    setup: function(){
      var that = this;

      Grid.superclass.setup.call(this);

      var url = this.get('url');
      if (url){
        $.getJSON(url, function(data){
          that._createGrid(data);
        });
      } else {
        //避免向服务端发送请求
        var data = this.get('data');
        if (data){
          this._createGrid(data);
        }
      }

    },
    _createGrid: function(data){
      this.data = data;

      var title = this.get('title');
      var fields = this.get('fields');
      var records = $.map(data.data.result, function(record, index){
        return {
          isAlt: index % 2 === 1,
          id: record.id,
          values: $.map(fields, function(field){
            var value = record[field.name];
            value = _.escape(value);

            if ($.isFunction(field.render)){
              return field.render(value);
            } else {
              return value;
            }
          })
        };
      });
      console.log(records);

      var html = handlebars.compile(tpl)({
        title: this.title,
        fields: fields,
        records: records
      });
      this.element.html(html);
    }

  });

  module.exports = Grid;

});
