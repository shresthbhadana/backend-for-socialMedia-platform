const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required"
  }),

  password: Joi.string().min(4).required().messages({
    "string.min": "Password must be at least 4 characters",
    "any.required": "Password is required"
  })
});



const createSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters",
    "any.required": "Name is required"
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required"
  }),

  password: Joi.string().min(4).required().messages({
    "string.min": "Password must be at least 4 characters",
    "any.required": "Password is required"
  })
});




exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message});
    }
    next();
}

exports.validateCreateSubAdmin = (req, res, next) => {
  const { error } = createSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};