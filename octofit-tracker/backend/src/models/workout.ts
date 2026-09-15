import mongoose, { type InferSchemaType } from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['cardio', 'strength', 'mobility', 'full-body'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = mongoose.model('Workout', workoutSchema);