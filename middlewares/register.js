const joi = require("joi")



const  schema=joi.object().keys({
    name : joi.string().required(),
    email : joi.string().email().trim().required(),
    password : joi.string().min(5).max(10).required()
});
async function validation (req ,res , next){
try{
const value = await schema.validateAsync(req.body) 
next();
 res.status(201).json({ message: "user created successfully" });

}catch(err){
 res.status(400).json({ message: err.message });

}

}


module.exports = validation


