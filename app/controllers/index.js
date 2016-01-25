var Movie = require('../models/movie')   //导入modol


// index page 首页
exports.index = function(req, res){
    Movie.find(function(err, movie){
        if (err) {
            console.log(err);
            return ;
        }
        res.render('index', {
            title : 'Movie 首页 ',
            movies : movie
        })
    })
}