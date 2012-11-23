<tr class="grid-row" {{#if expanded}}data-status="expanded"{{/if}} {{#if leaf}}data-type="leaf"{{/if}}>
  <td class="grid-cell">
    {{#each icons}}<i class="icon icon-tree-{{this}}"></i>{{/each}}{{name}}
  </td>
  {{#each grids}}
  <td class="grid-cell">{{this}}</td>
  {{/each}}
</tr>
