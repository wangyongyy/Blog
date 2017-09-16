const webpack=require('webpack');
const path=require('path');
//源码目录
const srcPath=path.resolve(__dirname,'src');
//console.log(srcPath);
//console.log(__dirname);

//基本配置-------------------------------------------------
module.exports={
	//入口----------------------------------------------------
	entry:{
		'common/main':[srcPath+'/common/common.js','webpack-hot-middleware/client?reload=true'], //自动刷新
		'common/admin-lib':['jquery','bootstrap','BOOTSTRAP_CSS'],  //public目录下回生成一个common/admin-lib.js和common/admin-lib.css文件
		'common/lib':['jquery']
	},
	//出口--------------------------------------------------
	output:{
		path:__dirname+'/public/',
		filename:'[name].js',
		//publicPath:'http://localhost:8080/public/'
		publicPath:'http://localhost:3000/public/' //发布的路径
	},
	//开发环境下需要------------------------------------------
	devtool:'eval-source-map',
	
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
				use:'url-loader'
			},
			{
				test:/\.css$/,
				use:[
					'style-loader',  //使用style-loader处理器
					'css-loader?sourceMap'	  //使用css-loader处理器
				]
			},
			{
         		test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
         		use: [
           			'file-loader'
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
			          	//syntax-dynamic-import //动态引入文件，按需加载
			        }
		      	}
		    }
		]
	},
	plugins:[
		//把jQuery的抽象为全局变量
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery'
		}),
		//1、热加载
		new webpack.optimize.OccurrenceOrderPlugin(),//优化，可以根据模块的调用次数，给模块分配id,是的id可预测，提高性能
		new webpack.HotModuleReplacementPlugin(),//启用HMR 作用：模块热替换
		new webpack.NoEmitOnErrorsPlugin() //报错但不退出webpack的进程
	]
}
