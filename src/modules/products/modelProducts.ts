import { Schema, model } from 'mongoose';
import { type IProduct } from '../../interfaces/interfaceProduct';

const productSchema = new Schema<IProduct>({
  date: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: {
    imgPath: { type: String, required: true },
    backgroundPath: { type: String, required: true },
  },
  stock: { type: Number, required: true },
  discount: { type: Number, required: true },
  category: { type: String, required: true },
  soldQty: { type: Number, required: true },
  details: [
    {
      description: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
});

export const ProductModel = model('Product', productSchema);
