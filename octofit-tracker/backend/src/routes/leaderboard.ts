import { Router } from 'express';
import { LeaderboardModel } from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await LeaderboardModel.find().populate('user', 'name email').sort({ rank: 1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load leaderboard', details: error });
  }
});

export default router;