<div class="dialog" style="left:50px;top:150px;">
  {{#if hasCloseX}}<i class="icon icon-tool icon-tool-close" data-role="close"></i>{{/if}}
  {{#if hasTitle}}
  <div class="dialog-hd unselectable" data-role="head">
    <span data-role="title">{{title}}</span>
  </div>
  {{/if}}
  <div class="dialog-bd">
    {{#if icon}}
    <i class="icon icon-{{icon}}"></i>
    {{/if}}
    <span data-role="content">{{content}}</span>
    {{#if hasFoot}}
    <div class="dialog-toolbar" data-role="foot">
      {{#if hasOk}}<button class="btn" data-role="confirm">确定</button>{{/if}}
      {{#if hasCancel}}<button class="btn" data-role="cancel">取消</button>{{/if}}
    </div>
    {{/if}}
  </div>
</div>
