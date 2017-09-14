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
	console.log(offset,limit);
	Article.count().then(count=>{
		//查询数据总共有多少条
		responseMesg.data.total=count;
	});
	//skip  limit  跳过offset条数据，然后往后取limit个数据
	Article.find().skip(offset).limit(limit).then(articles=>{
		responseMesg.success=true;
		responseMesg.data.rows=articles;
		res.json(responseMesg);
	})
})


/*
 *保存文章的借口
 */
let i=0;
router.get('/article/save',(req,res,next)=>{
	new Article({
		title:'标题'+(i++),
		body:'内容'+i
	}).save().then(article=>{
		res.json(article)
	})
})

module.exports=router;
