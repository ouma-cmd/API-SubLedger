const express = require("express");

const loginContoller  = require("../controllers/login");
const loginMeddlwer = require("../middlewares/login")


const auth = require("../middlewares/authentication.middleware"); 
const role = require("../middlewares/authorizationLogin"); 
const validation = require("../middlewares/register");
const register = require("../controllers/register");

const rout = express.Router()

rout.post("/login", loginContoller  )
rout.post("/register",validation,register) ;
rout.get("/admin", auth, role(["admin"]), (req, res) => {
    res.status(200).json({ message: "Welcome Admin!" });
});

rout.get("/user", auth, role(["user"],["admin"]), (req, res) => {
    res.status(200).json({ message: "Welcome user!" });
});

module.exports = rout