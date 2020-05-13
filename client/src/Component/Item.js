import React from 'react';
import {withRouter } from 'react-router-dom';
import LikeDislike from './LikeDislike';

function Item(props) {
    const {item} = props
    return (
    <div className="mx-1 my-4">        
        <div className="media" onClick={() => props.history.push(`/question-paper/${item._id}`)}>
            <img src={item.user.url} className="mr-3 img-fluid"style={{height:"64px",width:"64px",borderRadius:"32px"}} alt="profile" />
            <div className="media-body">
                <h5 className="mt-0">{item.user.email}</h5>
                <span className="text-muted">{item.subject}/{item.college}/{item.branch}/<b>Sem</b>|{item.sem}</span>
            </div>
        </div>
        <LikeDislike refresh={props.refresh}postId={item._id} likes={item.likes} dislikes={item.dislikes}/>
    </div>
    );
}

export default withRouter(Item);