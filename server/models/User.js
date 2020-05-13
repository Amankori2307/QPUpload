const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : Number,
        enum : [0,1],
        default : 0
    },
    url : {
        type:String,
        default: '/profile/default.png'
    },
    college:String,
    sem:String,
    year:String,
    branch:String
});


UserSchema.pre('save',function(next){
    if(!this.isModified('password')) return next()
    bcrypt.hash(this.password,10,(err,hashedPassword) => {
        if(err) return next(err)
        this.password = hashedPassword;
        next();
    })
})

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch) => {
        if(err) return cb(err)
        if(!isMatch) return cb(null, false);
        cb(null,this);
    })
}
module.exports = mongoose.model('User',UserSchema);
