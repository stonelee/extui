define("kj/calendar/0.0.1/calendar-debug", ["$-debug", "arale/calendar/0.8.0/calendar-debug", "gallery/moment/1.6.2/moment-debug", "arale/overlay/0.9.12/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/widget/1.0.2/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug", "i18n!lang-debug"], function(require, exports, module) {
  var $ = require('$-debug'),
    AraleCalendar = require('arale/calendar/0.8.0/calendar-debug');

  var template = '<div class="calendar"> <ul class="calendar-navigation" data-role="navigation-container"> <li class="calendar-previous-year" data-role="prev-year">&lt;&lt;</li> <li class="calendar-previous-month" data-role="prev-month">&lt;</li> <li class="calendar-month-year" data-role="month-year-container"> <span class="month" data-role="mode-month" data-value="{{month.current.value}}">{{_ month.current.label}}</span> <span class="year" data-role="mode-year">{{year.current.label}}</span> </li> <li class="calendar-next-month" data-role="next-month">&gt;</li> <li class="calendar-next-year" data-role="next-year">&gt;&gt;</li> </ul><ul class="calendar-control" data-role="pannel-container"> {{#if mode.date}} {{#each day.items}} <li class="calendar-day calendar-day-{{value}}" data-role="day" data-value="{{value}}">{{_ label}}</li> {{/each}} {{/if}} </ul><div class="calendar-data-container" data-role="data-container"> {{#if mode.date}} {{#each date.items}} <ul class="calendar-date-column"> {{#each this}} <li class="calendar-day-{{day}} {{className}} {{#unless available}}disabled-date{{/unless}} " data-role="date" data-value="{{value}}" >{{label}}</li> {{/each}} </ul> {{/each}} {{/if}}{{#if mode.month}} {{#each month.items}} <ul class="calendar-month-column"> {{#each this}} <li data-role="month" data-value="{{value}}">{{_ label}}</li> {{/each}} </ul> {{/each}} {{/if}}{{#if mode.year}} {{#each year.items}} <ul class="calendar-year-column"> {{#each this}} <li data-role="{{role}}" data-value="{{value}}">{{_ label}}</li> {{/each}} </ul> {{/each}} {{/if}} </div><div class="calendar-footer" data-role="time-container"> <button class="btn" data-role="today">{{_ message.today}}</button> {{#if mode.time}} <div class="calendar-time" data-role="time"><span class="calendar-hour">{{time.hour}}</span> : {{time.minute}}</div> {{/if}} </div></div>';

  var Calendar = AraleCalendar.extend({
    attrs: {
      //output为target，trigger为target后面的元素
      target: null,

      template: template,

      trigger: {
        value: '',
        getter: function(val) {
          val = val ? val : $(this.get('target')).next();
          return $(val);
        }
      },
      output: {
        value: '',
        getter: function(val) {
          val = val ? val : this.get('target');
          return $(val);
        }
      },

      align: {
        getter: function() {
          var target = this.get('target');
          if (target) {
            return {
              selfXY: [0, 0],
              baseElement: target,
              baseXY: [0, $(target).height() + 5]
            };
          }
          return {
            selfXY: [0, 0],
            baseXY: [0, 0]
          };
        }
      }
    },

    setup: function() {
      Calendar.superclass.setup.call(this);
      //不知道点击其他地方时为什么无法自动关闭
      this._blurHide([this.get('trigger')]);
    }

  });

  module.exports = Calendar;

});
