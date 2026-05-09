import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import { startMongo } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect(302, '/api/users');
});

app.use('/api', async (req, res, next) => {
  try {
    await startMongo(process.env.MONGO_URI);
    next();
  } catch (err) {
    console.error('API blocked: MongoDB not available:', err?.message);
    return res.status(503).json({
      message:
        'No hay conexión con MongoDB Atlas. Revisa en Atlas → Network Access que la IP 0.0.0.0/0 esté permitida. En Render, MONGO_URI debe incluir la base, p. ej. …mongodb.net/my_cloud_database?retryWrites=true&w=majority'
    });
  }
});

app.use('/api/users', userRoutes);

export default app;
