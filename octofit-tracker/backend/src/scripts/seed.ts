import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await mongoose.connection.dropDatabase();

    const users = await UserModel.create([
      { name: 'Ava Martinez', email: 'ava@example.com', level: 'intermediate' },
      { name: 'Liam Chen', email: 'liam@example.com', level: 'advanced' },
      { name: 'Noah Williams', email: 'noah@example.com', level: 'beginner' },
      { name: 'Mia Patel', email: 'mia@example.com', level: 'intermediate' },
    ]);

    await TeamModel.create([
      { name: 'Summit Striders', members: [users[0]._id, users[1]._id], totalPoints: 1840 },
      { name: 'Morning Momentum', members: [users[2]._id, users[3]._id], totalPoints: 1295 },
    ]);

    await ActivityModel.create([
      { user: users[0]._id, type: 'run', durationMinutes: 42, caloriesBurned: 390, completedAt: new Date('2026-09-14T07:15:00Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 55, caloriesBurned: 460, completedAt: new Date('2026-09-14T18:00:00Z') },
      { user: users[2]._id, type: 'ride', durationMinutes: 35, caloriesBurned: 280, completedAt: new Date('2026-09-13T09:30:00Z') },
      { user: users[3]._id, type: 'yoga', durationMinutes: 30, caloriesBurned: 120, completedAt: new Date('2026-09-13T06:45:00Z') },
    ]);

    await LeaderboardModel.create([
      { user: users[1]._id, points: 980, rank: 1, period: 'weekly' },
      { user: users[0]._id, points: 860, rank: 2, period: 'weekly' },
      { user: users[3]._id, points: 650, rank: 3, period: 'weekly' },
      { user: users[2]._id, points: 645, rank: 4, period: 'weekly' },
    ]);

    await WorkoutModel.create([
      {
        title: 'Trail Ready Intervals',
        type: 'cardio',
        difficulty: 'intermediate',
        durationMinutes:  thirtyFiveMinutes,
        exercises: ['Warm-up jog', 'Four 400m intervals', 'Cool-down walk'],
      },
      {
        title: 'Foundations Full Body',
        type: 'full-body',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Dead bugs', 'Glute bridges'],
      },
      {
        title: 'Power and Mobility',
        type: 'strength',
        difficulty: 'advanced',
        durationMinutes: 50,
        exercises: ['Front squats', 'Push press', 'Romanian deadlifts', 'Hip mobility flow'],
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts in octofit_db');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

const thirtyFiveMinutes = 35;

seedDatabase();
