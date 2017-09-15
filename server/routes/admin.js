const express=require('express');
const router=express.Router();
let Article = require('../dbModels/Article');

//后端想要给前端的格式
let responseMesg;
//中间件
router.use((req,resp,next)=>{
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




//跳转到登录后的首页
router.get('/index',(req,res,next)=>{
	res.render('admin/index',{
		user:req.session.user,
	});
})



/*
 *查询列表（一次性查出所有数据）客户端
 */
router.get('/article/list',(req,res,next)=>{
	Article.find().then(articles=>{
		res.json(articles)
	})
})


/*
 *查询列表（服务端分页）
 */
router.get('/article/pagination',(req,res,next)=>{
	//获取前端传给后端的分页数据
	let offset = Number(req.query.offset);
	let limit = Number(req.query.limit);
	let sort=req.query.sort || '_id'; //按那个字段排序
	//排序方式  asc升序   desc降序
	let order=(req.query.order === 'asc' ? 1 : -1);
	console.log(sort,order);
	console.log(offset,limit);
	Article.count().then(count=>{
		//查询数据总共有多少条
		responseMesg.data.total=count;
	});
	//skip  limit  跳过offset条数据，然后往后取limit个数据
	//sort({要排序的字段+1||-1})
	Article.find().sort({
		[sort]:order
	}).skip(offset).limit(limit).then(articles=>{
		/*articles.map((item,index)=>{
			console.log(item);
			item.body=item.body.substring(20,100);
		})*/
		responseMesg.success=true;
		responseMesg.data.rows=articles;
		res.json(responseMesg);
	})
})


/*
 *跳转到文章添加页面
 */

router.get('/article/add',(req,res,next)=>{
	res.render('admin/article-add');
})


/*
 *
 *查询文章并返回编辑页面
 */
router.get('/article/:id',(req,res,next)=>{
	let id = req.params.id;
	Article.findById(id).then(article=>{
		res.render('admin/article-edit',{
			article,
		});
	})
	console.log(id)
})


/*
 *
 *删除文章
 */
router.delete('/article/:id',(req,res,next)=>{
	
	Article.findByIdAndRemove(req.params.id).then(article=>{
		responseMesg.success=true;
		responseMesg.message='删除成功';
		res.json(responseMesg);
	})
})



/*
 *
 *修改文章
 */
router.post('/article/update',(req,res,next)=>{
	//alert('aa');
	let parms = req.body;
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
	
})


/*
 *保存文章
 */
router.post('/article/save',(req,res,next)=>{
	//获取内容
	let parms=req.body;
	if(!parms.title&!parms.body){
		responseMesg.message='标题或者内容不能为空';
		res.json(responseMesg);
		return;
	}
	new Article({
		title:parms.title,
		body:parms.body,
	}).save().then(article=>{
		responseMesg.success=true;
		responseMesg.message='提交成功';
		res.json(responseMesg);
	})
})




module.exports=router;
