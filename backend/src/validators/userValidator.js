const Joi = require("joi");


const updateUserSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  userName: Joi.string().alphanum().min(3).optional(),
  email: Joi.string().email().optional(),
}).or("name", "userName", "email"); 


const followSchema = Joi.object({
  id: Joi.string().required()
});

module.exports = { updateUserSchema, followSchema };