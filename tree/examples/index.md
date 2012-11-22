---

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<script>
seajs.use(['tree'], function(Tree) {
  var tree = new Tree({
    url: '../examples/tree.json'
  });
  tree.render();
});
</script>
````
