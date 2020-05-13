const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/guestbook',{ useNewUrlParser: true, useUnifiedTopology: true  });
const database = mongoose.connection;

database.on('error', (err) => {
    if (err) {
        throw err;
    }
});
database.once('open',  () => {
    console.log('Database connected successfully');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/router');
app.use('/', routes);

app.listen(5000, function () {
  console.log('App listening on port 5000');
});