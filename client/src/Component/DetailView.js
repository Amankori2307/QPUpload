import React,{useEffect, useState, useContext} from 'react';
import { useParams, withRouter} from 'react-router-dom';
import axios from 'axios'
import LikeDislike from './LikeDislike'
import Preloader from './Preloader';
import {AuthContext} from '../Context/AuthContext'
import Comment from './Comment';

function DetailView(props) {
    const [item,setItem] = useState(null)
    const [bookmark,setBookmark] = useState(false);
    
    const {id } = useParams()
    const {user}  = useContext(AuthContext)
    const userId = user._id?user._id:null;
    
    // const downloadLinkStyle={
    //     color:"black",
    //     border:"1px solid black",
    //     borderRadius:"5px",
    //     padding:"5px 10px",
    //     fontSize:"0.7rem"
    // }
    useEffect(() => {

        axios.get(`/media/${id}`)
        .then(res => {
            setItem(res.data)
        })
        if(userId){
            axios.get(`/bookmark/isbookmarked/${id}/${userId}`)
            .then(res => {
                setBookmark(res.data.bookmark)
            })
        }   
    },[id,userId])
    const refresh = ( ) => {
        axios.get(`/media/${id}`)
        .then(res => {
            setItem(res.data)
        })
    }
    const onBookmark =() =>{
        if(userId){
            axios.post(`/bookmark/save`,{postId : id,userId})
            .then(res => {
                setBookmark(res.data.bookmark)
            })
        }else{
            props.history.push('/login')
        }
    };
    return (
        <div>
            {item ?
            <div className=" m-5">
                <div className="media">
                    <img src={item.user.url} className="img-fluid mr-2"style={{height:"64px",width:"64px",borderRadius:"32px"}} alt="profile" />
                    <div className="media-body">
                        <h5 className="mt-0 mr-5">{item.user.email}<i className={`fas fa-bookmark ml-5 ${bookmark?"text-primary":""}`} style={{fontSize:"1.3rem"}} onClick={onBookmark}></i></h5>
                        <span className="text-muted">{item.subject}/{item.college}/{item.branch}/<b>Sem</b>-{item.sem}</span>
                    </div>
                </div>
                <div className="">
                    <div style ={{height:"20vw",maxWidth:"50vw",overflowY:"hidden"}} className="my-3">
                        <img src={item.thumbnail} className="img-thumbnail img-fluid" alt="thumbnail"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-2 d-flex col-lg-1 align-items-center">
                            <a href={item.url} className="btn btn-sm btn-outline-primary" download>Dowload</a>
                        </div>
                        <div className="col">
                            <LikeDislike refresh={refresh}postId={item._id} likes={item.likes} dislikes={item.dislikes}/>
                        </div>
                    </div>
                </div>
                <Comment postId={item._id}/>
            </div>: <Preloader/>}
        </div>
    );
}

export default withRouter(DetailView);
