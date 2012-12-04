# dialog

---

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<input type="button" id="trigger11" value="默认样式对话框" />

<script>
seajs.use(['dialog'], function(Dialog) {
    var d11 = new Dialog({
        trigger: '#trigger11',
        title: function() {
            return '我真是标题啊';
        },
        content: '我是内容 我是内容',
        effect: {
            type: 'move',
            from: 'up'
        },
        onConfirm: function() {
            var that = this;
            this.set('title', '三秒后关闭对话框');
            this.set('content', '不要啊！！');            
            setTimeout(function() {
                that.hide();
            }, 3000);
        }
    });
});
</script>
````

