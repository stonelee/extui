# Tabs - 普通标签页

---

````iframe:50
<link href="http://10.10.22.84/work/extui/css/all.css" rel="stylesheet">

<div id="demo1">
  <ul class="tab-nav">
    <li class="tab-hd">item</li>
    <li class="tab-hd">item</li>
    <li class="tab-hd">item</li>
  </ul>
  <div class="tab-strip"></div>
  <div class="tab-bd">
    <div class="bd">a</div>
    <div class="bd">b</div>
    <div class="bd">c</div>
  </div>
</div>

<script type="text/javascript">
seajs.use(['tab'], function(Tab) {
  tabs = new Tab({
    element: '#demo1',
    triggers: '.tab-nav li',
    panels: '.tab-bd div'
  });
});
</script>
````

##auto-render

````iframe:50
<link href="http://10.10.22.84/work/extui/css/all.css" rel="stylesheet">

<div id="demo2" data-widget="tab">
  <ul class="tab-nav" data-role="nav">
    <li class="tab-hd">item</li>
    <li class="tab-hd">item</li>
    <li class="tab-hd">item</li>
  </ul>
  <div class="tab-strip"></div>
  <div class="tab-bd" data-role="content">
    <div class="bd">a</div>
    <div class="bd">b</div>
    <div class="bd">c</div>
  </div>
</div>

<script type="text/javascript">
seajs.use(['widget'], function(Widget) {
  Widget.autoRenderAll();
});
</script>
````

