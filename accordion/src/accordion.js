define(function(require, exports, module) {
  var $ = require('$'),
    handlebars = require('handlebars'),
    Tree = require('tree'),
    Switchable = require('switchable');

  var tpl = require('./accordion.tpl');

  var Accordion = Switchable.extend({
    attrs: {
      triggerType: 'click',
      height: 0,
      activeTriggerClass: 'accordion-header-is-active'
    },

    setup: function(){
      var that = this;
      var url = this.get('url');
      if (url){
        $.getJSON(url, function(data){
          var tpl = that._createAccordion(data);
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
      for (var i = 0; i < data.length; i++) {
        new Tree({
          element: this.panels[i],
          data: data[i]
        });
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
