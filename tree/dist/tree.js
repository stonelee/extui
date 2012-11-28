define("kj/tree/0.0.1/tree",["$","arale/widget/1.0.2/widget","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events","gallery/handlebars/1.0.0/handlebars"],function(e,t,n){function f(e,t,n){var r=t.next(),i=r.children().eq(0).children().eq(n);if(i.hasClass("icon-tree-elbow-line")||i.hasClass("icon-tree-elbow-empty"))r[e](),e=="show"?r.attr("data-type")=="leaf"?f(e,r,n):r.attr("data-status")=="expanded"&&f(e,r,n):f(e,r,n)}var r=e("$"),i=e("arale/widget/1.0.2/widget"),s=e("gallery/handlebars/1.0.0/handlebars"),o='<tr class="grid-row" {{#if expanded}}data-status="expanded"{{/if}} {{#if leaf}}data-type="leaf"{{/if}}> <td class="grid-cell"> {{#each icons}}<i class="icon icon-tree-{{this}}"></i>{{/each}}{{name}} </td> {{#each grids}} <td class="grid-cell">{{this}}</td> {{/each}} </tr>',u='{{#if headers}} <thead class="grid-header unselectable"> <tr> {{#each headers}} <td class="grid-header-cell"><span>{{this}}</span></td> {{/each}} </tr> </thead> {{/if}}',a=i.extend({setup:function(){var e=this,t=this.get("url");if(t)r.getJSON(t,function(t){e.data=t;var n=e._createTree(t);e.element.html(n)});else{var n=this.get("data");if(n){this.data=n;var i=e._createTree(n);e.element.html(i)}}this.render()},events:{"click .grid-row":"click"},click:function(e){var t=r(e.target),n=t.parents("tr").data("data");/minus|plus/.test(t.attr("class"))?this.toggle(t):(t.parents("tr").addClass("grid-row-is-selected").siblings().removeClass("grid-row-is-selected"),this.trigger("click",n,t,this.data))},toggle:function(e){var t=e.parent().children().index(e),n=e.parents("tr"),r=e.attr("class");/minus/.test(r)?(r=r.replace("minus","plus"),f("hide",n,t),n.removeAttr("data-status")):/plus/.test(r)?(r=r.replace("plus","minus"),f("show",n,t),n.attr("data-status","expanded")):seajs.console("不合法的class"),e.attr("class",r)},_tree:null,_createTree:function(e){return this._tree=r("<table>",{"class":"grid tree unselectable",border:"0",cellspacing:"0",cellpadding:"0"}).append("<tbody>"),this._createHeader(),this._loopRow(e,[]),this._tree},_createHeader:function(){var e=this.get("headers"),t=s.compile(u)({headers:e});this._tree.append(t)},_createRow:function(e,t){var n=this.get("fields"),i=n?r.map(n,function(e){return t[e]}):[],u=s.compile(o)({icons:e,name:t.name,expanded:t.children.length!==0?!0:!1,leaf:t.children.length===0?!0:!1,grids:i});u=r(u),u.data("data",t),this._tree.append(u)},_loopRow:function(e,t){for(var n=0;n<e.children.length;n++){var r=e.children[n];r.children.length===0?n!=e.children.length-1?this._createRow(t.concat("elbow","leaf"),r):this._createRow(t.concat("elbow-end","leaf"),r):(n!=e.children.length-1?this._createRow(t.concat("elbow-minus","folder"),r):this._createRow(t.concat("elbow-end-minus","folder"),r),n!=e.children.length-1?this._loopRow(r,t.concat("elbow-line")):this._loopRow(r,t.concat("elbow-empty")))}}});n.exports=a});