define("kj/dialog/0.0.1/dialog",["$","arale/overlay/0.9.12/mask","arale/overlay/0.9.12/overlay","arale/position/1.0.0/position","arale/iframe-shim/1.0.0/iframe-shim","arale/widget/1.0.2/widget","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events","arale/dialog/0.9.1/confirm-box","arale/dialog/0.9.1/anim-dialog","arale/dialog/0.9.1/base-dialog","arale/easing/1.0.0/easing","arale/widget/1.0.2/templatable","gallery/handlebars/1.0.0/handlebars"],function(e,t,n){var r=e("$"),i=e("arale/overlay/0.9.12/mask"),s=e("arale/dialog/0.9.1/confirm-box"),o=".dialog-events-";i.set("className","mask").set("opacity",.5).set("backgroundColor","rgb(204, 204, 204)");var u=s.extend({attrs:{template:'<div class="window" style="left:50px;top:150px;"> {{#if hasCloseX}}<i class="icon icon-tool icon-tool-close" data-role="close"></i>{{/if}} {{#if hasTitle}} <div class="window-header unselectable" data-role="head"> <span data-role="title">{{title}}</span> </div> {{/if}} <div class="window-body"> {{#if icon}} <i class="icon icon-{{icon}}"></i> {{/if}} <span data-role="content">{{content}}</span> {{#if hasFoot}} <div class="window-toolbar" data-role="foot"> {{#if hasOk}}<button class="btn" data-role="confirm">确定</button>{{/if}} {{#if hasCancel}}<button class="btn btn-is-pressed" data-role="cancel">取消</button>{{/if}} </div> {{/if}} </div> </div>',width:300},parseElement:function(){this.model={title:this.get("title"),content:this.get("content"),icon:this.get("icon"),hasTitle:this.get("hasTitle"),hasOk:this.get("hasOk"),hasCancel:this.get("hasCancel"),hasCloseX:this.get("hasCloseX"),hasFoot:this.get("hasOk")||this.get("hasCancel")},s.superclass.parseElement.call(this)},events:{"mousedown [data-role=head]":"dragStart","mouseup [data-role=head]":"dragEnd"},dragStart:function(e){e.which==1&&(e.preventDefault(),this.onDrag=!0,this.mouseX=e.pageX,this.mouseY=e.pageY)},drag:function(e){if(this.onDrag){var t=e.pageX-this.mouseX,n=e.pageY-this.mouseY,r=this.element.offset(),i=r.left+t,s=r.top+n;this.element.offset({left:i,top:s}),this.mouseX=e.pageX,this.mouseY=e.pageY}},dragEnd:function(e){this.onDrag=!1},setup:function(){u.superclass.setup.call(this);var e=this;r(document).on("mousemove"+o+this.cid,function(){e.drag.apply(e,arguments)})},destroy:function(){return r(document).off("mousemove"+o+this.cid),u.superclass.destroy.call(this)}});u.alert=function(e,t){(new u({content:e,icon:"info",hasTitle:!1,hasCancel:!1,hasCloseX:!1,onConfirm:function(){t&&t(),this.hide()}})).show()},u.confirm=function(e,t,n,r){(new u({content:e,title:t||"提示",icon:"question",hasCloseX:!1,onConfirm:function(){n&&n(),this.hide()},onClose:function(){r&&r()}})).show()},u.show=function(e,t){(new u({content:e,hasTitle:!1,hasOk:!1,hasCancel:!1,hasCloseX:!0,onConfirm:function(){t&&t(),this.hide()}})).show()},n.exports=u});