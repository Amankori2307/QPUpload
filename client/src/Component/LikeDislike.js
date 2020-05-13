import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import {AuthContext} from '../Context/AuthContext'
import { withRouter } from 'react-router-dom';
function LikeDislike(props) {
    const [like,setLike] = useState(false)
    const [dislike,setDislike] = useState(false)
    const {user} = useContext(AuthContext)
    const {postId} = props
    const userId = user._id?user._id:null;
    useEffect(() => {
        if(userId){
        axios.get(`/like-dislike/isliked/${postId}/${userId}`).then(res => {
                setLike(res.data.like)
        })

        axios.get(`/like-dislike/isdisliked/${postId}/${userId}`).then(res => {
            setDislike(res.data.dislike)
        })}

    },[postId,userId])

    const onLike = () => {
        if(userId){
          axios.post('/like-dislike/like',{postId,userId})
          .then(res =>{ 
                setLike(res.data.like)
                if(res.data.like)
                    setDislike(false)
                props.refresh()
            })
          .catch()  
        }else{
            props.history.push('/login')
        }
    }
    const onDislike = () =>{
        if(userId){
            axios.post('/like-dislike/dislike',{postId,userId})
            .then(res =>{ 
                setDislike(res.data.dislike)
                if(res.data.dislike)
                    setLike(false)
                props.refresh()
            
            })
            .catch()                
        }else{
            props.history.push('/login')
        }
    }
    return (
        <div className="my-4">
            <button className={`btn btn-sm mr-2 ${like?"btn-primary":"btn-outline-primary"}`} onClick={onLike}>Like {props.likes}</button>
        <button className={`btn btn-sm ${dislike?"btn-primary":"btn-outline-primary"}`} onClick={onDislike}>Dislike {props.dislikes}</button>
        </div>
    );
}

export default withRouter(LikeDislike);