const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const commentSchema = mongoose.Schema({
    postId:{
        type: ObjectId,
        ref: 'QuestionPaperAndNotes',
        required : true
    },
    writer:{
        type: ObjectId,
        ref: 'User',
        required : true
    },
    responseTo:{
        type: ObjectId,
        ref: 'User'
    },
    content:String
})
module.exports = mongoose.model('Comment',commentSchema)