import React, {useContext} from 'react';
import {AuthContext}  from '../Context/AuthContext'
import Preloader from './Preloader';
import {Link} from 'react-router-dom'
function Profile(props) {
    const {user} = useContext(AuthContext);
    return (
        <React.Fragment>
            {!user?
            <Preloader/>:
            <>
            <div className="text-center">
                <img src={user.url} className=" img-thumbnail img-fluid rounded-circle" style={{width:"30vw",height:"30vw"}} alt="profile" />
                <p className="h5 text-muted">{user.username}</p>
                <p><span className="text-muted h6">{user.email}</span><Link className="text-primary text-bold"to={`/profile/${user._id}`}>/Edit</Link></p>
                <div style={{width:"30vw"}}>
                    <p className="h6 text-muted text-left">College : {user.college}</p>
                    <p className="h6 text-muted text-left">Branch : {user.branch}</p>
                    <p className="h6 text-muted text-left">Year : {user.year}</p>
                    <p className="h6 text-muted text-left">Sem : {user.sem}</p>
                </div>
            </div>
            </>
            }
        </React.Fragment>
    );
}

export default Profile;