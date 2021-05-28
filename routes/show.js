var express = require('express');
var router = express.Router();


// Show User Table (for Test)
router.get('/user', async (req, res, next) => {

    // conn.query("select * from user;", (err, rows) => {
    //     if(err)
    //         error(res, "sql error")
        
    //     res.json(rows);
        
    // })
    res.json({});
});

// Show Data Table (for Test)
router.get('/data', async (req, res, next) => {

    // conn.query("select * from data;", (err, rows) => {
    //     if(err)
    //         error(res, "sql error")
        
    //     res.json(rows);
        
    // })
    res.json({});
});



// Handling error response
var error = (res, msg) => {
    res.statusCode = 400;
    res.json({
      error: msg
    })
    
  }
  
  module.exports = router;
  