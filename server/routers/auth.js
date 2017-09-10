

/**
 * 
 *处理登录鉴权的js
 */
//校验是否登录的中间件
module.exports=(req,resp,next)=>{
		console.log('所以请求都被我拦截了',req.url);
		//有些请求是不应该被拦截的，登录注册时不能被拦截的
		//如果请求以、admin开头，就要拦截对其进行权限校验
		if(req.url.startsWith('/admin')){ //startsWith('/admin'),以什么开头
			if(req.session.user){
				//存在session,就放行
				console.log('有权限，允许放行');
				next();
			}else{
				//重定向转到登录页面
				console.log('没有登录，')
				resp.redirect('/login');
				//return;
			}
		}else{
			next();
		}
		
	}
	