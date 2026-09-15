import mongoose from 'mongoose';

export const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export async function connectDatabase(): Promise<typeof db> {
  if (db.readyState !== 1) {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  }

  return db;
}

(db as unknown as NodeJS.EventEmitter).on('error', console.error.bind(console, 'connection error:'));

export default db;
