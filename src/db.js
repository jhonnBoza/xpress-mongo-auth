import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

let mongoPromise = null;

export function startMongo(uri) {
  if (!mongoPromise) {
    if (!uri) {
      throw new Error('MONGO_URI is required to connect');
    }
    const options = {
      serverSelectionTimeoutMS: 25000,
      // Atlas UI del lab usa "my_cloud_database"; si la URI en Render no trae /nombre,
      // sin esto Mongoose usa otra base (p. ej. test) y GET /api/users devuelve [].
      dbName: process.env.MONGO_DB_NAME || 'my_cloud_database'
    };
    mongoPromise = mongoose.connect(uri, options);
  }
  return mongoPromise;
}
