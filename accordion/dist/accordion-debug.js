define("kj/accordion/0.0.1/accordion-debug", ["$-debug", "gallery/handlebars/1.0.0/handlebars-debug", "kj/tree/0.0.1/tree-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/switchable/0.9.11/switchable-debug", "arale/easing/1.0.0/easing-debug"], function(require, exports, module) {
  var $ = require('$-debug'),
    handlebars = require('gallery/handlebars/1.0.0/handlebars-debug'),
    Tree = require('kj/tree/0.0.1/tree-debug'),
    Switchable = require('arale/switchable/0.9.11/switchable-debug');

  var tpl = '{{#each headers}} <div class="accordion-hd unselectable" data-role="trigger"> <i class="icon {{this.icon}}"></i> <span>{{this.name}}</span> <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i> </div> <div class="accordion-bd" data-role="panel"></div> {{/each}}';

  var Accordion = Switchable.extend({
    attrs: {
      triggerType: 'click',
      height: 0,
      activeTriggerClass: 'accordion-hd-is-active'
    },

    setup: function(){
      var that = this;
      var url = this.get('url');
      if (url){
        $.getJSON(url, function(data){
          var tpl = that._createAccordion(data);
          console.log(tpl);
          that.element.html(tpl);

          Accordion.superclass.setup.call(that);
          that.fitToHeight(that.get('height'));

          that._createSubPanel(data);
        });
      } else {
        Accordion.superclass.setup.call(this);
        this.fitToHeight(this.get('height'));
      }

    },

    _createAccordion: function(data){
      html = handlebars.compile(tpl)({
        headers: data
      });
      return html;
    },
    _createSubPanel: function(data){
      var that = this;
      function onClick(a,b,c){
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift('itemclick');
        that.trigger.apply(that, args);
      }

      for (var i = 0; i < data.length; i++) {
        var tree = new Tree({
          element: this.panels[i],
          data: data[i]
        });
        tree.on('click', onClick);
      }
    },

    _switchTrigger: function(toIndex, fromIndex) {
      Accordion.superclass._switchTrigger.apply(this, arguments);

      this.triggers.eq(fromIndex).find('[data-role=flag]')
        .toggleClass('icon-tool-collapse-top icon-tool-expand-bottom');
      this.triggers.eq(toIndex).find('[data-role=flag]')
        .toggleClass('icon-tool-collapse-top icon-tool-expand-bottom');
    },

    //高度扩展到height
    fitToHeight: function(height){
      //element
      if (height > 0){
        this.element.height(height);
      }

      //panels
      var panelHeight = height - this.triggers.outerHeight() * this.triggers.length;
      this.panels.height(panelHeight);
    }
  });

  module.exports = Accordion;


});
