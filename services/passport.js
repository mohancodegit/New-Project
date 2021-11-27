const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //we only need .strategy property
const mongoose = require('mongoose')
const keys = require('../config/keys');

const User = mongoose.model('users'); 
//one argument means, we trying to fetch something out of mongoose
//Two argument means, we trying to load something in mongoose

passport.serializeUser((user, done) => {
    done(null, user.id);
}) 

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })      
})

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',  //user will rerouted to this route after google provides permission
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({googleID: profile.id}).then((existingUser)=>{
                if (existingUser){
                    //we alredy have a document with the given profile ID
                    done(null, existingUser)
                }
                else {
                    new User ({ googleID: profile.id })
                    .save() // We don't have user document with this ID, saving  as a new document
                    .then((user) => { done(null, user)})
            }
            })
        }
    )
);
