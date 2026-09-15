import express from 'express';
import { getApiBaseUrl } from './config/api-url.js';
import { connectDatabase } from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = 8000;
const apiBaseUrl = getApiBaseUrl();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Error starting OctoFit Tracker API:', error);
  process.exit(1);
});