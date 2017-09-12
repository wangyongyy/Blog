console.log('文章列表');
require('bootstrap-table');
require('bootstrap-table/dist/locale/bootstrap-table-zh-CN')
require('BOOTSTRAP_TABLE_CSS');
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}  
$('#table').bootstrapTable({
	//url:"/admin/article/list", //客户端对应的rul
	url:"/admin/article/pagination", 
	sortOrder:'desc',
	columns:[  //字段配置
		{
			field:'_id',
			title:'ID',
			width:100,
			//visible:false,  //默认隐藏该字段
			sortable:true,
			//order:'desc'
		},{
			field:'title',
			title:'标题'
		},{
			field:'time',
			title:'发布时间',
			align:'center',
			sortable:true,
			formatter:function(value){
				//value 该字段的值
				return new Date(value).format('yyyy-MM-dd hh:mm:ss')
				//return '你'
			}
		},
		{
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
				'click [data-action="edit"]':function(e,value,row,index){
					//e:==>事件原对象
					//value==》当前字段
					//row==>这一行的数据
					//index==>当前索引
					//console.log(e,value,row,index);
					location.href='/admin/article/'+row['_id'];//阐述url路径化
				},
				'click [data-action="delete"]':function(e,value,row,index){
					let isSure=window.confirm('您确认要删除文章'+row['title']+'吗');
					if(isSure){
						//alert('确认删除');
						$.ajax({
							url:'/admin/article/'+row['_id'],
							method:'delete',
							success:function(resp){
								alert(resp.message);
								if(resp.success){
									//alert('删除成功')
									$('#table').bootstrapTable('remove', {
										field:'_id',
										values:[row['_id']]
									});
								}
							}
						})
					}
				}
			}
		}
	],
	pagination:true,
	classes:'table table-hover table-no-bordered',
	showRefresh:true,
	showColumns:true,
	paginationPreText:'上一页',
	paginationNextText:'下一页',
	search:true,
	sidePagination:'server',//启用服务端分页
	responseHandler:function(resp){ //加载后端数据成功后会调用的函数
		/*resp==>
		{
			success:true,
			message:'',
			data:{
				total:0,
				rows:[]
			}
		}*/
		/*return {
			total:15,
			rows:[{
				_id:1,
				title:'标题',
				body:'内容',
				time:Date.now()
			}]
		}*/
		
		if(!resp.success){
			return {
				total:0,
				rows:[]
			}
		}
		return resp.data;
		
	}
})
