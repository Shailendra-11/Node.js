const express = require("express")
const app = express()
const path = require("path")
const Userrouter = require("./route/user")
const { connectDB } = require("./conntection")
connectDB()
app.set("view engine", "ejs")
app.set("views", path.resolve("./view"));
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
   res.render("home")
})
app.use("/user", Userrouter)
app.listen(300, () => {
   console.log("server start")
})