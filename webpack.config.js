
const webpack=require('webpack');
const path=require('path');

//前端源码目录
const srcPath=path.resolve(__dirname,'src');

module.exports={
	entry:{
		'common/main':[srcPath+'/common/common.js','webpack-hot-middleware/client?reload=true'] //重载策略，修改前端代码，自动刷新
	},
	output:{
		path:__dirname+'/public',
		filename:'[name].js',
		publicPath:'http://localhost:3000/public'
	},
	devtool:'eval-source-map',
	module:{
		rules:[
			//css处理
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader?sourceMap'  //sourceMap加上之后css文件不在HTML文档
				]
			},
			//图片处理
			{
				test:/\.(png|jpg)$/,
				use:'url-loader?limit=8192&context=client&name=[name].[ext]'  //小于8k的图片直接编码，大于8k生成文件。
			}
		]
	},
	plugins:[
		new webpack.optimize.OccurrenceOrderPlugin(), //根据模块的调用次数，给模块分配ID，使得id可预测，降低文件大小
		new webpack.HotModuleReplacementPlugin(),  //启用HMR，作用：模块热替换
		new webpack.NoEmitOnErrorsPlugin()       //作用：报错但不退出webpack的进程
	]
}
