define(function(require, exports, module) {
  var $ = require('$'),
    Switchable = require('switchable');

  var Tab = Switchable.extend({
    attrs: {
      triggerType: 'click',
      activeTriggerClass: 'tab-hd-is-active'
    },

    setup: function() {
      Tab.superclass.setup.call(this);

      this._fixNavHeight();
    },

    //nav比原始高度少1像素，盖住strip
    _fixNavHeight: function(){
      var nav = this.triggers.parent();
      if (navHeight === 0) {
        navHeight = nav.height();
      }
      if (navHeight > 0) {
        nav.height(navHeight - 1);
      }
    }

  });

  module.exports = Tab;

  var navHeight = 0;

});
