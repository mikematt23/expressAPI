const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host:'monorail.proxy.rlwy.net',
  database:"railway",
  user:"root",
  password: "TzXNrjcgSUuKiAQZrYXpCGWjfjujCcgf",
  port:"46530"
})

module.exports = pool