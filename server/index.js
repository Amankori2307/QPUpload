const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const path = require('path')
const {MONGO_URL} = require('./config');

const app = express();

mongoose.connect(MONGO_URL,{useFindAndModify:false,useNewUrlParser : true,useUnifiedTopology:true, useCreateIndex:true},(err) => {
    if(err) console.log(err);
    else console.log('Successfully concected to MongoDB');
});

app.use(cookieParser());
app.use(express.json());
// Router
const userRouter = require('./routes/User');
const QuestionPaperAndNotesRouter = require('./routes/QuestionPaperAndNotes');
const LikeDislikeRouter = require('./routes/LikeDislike');
const BookmarkRouter = require('./routes/Bookmark')
const CommentRouter = require('./routes/Comment')
app.use('/user',userRouter);
app.use('/media',QuestionPaperAndNotesRouter);
app.use('/like-dislike',LikeDislikeRouter);
app.use('/bookmark',BookmarkRouter);
app.use('/comment', CommentRouter)

app.use(express.static(path.join(__dirname,'..','uploads')))

// For production
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'..','client','build','index.html'))
    })
}



const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log(`Listening to port ${port}`);
    console.log(process.env.NODE_ENV);
})