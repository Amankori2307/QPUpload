const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../helper/passport')
const Like = require('../models/Like');
const Dislike = require('../models/Dislike');
const QuestionPaperAndNotes = require('../models/QuestionPaperAndNotes')
router.get('/isliked/:postId/:userId',(req,res) => {
    const {postId, userId} = req.params
    Like.findOne({postId,userId}).then((like,err) => {
        if(err) return res.json({message : {msgBody : 'Error has occured', msgError : true}})
        if(!like) return res.json({like : false,like})
        res.json({like:true})
    })
})
router.get('/isdisliked/:postId/:userId',(req,res) => {
    const {postId, userId} = req.params
    Dislike.findOne({postId,userId}).then((dislike,err) => {
        if(err) return res.json({message : {msgBody : 'Error has occured', msgError : true}})
        if(!dislike) return res.json({dislike : false, dislike})
        res.json({dislike:true})
    })
})
router.post('/like',passport.authenticate('jwt',{session:false}),async (req,res) => {
    const {postId, userId} = req.body;
    var like = await Like.findOneAndRemove({postId,userId});
    if(like){
        const post = await QuestionPaperAndNotes.findOne({_id : postId})
        if(post){
            post.likes = post.likes-1
            const savePost = await post.save()
            if(savePost) return res.json({like : false , already:true})
        }
    }else{
        var newlike = new Like({postId, userId});
        like = await newlike.save();
        if(like){
            const post = await QuestionPaperAndNotes.findOne({_id : postId})
            if(post){
                post.likes = post.likes+1
                var savePost = await post.save()
                const dislike = await Dislike.findOneAndRemove({postId,userId})
                if(dislike){
                    const post = await QuestionPaperAndNotes.findOne({_id : postId})
                    if(post){
                        post.dislikes = post.dislikes-1
                        savePost = await post.save()
                        if(savePost) return res.json({like : true,dislike:false})
                    }    
                }
                if(savePost) return res.json({like : true})
            }
        }
    }
})
router.post('/dislike',passport.authenticate('jwt',{session:false}),async (req,res) => {
    const {postId, userId} = req.body;
    var dislike = await Dislike.findOneAndRemove({postId,userId});
    if(dislike){
        const post = await QuestionPaperAndNotes.findOne({_id : postId})
        if(post){
            post.dislikes = post.dislikes-1
            const savePost = await post.save()
            if(savePost) return res.json({dislike : false , already:true})
        }
    }else{
        var newdislike = new Dislike({postId, userId});
        dislike = await newdislike.save();
        if(dislike){
            const post = await QuestionPaperAndNotes.findOne({_id : postId})
            if(post){
                post.dislikes = post.dislikes+1
                var savePost = await post.save()
                const like = await Like.findOneAndRemove({postId,userId})
                if(like){
                    const post = await QuestionPaperAndNotes.findOne({_id : postId})
                    if(post){
                        post.likes = post.likes-1
                        savePost = await post.save()
                        if(savePost) return res.json({dislike : true,like:false})
                    }    
                }
                if(savePost) return res.json({dislike : true})
            }
        }
    }
})

module.exports = router