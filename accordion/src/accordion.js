define(function(require, exports, module) {
  var $ = require('$'),
    Switchable = require('switchable');

  var Accordion = Switchable.extend({
    attrs: {
      triggerType: 'click',
      height: 0,
      activeTriggerClass: 'accordion-header-is-active'
    },

    setup: function(){
      Accordion.superclass.setup.call(this);

      this.fitToHeight(this.get('height'));
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
