const mongoose = require('mongoose');
const Schema = mongoose.Schema.Types
const bookmarkSchema = mongoose.Schema({
    postId : {
        type : Schema.ObjectId,
        ref:'QuestionPaperAndNotes',
        required : true
    },
    userId : {
        type : Schema.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports = mongoose.model('Bookmark',bookmarkSchema)