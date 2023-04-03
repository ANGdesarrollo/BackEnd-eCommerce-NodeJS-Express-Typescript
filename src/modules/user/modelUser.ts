import { Schema, model } from 'mongoose';
import { type IUser } from '../../interfaces/interfaceUser';

const userSchema = new Schema<IUser>({
  date: { type: String, required: true, maxlength: 50 },
  username: { type: String, required: true, unique: true, maxlength: 80 },
  password: { type: String, required: true, minlength: 3, maxlength: 80 },
  admin: { type: Boolean },
});

const UserModel = model('User', userSchema);

export default UserModel;
