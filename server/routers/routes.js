
module.exports=app=>{
	
	//校验是否登录的中间件
	app.use(require('./auth'))

	
    //引入路由
    app.use('/api', require('./api'));
    app.use('/admin', require('./admin'));
    app.use('/', require('./main'));

}

