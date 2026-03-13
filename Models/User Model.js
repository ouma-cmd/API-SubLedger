const mongoose = require("mongoose");


const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }
  },
  { timestamps: true },
);

module.exports= mongoose.model("User",schema)
