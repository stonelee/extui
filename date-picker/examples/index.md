# calendar

---

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<input id="date" type="text"><i id="date-trigger" class="form-trigger form-date-trigger"></i>

<script>
seajs.config({
  locale: 'zh-cn',
  preload: ['seajs/plugin-i18n']
});

seajs.use(['$','date-picker'], function($,DatePicker) {
  new DatePicker({
    target: '#date'
  });
});
</script>
````

##auto-render

````iframe:50
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<input id="date" type="text" data-widget="date-picker"><i id="date-trigger" class="form-trigger form-date-trigger"></i>

<script type="text/javascript">
seajs.config({
  locale: 'zh-cn',
  preload: ['seajs/plugin-i18n']
});

seajs.use(['widget'], function(Widget) {
  Widget.autoRenderAll();
});
</script>
````
