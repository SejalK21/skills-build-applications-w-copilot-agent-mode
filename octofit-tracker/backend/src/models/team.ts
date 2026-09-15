import mongoose, { type InferSchemaType } from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    totalPoints: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export const TeamModel = mongoose.model('Team', teamSchema);