var express = require('express');
var router = express.Router();


// Show User Table
router.get('/user', async (req, res, next) => {

    conn.query("select * from user;", (err, rows, next) => {
        if(err)
            error(res, "sql error")
        
        res.json(rows);
        return;
    })
});

// Show Data Table
router.get('/data', async (req, res, next) => {

    conn.query("select * from data;", (err, rows, next) => {
        if(err)
            error(res, "sql error")
        
        res.json(rows);
        return;
    })
});

var error = (res, msg) => {
    res.statusCode = 400;
    res.json({
      error: msg
    })
    return
  }
  
  
  module.exports = router;
  