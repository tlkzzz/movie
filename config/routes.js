var _Index = require('../app/controllers/index') //引入index.js
var _Movie = require('../app/controllers/movie') //引入movie.js
var _User = require('../app/controllers/user') //引入user.js

module.exports = function(app){

    //预处理设置本地全局变量用户信息 进入方法前后都会进入此方法
    app.use(function(req, res, next){
        var _user = req.session.user
         app.locals.user = _user  //有数据或者null都付给session
         next()
    })

    //index
    // index page 首页
    app.get('/index', _Index.index)

    //movie
    // detail page 详情页
    app.get('/movie/:_id', _Movie.detail)
    //后台录入页
    app.get('/admin/new', _Movie.addmovie)
    //点击更新后跳转到录入页
    app.get('/admin/update/:_id', _Movie.update)
    //提交数据
    app.post('/admin/movie/new',  _Movie.save)
    //列表页   ---------------------权限管理
    app.get('/admin/list',_Movie.IfLogin, _Movie.IfRout,  _Movie.list)
    //删除列表
    app.delete('/admin/del', _Movie.del)

    //user
    //登陆
    app.post('/user/login', _User.login)
    // 退出登陆
    app.get('/userout', _User.logout)
    //注册
    app.post('/user/inser', _User.inser)

}