# accordion

---

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<div class="panel" id="demo1">
  <div class="panel-header panel-accordion-header unselectable">
    <i class="icon icon-book-addresses"></i>
    <span>模块1</span>
    <i class="icon icon-tool icon-tool-collapse-top"></i>
  </div>
  <div class="accordion-item">
    <table style="width:100%" class="grid" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr class="grid-row">
          <td class="grid-cell">
            <i class="icon icon-tree-elbow"></i><i class="icon icon-book"></i>First
          </td>
        </tr>
        <tr class="grid-row">
          <td class="grid-cell">
            <i class="icon icon-tree-elbow"></i><i class="icon icon-book"></i>First
          </td>
        </tr>
        <tr class="grid-row">
          <td class="grid-cell">
            <i class="icon icon-tree-elbow-end"></i><i class="icon icon-book"></i>First
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="panel-header panel-accordion-header unselectable">
    <span>模块1</span>
    <i class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-item">abc</div>
  <div class="panel-header panel-accordion-header unselectable">
    <span>模块1</span>
    <i class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-item">def</div>
</div>

<script type="text/javascript">
seajs.use(['accordion'], function(Accordion) {
  accordion = new Accordion({
    element: '#demo1',
    triggers: '.panel-accordion-header',
    panels: '.accordion-item',
    height: 300
  });
});
</script>
````
