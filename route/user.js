const { Router } = require('express');
const Userrouter = Router();
const User = require('../model/user')

Userrouter.get('/signin', (req, res) => {
     return res.render("signin")
})

Userrouter.get('/signup', (req, res) => {
     return res.render("signup")
})

Userrouter.post("/signin", async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log(token)
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

Userrouter.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

Userrouter.post("/signup", async (req, res) => {
     // console.log(req.body)
     const {FirstName, LastName, email, password, gender } = req.body;
     await User.create({
          FirstName,
          LastName,
          email,
          password,
          gender
     })
     return res.redirect("/")
})


module.exports = Userrouter;
