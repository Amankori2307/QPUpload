import React, { useContext } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
import AuthService from '../Service/AuthService';
function Navbar(props) {
    const {isAuthenticated,setIsAuthenticated, setUser} = useContext(AuthContext)

    const UnAuthenticated = () => {
        return  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
    }
    const Authenticated = () => {
        return  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/upload">Upload</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-uploads">My Uploads</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
                    </li>
                    <li className="nav-item ">
                        <button className="btn btn-outline-secondary" onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>               
    } 
    const logoutHandler = () => {
        AuthService.logout().then(res => {
            setIsAuthenticated(res.isAuthenticated);
            setUser(res.user);
        })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">QPUpload</Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                
                    {isAuthenticated?Authenticated():UnAuthenticated()}
            </div>
            </nav>   
        </div>
    );
}

export default withRouter(Navbar);