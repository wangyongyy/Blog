

//require('bootstrap');//这里引入的事js文件
//require('BOOTSTRAP_CSS')

require('./login.css');
let MD5=require('md5.js');
console.log('我是login.js');

$('.login form').on('submit',function(e){
	e.preventDefault();//阻止表单提交
	let [username,password]=[this.username.value.trim(),this.password.value.trim()];
	//console.log(username,password)
	if(!username||!password){
		$('#errorMesg').text('用户名或密码不能为空')
		.show()
		.animate({ //转换
			display:'none'
		},1500,function(){
			$(this).hide();
		})
		return;
	}
	password=new MD5().update(password).digest('hex');
	$.ajax({
		url:'/api/user/check',
		method:'post',
		data:{
			username,
			password
		},
		success:function(data){
			if(data.success){
				location.href='/admin/index';
			}else{
				$('#errorMesg').text('用户名或密码不正确')
					.show()
					.animate({ //转换
						display:'none'
					},1500,function(){
						$(this).hide();
					})
					return;
				console.log('这是 后端返回给前端的数据')
			}
			
		}
	})
})
