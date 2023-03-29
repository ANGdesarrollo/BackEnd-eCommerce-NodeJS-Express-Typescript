import { Schema, model } from 'mongoose';
import { type IUser } from '../../interfaces/interfaceUser';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model('User', userSchema);

export default UserModel;
