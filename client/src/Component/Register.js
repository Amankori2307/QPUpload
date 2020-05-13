import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom' 
import {AuthContext} from '../Context/AuthContext'
import AuthService from '../Service/AuthService';
import Message from './Message';
function Register(props) {
    const [user,setUser] = useState({email : "",password : "",username : ""})
    const authContext = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const onChange = e => {
      setUser({
        ...user,
        [e.target.name]:e.target.value
      })
    }
    const onSubmit = e => {
        e.preventDefault(user);
      AuthService.register(user).then(res => {
        if(!res.message.msgError){
          authContext.setIsAuthenticated(res.isAuthenticated);
          authContext.setUser(res.user);
          setMessage(null);
          props.history.push('/login')
        }else{
          setMessage(res.message)
        }
      })
    }
    return (
        <React.Fragment>
        <p className="display-4">Register</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input  type="text" 
                    className="form-control" id="username" 
                    name = "username"
                    onChange ={onChange} 
                    value = {user.username}
                  />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input  type="email" 
                    className="form-control" id="email" 
                    aria-describedby="emailHelp"
                    name = "email"
                    onChange ={onChange} 
                    value = {user.email}
                  />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input  type="password" 
                    className="form-control" 
                    id="password" 
                    name = "password"
                    onChange ={onChange} 
                    value = {user.password}
                  />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          <p className="text-secondary">Already Registerd?<Link  className="text-primary" to="/login">Login</Link></p>
      </form>
      {message?<Message message={message} />:null}
      </React.Fragment>
    );
}

export default Register;