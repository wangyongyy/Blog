require('../index/index');
console.log('common.js');

//在入口文件加入这行代码，可以实现修改js文件后ajax刷新
if(module.hot){
	module.hot.accept();
}
