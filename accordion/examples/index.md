# accordion

---

````iframe:250
<link href="http://10.10.22.84/work/extui/css/all.css" rel="stylesheet">

<div class="bd" id="demo1">
  <div class="accordion-hd unselectable">
    <i class="icon icon-book-addresses"></i>
    <span>模块1</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-bd">
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
  <div class="accordion-hd unselectable">
    <span>模块1</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-bd">abc</div>
  <div class="accordion-hd unselectable">
    <span>模块1</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-bd">def</div>
</div>

<script type="text/javascript">
seajs.use(['accordion'], function(Accordion) {
  accordion = new Accordion({
    element: '#demo1',
    triggers: '.accordion-hd',
    panels: '.accordion-bd',
    height: 200
  });
});
</script>
````

##auto-render

````iframe:250
<link href="http://10.10.22.84/work/extui/css/all.css" rel="stylesheet">

<div class="bd" id="demo1" data-widget="accordion">
  <div class="accordion-hd unselectable" data-role="trigger">
    <i class="icon icon-book-addresses"></i>
    <span>模块1</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-bd" data-role="panel">xyz</div>
  <div class="accordion-hd unselectable" data-role="trigger">
    <span>模块1</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-bd" data-role="panel">abc</div>
  <div class="accordion-hd unselectable" data-role="trigger">
    <span>模块1</span>
    <i data-role="flag" class="icon icon-tool icon-tool-expand-bottom"></i>
  </div>
  <div class="accordion-bd" data-role="panel">def</div>
</div>

<script type="text/javascript">
seajs.use(['widget'], function(Widget) {
  Widget.autoRenderAll(function(){
    var accordion = Widget.query('#demo1');
    accordion.fitToHeight(200);
  });
});

</script>
````

## json

````iframe:250
<link href="http://10.10.22.84/work/extui/css/all.css" rel="stylesheet">

<div class="bd" id="demo1">
</div>

<script>
seajs.use(['accordion'], function(Accordion) {
  var accordion = new Accordion({
    element: '#demo1',
    url: './accordion.json',
    height: 200
  });
  accordion.on('itemclick',function(){
    console.log(arguments);
  })
});
</script>
````
