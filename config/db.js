const mongoose = require("mongoose");
require("dotenv").config(); //tari9a bax kan3ayto 3la .env hit maymknx t3ayt "lih mobaxara"

async function connect(url) {
//   console.log(url);

  try {
    await mongoose.connect(url);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connect;
