const express = require('express')
const router = express.Router()
const db = require('../Data/database')
const bcrypt = require('bcryptjs');


router.post("/signUp",async(req,res)=>{
  const user = req.body.user
  const email = req.body.email
  const password = req.body.password
 let hasedPassword
  bcrypt.hash(password,10, async (err,hash)=>{
    let hashedPassword = hash
    if(err){
      return res.json(err)
    }
    await db.query(`INSERT INTO new_table(
      userName,
      password,
      lives,
      level,
      email
    )
    VALUES (
      '${user}',
      '${hashedPassword}',
      ${4},
      ${0},
      "${email}"
    )`)
  })
  return res.json({message:"it is working"})
})

router.post('/login',async(req,res)=>{
   const user = req.body.user
   const password = req.body.password
   
   const query = `SELECT * FROM new_table WHERE userName = ${user}`
   const dataBaseUser = db.query(query)
   
   console.log(dataBaseUser)
   if(dataBaseUser[0][0]=== undefined){
    return res.json({message:'No User'})
   }
   bcrypt.compare(password) 
})

router.post('/getUSer',async (req,res)=>{
  const user = req.body.user
  const query = ` SELECT * FROM new_table WHERE userName = ${user}`
  const realUser = await db.query(query)

  return res.json({user:realUser})
})

module.exports = router