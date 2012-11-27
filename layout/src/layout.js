seajs.use(['widget', 'tree'], function(Widget, Tree) {
  Widget.autoRenderAll(function(){
    var accordion = Widget.query('#accordion1');
    accordion.fitToHeight(274);
  });

  var tree = new Tree({
    url: './src/tree.json'
  });
  tree.render();
});
