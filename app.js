var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Load files to be routed
var userRouter = require('./routes/user');
var dataRouter = require('./routes/data');
var showRouter = require('./routes/show');
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

// Connect to MySQL Server
conn.connect((err) => {
    if(err != null) console.log("Cannot connect MySQL Server!: \n" + err)
    else console.log("MySQL Connection Successful!")
  });

// Load middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/data', dataRouter);
app.use('/show', showRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  // res.redirect("/")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({
    'error': "wrong path",
    "status": res.statusCode
  });
});

module.exports = app;
