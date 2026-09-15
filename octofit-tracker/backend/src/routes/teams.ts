import { Router } from 'express';
import { TeamModel } from '../models/team.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await TeamModel.find().populate('members', 'name email').sort({ totalPoints: -1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load teams', details: error });
  }
});

export default router;