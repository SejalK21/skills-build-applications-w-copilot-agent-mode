import mongoose, { type InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.model('User', userSchema);