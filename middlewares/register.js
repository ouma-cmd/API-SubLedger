const joi = require("joi");

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().min(5).max(20).required(),
});

async function validation(req, res, next) {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
}

module.exports = validation;
