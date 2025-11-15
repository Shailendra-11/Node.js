const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true   
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"], 
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
