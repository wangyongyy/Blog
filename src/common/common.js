//require('../index/index');
//require('SRC/index/index');
//require('SRC/login/login');
console.log('很多页面都要引用我,也是入口文件是是是56ss');

//按需加载
let modelPath=$('[data-main]').data('main');//login/login
console.log(modelPath);
if(modelPath){
	//异步引入模块
	import('../'+modelPath)
	.then(model=>{
		console.log('导出成功',model)
	}).catch(err=>{
		console.log('加载失败',err);
	})
};

//如果不是以/admin&/login开头的不是后台界面或者登陆界面
if(!location.pathname.startsWith('/admin')&&!location.pathname.startsWith('/login')){ 
	 //点击a标签，抓取内容放在container容器里面
	 require('jquery-pjax');
	 $(document).pjax('a.pjax', '#main');
}




//在入口文件加入下面这行代码，可以实现修改了js文件后ajax刷新
//不加就是整个页面刷新，开发结束后删掉
/*if(module.hot){
	module.hot.accept();
}
*/