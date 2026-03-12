const joi = require("joi");

const schema = joi.object().keys({
  email: joi.string().email().trim().required(),
  password: joi.string().min(5).max(10).required(),
});

async function validation(req, res, next) {
  try {
    const valid = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = validation;
