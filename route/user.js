const { Router } = require('express');
const Userrouter = Router();
const User = require('../model/user')

Userrouter.get('/signin', (req, res) => {
     return res.render("signin")
})

Userrouter.get('/signup', (req, res) => {
     return res.render("signup")
})

Userrouter.post("/signup", async (req, res) => {
     const { firstName, LastName, email, password, gender } = req.body;
     await User.create({
          firstName,
          LastName,
          email,
          password,
          gender
     })
     return res.redirect("/")
})







module.exports = Userrouter;
