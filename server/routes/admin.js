const express=require('express');
const router=express.Router();
let Article = require('../dbModels/Article');

//跳转到登录后的首页
router.get('/index',(req,res,next)=>{
	res.render('admin/index',{
		user:req.session.user,
	});
})

/*
 *查询列表
 */
router.get('/article/list',(req,res,next)=>{
	Article.find().then(articles=>{
		res.json(articles)
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
