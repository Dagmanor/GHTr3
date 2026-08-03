import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const buildApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME?.trim();
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

const apiBaseUrl = buildApiBaseUrl();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl: apiBaseUrl });
});

app.get('/api/users', (_req, res) => {
  res.json({
    baseUrl: apiBaseUrl,
    users: [
      { id: 1, name: 'Ava', role: 'captain' },
      { id: 2, name: 'Noah', role: 'member' },
    ],
  });
});

app.get('/api/teams', (_req, res) => {
  res.json({
    baseUrl: apiBaseUrl,
    teams: [
      { id: 1, name: 'Velocity', description: 'High-energy group training' },
      { id: 2, name: 'Endurance', description: 'Long-distance and recovery focus' },
    ],
  });
});

app.get('/api/activities', (_req, res) => {
  res.json({
    baseUrl: apiBaseUrl,
    activities: [
      { id: 1, type: 'run', durationMinutes: 30, calories: 320 },
      { id: 2, type: 'strength', durationMinutes: 45, calories: 260 },
    ],
  });
});

app.get('/api/workouts', (_req, res) => {
  res.json({
    baseUrl: apiBaseUrl,
    workouts: [
      { id: 1, name: 'Morning HIIT', description: 'Short high-intensity interval training' },
      { id: 2, name: 'Strength Builder', description: 'Full-body strength circuit' },
    ],
  });
});

app.get('/api/leaderboard', (_req, res) => {
  res.json({
    baseUrl: apiBaseUrl,
    leaderboard: [
      { id: 1, name: 'Ava', score: 940 },
      { id: 2, name: 'Noah', score: 860 },
    ],
  });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
