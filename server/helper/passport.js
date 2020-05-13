const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const {SECRET_KEY} = require('../config')
const User = require('../models/User')

const tokenExtractor = (req) =>{
    var token = null;
    if(req.cookies && req.cookies['access_token']){
        token = req.cookies['access_token']
    }
    return token;
}
// For Authorization
passport.use(new JWTStrategy({
    jwtFromRequest : tokenExtractor,
    secretOrKey : SECRET_KEY 
},(payload, done) => {
    User.findById({_id : payload.sub},(err,user) => {
        if(err) return done(err);
        if(!user) return done(null, false);
        done(null, user)
    })
}))

// For Authentication
// When i was using email in place of username i was gettting badrequest error
passport.use(new LocalStrategy({
    usernameField: 'email',
	passwordField: 'password'
},(email,password,done) => {
    User.findOne({email},(err, user) => {
        // Something went wrong with database
        if(err) return done(err);
        // if no user exist
        if(!user) return done(null, false);
        // check if password is correct
        user.comparePassword(password,done);

    })
}));