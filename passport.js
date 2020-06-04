const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const dotenv = require("dotenv");
dotenv.config();

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
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: "/auth/google/callback",
        proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id },  (err, user) => {
      return done(err, user);
    });
  }
));
