define(function(require, exports, module) {
  var $ = require('$'),
    mask = require('mask'),
    ConfirmBox = require('confirm-box');

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
