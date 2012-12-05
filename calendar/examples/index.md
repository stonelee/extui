# calendar

---

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<input id="date-nothing" type="text" />

<script>
seajs.config({
    locale: 'zh-cn',
    preload: ['seajs/plugin-i18n']
});

seajs.use('calendar', function(Calendar) {
    new Calendar({trigger: '#date-nothing'});
});
</script>
````

