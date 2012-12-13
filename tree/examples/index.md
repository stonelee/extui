# Tree

---


## 树形组件

````iframe:250
<link href="http://10.10.22.84/work/extui/css/all.css" rel="stylesheet">

<script>
seajs.use(['tree'], function(Tree) {
  var tree = new Tree({
    url: './tree.json',
    onClick: function(){
      console.log('d');
    }
  });
  tree.on('click',function(){
    console.log(arguments);
  })
});
</script>
````

## TreeGrid组件

````iframe:250
<link href="http://10.10.22.84/work/extui/css/all.css" rel="stylesheet">

<div class="bd"></div>

<script>
seajs.use(['tree'], function(Tree) {
  var tree = new Tree({
    element: '.bd',
    headers: ['','编号','名称'],
    fields: ['id','name'],
    url: './tree.json'
  });
});
</script>
````
