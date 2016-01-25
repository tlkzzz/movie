var Movie = require('../models/movie')   //导入modol


 // detail page 详情页
 exports.detail = function(req,res){
               var id =req.params._id
               Movie.findById(id, function(err, movie){
                if (err) {
                    console.log(err);
                    return ;
                }
                    res.render('detail', {
                    title : 'imooc '+movie.title,
                    movie : movie
            })
        })
    }

    //后台录入页
 exports.addmovie = function(req, res){
        res.render('admin', {
            title : 'Movie 后台录入页',
            movie:{
                title: '',
                doctor: '',
                country: '',
                year: '',
                poster: '',
                flash: '',
                summary: '',
                language: ''
            }
        })
    }

    //点击更新后跳转到录入页
exports.update  = function(req,res){
        //获取参数
        var id= req.params._id
        if(id){
        Movie.findById(id, function(err,movies){
          res.render('admin',{
            title: 'Movie后台更新:'+movies.title,
            movie:movies
        })   
        })
        }
    }

    //提交数据
  exports.save = function(req,res){
        //req.body获取所有表单的值
        var id = req.body.movie._id
        var movieObj = req.body.movie  //得到页面传过来的所有数据
        if(id!='undefined'){//更新
                Movie.update({_id:id}, {$set:movieObj}, function(err){
                    if(err){
                        console.log(err)
                    }
                    //跳转到详情页面
                    res.redirect('/movie/'+ id);
                })
       
        }else{
            //构造函数
            _movie = new Movie({
                doctor : movieObj.doctor,
                title : movieObj.title,
                language :movieObj.language,
                country : movieObj.country,
                summary : movieObj.summary,
                flash : movieObj.flash,
                poster :movieObj.poster,
                year : movieObj.year
            })
            _movie.save(function(err,movie){
                if(err){
                    console.log(err);
                    return ;
                }
                  //跳转到详情页面
                 res.redirect('/index');
            })
        }
    }

    //列表页
 exports.list = function(req, res){
               Movie.find(function(err,movie){
                if(err){
                    console.log(err);
                    return ;
                }
                res.render('list',{
                    title : 'Movie 列表页',
                    movies: movie
                })
                })
    }

    //删除列表
exports.del = function(req, res){
        //Ajax中参数可以用query拿参数
        var id = req.query.id
        console.log(id)
        if(id){
            Movie.remove({_id : id},function(err, movie){
                if (err) {
                    console.log(err)
                    return 
                }else{
                    res.json({success: 1})
                }
            })
        }
    }

// 权限管理登陆
exports.IfLogin = function(req, res, next){
    var _user = req.session.user
    if(!_user){
        return res.redirect('/index')
    }
    next()
}
//用户权限管理
exports.IfRout = function(req,res, next){
     var _user = req.session.user
     //根据用户的role值判断是否能进入页面
     if(_user.role <=10){
        return res.redirect('/index')
     }
     next()
}

