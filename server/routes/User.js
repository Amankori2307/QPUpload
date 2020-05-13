const express = require('express');
const router = express.Router();
const passportConf  = require('../helper/passport')
const passport = require('passport');
const JWT = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const User = require('../models/User');
const fs = require('fs')
const {SECRET_KEY} = require('../config')

const signToken = (id) => {
    return JWT.sign({
        iss : "QPUpload",
        sub : id
    },SECRET_KEY,{expiresIn : '48h'})
}


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'..','..','uploads','profile'))
    },
    filename : (req,file,cb) => {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const fileFilter = (req,file,cb) => {
    const fileTypes = /jpg|png|jpeg/i
    const extname = fileTypes.test(path.extname(file.originalname))
    
    const mimetype = fileTypes.test(file.mimetype)
    
    if(extname && mimetype) cb(null, true)
    else cb(`Invalid file type only jpg,jpeg and png are allowed`)
}
const upload = multer({
    storage : storage,
    limits : {
        fieldSize : 50000
    },
    fileFilter : (req,file,cb) => fileFilter(req,file,cb)
}).single('file')



// Notes for later
// Use Express validator to validate data
// to check if it is a proper email or not to check if it is empty or not

router.post('/register',async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email})
    if(user) return  res.json({message : {msgBody: 'Email Already Registered!', msgError : true}})
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if(err) return res.json({message : {msgBody: 'Error has occoured', msgError : true}})
        if(!user) return res.json({message : {msgBody: 'Error has occoured', msgError : true}})
        return res.json({message : {msgBody: 'User Successfully Created', msgError : false}})
    })
});

router.post('/login',passport.authenticate('local',{session: false}),(req,res) => {
    if(req.isAuthenticated){
        const {_id,email,username,role,college,sem,year,branch,url} = req.user;
        const token = signToken(_id);
        res.cookie('access_token',token,{httpOnly:true,sameSite:true});
        return res.json({isAuthenticated : true, user : {_id,email,username,role,college,sem,year,branch,url}})

    }
})
router.get('/logout',passport.authenticate('jwt',{session:false}),(req,res) => {
    res.clearCookie('access_token');
    res.json({isAuthenticated : false, user : {email : "", role : ""}})
})
router.get('/authenticated',passport.authenticate('jwt',{session:false}),(req,res) => {
    if(req.isAuthenticated){
        const {_id,email,username,role,college,sem,year,branch,url} = req.user;
        return res.json({isAuthenticated:true,user : {_id,email,username,role,college,sem,year,branch,url}})
    }
})
router.post('/edit',passport.authenticate('jwt',{session : false}),async (req,res) => {
    upload(req,res,err => {
        if(req.file){
            if(err) res.json({messarge : {msgBody :"Error has Occured", msgError : true}})
            const {userId,file,...data} = req.body
            User.findOneAndUpdate({_id:userId},{url:`/profile/${req.file.filename}`,...data}).then(async (user,err) => {
                if(err) res.json({message : {msgBody :"Error has Occured", msgError : true}})
                if(fs.existsSync(path.join(__dirname,'..','..','uploads')+user.url) && user.url !== '/profile/default.png' )
                    fs.unlinkSync(path.join(__dirname,'..','..','uploads')+user.url)
                res.json({message : {msgBody :"User Successfully Edited", msgError : false}})
                
            })
        }else{
            return res.json({message : {msgBody:"Please Select A File", msgError : true}})
        }
    })
})
router.get('/:_id',passport.authenticate('jwt',{session : false}),(req,res) => {
    User.findOne({_id : req.params._id}).then((user,err) => {
        const {_id,email,username,role,college,sem,year,branch,url} = user
        if(err) res.json({message : {msgBody :"Error has Occured", msgError : true}})
        res.json({_id,email,username,role,college,sem,year,branch,url})
    })
})

// Just to check wheather user was created or not
// router.get('/',(req, res) => {
//     User.find((err,user) => {
//         if(err) return res.json(user)
//         if(!user) return res.json(user)
//         return res.json(user)
//     })
// })
module.exports = router