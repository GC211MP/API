var express = require('express');
var router = express.Router();

// Load User Data
router.get('/', function(req, res, next) {

  var uid = "";

  // ?uid=[String]
  if(!Object.keys(req.query).includes("uid")){
    error(res, "query error")
    return
  }

  uid = req.query.uid;

  console.log(`select user_id, idx as user_idx, user_name from user where user_id='${uid}';`)

  conn.query(`select user_id, idx as user_idx, user_name from user where user_id='${uid}';`, (err, rows, fields) => {

    if(err){
      console.log(err)
      error(res, "query error")
      return
    }
    
    if(rows.length == 1){
      res.statusCode = 200;
      res.json(rows[0])
    } else {
      error(res, "query error")
    }
    return;
  })
});



// Add User
router.post('/', (req,res,next) =>{

  var user_id = "";
  var user_name = "";
  var user_password = "";
  // body: {
  //   user_id: [String]
  //   user_name: [String]
  //   user_password: [String]
  // }
  if(!Object.keys(req.body).includes("user_id") || !Object.keys(req.body).includes("user_name") || !Object.keys(req.body).includes("user_password")){
    error(res, "query error")
    return
  }

  user_id = req.body.user_id;
  user_name = req.body.user_name;
  user_password = req.body.user_password;

  // Check id is duplicated
  conn.query(`select user_id from user where user_id='${user_id}'`, (err, rows) => {

    if(err){
      console.log(err)
      error(res, "query error")
      return
    }

    if(rows.length != 0){
      error(res, "User ID is already exists")
      return
    }

    // Check name is duplicated
    conn.query(`select user_id from user where user_name='${user_name}'`, (err, rows) => {
    
      if(err){
        console.log(err)
        error(res, "query error")
        return
      }
      
      if(rows.length != 0){
        error(res, "User name is already exists")
        return
      }
      
      // Enroll new user
      conn.query(`insert into user(user_id, user_name, user_password) 
        values("${user_id}","${user_name}","${user_password}");`, (err, rows) => {
        
        if(err){
          console.log(err)
          error(res, "sql error: cannot enroll new user")
          return
        }
        
        res.statusCode = 200
        res.json({
          "result": "success",
        })
        return
      })
    })
  })
})



// Modify User
router.patch("/", async (req, res, next) => {

  var user_id = "";
  var user_name = "";
  var user_password = "";
  // body: {
  //   user_id: [String]
  //   user_name: [String]
  //   user_password: [String]
  // }
  if(!Object.keys(req.body).includes("user_id")){
    error(res, "query error")
    return
  }

  if(!Object.keys(req.body).includes("user_name") && !Object.keys(req.body).includes("user_password")){
    error(res, "query error")
    return
  }

  user_id = req.body.user_id;
  user_name = req.body.user_name;
  user_password = req.body.user_password;


  var checkName = () => new Promise(resolve => {
    conn.query(`select user_name from user where user_name="${user_name}"`, (err, rows) => {
      if(err) resolve(false)
      if(rows.length == 1) resolve(false)
      else resolve(true)
    })
  })

  var update = (query) => new Promise(resolve => {
    conn.query(query, (err,rows) => {
      if(err){
        console.log(err)
        resolve(false)
      } else
        resolve(true)
    })
  })

  // if, user name exists, check name is valid and change name
  if(user_name != null){
    if(await checkName()){
      var result = await update(`update user set user_name="${user_name}" where user_id="${user_id}"`)
      if(!result){
        error(res, "Cannot change name")
        return
      }
    } else {
      error(res, "User name is already exists")
      return
    }
  }

  // if, user name exists, change password
  if(user_password != null){
    var result = await update(`update user set user_password="${user_password}" where user_id="${user_id}"`)
    if(!result){
      error(res, "Cannot change name")
      return
    }
  }

  res.statusCode = 200
  res.json({
    result: "success"
  })
  return
})



var error = (res, msg) => {
  res.statusCode = 400;
  res.json({
    error: msg
  })
  return
}

module.exports = router;
