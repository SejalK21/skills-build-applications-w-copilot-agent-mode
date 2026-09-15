import { Router } from 'express';
import { ActivityModel } from '../models/activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await ActivityModel.find().populate('user', 'name email').sort({ completedAt: -1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load activities', details: error });
  }
});

export default router;