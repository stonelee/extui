{{#each headers}}
  <div class="panel-header panel-accordion-header unselectable" data-role="trigger">
    <i class="icon {{this.icon}}"></i>
    <span>{{this.name}}</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-item" data-role="panel"></div>
{{/each}}
