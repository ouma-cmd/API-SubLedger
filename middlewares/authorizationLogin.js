const express = require("express");

function role(roleAllow) {
  return (req, res, next) => {
   //  console.log(roleAllow, req.user);

    if (roleAllow.includes(req.user.role)) {//includes hiya methode dyal js 
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}

module.exports = role;
