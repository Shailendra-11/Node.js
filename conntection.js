
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shailendrarai1110:prince%401110@prince.whitp1n.mongodb.net/todos");
    console.log("✅ Database connect successful");
  } catch (error) {
    console.error("❌ Database connect failed:", error.message);
  }
};



module.exports = {
     connectDB
}