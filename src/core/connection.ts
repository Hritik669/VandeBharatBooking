import mongoose from 'mongoose';
import * as models from '../models/index';

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/vandeBharat')
    console.log('Connected to MongoDB');
    models.UserModel;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export {connectToDatabase};