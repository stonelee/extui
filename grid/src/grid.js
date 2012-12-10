define(function(require, exports, module) {
  var $ = require('$'),
    _ = require('underscore'),
    handlebars = require('handlebars'),
    Widget = require('widget');

  var tpl = require('./grid.tpl');

  var Grid = Widget.extend({
    attrs: {
      //行默认高度
      rowHeight: 23
    },
    events: {
      'click .grid-hd': 'sort',
      'click .grid-row': 'click',
      'click :not(.icon-btn-is-disabled)[data-role=prev]': 'prevPage',
      'click :not(.icon-btn-is-disabled)[data-role=next]': 'nextPage',
      'click :not(.icon-btn-is-disabled)[data-role=first]': 'firstPage',
      'click :not(.icon-btn-is-disabled)[data-role=last]': 'lastPage',
      'click [data-role=refresh]': 'refresh',
      'keyup [data-role=num]': 'gotoPage'
    },

    sort: function(e) {
      var cell = $(e.target).closest('td');
      var name = cell.attr('data-name');

      //只能按照单独的列排序
      if (!this.oldSortHeader) {
        this.oldSortHeader = cell;
      } else {
        if (this.oldSortHeader.attr('data-name') !== name) {
          this.oldSortHeader.removeClass('grid-hd-is-desc grid-hd-is-asc');
          this.oldSortHeader = cell;
        }
      }

      if (cell.hasClass('grid-hd-is-desc')) {
        cell.removeClass('grid-hd-is-desc').addClass('grid-hd-is-asc');
        console.log(name, 'asc');
      } else {
        cell.removeClass('grid-hd-is-asc').addClass('grid-hd-is-desc');
        console.log(name, 'desc');
      }
    },

    click: function(e) {
      var cell = $(e.target);
      var row = cell.parents('tr');

      var id = row.attr('data-id');
      var data = _.find(this.data.result, function(record) {
        return record.id = id;
      });
      this.trigger('click', data, cell, row);
    },

    prevPage: function() {
      var id = this.data.prevPage;
      this.fetch(id);
    },
    nextPage: function() {
      var id = this.data.nextPage;
      this.fetch(id);
    },
    firstPage: function() {
      var id = this.data.firstPage;
      this.fetch(id);
    },
    lastPage: function() {
      var id = this.data.lastPage;
      this.fetch(id);
    },
    refresh: function() {
      var id = this.data.pageNumber;
      this.fetch(id);
    },
    gotoPage: function(e) {
      var $input = $(e.target);
      var value = $input.val();

      if (value && e.which == 13) {
        this.fetch(value);
      } else {
        value = value.replace(/\D/g, '');
        if (value) {
          value = parseInt(value, 10);

          var totalPages = this.data.totalPages;
          if (value > totalPages) {
            value = totalPages;
          } else if (value === 0) {
            value = 1;
          }
          $input.val(value);
        } else {
          $input.val('');
        }
      }
    },

    fetch: function(id) {
      var that = this;
      var url = this.urlFormat(id);
      $.getJSON(url, function(data) {
        that._createGrid(data.data);
      });
    },

    urlFormat: function(id) {
      return id;
    },

    setup: function() {
      var that = this;

      Grid.superclass.setup.call(this);

      var url = this.get('url');
      if (url) {
        $.getJSON(url, function(data) {
          that._createGrid(data.data);
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
      var records = $.map(data.result, function(record, index) {
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

      var html = handlebars.compile(tpl)({
        title: title,
        fields: fields,
        records: records,
        isFirst: function() {
          return data.pageNumber <= 1;
        },
        isLast: function() {
          return data.totalPages === 0 || data.pageNumber === data.totalPages;
        },
        hasPrev: data.hasPrev,
        hasNext: data.hasNext,
        totalCount: data.totalCount,
        pageSize: data.pageSize
      });
      this.element.html(html);

      this.$('[data-role=num]').val(data.pageNumber);

      this._fixFooterPosition();
    },

    _fixFooterPosition: function() {
      var blankHeight = this.get('rowHeight') * (this.data.pageSize - this.data.result.length);
      this.$('.grid-ft').css('margin-top', blankHeight);
    }

  });

  module.exports = Grid;

});
