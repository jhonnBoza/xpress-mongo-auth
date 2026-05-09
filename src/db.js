import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

let mongoPromise = null;

export function startMongo(uri) {
  if (!mongoPromise) {
    if (!uri) {
      throw new Error('MONGO_URI is required to connect');
    }
    const options = { serverSelectionTimeoutMS: 25000 };
    if (process.env.MONGO_DB_NAME) {
      options.dbName = process.env.MONGO_DB_NAME;
    }
    mongoPromise = mongoose.connect(uri, options);
  }
  return mongoPromise;
}
