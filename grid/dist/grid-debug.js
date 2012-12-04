define("kj/grid/0.0.1/grid-debug", ["$-debug", "gallery/underscore/1.4.2/underscore-debug", "gallery/handlebars/1.0.0/handlebars-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug"], function(require, exports, module) {
  var $ = require('$-debug'),
    _ = require('gallery/underscore/1.4.2/underscore-debug'),
    handlebars = require('gallery/handlebars/1.0.0/handlebars-debug'),
    Widget = require('arale/widget/1.0.2/widget-debug');

  var tpl = '{{#if title}} <div class="panel-header unselectable"> <span class="panel-header-span">{{title}}</span> </div> {{/if}} <div class="panel-body" style="background-color:white;"> <table class="grid grid-with-row-lines" border="0" cellspacing="0" cellpadding="0"> <thead class="grid-header unselectable"> <tr> {{#each fields}} <td class="grid-header-cell" data-name="{{name}}"{{#if width}} width="{{width}}"{{/if}}> <span>{{header}}</span> </td> {{/each}} </tr> </thead> <tbody> {{#each records}} <tr class="grid-row{{#if isAlt}} grid-row-alt{{/if}}" data-id="{{id}}"> {{#each values}} <td class="grid-cell">{{{.}}}</td> {{/each}} </tr> {{/each}} </tbody> </table> <div class="grid-footer"> <i class="icon icon-btn {{#if isFirst}}icon-btn-is-disabled icon-grid-page-first-disabled{{else}}icon-grid-page-first{{/if}}" data-role="first"></i> <i class="icon icon-btn {{#if hasPrev}}icon-grid-page-prev{{else}}icon-btn-is-disabled icon-grid-page-prev-disabled{{/if}}" data-role="prev"></i> <i class="grid-separator"></i> <span class="grid-footer-text">当前第</span> <input class="form-text" style="width:40px;" type="text" data-role="num"> <span class="grid-footer-text">/10页</span> <i class="grid-separator"></i> <i class="icon icon-btn {{#if hasNext}}icon-grid-page-next{{else}}icon-btn-is-disabled icon-grid-page-next-disabled{{/if}}" data-role="next"></i> <i class="icon icon-btn {{#if isLast}}icon-btn-is-disabled icon-grid-page-last-disabled{{else}}icon-grid-page-last{{/if}}" data-role="last"></i> <i class="grid-separator"></i> <i class="icon icon-btn icon-grid-refresh" data-role="refresh"></i> <span class="grid-footer-text" style="float:right;margin-right:100px;">共{{totalCount}}条记录，每页{{pageSize}}条</span> </div> </div>';

  var Grid = Widget.extend({
    attrs: {
      //行默认高度
      rowHeight: 23
    },
    events: {
      'click .grid-header': 'sort',
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
          this.oldSortHeader.removeClass('grid-header-is-desc grid-header-is-asc');
          this.oldSortHeader = cell;
        }
      }

      if (cell.hasClass('grid-header-is-desc')) {
        cell.removeClass('grid-header-is-desc').addClass('grid-header-is-asc');
        console.log(name, 'asc');
      } else {
        cell.removeClass('grid-header-is-asc').addClass('grid-header-is-desc');
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
      this.$('.grid-footer').css('margin-top', blankHeight);
    }

  });

  module.exports = Grid;

});
