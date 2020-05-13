import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom' 
import {AuthContext} from '../Context/AuthContext'
import AuthService from '../Service/AuthService';
import Message from './Message';
function Login(props) {
    const [user,setUser] = useState({email : "",password : ""})
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
      AuthService.login(user).then(res => {
        if(res.isAuthenticated){
          authContext.setIsAuthenticated(res.isAuthenticated);
          authContext.setUser(res.user);
          setMessage(null);
          props.history.push('/')
        }else{
          setMessage({
            msgBody:"Invalid credentials!",
            msgError:true
          })
        }
      })
    }
    return (
        <React.Fragment>
        <p className="display-4">Login</p>
        <form onSubmit={onSubmit}>
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
        <p className="text-right"><Link to="/forgot-password">Forgot Password?</Link></p>
          <button type="submit" className="btn btn-primary">Login</button>
        <p className="text-secondary">Not registerd yet?<Link  className="text-primary" to="/register">Register</Link></p>
      </form>
      {message?<Message message={message} />:null}
      </React.Fragment>
    );
}

export default Login;