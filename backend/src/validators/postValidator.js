const Joi = require("joi");


const createPostSchema = Joi.object({
  body: Joi.string().required(),
  media: Joi.string().optional(),
  postedAt: Joi.date().iso().optional(),
  isPosted: Joi.boolean().optional()
});


const updatePostSchema = Joi.object({
  body: Joi.string().optional(),
  media: Joi.string().optional()
}).or('body', 'media');


const commentSchema = Joi.object({
  userId: Joi.string().required(),
  text: Joi.string().required()
});

module.exports = { createPostSchema, updatePostSchema, commentSchema };
