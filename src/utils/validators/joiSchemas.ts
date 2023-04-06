import Joi from 'joi';

export const idSchema = Joi.string().length(24).required();

export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  thumbnail: Joi.object({
    imgPath: Joi.string().required(),
    backgroundPath: Joi.string().required(),
  }).required(),
  stock: Joi.number().required(),
  discount: Joi.number().required(),
  category: Joi.string().required(),
  soldQty: Joi.number().required(),
  details: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        name: Joi.string().required(),
      }),
    )
    .required(),
});
