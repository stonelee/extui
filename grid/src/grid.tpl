{{#if title}}
<div class="panel-header unselectable">
  <span class="panel-header-span">{{title}}</span>
</div>
{{/if}}
<div class="panel-body" style="background-color:white;">
  <table class="grid grid-with-row-lines" border="0" cellspacing="0" cellpadding="0">
    <thead class="grid-header unselectable">
      <tr>
      {{#each fields}}
        <td class="grid-header-cell" data-name="{{name}}"{{#if width}} width="{{width}}"{{/if}}>
          <span>{{header}}</span>
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
    <i class="icon icon-btn {{#if isFirst}}icon-btn-is-disabled icon-grid-page-first-disabled{{else}}icon-grid-page-first{{/if}}" data-role="first"></i>
    <i class="icon icon-btn {{#if hasPrev}}icon-grid-page-prev{{else}}icon-btn-is-disabled icon-grid-page-prev-disabled{{/if}}" data-role="prev"></i>
    <i class="grid-separator"></i>
    <span class="grid-footer-text">当前第</span>
    <input class="form-text" style="width:40px;" type="text" data-role="num">
    <span class="grid-footer-text">/10页</span>
    <i class="grid-separator"></i>
    <i class="icon icon-btn {{#if hasNext}}icon-grid-page-next{{else}}icon-btn-is-disabled icon-grid-page-next-disabled{{/if}}" data-role="next"></i>
    <i class="icon icon-btn {{#if isLast}}icon-btn-is-disabled icon-grid-page-last-disabled{{else}}icon-grid-page-last{{/if}}" data-role="last"></i>
    <i class="grid-separator"></i>
    <i class="icon icon-btn icon-grid-refresh" data-role="refresh"></i>
    <span class="grid-footer-text" style="float:right;margin-right:100px;">共{{totalCount}}条记录，每页{{pageSize}}条</span>
  </div>
</div>
