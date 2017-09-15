const webpack=require('webpack');
const path=require('path');
//源码目录
const srcPath=path.resolve(__dirname,'src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//将css单独提取出来
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//基本配置-------------------------------------------------
module.exports={
	//入口----------------------------------------------------
	entry:{
		'common/main':[srcPath+'/common/common.js'],
		'common/admin-lib':['jquery','bootstrap','BOOTSTRAP_CSS']  //public目录下回生成一个common/admin-lib.js和common/admin-lib.css文件
	},
	//出口--------------------------------------------------
	output:{
		path:__dirname+'/public/',
		filename:'[name].js',
		publicPath:'http://localhost:8080/public/'
		
	},

	//取别名，在自己的js里面直接使用别名
	resolve:{
		modules:[srcPath,'node_modules'],//知道webpack查找文件目录
		alias: {
		  SRC:srcPath, 
		  BOOTSTRAP_CSS:'bootstrap/dist/css/bootstrap.css',
		  BOOTSTRAP_TABLE_CSS:'bootstrap-table/dist/bootstrap-table.css'
		}
	},
	
	
	//模块-----------------------------------------------
	module:{
		rules:[  //规则
			{
				test:/\.(png|jpg|jpeg)$/,
				use:'url-loader?limit=8192&context=client&name=/img/[name].[ext]'
			},
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader?sourceMap'
				})
			},
			{
         		test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
         		use: [
           			'file-loader?limit=8192&context=client&name=/fonts/[name].[ext]'
         		]
       		},
       		{
		      	test: /\.js$/,
		      	exclude: /(node_modules)/, //排除node_modules
		      	use: {
		        	loader: 'babel-loader',
			        options: {
			          	presets: ['env'],
			          	plugins: ['transform-runtime','syntax-dynamic-import']
			        }
		      	}
		    }
		]
	},
	plugins:[
		new CleanWebpackPlugin(['public'],{
			exclude:['ueditor']
		}),
		new ExtractTextPlugin({
			filename:function(getPath){
				console.log(getPath('css/[name].css'),'这是什么');
				return getPath('css/[name].css').replace('css/common','css');
			},
			allChunks:true
		}),
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery'
		}),
		
		//压缩混淆
		new webpack.optimize.UglifyJsPlugin(),
	]
}
