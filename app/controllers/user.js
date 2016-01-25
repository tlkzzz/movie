var User = require('../models/user') // 导入modol

 //登陆
 exports.login =  function(req, res){
        var _user = req.body.user
        //params是拿到可以拿到所有的参数ajax的dada或者表单的或者地址/的参数 query是拿到/  后面的参数
        User.findOne({name : _user.name},function(err, user){
            if(err){
                console.log(err)
                return 
            }
            if(!user){ //等于空
                res.redirect('/index')  
            }
            //拿密码比较返回true或false: model中定义一个方法返回回调
            user.comparePassword(_user.password, function(err, isMatch){
                if(err){
                    console.log(err)
                    return 
                }
                if(isMatch){
                    //将用户信息存到session中
                    req.session.user = user
                    res.redirect('/admin/list')
                }else{
                     res.redirect('/index')
                }
            })
        })
    }

    // 退出登陆
exports.logout = function(req, res){
            //删除用户信息
            delete req.session.user
            //删除全局本地变量
            // delete app.locals.user
            res.redirect('/index')
    }

    //注册
 exports.inser = function(req, res){
        var _user = req.body.user
        var user = new User(_user)
            user.save(function(err, user){
                if(err){
                    console.log(err.message)
                    return 
                }
                 //将用户信息存到session中
                req.session.user = user
                res.redirect('/admin/list');
            })
}