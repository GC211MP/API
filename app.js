var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var apiRouter = require('./routes/api');
var app = express();


// mysql connection
const mysql = require('mysql');
const cipher = require('./cipher');
global.conn = mysql.createConnection(
  {
    host: cipher.host,
    user: cipher.user,
    password: cipher.password,
    database: cipher.database,
    multipleStatements: true
    // Enable multiple query (https://zionh.tistory.com/26)
  }
)

conn.connect((err) => {
    if(err != null) console.log("Cannot connect MySQL Server!: \n" + err)
    else console.log("MySQL Connection Successful!")
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

module.exports = app;
