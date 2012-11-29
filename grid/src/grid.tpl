{{#if title}}
<div class="panel-header unselectable">
  <span class="panel-header-span">{{title}}</span>
</div>
{{/if}}
<div class="panel-body">
  <table class="grid grid-with-row-lines" border="0" cellspacing="0" cellpadding="0">
    <thead class="grid-header unselectable">
      <tr>
      {{#each fields}}
        <td class="grid-header-cell" width="{{width}}">
          <span>{{this.header}}</span>
        </td>
      {{/each}}
      </tr>
    </thead>
    <tbody>
      {{#each records}}
      <tr class="grid-row{{#if isAlt}} grid-row-alt{{/if}}" data-id="{{id}}">
        {{#each values}}
        <td class="grid-cell">{{{.}}}</td>
        {{/each}}
      </tr>
      {{/each}}
    </tbody>
  </table>
  <div class="grid-footer">
    <i class="icon icon-btn icon-grid-page-first-disabled"></i>
    <i class="icon icon-btn icon-grid-page-prev-disabled"></i>
    <i class="grid-separator"></i>
    <span class="grid-footer-text">当前第</span>
    <input class="form-text" style="width:40px;" type="text">
    <span class="grid-footer-text">/10页</span>
    <i class="grid-separator"></i>
    <i class="icon icon-btn icon-grid-page-next"></i>
    <i class="icon icon-btn icon-grid-page-last"></i>
    <i class="grid-separator"></i>
    <i class="icon icon-btn icon-btn-is-pressed icon-grid-refresh"></i>
    <span class="grid-footer-text" style="float:right;margin-right:100px;">共100条记录，每页10条</span>
  </div>
</div>
