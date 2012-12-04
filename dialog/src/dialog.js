define(function(require, exports, module) {
  var $ = require('$'),
    mask = require('mask'),
    ConfirmBox = require('confirm-box');

  var EVENT_NS = '.dialog-events-';

  mask.set('className', 'mask').set('opacity', 0.5).set('backgroundColor', 'rgb(204, 204, 204)');

  var Dialog = ConfirmBox.extend({
    attrs: {
      template: require('./dialog.tpl'),
      width: 300
    },

    parseElement: function() {
      this.model = {
        title: this.get('title'),
        content: this.get('content'),
        icon: this.get('icon'),
        hasTitle: this.get('hasTitle'),
        hasOk: this.get('hasOk'),
        hasCancel: this.get('hasCancel'),
        hasCloseX: this.get('hasCloseX'),
        hasFoot: this.get('hasOk') || this.get('hasCancel')
      };
      //直接调用父类的父类
      ConfirmBox.superclass.parseElement.call(this);
    },

    events: {
      'mousedown [data-role=head]': 'dragStart',
      'mouseup [data-role=head]': 'dragEnd'
    },

    dragStart: function(e) {
      //鼠标左键
      if (e.which == 1) {
        //避免鼠标变为text-selection
        e.preventDefault();

        this.onDrag = true;
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
      }
    },
    drag: function(e) {
      if (this.onDrag) {
        var deltaX = e.pageX - this.mouseX;
        var deltaY = e.pageY - this.mouseY;

        var p = this.element.offset();
        var newLeft = p.left + deltaX;
        var newTop = p.top + deltaY;
        this.element.offset({
          left: newLeft,
          top: newTop
        });
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
      }
    },
    dragEnd: function(e) {
      this.onDrag = false;
    },

    setup: function() {
      Dialog.superclass.setup.call(this);

      var that = this;
      $(document).on('mousemove' + EVENT_NS + this.cid, function() {
        that.drag.apply(that, arguments);
      });
    },
    destroy: function() {
      $(document).off('mousemove' + EVENT_NS + this.cid);
      return Dialog.superclass.destroy.call(this);
    }

  });

  Dialog.alert = function(content, callback) {
    new Dialog({
      content: content,
      icon: 'info',
      hasTitle: false,
      hasCancel: false,
      hasCloseX: false,
      onConfirm: function() {
        callback && callback();
        this.hide();
      }
    }).show();
  };

  Dialog.confirm = function(content, title, confirmCb, cancelCb) {
    new Dialog({
      content: content,
      title: title || '提示',
      icon: 'question',
      hasCloseX: false,
      onConfirm: function() {
        confirmCb && confirmCb();
        this.hide();
      },
      onClose: function() {
        cancelCb && cancelCb();
      }
    }).show();
  };

  Dialog.show = function(content, callback) {
    new Dialog({
      content: content,
      hasTitle: false,
      hasOk: false,
      hasCancel: false,
      hasCloseX: true,
      onConfirm: function() {
        callback && callback();
        this.hide();
      }
    }).show();
  };

  module.exports = Dialog;

});
