const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser((id, done) => {
   User.findById(id)
       .then(user => {
           done(null, user);
       });
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: '1oApHggKjqW6_JfdM4u_9zKe',
        callbackURL: "/auth/google/callback",
        proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id },  (err, user) => {
      return done(err, user);
    });
  }
));
