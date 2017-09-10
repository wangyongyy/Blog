//require('../index/index');
//require('jquery');
//require('SRC/login/login')
console.log('common.js555555');

//按需加载

let modelPath=$('[data-main]').data('main');
console.log(modelPath);
if(modelPath){
	//异步引入模块     import(导入的意思)
	import('../'+modelPath)
	.then(model=>{
		console.log('加载模块成功',model);
	}).catch(err=>{
		console.log('模块加载失败',err)
	})
}

//在入口文件加入这行代码，可以实现修改js文件后ajax刷新
/*if(module.hot){
	module.hot.accept();
}*/
