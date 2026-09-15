import { Router } from 'express';
import { UserModel } from '../models/user.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await UserModel.find().sort({ name: 1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load users', details: error });
  }
});

export default router;