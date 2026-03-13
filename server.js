const express = require("express");

const con = require("./config/db");

const LogiRouter = require("./routes/login.js");

const dotenv = require("dotenv");
const authentication = require("./middlewares/authentication.middleware.js");
dotenv.config();

con(process.env.MONGO_URI); //process.env howa

const app = express();
app.use(express.json());

app.get("/data", authentication, (req, res) => {
  try {
    const data = [
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
      {
        name: "oumamia",
        age: 20,
      },
    ];

    console.log(req.user);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "internal server error !" });
  }
});
app.use("/users", LogiRouter);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
