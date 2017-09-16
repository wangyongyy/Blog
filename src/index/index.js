
function reset(){
	//获取卡片父级
	let $content = $('#content.post-index');
	let $articles = $content.find('article');
	
	let _margin = 6*2;
	
	//获取父级宽度
	let content_width = $content.width();
	//获取卡片的宽度，包含margin的宽度
	//let article_width_old = $articles.eq(0).width()+_margin;
	let article_width_old = 249+_margin;
	console.log(article_width_old);
	
	//一行多少卡片
	let max_column = parseInt(content_width/article_width_old);
	console.log(max_column);
	let article_width_new=content_width/max_column;
	$articles.css('width',(content_width/max_column)-_margin)
	
	//获取父级元素的高度
	let content_height=$content.height();
	$content.css('height',content_height)
	
	$articles.css({
		'position':'absolute',
		'left':'0',
		'top':'0'
	});
	
	let all_height = [];//所有卡片的高度都放这个集合
	
	$articles.each(function(index,item){
		//console.log(index,item);
		//left=article_width_new*
		//列数
		let column = index % max_column;
		//行数
		let row = parseInt(index/max_column);
		let left = article_width_new*column;
		//index = row * max_column + column
		all_height.push($(item).height()+_margin);
		 
		let top = 0;
		while(row>0){
			row --;
			top += all_height[row * max_column + column]
		}
		
		//$(item).css('left',left)  //left位移会触发浏览器的重绘，效率不高
		$(item).css({
			'transform':'translate('+left+'px,'+top+'px)' //css3移动效果
		})
	});
}

reset();
//当浏览器窗口变化的时候回触发这个时间
window.onresize=function(){
	//重新计算宽度
	reset();
}
