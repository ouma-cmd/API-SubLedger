const express = require("express");
const user = require("../Models/User Model");
const hachPassword = require("../utils/hachPassword");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (await user.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await hachPassword(password);
    await user.create({ name, email, password: hashed });

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = register;
