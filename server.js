const express = require("express");

const con = require("./config/db");

const LogiRouter = require("./routes/login.js");

const dotenv = require("dotenv");
dotenv.config();

con(process.env.MONGO_URI); //process.env howa

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.use("/users", LogiRouter );

app.listen(5000, () => {
  console.log("server running on port 5000");
});
