define(function(require, exports, module) {
  var $ = require('$'),
    Switchable = require('switchable');

  var Accordion = Switchable.extend({
    attrs: {
      triggerType: 'click',
      height: 0,
      activeTriggerClass: 'accordion-item-is-active'
    },

    setup: function(){
      Accordion.superclass.setup.call(this);
      this._fitToHeight();
    },

    _fitToHeight: function(){
      //element
      var height = this.get('height');
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
