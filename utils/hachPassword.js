const bcrypt = require("bcrypt");

async function hachPassword(password){
   const hach= await bcrypt.hash(password,10)
   return hach
}

module.exports=hachPassword
