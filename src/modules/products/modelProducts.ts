import { Schema, model } from 'mongoose';
import { type IProductDTO } from '../../interfaces/interfaceProduct';

const productSchema = new Schema<IProductDTO>({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
  discount: { type: Object, required: true },
  category: { type: String, required: true },
});

const ProductModel = model('Product', productSchema);

export default ProductModel;
