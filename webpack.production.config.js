
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
		'common/main':[srcPath+'/common/common.js'], //重载策略，修改前端代码，自动刷新
		'common/admin-lib':['bootstrap','BOOTSTRAP_CSS']
	},
	output:{
		path:__dirname+'/public',
		filename:'[name].js',
		publicPath:'http://localhost:8080/public'
	},
	resolve:{ //取别名
		modules:[srcPath,'node_modules'],//知道webpack查找文件目录名
		alias:{
			SRC:srcPath,
			BOOTSTRAP_CSS:'bootstrap/dist/css/bootstrap.css',
			BOOTSTRAP_TABLE_CSS:'bootstrap-table/dist/bootstrap-table.css'
		}
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
			},
			{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime','syntax-dynamic-import']
                    }
                }
           },
		   {
	        	test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
	         	use: [
	           		'file-loader?limit=8192&name=/fonts/[name].[ext]'
	        	]
	       }
		]
	},
	plugins:[
		new CleanWebpackPlugin(['public'],{
			exclude: ['ueditor']  //列外
		}),
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
        new webpack.optimize.UglifyJsPlugin() //不支持es6
	]
}
