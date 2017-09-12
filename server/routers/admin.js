const express=require('express');
const router=express.Router();

let Article=require('../dbmodels/Article');

//引入操作数据库的模型
let User=require('../dbmodels/User');

//后端想要给前端的格式
let responseMesg;
//中间件
router.use((req,resp,next)=>{
	//console.log('中间件进来了');
	responseMesg={
		success:false,
		message:'',
		data:{
			total:0,
			rows:[]
		}
	}
	next();
})

//跳转到登陆后的首页
router.get('/index',(req,res,next)=>{
	res.render('admin/article-list',{
		user:req.session.user
	})
});

//一次性查出所有数据查询列表
router.get('/article/list',(req,res,next)=>{
	Article.find().then(articles=>{
		res.json(articles);
	})
});

//查询文章列表（服务端分页）
router.get('/article/pagination',(req,res,next)=>{
	//获取前端传给后端的分页数据
	let offset = Number(req.query.offset);
	let limit = Number(req.query.limit);
	let sort=req.query.sort || '_id';//按那个字段排序
	let order = (req.query.order === 'asc' ? 1 : -1);//排序方式 asc(升序) desc（降序）
	
	console.log(sort,order);
	
	//查询数据总共有多少条
	Article.count().then(count=>{
		responseMesg.data.total=count;
	})
	
	//sort{ 要排序的字段 +1&-1 }
	
	Article.find().sort({
		[sort]:order
	}).skip(offset).limit(limit).then(articles=>{
		/*articles.map((item,index)=>{
			item.body=item.body.substring(0,50);
		})*/
		responseMesg.success=true;
		responseMesg.data.rows=articles;
		
		res.json(responseMesg);
	})
});
/*
 *跳转到文章添加页面
 *
 */
router.get('/article/add',(req,res,next)=>{
	//console.log('进来了没有')
	res.render('admin/article-add');
});

//查询某篇文章并且编辑内容
router.get('/article/:id',(req,res,next)=>{
	//console.log('进来了没有')
	//获取到id，根据id查询数据，
	//把数据传给模板
	//模板渲染数据
	let id=req.params.id;   //params参数，
	Article.findById(id).then(article=>{
		res.render('admin/article-edit',{
			//article:article
			article
		});
	})
	
})

//删除文章
router.delete('/article/:id',(req,res,next)=>{
	Article.findByIdAndRemove(req.params.id).then(article=>{
		responseMesg.message='删除成功';
		responseMesg.success=true;
		res.json(responseMesg)
	})
	
})


let i=0;

//保存文章
router.post('/article/save',(req,res,next)=>{
	let parms=req.body;
	if(!parms.title||!parms.body){
		responseMesg.message='标题或者内容不能为空';
		res.json(responseMesg);
		return;
	}
	new Article({
		title:parms.title,
		body:parms.body
	}).save().then(article=>{
		responseMesg.success=true;
		responseMesg.message='提交成功';
		res.json(article);
	})
});

//修改文章
router.post('/article/update',(req,res,next)=>{
	let parms=req.body;
	Article.findByIdAndUpdate(parms.id,{
		title:parms.title,
		body:parms.body
	}).then(article=>{
		if(article){
			responseMesg.success=true;
			responseMesg.message='修改成功';
		}else{
			responseMesg.message='修改失败';
		}
		res.json(responseMesg);
	})
});

module.exports=router;