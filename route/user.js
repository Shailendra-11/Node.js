const express = require('express');
const userRouter = express.Router();
const User = require('../model/model'); // your User model



userRouter.get("/", async (req, res) => {
     try {
          // fetch all users from DB
          const userList = await User.find().lean(); // returns an array
          return res.status(200).json({
               status: "success",
               count: userList.length,
               data: userList
          });
     } catch (error) {
          console.error("Error fetching users:", error);
          return res.status(500).json({ status: "error", message: `user Lists Error: ${error.message || error}` });
     }
});


userRouter.get("/:id", async (req, res) => {
     const { id } = req.params
     try {
          // fetch all users from DB
          const userDetails = await User.findById(id); // returns an array
          return res.status(200).json({
               status: "success",
               data: userDetails
          });
     } catch (error) {
          console.error("Error fetching users:", error);
          return res.status(500).json({ status: "error", message: `user Details Error: ${error.message || error}` });
     }
});



userRouter.delete("/:id", async (req, res) => {
     const { id } = req.params
     try {
          // fetch all users from DB
          const userDetails = await User.findByIdAndDelete(id); // returns an array
          if (!userDetails) {
               res.status(404).send("Id is not exits")
          } else {
               res.status(200).send("Succesfully Delete the users")

          }
     } catch (error) {
          console.error("Error fetching users:", error);
          return res.status(500).json({ status: "error", message: `user Delete Error: ${error.message || error}` });
     }
});


userRouter.post("/", async (req, res) => {
     const { FirstName, LastName, email, gender } = req.body;
     try {
          // 1. CHECK REQUIRED FIELDS
          let missingFields = [];

          if (!FirstName) missingFields.push("FirstName");
          if (!LastName) missingFields.push("LastName");
          if (!email) missingFields.push("email");
          if (!gender) missingFields.push("gender");

          if (missingFields.length > 0) {
               return res.status(400).json({
                    status: "error",
                    message: "this field missing",
                    fields: missingFields
               });
          }

          // 2. CREATE USER (userData, not missingFields)
          const newUser = new User({
               FirstName,
               LastName,
               email,
               gender
          });

          // 3. SAVE USER
          const savedUser = await newUser.save();

          return res.status(201).json({
               status: "success",
               message: "User created successfully",
               data: savedUser
          });

     } catch (error) {
          console.error("User Create Error:", error);
          return res.status(500).json({
               status: "error",
               message: error.message || "Server error"
          });
     }
});



userRouter.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    // Check valid MongoDB ObjectId

    // Update and return new updated user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      {
        new: true,           // return updated document
        runValidators: true, // apply schema validation
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("User update error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Server error"
    });
  }
});





module.exports = userRouter;
