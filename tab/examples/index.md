# Tabs - 普通标签页

---

````iframe:50
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<div id="demo1">
  <ul class="tab-nav">
    <li class="tab-item">item</li>
    <li class="tab-item">item</li>
    <li class="tab-item">item</li>
  </ul>
  <div class="tab-strip"></div>
  <div class="tab-content">
    <div class="panel">a</div>
    <div class="panel">b</div>
    <div class="panel">c</div>
  </div>
</div>

<script type="text/javascript">
seajs.use(['tab'], function(Tab) {
  tabs = new Tab({
    element: '#demo1',
    triggers: '.tab-nav li',
    panels: '.tab-content div'
  });
});
</script>
````

##auto-render

````iframe:50
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<div id="demo2" data-widget="tab">
  <ul class="tab-nav" data-role="nav">
    <li class="tab-item">item</li>
    <li class="tab-item">item</li>
    <li class="tab-item">item</li>
  </ul>
  <div class="tab-strip"></div>
  <div class="tab-content" data-role="content">
    <div class="panel">a</div>
    <div class="panel">b</div>
    <div class="panel">c</div>
  </div>
</div>

<script type="text/javascript">
seajs.use(['widget'], function(Widget) {
  Widget.autoRenderAll();
});
</script>
````

