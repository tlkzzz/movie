var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')  //加密算法中间件
// 定义数据库模型
var userSchema = new Schema({
    name :{
        unique :true, //唯一
        type : String
    },
    password : String,
    // 用户权限0 1  2 用户等级
    role : {
        type : Number,
        default :0
    },
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
userSchema.pre('save', function(next){
    var user= this
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }

        // 先生成盐返回盐
        var salt = bcrypt.genSaltSync(10);   
        //生成加密后的值hash
        var hash = bcrypt.hashSync(user.password,salt);
              user.password = hash
              next()
})


//增加实例方法  这里的this 就是指的调用这个方法的对象
userSchema.methods = {
    comparePassword : function(_password, cb){
        bcrypt.compare(_password, this.password, function(err, isMacth){
            if(err) return cb(err)  //直接返回到回调方法中错误
            //返回这个回调方法 第一个null是err为空 这个方法返回的isMacth本身返回的就是true或false
             cb(null,isMacth)
        })
    }
}

//生成User文档
var User = mongoose.model('User', userSchema)
//导出User
module.exports = User