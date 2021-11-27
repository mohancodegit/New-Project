const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');  //Give us the access for the cookies
const passport = require('passport'); //Tells the passport to make use of cookie. 
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //days * hours * minutes * seconds * milli seconds
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());     //Tells the passport to make use of cookie. 
app.use(passport.session());

require('./routes/authRoutes')(app)
// can be write as const authRoutes = require('./routes/authRoutes')


const PORT = process.env.PORT || 5000; // for dev there is no env variable so we assign the 5000 bydefault
app.listen(PORT);