const mongoose = require("mongoose");

const Subsciption = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,//relation bin user w abonnment
    ref : "User"
  },
  plan: {
    type: String,
  },
  price: {
    type: Number,
  },
  startDate: {
    type: Date,
    default : Date.now
  },
  endDate: {
    type: Date,
    
  },
  status: {
    type: String,
    enum : ["active" , "expired" , "canceled"]
  },
});

module.exports = mongoose.model ("sub",Subsciption);
