const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User Model");

async function authonication(req, res, next) {
  const auti = req.headers.authorization;

  if (!auti) {
    res.status(401).json({ message: "Token missing" });
  }
  const token = auti.split(" ")[1]; //1 kat3ni brina l3onsor tani
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Currentuser = await UserModel.findById(decoded.id);
    console.log(Currentuser);

    req.user = Currentuser;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = authonication;
