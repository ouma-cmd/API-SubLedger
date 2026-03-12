const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

const validation = require("../middlewares/login");
const User = require("../Models/User Model");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      res.status(400).json({ message: "Invalid email " });
      return;
    } else {
      const pass = await bcrypt.compare(password, exist.password);
      if (pass) {
        const payload = { id: exist._id, role: exist.role };
        const secretkey = process.env.JWT_SECRET; //process howa object kaysmh lik twsl lay haja f env
        const options = { expiresIn: "1h" };

        const token = jwt.sign(payload, secretkey); //payload : ex :{ id: exist._id, role: exist.role // مثال: "user" أو "admin"
        //sectkey :sri server li kyvirifih knkhsnoh f env
        //options : ex :{ expiresIn: "1h" } modat salahiya

        res.status(200).json({ message: "secces", token });
      } else {
        res.status(400).json({ message: "Invalid  password" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = login;
