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

// Abrir el puerto primero: Render hace health checks al PORT; si solo escuchas
// después de Mongo, el proceso puede recibir SIGTERM y salir con 1 sin ver el catch.
console.log('[boot] binding HTTP server…');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('[boot] connecting to MongoDB…');

  mongoose
    .connect(MONGO_URI, { serverSelectionTimeoutMS: 20000 })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
      console.error('MongoDB connection error');
      console.error('Message:', err?.message || err);
      if (err?.reason) console.error('Reason:', err.reason);
      console.error(
        'Hints: (1) Atlas → Network Access → add 0.0.0.0/0. (2) User/password correct; special chars in password must be URL-encoded in the URI. (3) Database user has read/write on the cluster.'
      );
      server.close(() => process.exit(1));
    });
});
