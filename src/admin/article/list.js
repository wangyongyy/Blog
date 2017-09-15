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
	columns:[
		{
			field:'_id',
			title:'ID',
			width:200,
			display:'none',
			visible:false
		},{
			field:'title',
			title:'标题'
		},{
			field:'body',
			title:'内容'
		},{
			field:'time',
			title:'发布时间',
			align:'center',
			formatter:function(value){
				return new Date().Format("yyyy-MM-dd hh:mm:ss"); 
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
