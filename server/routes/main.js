const express=require('express');
let Article = require('../dbModels/Article');
const router=express.Router();

router.get('/index',(req,res,next)=>{
	res.render('index');
})

/*
 *
 *首页
 */
router.get('/',(req,res,next)=>{
	res.render('index');
})

/*
 *文章详情页
 */
router.get('/article/detail',(req,res,next)=>{
	res.render('article-details');
})


router.get('/admin/article',(req,res,next)=>{
	res.render('admin/article-list');
})

router.get('/login',(req,res,next)=>{
	res.render('login');
})

/*
 *首页文章列表
 */
router.get('/article/list',(req,res,next)=>{
	//获取前端传给后端的分页数据
	let page = Number(req.query.page);  //第几页
	
	let limit = 9; //固定显示9条
	let offset = (page-1)*limit||0;
	//console.log(sort,order);
	console.log(offset,limit);
	Article.count().then(count=>{
		//查询数据总共有多少条
		responseMesg.data.total=count;
	});
	//skip  limit  跳过offset条数据，然后往后取limit个数据
	//sort({要排序的字段+1||-1})
	Article.find().sort({
		'_id':-1
	}).skip(offset).limit(limit).then(articles=>{
		articles = articles.map((item,index)=>{
			//获取body中的第一张图片作为封面
			let result = item.body.match(/<img [^>]*src=['"]([^'"]+)[^>]*>/);
			console.log(result);
			if(result){
				item.cover = result[0];  //封面设置
			}else{
				item.cover='http://o0xihan9v.qnssl.com/wp-content/uploads/2016/01/1437464131114260.jpg'
			}
			item.body=item.body.replace(/<[^>]+>/g,"");
			item.body=item.body.substring(0,77)+'...';
			console.log(item.cover);
			return item;
		})
		
		res.json(articles);
	})
})



module.exports=router;
