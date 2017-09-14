const express=require('express');
//引入模板
const swig=require('swig');

//处理前端的post请求
const bodyParser = require('body-parser')

//引入session模块
const session = require('express-session')

//引入链接数据库的插件驱动
const mongoose = require('mongoose');

const app=express();


//中间件，加密解密
app.use(session({
  secret: 'keyboard cat',  //用来加密的秘钥，有这个才能解密
  resave: false,  //是否重新保存回话
  saveUninitialized: true  //自动初始化会话
}))


//处理前端POST请求的配置
//处理前端传给后端的表单数据，（表单提交，ajax提交）
app.use(bodyParser.urlencoded({ extended: false }));
 
 //处理前端以json格式传给后端的数据
// parse application/json
app.use(bodyParser.json());


//取出设置的环境变量(process进程)
console.log('取出的变量值',process.env.NODE_ENV);

const isDev = process.env.NODE_ENV==='dev';
app.locals.isDev=isDev;
//模板配置
	app.engine('html',swig.renderFile);
	app.set('views','./server/views');
	app.set('view engine','html');




if(isDev){
	//调用webpack的配置，中间件(发布的时候不需要)
	const webpack=require('webpack'); //引入webpack模块
	const webpackConfig=require('./webpack.config.js'); //导入webpack.config.js文件
	const compiler=webpack(webpackConfig); //执行
	
	app.use(require('webpack-dev-middleware')(compiler,{
		noInfo:true,
		stats:{
			colors:true
		},
		publicPath:webpackConfig.output.publicPath
	}))
	
	app.use(require('webpack-hot-middleware')(compiler));
	
	
	swig.setDefaults({
		cache:false   //不缓存，开发模式独有的
	});

	
	
	//引入路由
	require('./server/routes/routes')(app);
	
	
	
	
	app.listen(8080,()=>{
	
		//告诉browser-sync 我们监听那个文档
		browserSync.init({
			open:false,
			ui:false,
			online:false, //离线模式
			notify:false,//不显示在浏览器任何信息
	        proxy: 'localhost:8080/',
	        files: '.server/views/**',
	        port: 3000,
	    },()=>console.log('开发模式web应用启动成功'));
	})

}else{
	//配置静态资源
	app.use('/public',express.static(__dirname+'/public'));
	
	//引入路由
	require('./server/routes/routes')(app);
	
	
	
	app.listen(8080,()=>{
	
		console.log('web生成模式程序启动成功')
	})
}

	



//配置静态资源（配置了中间件就可以注释掉）
//app.use('/public',express.static(__dirname+'/public'));


//引入browser-sync
	const browserSync=require('browser-sync').create();
	//实现服务器重启后浏览器能自动刷新
	const reload=require('reload');
	const http = require('http');
	const server=http.createServer(app);
	reload(app); //通知浏览器刷新




//链接数据库地址
mongoose.connect('mongodb://localhost:27017/Blog2',{useMongoClient:true})
.on('open',(db)=>{
	console.log('数据库链接成功');
})
.on('error',(error)=>{
	console.log('数据库链接失败');
})

