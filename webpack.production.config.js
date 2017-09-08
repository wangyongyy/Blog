
const webpack=require('webpack');
const path=require('path');

//前端源码目录
const srcPath=path.resolve(__dirname,'src');

//用来清除文件的插件
const CleanWebpackPlugin=require('clean-webpack-plugin');
//单独将css提取出来的文件
const ExtractTextPlugin=require('extract-text-webpack-plugin');

module.exports={
	entry:{
		'common/main':[srcPath+'/common/common.js'] //重载策略，修改前端代码，自动刷新
	},
	output:{
		path:__dirname+'/public',
		filename:'[name].js',
		publicPath:'http://localhost:8080/public'
	},
	module:{
		rules:[
			//css处理
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader'
				})
			},
			//图片处理
			{
				test:/\.(png|jpg|gif)$/,
				use:'url-loader?limit=8192&context=client&name=/img/[name].[ext]'  //小于8k的图片直接编码，大于8k生成文件。
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin('public'),
		new ExtractTextPlugin({
			filename:function(getPath){
				return getPath('css/[name].css').replace('css/common','css')
			},
			allChunks:true
		}),
		//把jquery的全局变量提取出来的插件(jQuery not undefined)
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery'
        }),
        //混淆压缩
        new webpack.optimize.UglifyJsPlugin()
	]
}
