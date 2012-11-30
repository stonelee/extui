define(function(require, exports, module) {
  var $ = require('$'),
    _ = require('underscore'),
    handlebars = require('handlebars'),
    Widget = require('widget');

  var tpl = require('./grid.tpl');

  var Grid = Widget.extend({
    events: {
      'click .grid-row': 'click',
      'click :not(.icon-btn-is-disabled)[data-role=prev]': 'prevPage',
      'click :not(.icon-btn-is-disabled)[data-role=next]': 'nextPage',
      'click :not(.icon-btn-is-disabled)[data-role=first]': 'firstPage',
      'click :not(.icon-btn-is-disabled)[data-role=last]': 'lastPage',
      'click [data-role=refresh]': 'refresh'
    },

    click: function(e) {
      var cell = $(e.target);
      var row = cell.parents('tr');

      var id = row.attr('data-id');
      var data = _.find(this.data.data.result, function(record) {
        return record.id = id;
      });
      this.trigger('click', data, cell, row);
    },

    prevPage: function() {
      var id = this.data.data.prevPage;
      this.fetch(id);
    },
    nextPage: function() {
      var id = this.data.data.nextPage;
      this.fetch(id);
    },
    firstPage: function() {
      var id = this.data.data.firstPage;
      this.fetch(id);
    },
    lastPage: function() {
      var id = this.data.data.lastPage;
      this.fetch(id);
    },
    refresh: function() {
      var id = this.data.data.pageNumber;
      this.fetch(id);
    },

    fetch: function(id) {
      console.log(id);
      var that = this;
      var url = this.urlFormat(id);
      $.getJSON(url, function(data) {
        that._createGrid(data);
      });
    },

    urlFormat: function(id){
      return './grid_' + id + '.json';
    },

    setup: function() {
      var that = this;

      Grid.superclass.setup.call(this);

      var url = this.get('url');
      if (url) {
        $.getJSON(url, function(data) {
          that._createGrid(data);
        });
      } else {
        //避免向服务端发送请求
        var data = this.get('data');
        if (data) {
          this._createGrid(data);
        }
      }

    },
    _createGrid: function(data) {
      this.data = data;

      var title = this.get('title');
      var fields = this.get('fields');
      var records = $.map(data.data.result, function(record, index) {
        return {
          isAlt: index % 2 === 1,
          id: record.id,
          values: $.map(fields, function(field) {
            var value = record[field.name];
            value = _.escape(value);

            if ($.isFunction(field.render)) {
              return field.render(value);
            } else {
              return value;
            }
          })
        };
      });
      console.log(records);

      var html = handlebars.compile(tpl)({
        title: title,
        fields: fields,
        records: records,
        isFirst: function() {
          return data.data.pageNumber <= 1;
        },
        isLast: function() {
          return data.data.totalPages === 0 || data.data.pageNumber === data.data.totalPages;
        },
        hasPrev: data.data.hasPrev,
        hasNext: data.data.hasNext
      });
      this.element.html(html);
    }

  });

  module.exports = Grid;

});
