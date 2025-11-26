const { createHmac, randomBytes} = require('crypto');
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
  salt: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profileImageUrl: {
    type: String,
    default: "/images/default.png"
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  role:{
     type:String,
     enum: ["USER" , "ADMIN"],
     default: "USER"
  }
}, { timestamps: true });


UserSchema.pre("save" , function(next){
   const user = this;
   if(!user.isModified("password")) return
   const salt = randomBytes(16).toString();
   const hashedPassword = createHmac("sha256" , salt).update(user.password).digest("hex")

   this.salt=  salt;
   this.password =hashedPassword;
   next();
})


const User = mongoose.model("User", UserSchema);

module.exports = User;
