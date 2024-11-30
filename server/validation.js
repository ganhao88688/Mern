const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    userName: joi.string().min(3).max(50).required(),
    email: joi.string().min(6).max(50).required().email(),
    passWord: joi.string().min(6).max(255).required(),
    role: joi.string().required().valid("Student", "Instructor"),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(3).max(50).required().email(),
    passWord: joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};
const courseValidation = (data) => {
  const schema = joi.object({
    title: joi.string().min(6).max(50).required(),
    description: joi.string().min(6).max(255).required(),
    price: joi.number().min(0).max(9999).required(),
  });
  return schema.validate(data);
};

module.exports = { courseValidation, registerValidation, loginValidation };
// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = ;
