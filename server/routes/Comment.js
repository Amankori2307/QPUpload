const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../helper/passport')
const Comment  = require('../models/Comment')


router.get('/:postId',async (req,res) => {
    const comments = await Comment.find({postId : req.params.postId}).populate('writer');
    if(comments) return res.json({len : comments.length, comments})
    return res.json({len : 0, comments : []})
})

router.post('/save',passport.authenticate('jwt',{session:false}),async (req,res) => {
    const newComment = new Comment(req.body);
    const comment = await  newComment.save();
    if(comment) return res.json({success : true, comment})
    return res.json({success : false})
})

module.exports = router