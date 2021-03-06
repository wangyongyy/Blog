//初始化编辑器
var ue = UE.getEditor('body');


require('jquery-validation');

require('jquery-validation/dist/localization/messages_zh.js');

$.validator.setDefaults({
	ignore:"",
	highlight:function(element){
		$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
	},
	success:function(element){
		$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
	},
	errorElement:'span',
	errorPlacement:function(error,element){
		if(element.is(":radio")||element.is(":checkbox")){
			error.appendTo(element.parent().parent().parent());
		}else{
			error.appendTo(element.parent());
		}
	},
	errorClass:'help-block',
	validClass:'help-block'
})

$('#myForm').validate({
	rules:{
		'title':{
			'required':true,
			'maxlength':18
		},
		'body':{
			'required':true,
		}
	},
	messages:{
		'title':{
			'required':'用户名不能为空',
		},
		'body':{
			'required':'内容不能为',
		}
	},
	submitHandler:function(form){
		alert('验证通过了没有');
		$.ajax({
			url:'/admin/article/update',
			method:'post',
			data:{
				'id':$('#id').val(),
				'title':$('#title').val(),
				'body':ue.getContent()
			},
			success:function(res){
				//alert(res.messages);
				location.href="/admin/article";
			}
		})
	}
});


