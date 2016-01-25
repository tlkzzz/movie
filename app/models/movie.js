var mongoose = require('mongoose')
var Schema = mongoose.Schema

//骨架模版
var movieSchema = new Schema({
    doctor   : String,
    title    : String,
    language : String,
    country  : String,
    year     : Number,
    summary  : String,
    poster   : String,
    flash    : String,
    meta :  {
        createAt :{
            type :Date,
            default :Date.now()
        },
        updateAt :{
            type : Date,
            default : Date.now()
        }
    }
})


//过滤save方法先执行
movieSchema.pre('save', function(next){
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }
    next()
})



var Movie = mongoose.model('Movie', movieSchema);

//倒出模型
module.exports = Movie


