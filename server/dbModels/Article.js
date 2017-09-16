const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	title:String,
	body:String,
	cover:String, //文章封面
	comments:[
		{
			body:String,
			data:{
				type:Date,
				default:Date.now
			}
		}
	],
	time:{
		type:Date,
		default:Date.now
	}
});

module.exports= mongoose.model('Article',userSchema);

