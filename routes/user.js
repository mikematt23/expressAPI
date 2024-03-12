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
   
   const query = `SELECT * FROM new_table WHERE userName = '${user}'`
   const dataBaseUser = await db.query(query)
   
   console.log(dataBaseUser[0][0])
   if(dataBaseUser[0][0]=== undefined){
    return res.json({message:'No User'})
   }
   bcrypt.compare(password,dataBaseUser[0][0].password, async (err,result)=>{
      if(result){
        return res.json({user:dataBaseUser[0][0]})
      }else{
        res.json({message:"passwords dont match"})
      }
   }) 
})

router.post('/getUSer',async (req,res)=>{
  const user = req.body.user
  const query = ` SELECT * FROM new_table WHERE userName = '${user}'`
  const realUser = await db.query(query)

  return res.json({user:realUser})
})

router.post('/updateLives',async (req,res)=>{
   const user = req.body.userName
   const lives = req.body.lives

   const query = ` UPDATE new_table SET lives = ${lives} WHERE userName = "${user}"`
   db.query(query)
   return res.json({message:'updates'})
})

router.post('/updateLevel',async(req,res)=>{
  const user = req.body.userName
  const level = req.body.level

  const query = `UPDATE new_table set level = ${level} WHERE userName = "${user}"`
  db.query(query)
  return res.json({message:'updated'})
})

module.exports = router