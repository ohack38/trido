const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('./models/User');

const app = express();

connectDB();

require('./passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cookieSession({
        maxAge: 30 * 24* 60 * 60 * 1000,
        name: 'brownie',
        keys: ['key1', 'key2']
        
    })
);

app.use(passport.initialize());
app.use(passport.session());

//ROUTES
require('./routes/authRoutes')(app);
app.use('/api/todos', require('./routes/todos'));


const PORT = process.env.PORT || 5000


app.listen(PORT)