define("kj/dialog/0.0.1/dialog-debug", ["$-debug", "arale/overlay/0.9.12/mask-debug", "arale/overlay/0.9.12/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/dialog/0.9.1/confirm-box-debug", "arale/dialog/0.9.1/anim-dialog-debug", "arale/dialog/0.9.1/base-dialog-debug", "arale/easing/1.0.0/easing-debug", "arale/widget/1.0.2/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug"], function(require, exports, module) {
  var $ = require('$-debug'),
    mask = require('arale/overlay/0.9.12/mask-debug'),
    ConfirmBox = require('arale/dialog/0.9.1/confirm-box-debug');

  var EVENT_NS = '.dialog-events-';

  mask.set('className', 'mask').set('opacity', 0.5).set('backgroundColor', 'rgb(204, 204, 204)');

  var Dialog = ConfirmBox.extend({
    attrs: {
      template: '<div class="dialog" style="left:50px;top:150px;"> {{#if hasCloseX}}<i class="icon icon-tool icon-tool-close" data-role="close"></i>{{/if}} {{#if hasTitle}} <div class="dialog-hd unselectable" data-role="head"> <span data-role="title">{{title}}</span> </div> {{/if}} <div class="dialog-bd"> {{#if icon}} <i class="icon icon-{{icon}}"></i> {{/if}} <span data-role="content">{{content}}</span> {{#if hasFoot}} <div class="dialog-toolbar" data-role="foot"> {{#if hasOk}}<button class="btn" data-role="confirm">确定</button>{{/if}} {{#if hasCancel}}<button class="btn" data-role="cancel">取消</button>{{/if}} </div> {{/if}} </div> </div>',
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
