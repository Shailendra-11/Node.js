const express = require("express")
const app  = express()
const fs = require("fs")
const url = require("url")
const { error } = require("console")

// const myserver = http.createServer((req, res) => {
//      const log = `${Date.now()} this server append file\n`
//      fs.appendFile("logo.text", log, (error, data) => {
//           res.end("Hello kdf")
//      })
// })

app.get('/test' ,(req ,res)=>{
   res.send("hii")
})

app.listen(300, () => {
     console.log("server start")
})