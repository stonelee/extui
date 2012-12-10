{{#each headers}}
  <div class="accordion-hd unselectable" data-role="trigger">
    <i class="icon {{this.icon}}"></i>
    <span>{{this.name}}</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-bd" data-role="panel"></div>
{{/each}}
