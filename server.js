const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');

const app = express();
const port = 3000;




// ******** DB Connection ********

var dbOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, auto_reconnect: true };

mongoose.connect(config.database, dbOptions);

mongoose.connection.on('connected', function () {

    console.log("Connected to DB");

})

mongoose.connection.on('error', function (err) {

    console.log("Error while connecting to DB: " + err);

})

// ******** DB Connection ********

// *****Middle Wares*******
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//****Middle Wares********

app.use('/users',users);

// set Static Folder




app.get('/', (req,res) => {
    res.send('Hello');
})
app.listen(port, () => {
    console.log('server is running on port '+port);
})