import { Router } from 'express';
import { WorkoutModel } from '../models/workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await WorkoutModel.find().sort({ difficulty: 1, title: 1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load workouts', details: error });
  }
});

export default router;