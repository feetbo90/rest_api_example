import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  npm: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  npm: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
