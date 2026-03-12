const express = require("express");
const user = require("../Models/User Model");
// const bcrypt = require("bcrypt");

const hachPassword=require("../utils/hachPassword")

async function register(req, res) {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    
    
    if (await user.findOne({ email })) {

      res.status(400).json({ message: "Email already exists" });
      return;


    } else {

      const hashed = await hachPassword(password);
      await user.create({ name, email, password:hashed });
    }
    
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = register;
