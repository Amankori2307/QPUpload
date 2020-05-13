import React, { useState } from 'react';

function SingleComment({comment}) {
    const [reply, setReply] = useState(false);
    const onChange = e => {
        setReply(prevState => !prevState);
    }
    return (
    <div className="media mt-3">
        <img src={comment.writer.url} className="mr-3 img-fluid rounded-circle" style={{height: "44px",width:"44px"}} alt="profile" />
        <div className="media-body" style={{fontSize:"0.8rem"}}>
            <h6 className="mt-0">{comment.writer.email}</h6>
            <p className="text-muted">~{comment.content}</p>
            <p className="text-primary" style= {{fontWeight:"bold"}}onClick={onChange}>reply</p>
            {reply && <form className="form row  align-items-center">
                <div className = "col-sm-10 col-9 ">
                    <input className="form-control mr-sm-2" type="input" placeholder="Type something here..." aria-label="reply"/>
                </div>
                <div className = "col-2 ">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
                </div>
            </form>}
        </div>
    </div>
    );
}

export default SingleComment;