import { model, Schema } from 'mongoose';

export interface User {
  id: number;
  name: string;
  surname: string;
  height?: number;
  weight?: number;
  email: string;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  email: { type: String, required: true },
});

export const UserModel = model<User>('User', schema);
