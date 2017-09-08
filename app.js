const express=require('express');
const swig=require('swig');
const app=express();

//取出设置的环境变量
console.log('取出的变量值'+process.env.NODE_ENV);

//模板配置
app.engine('html',swig.renderFile);
app.set('views','./server/views');
app.set('view engine','html');


//是否是开发模式
const isDev=process.env.NODE_ENV==='dev';

if(isDev){
	//模板不换存
	swig.setDefaults({
		cache:false
	});
	//调用webpack的配置
	const webpack=require('webpack');
	const webpackConfig=require('./webpack.config.js');
	const compiler=webpack(webpackConfig);
	
	app.use(require('webpack-dev-middleware')(compiler,{
		noInfo:true,
		stats:{
			colors:true
		},
		publicPath:webpackConfig.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler));
	
	//路由
	app.get('/',(req,res,next)=>{
		res.render('index');
	})
	
	//引入路由
	app.use('/',require('./server/routers/api'));
	
		//引入browser-sync模块，实现修改views目录，页面实现自动刷新
	const browserSync=require('browser-sync').create();
	
	const reload=require('reload');
	const http=require('http');
	const server=http.createServer(app);
	reload(app);//通知浏览器刷新
	server.listen(8080,()=>{
		browserSync.init({
			ui:false,
			open:false,
			online:false,//离线工作模式
			//不显示在浏览器中的任何通知。
			notify: false,
			proxy:'localhost:8080',  //要代理的服务器地址
			files:'./server/views/**',  //监听被修改的代码
			port:3000  //服务器启动的端口
		},()=>{
			console.log('web应用程序启动了2255');
		});
		
	})
	
	
}else{
	app.use('/public',express.static(__dirname+'/public'));
	
	//路由
	app.get('/',(req,res,next)=>{
		res.render('index');
	})
	
	//引入路由
	app.use('/',require('./server/routers/api'));
	
	app.listen(8080,()=>{
		console.log('web应用程序启动了');
	});
}






//app.use('/public',express.static(__dirname+'/public'));




/*
app.listen(8080,()=>{
	console.log('web应用程序启动了');
});
*/






