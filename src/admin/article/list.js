require('bootstrap-table');
require('bootstrap-table/dist/locale/bootstrap-table-zh-CN.js')
require('BOOTSTRAP_TABLE_CSS');

console.log('文章列表');


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


$('#table').bootstrapTable({
	//url:'/admin/article/list',客户端分页
	url:'/admin/article/pagination', //服务端分页
	sortOrder:'desc',  //默认排序方式  desc降序
	columns:[
		{
			field:'_id',
			title:'ID',
			width:200,
			display:'none',
			visible:false,
			sortable:true,
			
		},{
			field:'title',
			title:'标题',
			sortable:true
		},{
			field:'time',
			title:'发布时间',
			align:'center',
			formatter:function(value){
				return new Date().Format("yyyy-MM-dd hh:mm:ss"); 
			},
			sortable:true
		},{
			field:'oprate',
			title:'操作',
			align:'center',
			formatter:function(value){
				return `<div class="btn-group" role="group" aria-label="...">
					<button data-action="edit" type="button" class="btn btn-primary">编辑</button>
					<button data-action="delete" type="button" class="btn btn-danger">删除</button>
				</div>`
			},
			events:{
				'click [data-action="edit"]':function(e,value,row,index){ //event事件源对象，value当前字段，row这一行的数据，index索引
					console.log(e,value,row,index);
					location.href='/admin/article/'+row['_id'];
				},
				'click [data-action="delete"]':function(e,value,row,index){ //event事件源对象，value当前字段，row这一行的数据，index索引
					let isSure=window.confirm('你确定删除['+row['title']+']吗')
					if(isSure){
						//alert('确定删除');
						$.ajax({
							url:'/admin/article/'+row['_id'],
							method:'delete',
							success:function(res){
								alert(res.message);
								if(res.success){
									$('#table').bootstrapTable('remove',{
										field:'_id',
										values:[row['_id']]
									})
								}
							}
						})
					}
				}
			}
		}
		
	],
	pagination:true,
	showRefresh:true,
	showColumns:true,
	paginationPreText:'上一页',
	paginationNextText:'下一页',
	search:true,
	classes:'table table-hover table-no-bordered',
	sidePagination:'server',
	responseHandler:function(res){ //加载后端数据成功后会调用的函数
		
		/*return {
			total:60,
			rows:[
				{_id:1,title:'标题',body:'内容',time:Date.now()}
			]
		}*/
		if(!res.success){
			return {
				total:0,
				rows:[]
			}
		};
		return res.data;
		
	}
})
