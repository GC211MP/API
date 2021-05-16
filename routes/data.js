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
  var stage = -1;
  // query:
  // - `c`: (mandatory) column to order
  // - `o`: (mandatory) "desc" or "asc" (descending, ascending order)
  // - `stage`: (optional) Distinction "stage"
  if(!Object.keys(req.query).includes("c") || !Object.keys(req.query).includes("o")){
    error(res, "query error")
    return
  }
  column = req.query.c
  order = req.query.o

  if(Object.keys(req.query).includes("stage"))
    stage = req.query.stage

  console.log(stage)
  
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

  var sqlQuery = `select g1.c_date, u.user_name, g1.stage_id, g1.distance, g1.calorie, g1.score 
    from (select * from data) g1 join user u on g1.user_idx = u.idx `
      
  if(stage != -1)
    sqlQuery += ` where g1.stage_id = ${stage} `

  sqlQuery += ` order by ${column} ${order} `
  
  // send rank data table
  conn.query(sqlQuery, (err, rows, fields) => {
    if(err){
      console.log(err)
      error(res, "sql error")
      return
    }
    res.json(rows)
    return
  })
});









// get total distance
router.get('/distance', (req, res, next) => {

	var uidx = -1
  var stage = -1

  if(!Object.keys(req.query).includes("uidx")){
    error(res, "query error")
    return
  }
  if(Object.keys(req.query).includes("stage")){
    stage = req.query.stage
  }

	uidx = req.query.uidx

  sqlQuery = `select sum(distance) result from data where user_idx=${uidx}`
  if(stage != -1)
    sqlQuery += ` and stage_id=${stage}`
  
  console.log(sqlQuery)
	conn.query(sqlQuery, (err, rows, fields) => {
    if(err){
      console.log(err)
      error(res, "sql error")
      return
    }
    
    console.log(rows)
    res.json({
      "total_distance": rows[0].result
    })
    return
	})
})


// get total calorie
router.get('/calorie', (req, res, next) => {

	var uidx = -1
  var stage = -1

  if(!Object.keys(req.query).includes("uidx")){
    error(res, "query error")
    return
  }
  if(Object.keys(req.query).includes("stage")){
    stage = req.query.stage
  }

	uidx = req.query.uidx

  sqlQuery = `select sum(calorie) result from data where user_idx=${uidx}`
  if(stage != -1)
    sqlQuery += ` and stage_id=${stage}`
  
  console.log(sqlQuery)
	conn.query(sqlQuery, (err, rows, fields) => {
    if(err){
      console.log(err)
      error(res, "sql error")
      return
    }
    
    console.log(rows)
    res.json({
      "total_calorie": rows[0].result
    })
    return
	})
})


// get total score
router.get('/score', (req, res, next) => {

	var uidx = -1
  var stage = -1

  if(!Object.keys(req.query).includes("uidx")){
    error(res, "query error")
    return
  }
  if(Object.keys(req.query).includes("stage")){
    stage = req.query.stage
  }

	uidx = req.query.uidx

  sqlQuery = `select sum(score) result from data where user_idx=${uidx}`
  if(stage != -1)
    sqlQuery += ` and stage_id=${stage}`
  
  console.log(sqlQuery)
	conn.query(sqlQuery, (err, rows, fields) => {
    if(err){
      console.log(err)
      error(res, "sql error")
      return
    }
    
    console.log(rows)
    res.json({
      "total_score": rows[0].result
    })
    return
	})
})


// get total score
router.get('/scoretop', (req, res, next) => {

	var uidx = -1
  var stage = -1

  if(!Object.keys(req.query).includes("uidx")){
    error(res, "query error")
    return
  }
  if(Object.keys(req.query).includes("stage")){
    stage = req.query.stage
  }

	uidx = req.query.uidx

  sqlQuery = `select max(score) result from data where user_idx=${uidx}`
  if(stage != -1)
    sqlQuery += ` and stage_id=${stage}`
  
  console.log(sqlQuery)
	conn.query(sqlQuery, (err, rows, fields) => {
    if(err){
      console.log(err)
      error(res, "sql error")
      return
    }
    
    console.log(rows)
    res.json({
      "top_score": rows[0].result
    })
    return
	})
})










// Enroll Rank Data
router.post('/', (req,res,next) =>{

  var user_idx = -1;
  var stage_id = -1;
  var distance = -1;
  var calorie = -1;
  var score = -1;
  // body: {
  //   user_idx: [int]
  //   stage_id: [int]
  //   distance: [int]
  //   calorie: [int]
  //   score: [int]
  // }
  if(!Object.keys(req.body).includes("user_idx") || 
      !Object.keys(req.body).includes("stage_id") || 
        !Object.keys(req.body).includes("distance") || 
          !Object.keys(req.body).includes("calorie") ||
            !Object.keys(req.body).includes("score")){
    error(res, "query error")
    return
  }
  user_idx = Number(req.body.user_idx);
  stage_id = Number(req.body.stage_id);
  distance = Number(req.body.distance);
  calorie = Number(req.body.calorie);
  score = Number(req.body.score);

  console.log(user_idx)
  console.log(stage_id)
  console.log(distance)
  console.log(calorie)
  console.log(score)


  if(isNaN(user_idx) || isNaN(stage_id) || isNaN(distance) || isNaN(calorie) || isNaN(score)){
    error(res, "query error")
    return
  }

  conn.query(`insert into data(user_idx, stage_id, distance, calorie, score)
    values(${user_idx},${stage_id},${distance},${calorie},${score});`, (err, rows) => {
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
