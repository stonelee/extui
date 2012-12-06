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

seajs.use(['$','calendar'], function($,Calendar) {
  var calendar = new Calendar({
    target: '#date'
  });
});
</script>
````

