var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({
    "method": "GET",
    "result": "This is test result."
  })
});

router.post('/test', (req,res,next) =>{
  res.json({
    "method": "POST",
    "result": "This is test result."
  })
})

module.exports = router;
