const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();

require('./passport');

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24* 60 * 60 * 1000,
        name: 'brownie',
        keys: ['key1', 'key2']
        
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 3000
console.log(PORT);
console.log(process.env['GOOGLE_CLIENT_ID']);

app.listen(PORT)