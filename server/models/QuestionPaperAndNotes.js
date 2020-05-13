const mongoose = require('mongoose');
const Schema = mongoose.Schema.Types
const questionPaperAndNotesSchema = mongoose.Schema({
    user : {
        type : Schema.ObjectId,
        ref : 'User',
        required : true
    },
    url : {
        type:String,
        required : true
    },
    subject : String,
    year : String,
    sem : String,
    mediaType : {
        type : String,
        enum : ['questionPaper','notes'],
        required : true
    },
    thumbnail : {
        type:String,
        required:true
    },
    branch : String,
    college:String,
    likes : {
        type : Number,
        default:0
    },
    dislikes : {
        type : Number,
        default:0
    } 
});

module.exports = mongoose.model('QuestionPaperAndNotes',questionPaperAndNotesSchema)