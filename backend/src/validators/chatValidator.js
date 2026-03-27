const Joi = require("joi");

const feedQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).optional(),
  skip: Joi.number().integer().min(0).optional()
});

module.exports = { feedQuerySchema };