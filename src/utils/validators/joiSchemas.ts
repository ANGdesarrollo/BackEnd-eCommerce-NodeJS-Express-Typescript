import Joi from 'joi';

export const idSchema = Joi.string().length(24).required();

export const productCreateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  thumbnail: Joi.object({
    imgPath: Joi.string().required(),
    backgroundPath: Joi.string().required(),
  }).required(),
  stock: Joi.number().required(),
  discount: Joi.number().required(),
  category: Joi.string().required(),
  details: Joi.string().required(),
});

export const procutUpdateSchema = Joi.object({
  _id: Joi.string().length(24).required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  soldQty: Joi.number().required(),
  thumbnail: Joi.object({
    imgPath: Joi.string().required(),
    backgroundPath: Joi.string().required(),
  }).required(),
  stock: Joi.number().required(),
  discount: Joi.number().required(),
  category: Joi.string().required(),
  details: Joi.string().required(),
});
