import Joi from 'joi';
import { type IMessageDTO } from '../../interfaces/interfaceChat';
import { type IProductDTO, type IProduct } from '../../interfaces/interfaceProduct';
import { IEmail } from '../../interfaces/interfaceEmail';

export const idSchema = Joi.string().length(24).required();

export const productCreateSchema = Joi.object<IProductDTO>({
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

export const procutUpdateSchema = Joi.object<IProduct>({
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

export const messageSchema = Joi.object<IMessageDTO>({
  idRoom: Joi.string().optional(),
  message: Joi.string().required(),
  username: Joi.string().email().required(),
});

export const emailSchema = Joi.object<IEmail>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  message: Joi.string().required(),
})
