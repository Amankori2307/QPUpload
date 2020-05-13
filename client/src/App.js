import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Login from './Component/Login'
import Register from './Component/Register';
import NotFound from './Component/NotFound';
import UnPrivateRoute from './hoc/UnPrivateRoute';
import PrivateRoute from './hoc/PrivateRoute';
import Upload from './Component/Upload';
import DetailView from './Component/DetailView';
import Bookmark from './Component/Bookmark';
import MyUploads from './Component/MyUploads';
import Profile from './Component/Profile';
import EditProfile from './Component/EditProfile';


function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <UnPrivateRoute path="/login" component={Login}/>
          <UnPrivateRoute path="/register" component={Register}/>
          <PrivateRoute path="/upload" roles ={[0,1]}component={Upload} />
          <PrivateRoute path="/bookmarks" roles ={[0,1]}component={Bookmark} />
          <PrivateRoute path="/my-uploads" roles ={[0,1]}component={MyUploads} />
          <PrivateRoute path="/profile/:id" roles ={[0,1]}component={EditProfile} />
          <PrivateRoute path="/profile" roles ={[0,1]}component={Profile} />
          <Route exact path="/question-paper/:id" component={DetailView} />

          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
