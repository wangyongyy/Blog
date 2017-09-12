
module.exports=app=>{
	
	//校验是否登录的中间件
	//在开发模式下，让权限失效
	//1、如何判断是什么模式
	//2、如何让权限检验失效
	console.log('是否是开发模式process.env.NODE_ENV===',process.env.NODE_ENV==='dev')
	console.log('是否是开发模式app.locals.isDev',app.locals.isDev);
	/*
	if(!app.locals.isDev){
		app.use(require('./auth'))
	}
	*/
	
	app.use(require('./auth'))

	
    //引入路由
    app.use('/api', require('./api'));
    app.use('/admin', require('./admin'));
    app.use('/', require('./main'));

}

