const express = require("express")
const app = express()
const path = require("path")
const cookiePaser = require("cookie-parser");
const Userrouter = require("./route/user")
const blogRoute = require("./route/blog");
const { connectDB } = require("./conntection")
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
connectDB()
app.set("view engine", "ejs")
app.set("views", path.resolve("./view"));
app.use(express.urlencoded({ extended: false }))
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
   res.render("home")
})

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", Userrouter)
app.use("/blog", blogRoute);

app.listen(300, () => {
   console.log("server start")
})