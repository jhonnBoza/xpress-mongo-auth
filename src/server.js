import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import app from './app.js';

dotenv.config();

if (process.env.USE_PUBLIC_DNS === '1') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('FATAL: MONGO_URI is not set. Add it in Render → Environment (same value as in .env locally).');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
