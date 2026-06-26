const express = require("express");
const dotenv = require("dotenv");

const con = require("./config/db");
const LogiRouter = require("./routes/login");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const authentication = require("./middlewares/authentication.middleware");

dotenv.config();

const app = express();

app.use(express.json());

con(process.env.MONGO_URI);

app.get("/data", authentication, (req, res) => {
  try {
    const data = [
      {
        name: "oumamia",
        age: 20,
      },
    ];

    console.log(req.user);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "internal server error !",
    });
  }
});

app.use("/users", LogiRouter);
app.use("/abn", authentication, subscriptionRoutes);

module.exports = app;