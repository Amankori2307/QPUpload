const express = require('express');
const router = express.Router();
const passport = require('passport')
const passportConf = require('../helper/passport')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const {CONVERT_SECRET} = require('../config')
const convertapi = require('convertapi')(CONVERT_SECRET);

const QuestionPaperAndNotes = require('../models/QuestionPaperAndNotes')


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'..','..','uploads','questionpaper'))
    },
    filename : (req,file,cb) => {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const fileFilter = (req,file,cb) => {
    const fileTypes = /pdf/i
    const extname = fileTypes.test(path.extname(file.originalname))
    
    const mimetype = fileTypes.test(file.mimetype)
    
    if(extname && mimetype) cb(null, true)
    else cb(`Invalid file type only pdf is allowed`)
}
const upload = multer({
    storage : storage,
    limits : {
        fieldSize : 500000
    },
    fileFilter : (req,file,cb) => fileFilter(req,file,cb)
}).single('file')
// Router
router.get('/my-uploads/:user-:mediaType',passport.authenticate('jwt',{session : false}),(req,res) => {
    const {user, mediaType} = req.params
    const data = mediaType == "null"?{user}:{user,mediaType}
    QuestionPaperAndNotes.find(data).populate('user').then((data,err) => {
        if(err) return res.json([])
        res.json(data)
    })
})
router.get('/delete/:postId',passport.authenticate('jwt',{session : false}),(req,res) => {
    QuestionPaperAndNotes.findOneAndRemove({_id:req.params.postId}).then((data,err) => {
        if(err) return res.json({success : false})
        if(!data)return res.json({success : false})
        else{
            if(path.join(__dirname,'..','..','uploads')+data.url)
                fs.unlinkSync(path.join(__dirname,'..','..','uploads')+data.url)
            if(path.join(__dirname,'..','..','uploads')+data.thumbnail)
                fs.unlinkSync(path.join(__dirname,'..','..','uploads')+data.thumbnail)
            return res.json({success:true})
        }
    })
})
router.post('/upload',passport.authenticate('jwt',{session : false}),(req,res) => {
    upload(req,res, async err =>{
        if(req.file){      
            const {mediaType,subject,sem,year,branch,college} = req.body;
            if(err)  return res.json({message : {msgBody : "Error Occoured", msgError : true}})
            await convertapi.convert('thumbnail', {
                File: path.join(__dirname,'..','..','uploads','questionpaper',req.file.filename),
                FileName: req.file.filename,
                PageRange:'1'
            }, 'pdf').then(function(result) {
                result.saveFiles(path.join(__dirname,'..','..','uploads','thumbnail'));
            });
            const newMedia = QuestionPaperAndNotes({user : req.user._id, mediaType,sem,year,branch,college,subject,url : `/questionpaper/${req.file.filename}`,thumbnail : `/thumbnail/${req.file.filename}.jpg` })
            newMedia.save((err, doc) => {
                if(err)  return res.json({message : {msgBody : "Error Occoured", msgError : true}})
                return res.json({message : {msgBody : "File saved successfully", msgError : false},doc})
                
            })
        }
        else
            res.json({message : {msgBody : "Please Select a File", msgError : true}})
        
    })
    
})
router.get('/question-paper',(req,res) => {
    QuestionPaperAndNotes.find().where('mediaType').equals('questionPaper').sort('-likes').populate('user').exec((err, data) => {
        if(err)  return res.json({message : {msgBody : "Error Occoured", msgError : true}})
        return res.json({questionPapers : data})
    })
})
router.get('/:id',(req,res)=>{

    QuestionPaperAndNotes.findById({_id: req.params.id}).populate('user').exec((err, doc) => {
        if(err)  return res.json({message : {msgBody : "Error Occoured", msgError : true},err})
        res.json(doc);
    })
})


// router to get search results
router.post('/question-paper',async (req,res) => {
    const {subject,college,branch,...rest} = req.body
    const regex1 = new RegExp(subject)
    const regex2 = new RegExp(college)
    const regex3= new RegExp(branch)
    const data = await QuestionPaperAndNotes.find({
        'subject' : {$regex : regex1,$options : 'i'},
        'college' : {$regex : regex2,$options : 'i'},
        'branch' : {$regex : regex3,$options : 'i'},
        ...rest}).populate('user').sort('-likes')
    if(data) res.json({len : data.length,data});
    else res.json([])
})

module.exports = router