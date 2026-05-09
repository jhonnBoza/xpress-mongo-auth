import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

let mongoPromise = null;

export function startMongo(uri) {
  if (!mongoPromise) {
    if (!uri) {
      throw new Error('MONGO_URI is required to connect');
    }
    mongoPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 25000
    });
  }
  return mongoPromise;
}
