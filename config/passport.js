const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys')
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
    User.findById(jwt_payload.id)
        .then(user=>{
          if(user){
            return done(null,user);
          }
          return done(null,'未找到！');
        })
        .catch(err => {
          console.log(err);
        })
  }));
}
