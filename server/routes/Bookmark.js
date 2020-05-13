const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../helper/passport')
const Bookmark  = require('../models/Bookmark')


router.get('/:userId-:mediaType',passport.authenticate('jwt',{session:false}),async (req,res) => {
    const {userId, mediaType} = req.params
    const data =  mediaType == "null"?{}:{'mediaType':mediaType}
    Bookmark.find({userId}).populate({path:'postId',model:"QuestionPaperAndNotes",match :data, populate :{path:"user",model:"User"} }).then((data,err) => {
        if(err) return res.json([])
        return res.json(data)
    })
})
router.get('/isbookmarked/:postId/:userId',(req,res) => {
    const {postId, userId} = req.params
    Bookmark.findOne({postId,userId}).then((bookmark,err) => {
        if(err) return res.json({message : {msgBody : 'Error has occured', msgError : true}})
        if(!bookmark) return res.json({bookmark : false})
        res.json({bookmark:true})
    })
})

router.post('/save',passport.authenticate('jwt',{session:false}),async (req,res) => {
    const {postId, userId} = req.body;
    var bookmark = await Bookmark.findOneAndRemove({postId,userId});
    if(bookmark){ 
        return res.json({bookmark : false}) 
    }else{
        const newbookmark = new Bookmark({postId, userId});
        bookmark = await newbookmark.save();
        if(bookmark) return res.json({bookmark : true})
    }
})

module.exports = router