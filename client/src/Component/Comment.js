import React, { useState, useContext, useEffect } from 'react';
import {AuthContext} from '../Context/AuthContext'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SingleComment from './SingleComment';

// Update you yourself cannot comment on your post and  can not reply on your own reply

function Comment({postId, history}) {
    const  {user} = useContext(AuthContext);
    const userId = user._id?user._id:null;
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([])
    const [len, setLen] = useState(0);
    useEffect(() => {
        axios.get(`/comment/${postId}`).then(res => {
            setComments(res.data.comments)
            setLen(res.data.len)
        })
    },[postId])
    const refresh = () => {
        axios.get(`/comment/${postId}`).then(res => {
            setComments(res.data.comments)
            setLen(res.data.len)
        })
    }
    
    const onChange = (e) => {
        setContent(e.target.value);
    }
    const onSubmit = (e) => {
        if(userId){
            e.preventDefault()
            var writer = userId
            if(content !== ""){
                axios.post('/comment/save',{postId,writer, content}).then(res => {
                    if(res.data.success){
                        setContent("")
                        refresh();
                    }
                })
            }
        }else{
            history.push('/login')
        }
    }
    return (
        <>
        <p className ="text-muted"> Replies {len}</p>
        <hr />
        <div className="container">
            {comments && comments.map((comment, index) => <SingleComment key = {index} comment={comment} />)}
            <form className="form row  align-items-center mt-4" onSubmit={onSubmit}>
                <div className = "col-sm-10 col-9 ">
                    <input  className="form-control mr-sm-2" 
                            type="text" 
                            placeholder="Type something here..." 
                            aria-label="Reply" 
                            onChange={onChange}
                            value={content}
                        />
                </div>
                <div className = "col-2 ">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
                </div>
            </form>
            
        </div>

        </>
    );
}

export default withRouter(Comment);