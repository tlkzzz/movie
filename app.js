var express = require('express')	//导入express
var path = require('path')	//引入path

var bodyParser = require('body-parser')  //请求数据分析器
var bcrypt = require('bcrypt-nodejs')  //导入加密模块
var session = require('express-session')   //导入session中间件(4.x以后版本)
var port = process.env.PORT || 3000   //设置端口
var app = express()    //启动web服务器

// 连接数据库
var mongoose = require('mongoose')
//将session存储到mongodb中引入此中间件
var mongoStore = require('connect-mongo')(session)


// 连接字符串格式为mongodb://主机/数据库名
var dbUrl = 'mongodb://localhost/test'
mongoose.connect(dbUrl)
// 数据库连接后,可以对open和error事件指定监听函数
var db = mongoose.connection
        db.on('error', console.error)
        db.once('open', function() {
        console.log('连接mongodb成功!!!!!')
})


app.set('views','./app/views/pages')  	//设置视图
app.set('view engine','jade')   //设置模板引擎
app.use(bodyParser.urlencoded({ extended: true }))  
app.use(bodyParser.json())   //将表单数据格式化
app.locals.moment = require('moment')   //导入本地时间操作moment
app.use(express.static(path.join(__dirname, 'public'))) //引入静态的css和js资源

//session管理
app.use(session({
    resave:false,// 会话保存
    saveUninitialized: true,// 添加到未初始化的
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 保存时间1 week 
      },
    secret : 'movie',
    store : new mongoStore({
        url : dbUrl,
        conllection : 'sessions'  //数据库中存的文档名
       
    })
}))

if( 'development' === app.get('env')) {  //开发环境
     //把错误打印出来
    app.set('showStackError' , true) 
    //把请求方法地址状态打印出来
    // app.use(express.logger(':method : url : status'))
    //代码不要压缩
    app.locals.pretty = true
    //打开数据库debug
    mongoose.set('debug' , true)
}






app.listen(port)        //监听端口
console.log('服务已启动端口: ' + port + '  ' +new Date());  //输出启动日志

//引入route.js 传入 app对象
require('./config/routes')(app)