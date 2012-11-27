# Tree

---


## 树形组件

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<script>
seajs.use(['tree'], function(Tree) {
  var tree = new Tree({
    url: './tree.json'
  });
  tree.render();
  tree.on('click',function(){
    console.log(arguments);
  })
});
</script>
````

## TreeGrid组件

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<script>
seajs.use(['tree'], function(Tree) {
  var tree = new Tree({
    headers: ['id','name'],
    url: './tree.json'
  });
  tree.render();
});
</script>
````
