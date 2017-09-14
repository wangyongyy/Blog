//require('BOOTSTRAP_CSS');
require('./login.css');
let MD5=require('md5.js');
//require('bootstrap');//引入的默认是js文件
console.log('我是登录.js');

$('.login form').on('submit',function(e){
	e.preventDefault();//阻止表单默认提交
	let [username,password]=[this.username.value.trim(),this.password.value.trim()];
	//console.log(username,password);
	if(!username||!password){
		$('#errorMesg').text('用户名或密码不能为空')
		.show()
		.animate({
			display:'none',
		},2000,function(){
			$(this).hide();
		})
		return;
	};
	
	password=new MD5().update(password).digest('hex');
	
	$.ajax({
		url:"/api/user/check",
		method:'post',
		data:{ //属性值
			username,
			password
		},
		success:function(data){
			console.log('这是后端返回给前端的数据',data);
			if(data.success){
				location.href='/admin/index';
			}else{
				$('#errorMesg').text('用户名或密码不正确')
				.show()
				.animate({
					display:'none'
				},2000,function(){
					$(this).hide();
				})
			}
		}
	});
})
