# grid

---

````iframe:250
<link href="http://10.10.22.84/work/extui/css/main.css" rel="stylesheet">

<div class="panel" id="demo1"></div>

<script type="text/javascript">
seajs.use(['$','grid'], function($, Grid) {

  var fields = [{
    header: '编号',
    name: 'id'
  }, {
    header: '验票站名称',
    name: 'stationName',
    width: '15%',
  }, {
    header: '矿企名称',
    name: 'mineName'
  }, {
    header: '车牌号',
    name: 'licensePlateNumber'
  }, {
    header: '矿种',
    name: 'coalType'
  }, {
    header: '毛重',
    name: 'grossWeight',
    render: function(value) {
      return '<b>' + value + '吨</b>';
    }
  }, {
    header: '过站时间',
    name: 'transitDate',
    render: function(value) {
      return value.split('T')[0];
    }
  }, {
    header: '详细信息',
    name: 'id',
    render: function(value) {
      return '<a href="#" data-role="detail"><img src="./application_view_detail.png" width="16" title="详细信息"></a>';
    }
  }];

  var grid = new Grid({
    element: '#demo1',
    url: './grid_1.json',
    fields: fields
  });
  grid.on('click', function(data, cell, row){
    console.log(data);
  })

  $('#demo1').delegate('a[data-role=detail]', 'click', function(e) {
    var id = $(e.target).parents('tr').attr('data-id');
    console.log(id);
    //取消整体的click事件响应
    return false;
  });

});
</script>
````
