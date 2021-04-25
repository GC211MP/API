var express = require('express');
var router = express.Router();

var execute = (query) => new Promise(resolve => {
  conn.query(query, (err,rows) => {
    if(err){
      console.log(err)
      resolve(false)
    } else
      resolve(true)
  })
})

var getFeatures = () => new Promise(resolve => {
  conn.query(`select * from data;`, (err,rows,fields) => {
    if(err){
      console.log(err)
      resolve([])
    } else
      resolve(fields)
  })
})



// Load Rank Data
router.get('/', async (req, res, next) => {

  var column = "";
  var order = "";
  // query:
  // - `c`: (mandatory) column to order
  // - `o`: (mandatory) "desc" or "asc" (descending, ascending order)
  if(!Object.keys(req.query).includes("c") || !Object.keys(req.query).includes("o")){
    error(res, "query error")
    return
  }
  column = req.query.c
  order = req.query.o

  
  // check column is valid
  var fields = await getFeatures()
  if(fields.length == 0){
    error(res, "sql error")
    return
  }
  var isColumnValid = false
  for(var i of fields){
    if(i.name == column){
      isColumnValid = true;
      break;
    }
  }
  if(!isColumnValid){
    error(res, "column query error")
    return
  }

  // check order is valid
  if(order != "asc" && order != "desc"){
    error(res, "order query error")
    return
  }

  // send rank data table
  conn.query(`select user_id, stage_id, elapsed_time from data order by ${column} ${order}`, (err, rows, fields) => {
    res.json(rows)
    return
  })
});



// Enroll Rank Data
router.post('/', (req,res,next) =>{

  var user_idx = -1;
  var stage_id = -1;
  var elapsed_time = -1;
  // body: {
  //   user_idx: [int]
  //   stage_id: [int]
  //   elapsed_time: [int]
  // }
  if(!Object.keys(req.body).includes("user_idx") || 
      !Object.keys(req.body).includes("stage_id") || 
        !Object.keys(req.body).includes("elapsed_time")){
    error(res, "query error")
    return
  }
  user_idx = Number(req.body.user_idx);
  stage_id = Number(req.body.stage_id);
  elapsed_time = Number(req.body.elapsed_time);

  console.log(user_idx)
  console.log(stage_id)
  console.log(elapsed_time)

  if(isNaN(user_idx) || isNaN(stage_id) || isNaN(elapsed_time)){
    error(res, "query error")
    return
  }

  conn.query(`insert into data(user_idx, stage_id, elapsed_time)
    values(${user_idx},${stage_id},${elapsed_time});`, (err, rows) => {
    if(err){
      console.log(err)
      error(res, "sql error")
      return 
    }
    res.statusCode = 200
    res.json({
      "result": "success"
    })
  })
})



var error = (res, msg) => {
  res.statusCode = 400;
  res.json({
    error: msg
  })
  return
}


module.exports = router;