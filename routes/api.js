var express = require('express');
var router = express.Router();

// Load User Data
router.get('/user', function(req, res, next) {

  conn.query("select * from user", (err, rows, fields) => {

    console.log(rows)

    res.json({
      "method": "GET",
      "result": "This is test result."
    })
  })
});

// Add User
router.post('/user', (req,res,next) =>{
  res.json({
    "method": "POST",
    "result": "This is test result."
  })
})

// Modify User
router.patch("/user", (req, res, next) => {
  res.json({
    "method": "PATCH",
    "result": "This is test result."
  })
})

module.exports = router;
