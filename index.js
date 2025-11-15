const express = require("express")
const app = express()
const { connectDB } = require("./conntection")
const userRouter = require("./route/user")
app.use(express.json());


app.use("/user", userRouter);

app.listen(300, () => {
   connectDB()
   console.log("server start")
})