const express=require('express');
const router=express.Router();

router.get('/index',(req,res,next)=>{
	res.render('index');
})

router.get('/',(req,res,next)=>{
	res.render('index');
})

router.get('/admin/article',(req,res,next)=>{
	res.render('admin/article-list');
})

router.get('/login',(req,res,next)=>{
	res.render('login');
})




module.exports=router;
