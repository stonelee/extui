seajs.use(['widget', 'tree', 'accordion'], function(Widget, Tree, Accordion) {
  Widget.autoRenderAll(function(){
    var accordion = Widget.query('#accordion1');
    accordion.fitToHeight(274);
  });

  var tree = new Tree({
    url: 'src/tree.json'
  });
  tree.render();

  var menu = new Accordion({
    element: '#menu',
    url: 'src/accordion.json',
    height: 274
  });
  menu.on('itemclick',function(){
    console.log(arguments);
  });
});
